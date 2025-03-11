import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    'stories' : ['../src/components/**/*.stories.@(ts|tsx)'],
    'addons'  : [
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/experimental-addon-test',
        '@storybook/addon-a11y'
    ],
    'framework' : {
        'name'    : '@storybook/react-vite',
        'options' : {}
    },
    staticDirs : ['../public']
};
export default config;