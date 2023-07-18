import type { Meta, StoryObj } from '@storybook/vue3';

import AlertShopUrlShouldExists from './AlertShopUrlShouldExists.vue';

const meta: Meta<typeof AlertShopUrlShouldExists> = {
  title: 'Components/Alert/ShopUrlShouldExists',
  component: AlertShopUrlShouldExists
};

export default meta;
type Story = StoryObj<typeof AlertShopUrlShouldExists>;

export const Default: Story = {
  args: {
    shopsWithoutUrl: ['Shop 1', 'Shop 2']
  }
};
