import { createI18n } from 'vue-i18n';
import de from '../locales/de.json';
import en from '../locales/en.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import it from '../locales/it.json';
import nl from '../locales/nl.json';
import pl from '../locales/pl.json';
import pt from '../locales/pt.json';
import ro from '../locales/ro.json';

const i18n = createI18n({
  locale: window.iso_user,
  fallbackLocale: 'en',
  legacy: false,
  messages: {
    de,
    en,
    es,
    fr,
    it,
    nl,
    pl,
    pt,
    ro
  }
});

export const useLocale = () => i18n.global;
