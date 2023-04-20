import { createI18n } from "vue-i18n";
import de from "./de.json";
import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";
import it from "./it.json";
import nl from "./nl.json";
import pl from "./pl.json";
import pt from "./pt.json";
import ro from "./ro.json";

export const i18n = createI18n({
  fallbackLocale: "en",
  locale: window?.iso_user || "en",
  messages: {
    de,
    en,
    es,
    fr,
    it,
    nl,
    pl,
    pt,
    ro,
  },
});
