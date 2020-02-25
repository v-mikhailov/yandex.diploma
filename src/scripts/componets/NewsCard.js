// Класс карточки новости
import { TRANSLATED_WORDS } from '../constants/TRANSLATED_WORDS';

export default class NewsCard {
  constructor(template) {
    this.template = template;
    this.renderCard = this.renderCard.bind(this);
  }
  
  renderCard(newsObj) {
    return this._fillTemplate(newsObj);
  }

  _fillTemplate(newsObj) {
    const cardTemplate = this.template.content.children.namedItem('js-card');
    const cardLink = cardTemplate.children.namedItem('js-link');
    cardLink.setAttribute('href', newsObj.url);
    cardLink.children.namedItem('js-img').setAttribute('src', newsObj.urlToImage);
    cardLink.children.namedItem('js-card-container').children.forEach(elem => {
      if (elem.className === 'card__date') {
        elem.textContent = this._switchDate(newsObj.publishedAt);
      }
      if (elem.className === 'card__title') {
        elem.textContent = newsObj.title;
      }
      if (elem.className ==='card__text') {
        elem.textContent = newsObj.description
      }
      if (elem.className === 'card__news-source') {
        elem.textContent = newsObj.source.name;
      }
    });
    return cardTemplate.cloneNode(true);
  }
  
  _switchDate(puplicationDate) {
    const date = puplicationDate.split('').slice(0, 10).join('').split('-');
    const switchedDate = [];
    date.map(function(item, index) {
      if (index === 0) {
        switchedDate.push(item);
      }
      if (index === 1) {
        switch(item) {
          case '01': item = `${TRANSLATED_WORDS.months.jan},`;
          switchedDate.unshift(item);
          break;
          case '02': item = `${TRANSLATED_WORDS.months.feb},`;
          switchedDate.unshift(item);
          break;
          case '03': item = `${TRANSLATED_WORDS.months.mar},`;
          switchedDate.unshift(item);
          break;
          case '04': item = `${TRANSLATED_WORDS.months.apr},`;
          switchedDate.unshift(item);
          break;
          case '05': item = `${TRANSLATED_WORDS.months.may},`;
          switchedDate.unshift(item);
          break;
          case '06': item = `${TRANSLATED_WORDS.months.jun},`;
          switchedDate.unshift(item);
          break;
          case '07': item = `${TRANSLATED_WORDS.months.jul},`;
          switchedDate.unshift(item);
          break;
          case '08': item = `${TRANSLATED_WORDS.months.aug},`;
          switchedDate.unshift(item);
          break;
          case '09': item = `${TRANSLATED_WORDS.months.sep},`;
          switchedDate.unshift(item);
          break;
          case '10': item = `${TRANSLATED_WORDS.months.oct},`;
          switchedDate.unshift(item);
          break;
          case '11': item = `${TRANSLATED_WORDS.months.nov},`;
          switchedDate.unshift(item);
          break;
          case '12': item = `${TRANSLATED_WORDS.months.dec},`;
          switchedDate.unshift(item);
          break;
        }
      }
      if (index === 2) {
        if (item[0] === '0') {
          const day =  item.split('').pop();
          switchedDate.unshift(day)
        } else {
          switchedDate.unshift(item);
        }
      }
    })
    return switchedDate.join(' ');
  }
}