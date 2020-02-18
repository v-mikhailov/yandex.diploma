// Конструктор класса принимает колбэк-функцию, исполняемую при сабмите формы поиска.
// В колбэк-функции описывается взаимодействие с API, списком карточек и локальным браузерным хранилищем.
// Полученные от NewsAPI данные должны приводить к обновлению хранилища, а список карточек отображать полученные данные на странице.
// Кроме этого у класса SearchInput должны быть методы для валидации формы поиска и методы, управляющие работой кнопки сабмита.

import { NEWS_API_KEY } from '../constants/NEWS_API_KEY';
import { getCurrentDate } from '../utils/getCurrentDate';
import { getPreviousDate } from '../utils/getPreviousDate';

export default class SearchInput {

  constructor(domElement, dependencies = {}) {
    this.domElement = domElement;
    this.dependencies = dependencies;

    this.addEventListener = this.addEventListener.bind(this);
    this.getFormValue = this.getFormValue.bind(this);
    this.activateError = this.activateError.bind(this);

    if (this.dependencies.Validation) {
      this.validation = new this.dependencies.Validation(this.domElement);
    }
    if (this.dependencies.DataStorage) {
      this.dataStorage = new this.dependencies.DataStorage();
    }
  }

  addEventListener(...args) {
    this.domElement.addEventListener(...args);
  }

  async saveApiData() {
    try {
      const title = this.getFormValue();
      if (this.dependencies.NewsApi && title !== false) {
        const newsApi =  new this.dependencies.NewsApi(NEWS_API_KEY, title, getPreviousDate(7), getCurrentDate());
        this.activatePreloader();
        const newsList = await newsApi.getNews();
        if (newsList.totalResults === 0) {
          this.activateNotFound();
          this.deactivatePreloader();
        } else {
          this.dataStorage.save(title, newsList);
          this.clearInput(); 
          this.deactivatePreloader()
        }
      } else {
        this.activateError();
        throw new Error('пустой запрос');
      }
    } catch (error) {
      this.deactivatePreloader();
      throw new Error(error);
    }
  }

  getFormValue() {
    this.deactivateError()
    const result = this.validation.sendForm();
    if (!result) {
      return false;
    } else {
      this.dataStorage.deletePreviousData();
      return result;
    }
  }

  clearInput() {
    this.domElement.elements.query.value = '';
  }

  activateError() {
    const error = document.querySelector('.error-message')
    error.classList.add('error-message_active')
  }

  deactivateError() {
    const error = document.querySelector('.error-message')
    error.classList.remove('error-message_active')
  }

  activateNotFound() {
    const notFound = document.querySelector('.not-found');
    notFound.classList.add('not-found_active');
  }

  deactivateNotfount() {
    const notFound = document.querySelector('.not-found');
    notFound.classList.remove('not-found_active');
  }

  activatePreloader() {
    const preloader = document.querySelector('.loading')
    preloader.classList.add('loading_active')
  }
  deactivatePreloader() {
    const preloader = document.querySelector('.loading')
    preloader.classList.remove('loading_active')
  }
}