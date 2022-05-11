import Vue from "vue";
import { ScopedCss  } from "./decorators/scoped-css";
import { Segment, VueI18n } from "@/ExternalDependencies";
import i18n from '@/i18n';

import "@/assets/css/index.css";

Vue.use(Segment, {
  id: process.env.VUE_APP_SEGMENT,
  pageCategory: "ps_accounts-ui",
  debug: true,
});

Vue.use(VueI18n);

export const decorators = [
  ScopedCss,
  () => {
    return {
      i18n: i18n(),
      template: `<story />`,
    };
  },
];
