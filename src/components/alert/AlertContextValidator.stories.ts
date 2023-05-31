import type { Meta, StoryObj } from '@storybook/vue3';
import AlertContextValidator from './AlertContextValidator.vue';

const meta: Meta<typeof AlertContextValidator> = {
  title: 'Components/Alert/ContextValidator',
  component: AlertContextValidator
};

export default meta;
type Story = StoryObj<typeof AlertContextValidator>;

export const Default: Story = {
  args: {
    errors: ['psIs17 is required']
  }
};
