import type { Meta, StoryObj } from '@storybook/vue3';
import AlertModuleDependencies from './AlertModuleDependencies.vue';

const meta: Meta<typeof AlertModuleDependencies> = {
  title: 'Components/Alert/ModuleDependencies',
  component: AlertModuleDependencies
};

export default meta;
type Story = StoryObj<typeof AlertModuleDependencies>;

export const PsAccountsIsNotInstalled: Story = {
  args: {
    psAccountsIsInstalled: false,
    psAccountsIsEnabled: false,
    psAccountsIsUptodate: false
  }
};

export const PsAccountsIsNotEnabled: Story = {
  args: {
    psAccountsIsInstalled: true,
    psAccountsIsEnabled: false,
    psAccountsIsUptodate: false
  }
};

export const PsAccountsIsNotUpdated: Story = {
  args: {
    psAccountsIsInstalled: true,
    psAccountsIsEnabled: true,
    psAccountsIsUptodate: false
  }
};
