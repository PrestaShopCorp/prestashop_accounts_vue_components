import {BAlert, BButton, BLink} from 'bootstrap-vue';
import Locale from '@/mixins/locale';

export default {
  components: {
    BAlert,
    BButton,
    BLink,
  },
  mixins: [Locale],
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
