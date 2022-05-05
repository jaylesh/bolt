export class BoltDialog {
  static dialogs = [];

  static getDialog(el) {
    if (el) {
      return BoltDialog.dialogs.find(dialog => el === dialog.el);
    }
  }

  static open = el => {
    const dialog = BoltDialog.getDialog(el);

    if (dialog) {
      dialog.open();
    }
  };

  static close = el => {
    const dialog = BoltDialog.getDialog(el);

    if (dialog) {
      dialog.close();
    }
  };

  constructor(el) {
    if (!el) return;

    this.el = el;
    this.isOpen = false;
    this.init();
  }

  init() {
    if (!BoltDialog.dialogs.includes(this)) {
      BoltDialog.dialogs.push(this);
    }

    this.isPersistent = this.el.hasAttribute('data-dialog-persistent');
    this.handleEscape = this.handleEscape.bind(this);
    this.handleAnimateEnd = this.handleAnimateEnd.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.setupTriggers();
    this.el.setAttribute('data-bolt-ready', '');
    this.el.dispatchEvent(new CustomEvent('dialog:ready', { bubbles: true }));
  }

  setupTriggers() {
    if (this.el.id) {
      const targetTriggers = document.querySelectorAll(
        `[data-bolt-dialog-target="${this.el.id}"]`,
      );

      targetTriggers.forEach(el => {
        el.addEventListener('click', () => {
          this.toggle();
        });
      });
    }

    const closeTriggers = this.el.querySelectorAll('[data-dialog-close]');

    closeTriggers.forEach(el => {
      el.addEventListener('click', () => {
        this.close();
      });
    });
  }

  open() {
    this.el.classList.remove('c-bolt-dialog--hidden');
    document.body.classList.add('u-bolt-overflow-hidden');

    if (!this.isPersistent) {
      this.el.addEventListener('click', this.handleOutsideClick);
      document.addEventListener('keydown', this.handleEscape);
    }

    this.isOpen = true;
    this.el.showModal();
  }

  close() {
    this.el.classList.add('c-bolt-dialog--hidden');
    document.body.classList.remove('u-bolt-overflow-hidden');
    this.el.addEventListener('webkitAnimationEnd', this.handleAnimateEnd);
  }

  handleAnimateEnd() {
    this.el.classList.remove('c-bolt-dialog--hidden');

    if (!this.isPersistent) {
      this.el.removeEventListener('click', this.handleOutsideClick);
      document.removeEventListener('keydown', this.handleEscape);
    }

    this.isOpen = false;
    this.el.close();
    this.el.removeEventListener('webkitAnimationEnd', this.handleAnimateEnd);
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  handleOutsideClick(e) {
    if (e.target.tagName !== 'DIALOG') {
      return;
    }

    const dialogRect = e.target.getBoundingClientRect();

    const isInsideDialog =
      dialogRect.top <= e.clientY &&
      e.clientY <= dialogRect.top + dialogRect.height &&
      dialogRect.left <= e.clientX &&
      e.clientX <= dialogRect.left + dialogRect.width;

    if (!isInsideDialog) {
      this.close();
    }
  }

  handleEscape(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  }
}
