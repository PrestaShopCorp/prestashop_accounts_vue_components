import {BAlert, BButton, BLink} from 'bootstrap-vue';
import i18n from '@/locale';

export default {
  i18n,
  components: {
    BAlert,
    BButton,
    BLink,
  },
  props: {
    link: {
      type: String,
      required: true,
    },
    psIs17: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
};
