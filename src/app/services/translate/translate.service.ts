import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly LANG_KEY = 'SELECTED_LANGUAGE';

  constructor(private translate: TranslateService) {
    this.initTranslate();
  }

  initTranslate() {
    const savedLang = localStorage.getItem(this.LANG_KEY) || 'en'; // Idioma por defecto
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem(this.LANG_KEY, lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || 'en';
  }
}