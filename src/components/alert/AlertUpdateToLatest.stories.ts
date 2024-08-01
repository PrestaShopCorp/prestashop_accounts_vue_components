import type { Meta, StoryObj } from '@storybook/vue3';

import AlertUpdateToLatest from './AlertUpdateToLatest.vue';

const meta: Meta<typeof AlertUpdateToLatest> = {
  title: 'Components/Alert/UpdateToLatest',
  component: AlertUpdateToLatest
};

export default meta;
type Story = StoryObj<typeof AlertUpdateToLatest>;

export const Default: Story = {};
