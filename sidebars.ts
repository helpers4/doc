import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    'getting-started',
    {
      type: 'category',
      label: 'API Reference',
      items: [
        {
          type: 'category',
          label: 'Array Helpers',
          items: [
            'api/array/array-equals',
            'api/array/chunk',
            'api/array/difference',
            'api/array/intersection',
            'api/array/one-in-common',
            'api/array/sort',
            'api/array/unique',
          ],
        },
        {
          type: 'category',
          label: 'Function Helpers',
          items: [
            'api/function/debounce',
            'api/function/is-defined-and-not-null',
            'api/function/memoize',
            'api/function/return-or-throw-error',
            'api/function/throttle',
          ],
        },
        {
          type: 'category',
          label: 'Object Helpers',
          items: [
            'api/object/deep-clone',
            'api/object/deep-merge',
            'api/object/get',
            'api/object/remove-undefined-null',
            'api/object/set',
          ],
        },
        {
          type: 'category',
          label: 'Promise Helpers',
          items: [
            'api/promise/console-log-promise',
            'api/promise/delay',
            'api/promise/falsy-promise-or-throw',
            'api/promise/meaning-promise-or-throw',
            'api/promise/retry',
            'api/promise/truthy-promise-or-throw',
          ],
        },
        {
          type: 'category',
          label: 'String Helpers',
          items: [
            'api/string/camel-case',
            'api/string/capitalize',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examples/basic-usage',
        'examples/tree-shaking',
        'examples/migration',
      ],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
