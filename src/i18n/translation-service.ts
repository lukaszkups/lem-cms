import fs from 'node:fs';
import path from 'node:path';
import { App } from 'vue';

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string) => string;
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
    this.locale = props?.locale || 'en';
    this.dict = {};
  }

  loadTranslations = (): void => {
    try {
      const file = fs.readFileSync(path.join(process.cwd(), `/public/i18n/${this.locale}.json`), 'utf-8');
      this.dict = JSON.parse((file && file.length ? file : '{}'));
      console.log('Dict loaded: ', this.dict);
    } catch (err) {
      console.error('There was an issue when loading translations: ', err);
      throw new Error();
    }
  };

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
      console.log(1, translationPropsArr);
      translationPropsArr.forEach((item: string, index: number) => {
        console.log(2, item, index, this.dict[item], currentTranslationObj);
        if (index === 0) {
          currentTranslationObj = this.dict[item];
        } else {
          console.log(currentTranslationObj, currentTranslationObj[item])
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
  }
}
