import type { Meta, StoryObj } from '@storybook/vue3';
import AlertUserNotSuperAdmin from './AlertUserNotSuperAdmin.vue';

const meta: Meta<typeof AlertUserNotSuperAdmin> = {
  title: 'Components/Alert/UserNotSuperAdmin',
  component: AlertUserNotSuperAdmin
};

export default meta;
type Story = StoryObj<typeof AlertUserNotSuperAdmin>;

export const Default: Story = {
  args: {
    superAdminEmail: 'email@example.org'
  }
};
