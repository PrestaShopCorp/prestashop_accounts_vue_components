import Vue from "vue";
import { Segment, VueCompositionAPI, VueI18n } from "@/ExternalDependencies";

import "prestakit/scss/application.scss";

Vue.use(Segment, {
  id: process.env.VUE_APP_SEGMENT,
  pageCategory: "ps_accounts-ui",
  debug: true,
});

Vue.use(VueCompositionAPI);

Vue.use(VueI18n);
