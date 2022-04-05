module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Floating Action Buttons LI',
  type: 'object',
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal attributes object. Applies extra HTML attributes to the parent element.',
    },
    content: {
      type: 'any',
      description:
        'Renders a button (icon-only button with tooltip is recommended). Use the Button element or the floating-action-buttons-toggle-button.twig template.',
    },
    children: {
      type: 'any',
      description:
        'Renders a list of secondary buttons. Use the floating-action-buttons-ul.twig template to render a list. Only use this prop if the floating-action-buttons-toggle-button.twig template is used for the content prop.',
    },
    show_on_scroll_selector: {
      type: 'string',
      description:
        'This will leave the list item hidden until the page is scrolled to to show then hide a certain element (ie. "h1").',
    },
  },
};
