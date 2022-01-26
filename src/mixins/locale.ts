// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {t} from '@/locale';

export default {
  methods: {
    t(...args) {
      return t.apply(this, args);
    },
  },
};
