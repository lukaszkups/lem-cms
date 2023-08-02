import { App } from 'vue';
import { getCurrentWindow } from '@electron/remote';
import enDict from './en.json';
import plDict from './pl.json';

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string) => string;
    $i18n: TranslationService;
  }
}

interface Keyable {
  [key: string]: Keyable | string;
}

interface TranslationServiceProps {
  locale?: string;
  dict: Keyable;
}

export class TranslationService {
  locale: string;
  dict: Keyable;

  constructor(props?: TranslationServiceProps) {
    this.locale = props?.locale || sessionStorage.getItem('locale') || 'en';
    this.dict = {};
    sessionStorage.setItem('locale', this.locale);
  }

  loadTranslations = (): void => {
    switch (this.locale) {
      case 'pl':
        this.dict = plDict;
        break;
      default:
        this.dict = enDict;
        break;
    }
    console.log('Dict loaded: ', this.dict);
  };

  changeLanguage = (newLocale: string): void => {
    this.locale = newLocale || 'en';
    sessionStorage.setItem('locale', this.locale);
    this.loadTranslations();
    location.reload();
  }

  $t = (translationKey: string): string => {
    const translationPropsArr = translationKey.split('.');
    if (!translationPropsArr || translationPropsArr.length === 1) {
      return translationKey;
    } else if (translationPropsArr && translationPropsArr.length) {
      if (translationPropsArr.length === 1) {
        if (this.dict[translationPropsArr[0]]) {
          return this.dict[translationPropsArr[0]] as string;
        } else {
          return translationKey;
        }
      }
      let currentTranslationObj: any;
      translationPropsArr.forEach((item: string, index: number) => {
        if (index === 0) {
          currentTranslationObj = this.dict[item];
        } else {
          currentTranslationObj = currentTranslationObj[item];
        }
      });
      return currentTranslationObj;
    } else {
      return translationKey;
    }
  }
};

export default {
  install: (app: App<any>) => {
    const i18n = new TranslationService();
    i18n.loadTranslations();
    app.config.globalProperties.$t = (key: string) => {
      return i18n.$t(key);
    }
    app.provide('$t', i18n.$t);

    app.config.globalProperties.$i18n = i18n;
    app.provide('$i18n', i18n);
  }
}
