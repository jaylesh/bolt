/* eslint-disable no-unused-vars */
import { define, props } from 'skatejs';
import Mousetrap from 'mousetrap';
import { h } from 'preact';
import { urlHandler, patternName } from '../../utils';
import { store } from '../../store'; // redux store
import styles from './pl-tools-menu.scss?external';

let listeningForBodyClicks = false;

import { html } from 'lit-html';
import { BaseLitComponent } from '../../components/base-component';
import { customElement } from 'lit-element';

@customElement('pl-tools-menu')
class ToolsMenu extends BaseLitComponent {
  static get properties() {
    return {
      isOpen: Boolean,
      layoutMode: String,
      currentUrl: String,
    };
  }

  _stateChanged(state) {
    if (this.currentUrl !== state.app.currentUrl) {
      this.currentUrl = state.app.currentUrl;
    }

    if (this.layoutMode !== state.app.layoutMode) {
      this.layoutMode = state.app.layoutMode || 'vertical';
    }
  }

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.receiveIframeMessage = this.receiveIframeMessage.bind(this);
    this.handleExternalClicks = this.handleExternalClicks.bind(this);
  }

  connectedCallback() {
    super.connectedCallback && super.connectedCallback();
    styles.use();
    const state = store.getState();
    const { ishControlsHide } = window.ishControls;
    this.currentUrl = state.app.currentUrl || '';
    this.ishControlsHide = ishControlsHide;

    window.addEventListener('message', this.receiveIframeMessage, false);
    document.addEventListener('click', this.handleExternalClicks);

    Mousetrap(this).bind('esc', () => {
      this.close();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    styles.unuse();
    document.removeEventListener('click', this.handleExternalClicks);
    window.removeEventListener('message', this.receiveIframeMessage);
  }

  handleExternalClicks(e) {
    if (window.innerWidth >= 670 && this.layoutMode === 'vertical') {
      return;
    }

    if (!this.contains(e.target) && this.isOpen === true) {
      this.isOpen = false;
    }
  }

  close() {
    this.isOpen = false;
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
  }

  handleClick(e) {
    if (window.innerWidth >= 670 && this.layoutMode === 'vertical') {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    this.toggle();
  }

  receiveIframeMessage(event) {
    const self = this;
    // does the origin sending the message match the current host? if not dev/null the request
    if (
      window.location.protocol !== 'file:' &&
      event.origin !== window.location.protocol + '//' + window.location.host
    ) {
      return;
    }

    let data = {};
    try {
      data =
        typeof event.data !== 'string' ? event.data : JSON.parse(event.data);
    } catch (e) {
      // @todo: how do we want to handle exceptions here?
    }

    if (data.event !== undefined && data.event === 'patternLab.pageClick') {
      try {
        self.isOpen = false;
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    if (window.innerWidth >= 670 && this.layoutMode === 'vertical') {
      this.isOpen = true;
    }

    return html`
      <div class="pl-c-tools">
        <pl-button
          icon-only
          @click="${this.handleClick}"
          class="pl-c-tools__toggle"
        >
          <pl-icon name="settings" slot="after"></pl-icon>
        </pl-button>
        <ul
          class="pl-c-tools__list pl-js-acc-panel ${this.isOpen
            ? 'is-open'
            : ''}"
        >
          <li class="pl-c-tools__item">
            <pl-toggle-info></pl-toggle-info>
          </li>

          <li class="pl-c-tools__item">
            <pl-toggle-layout text="Switch Layout"></pl-toggle-layout>
          </li>
          <li class="pl-c-tools__item">
            <pl-toggle-theme></pl-toggle-theme>
          </li>
          <li class="pl-c-tools__item">
            <pl-toggle-hidden-folders></pl-toggle-hidden-folders>
          </li>

          ${!this.ishControlsHide['views-new']
            ? html`
                <li class="pl-c-tools__item">
                  <pl-button
                    href="${this.currentUrl}"
                    target="_blank"
                    rel="noopener"
                    class="pl-js-open-new-window"
                  >
                    Open In New Tab
                    <pl-icon name="new-tab" slot="after"></pl-icon>
                  </pl-button>
                </li>
              `
            : ''}
          ${!this.ishControlsHide['tools-docs']
            ? html`
                <li class="pl-c-tools__item">
                  <pl-button
                    href="http://patternlab.io/docs/"
                    target="_blank"
                    rel="noopener"
                  >
                    Pattern Lab Docs
                    <pl-icon name="help" slot="after"></pl-icon>
                  </pl-button>
                </li>
              `
            : ''}
        </ul>
      </div>
    `;
  }
}
