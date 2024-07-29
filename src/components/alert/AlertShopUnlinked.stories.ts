import AlertShopUnlinked from '@/components/alert/AlertShopUnlinked.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof AlertShopUnlinked> = {
  title: 'Components/Alert/AlertShopUnlinked',
  component: AlertShopUnlinked
};

export default meta;
type Story = StoryObj<typeof AlertShopUnlinked>;

export const Default: Story = {
  args: {}
};
