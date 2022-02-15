import Vue from "vue";
import { Segment, VueCompositionAPI, VueI18n } from "@/ExternalDependencies";

import "@/assets/css/index.css";

Vue.use(Segment, {
  id: process.env.VUE_APP_SEGMENT,
  pageCategory: "ps_accounts-ui",
  debug: true,
});

Vue.use(VueCompositionAPI);

Vue.use(VueI18n);
