import type { Meta, StoryObj } from '@storybook/vue3';
import BaseOverlay from './BaseOverlay.vue';

const meta: Meta<typeof BaseOverlay> = {
  title: 'Components/BaseOverlay',
  component: BaseOverlay
};

export default meta;
type Story = StoryObj<typeof BaseOverlay>;

export const Default: Story = {
  args: {
    default: 'Overlay content',
    show: true
  }
};
