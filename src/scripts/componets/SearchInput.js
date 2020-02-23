// Конструктор класса принимает колбэк-функцию, исполняемую при сабмите формы поиска.
// В колбэк-функции описывается взаимодействие с API, списком карточек и локальным браузерным хранилищем.
// Полученные от NewsAPI данные должны приводить к обновлению хранилища, а список карточек отображать полученные данные на странице.
// Кроме этого у класса SearchInput должны быть методы для валидации формы поиска и методы, управляющие работой кнопки сабмита.

import { ERROR_MESSAGES } from '../constants/ERROR_MESSAGES';

export default class SearchInput {
  constructor(domElement, newsCardList, validation, newsApi, dataStorage) {
    this.domElement = domElement;
    this.newsCardList = newsCardList;
    this.validation = validation;
    this.newsApi = newsApi;
    this.dataStorage = dataStorage;
    this.renderNewsCard = this.renderNewsCard.bind(this);
  }

  addEventListener(...args) {
    this.domElement.addEventListener(...args);
  }

  renderNewsCard() {
    event.preventDefault();
    const keyWord = this._getFormValue();
    if (keyWord) {
      this._toggleNotFoundblock(false);
      this.newsCardList.hideList();
      this._togglePreloaderBlock(true);
      this._toggleForm(false);
      this._saveApiData(keyWord);
    }
  }

  async _saveApiData(keyWord) {
      try {
        const result = await this.newsApi.getNews(keyWord);
        if (result && result.totalResults !== 0) {
          this.dataStorage.save(keyWord, result);
          this.newsCardList.renderList(false);
        } else {
          this._toggleNotFoundblock(true, false);
        }
      } catch (err) {
        console.error(err);
        this._toggleNotFoundblock(true, true);
      } finally {
        this._togglePreloaderBlock(false);
        this._toggleForm(true);
      }
  }

  _getFormValue() {
    this._toggleErrorBlock(false);
    const result = this.validation.sendForm();
    if (!result) {
      this._toggleErrorBlock(true);
    } else {
      this.dataStorage.deletePreviousData();
    }
    this._clearInput();
    return result;
  }

  _toggleErrorBlock(isActivated) {
    if (isActivated) {
      const validateErrorTemplate = document.querySelector('#js-error-message').content;
      this.domElement.before(validateErrorTemplate.cloneNode(true));
    } else {
      if (this.domElement.previousElementSibling.classList.contains('error-message')) {
        this.domElement.previousElementSibling.remove();
      }
    }
  }

  _togglePreloaderBlock(isActivated) {
    const preloaderBlock = document.querySelector('#js-loading-block');
    if (isActivated) {
      const preloaderTemplate = document.querySelector('#js-loading').content;
      preloaderBlock.append(preloaderTemplate.cloneNode(true));
    } else {
      preloaderBlock.firstElementChild.remove();
    }
  }

  _toggleForm(isActivated) {
    if(isActivated) {
      this.domElement.elements.namedItem('js-bttn').disabled = false;
    } else {
      this.domElement.elements.namedItem('js-bttn').disabled = true;
    }
  }

  _toggleNotFoundblock(isActivated, isServerIssue) {
    const notFoundBlock = document.querySelector('#js-not-found-block');
    if (isActivated) {
      const notFoundBlockTemplate = document.querySelector('#js-not-found').content;
      if (isServerIssue) {
        notFoundBlockTemplate.children.namedItem('js-not-found-container').children.namedItem('js-not-found-title').textContent = ERROR_MESSAGES.userErrors.disconect.title;
        notFoundBlockTemplate.children.namedItem('js-not-found-container').children.namedItem('js-not-found-text').textContent = ERROR_MESSAGES.userErrors.disconect.text;
      } else {
        notFoundBlockTemplate.children.namedItem('js-not-found-container').children.namedItem('js-not-found-title').textContent =  ERROR_MESSAGES.userErrors.notfound.title;
        notFoundBlockTemplate.children.namedItem('js-not-found-container').children.namedItem('js-not-found-text').textContent =  ERROR_MESSAGES.userErrors.notfound.text;
      }
      notFoundBlock.append(notFoundBlockTemplate.cloneNode(true));
    } else {
      if (notFoundBlock.firstElementChild) {
        notFoundBlock.firstElementChild.remove();
      }
    }
  }

  _clearInput() {
    this.domElement.elements.query.value = '';
  }
}