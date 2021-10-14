module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  title: 'Ordered List',
  type: 'object',
  required: ['items'],
  properties: {
    attributes: {
      type: 'object',
      description:
        'A Drupal-style attributes object with extra attributes to append to this component.',
    },
    contentItems: {
      type: 'array',
      title: 'DEPRECATED',
      description: 'Use the items prop instead.',
      items: {
        type: 'object',
        description:
          'A single list item object with either a `text` or `contentItems` key',
        properties: {
          text: {
            type: 'string',
          },
          contentItems: {
            type: 'object',
            description: 'Passes to `@bolt-components-text/text.twig`',
          },
        },
      },
    },
    items: {
      type: 'array',
      description: 'All items can be simple text or `items`.',
      items: {
        type: ['string', 'object', 'array'],
        description:
          'Renderable content (i.e. a string, render array, or included pattern) for a single list item.',
      },
    },
  },
};
