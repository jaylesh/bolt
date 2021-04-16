import { render, renderString } from '@bolt/twig-renderer';
// import { basicTest } from '../../../testing/testing-helpers';

describe('Bolt Breadcrumb', () => {
  let linkOne, linkTwo;

  beforeAll(async () => {
    linkOne = await render('@bolt-components-link/link.twig', {
      text: 'Home',
      url: '#!',
    });
    linkTwo = await render('@bolt-components-link/link.twig', {
      text: 'Other Page',
      url: '#!',
    });
  });

  test('basic usage with attributes', async () => {
    const results = await render(
      '@bolt-components-breadcrumb/breadcrumb.twig',
      {
        contentItems: [linkOne.html, linkTwo.html],
        attributes: {
          'data-foobar': 'baz',
          'aria-role': 'list',
        },
      },
    );
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test('basic usage with contentItems including rendered components and strings', async () => {
    const results = await renderString(`
      {% include "@bolt-components-breadcrumb/breadcrumb.twig" with {
        contentItems: [
          include("@bolt-components-link/link.twig", {
            text: "Home",
            url: "#!"
          }),
          include("@bolt-components-link/link.twig", {
            text: "Landing Page",
            url: "#!"
          }),
          include("@bolt-components-link/link.twig", {
            text: "Sub Page",
            url: "#!"
          }),
          "Current Page"
        ]
      } only %}
    `);
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });

  test('current page aria variation', async () => {
    const results = await renderString(`
      {% include "@bolt-components-breadcrumb/breadcrumb.twig" with {
        contentItems: [
          include("@bolt-components-link/link.twig", {
            text: "Home",
            url: "#!"
          }),
          include("@bolt-components-link/link.twig", {
            text: "Landing Page",
            url: "#!"
          }),
          include("@bolt-components-link/link.twig", {
            text: "Sub Page",
            url: "#!"
          }),
          include("@bolt-components-link/link.twig", {
            text: "Current Page",
            url: "#!",
            attributes: {
              "aria-current": true
            },
          }),
        ]
      } only %}
    `);
    await expect(results.ok).toBe(true);
    await expect(results.html).toMatchSnapshot();
  });
});
