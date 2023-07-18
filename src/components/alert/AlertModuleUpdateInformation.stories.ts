import type { Meta, StoryObj } from '@storybook/vue3';

import AlertModuleUpdateInformation from './AlertModuleUpdateInformation.vue';

const meta: Meta<typeof AlertModuleUpdateInformation> = {
  title: 'Components/Alert/ModuleUpdateInformation',
  component: AlertModuleUpdateInformation
};

export default meta;
type Story = StoryObj<typeof AlertModuleUpdateInformation>;

export const Default: Story = {};
