/* eslint-disable @typescript-eslint/no-explicit-any */
import { select, Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import * as vi from "../../assets/i18n/vi-VN.json";
import * as en from "../../assets/i18n/en-US.json";
import * as jp from "../../assets/i18n/ja-JP.json";
import { AppState, getLang } from "../state/selectors";

@Injectable()
export class TranslateService {
  currentLang = "";
  constructor(store?: Store<AppState>) {
    this.currentLang = localStorage.getItem("lang") || "en_US";
    store.pipe(select(getLang)).subscribe((lang) => {
      this.currentLang = lang || "en_US";
      console.log(this.currentLang);
    });
  }
  captions: Record<string, any> = {
    vi_VN: vi,
    en_US: en,
    ja_JP: jp,
  };

  /**
   * Translate web by lang
   *
   * @param {string} value
   * @returns {string} translated value
   * @memberof TranslationService
   */
  translate(value: string): string {
    const code = (value || "").toLowerCase();
    const captionI18n = this.captions[this.currentLang];
    if (captionI18n) {
      const result = this.deepFind(captionI18n, code);
      return result || code;
    } else {
      return code;
    }
  }

  private deepFind(data: any, code: string) {
    const paths = code.split(".");
    let current = data;

    for (let i = 0; i < paths.length; ++i) {
      if (current[paths[i]] === undefined) {
        return undefined;
      } else {
        current = current[paths[i]];
      }
    }
    return current;
  }
}
