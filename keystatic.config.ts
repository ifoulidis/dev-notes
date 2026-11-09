import { collection, config, fields } from '@keystatic/core';
import { wrapper } from '@keystatic/core/content-components';

/** Where posts live. Keep in sync with the glob loader in src/content.config.ts. */
const POSTS = 'src/content/posts/*';

/**
 * Post images go in `src/assets/posts/<post>/` and are written relative to the post file
 * (`src/content/posts/<post>.mdx`), so Astro finds and optimises them.
 */
const IMAGES = { directory: 'src/assets/posts', publicPath: '../../assets/posts/' };

export default config({
  // Edits are written straight to the working tree; commit them like any other change.
  storage: { kind: 'local' },
  ui: { brand: { name: "Isaiah's Dev Notes" } },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: POSTS,
      entryLayout: 'content',
      format: { contentField: 'body' },
      columns: ['title', 'date'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        date: fields.date({ label: 'Published', defaultValue: { kind: 'today' }, validation: { isRequired: true } }),
        cover: fields.image({ label: 'Cover image', ...IMAGES }),
        draft: fields.checkbox({ label: 'Draft', description: 'Drafts only show in `npm run dev`.' }),
        body: fields.mdx({
          label: 'Body',
          options: { image: IMAGES },
          components: {
            RevealingButton: wrapper({
              label: 'Revealing button',
              description: 'A collapsible section (e.g. References) with a button to show it.',
              schema: { title: fields.text({ label: 'Button text', validation: { isRequired: true } }) },
            }),
          },
        }),
      },
    }),
  },
});
