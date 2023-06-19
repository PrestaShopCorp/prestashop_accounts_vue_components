import { ScopedCss } from "./decorators/scoped-css";
import "@/assets/css/index.css";

export const decorators = [
  ScopedCss,
  () => {
    return {
      template: `<story />`,
    };
  },
];
