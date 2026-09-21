import type { StorybookConfig } from '@storybook/nextjs-vite';
import postcss from 'postcss';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  framework: { name: '@storybook/nextjs-vite', options: {} },
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  core: { disableTelemetry: true },
  async viteFinal(config) {
    // Scope the original production CSS for Docs. Never fork component styles.
    config.plugins = [
      ...(config.plugins ?? []),
      {
        name: 'scope-production-styles-to-story',
        enforce: 'pre',
        transform(source, id) {
          if (!/\/src\/styles\/(base|components|layout)\.css$/.test(id)) return;
          const root = postcss.parse(source);
          root.walkRules((rule) => {
            if (rule.parent?.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return;
            rule.selectors = rule.selectors.map((selector) =>
              selector === 'html' || selector === 'body'
                ? ':where(.project-preview)'
                : `:where(.project-preview) ${selector}`,
            );
          });
          return { code: root.toString(), map: null };
        },
      },
    ];
    return config;
  },
};
export default config;
