import { config } from '@vue/test-utils';

config.global.mocks = {
  $t: (msg: string) => msg,
  $tc: (msg: string, count: number) => msg
};
