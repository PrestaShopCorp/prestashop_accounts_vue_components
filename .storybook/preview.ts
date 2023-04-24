import { i18n } from './../src/locales/index';
import { ScopedCss } from "./decorators/scoped-css";
import "@/assets/css/index.css";
import { setup } from "@storybook/vue3"

setup((app) => {
  app.use(i18n);
})


export const decorators = [
  ScopedCss,
  () => {
    return {
      template: `<story />`,
    };
  },
];
