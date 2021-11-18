import {BAlert, BButton, BLink} from 'bootstrap-vue';

export default {
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
