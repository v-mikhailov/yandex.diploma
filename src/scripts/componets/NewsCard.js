// Класс карточки новости

export default class NewsCard {
  constructor(template) {
    this.template = template;
  }
  renderCard(newsObj) {
    const card = document.createElement('div');
    card.className = 'card';
    card.append(this.fillTemplate(newsObj).content.cloneNode(true));
    return card;
  }

  fillTemplate(newsObj) {
    const cardLink = this.template.content.firstElementChild;
    cardLink.setAttribute('href', newsObj.url);
    const imgSrc = cardLink.firstElementChild;
    imgSrc.setAttribute('src', newsObj.urlToImage);
    cardLink.children[1].children.forEach(elem => {
      if (elem.className === 'card__date') {
        elem.textContent = this.switchDate(newsObj.publishedAt);
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
    return this.template;
  }
  
// toDo сделать базовый класс для карточке, добавить все манипуляции с датами или сдлеать общние функции.
  switchDate(puplicationDate) {
    const date = puplicationDate.split('').slice(0, 10).join('').split('-');
    const switchedDate = [];
    date.map(function(item, index) {
      if (index === 0) {
        switchedDate.push(item);
      }
      if (index === 1) {
        switch(item) {
          case '01': item = 'января,';
          switchedDate.unshift(item);
          break;
          case '02': item = 'февраля,';
          switchedDate.unshift(item);
          break;
          case '03': item = 'марта,';
          switchedDate.unshift(item);
          break;
          case '04': item = 'апреля,';
          switchedDate.unshift(item);
          break;
          case '05': item = 'мая,';
          switchedDate.unshift(item);
          break;
          case '06': item = 'июня,';
          switchedDate.unshift(item);
          break;
          case '07': item = 'июля,';
          switchedDate.unshift(item);
          break;
          case '08': item = 'августа,';
          switchedDate.unshift(item);
          break;
          case '09': item = 'сентября,';
          switchedDate.unshift(item);
          break;
          case '10': item = 'октября,';
          switchedDate.unshift(item);
          break;
          case '11': item = 'ноября,';
          switchedDate.unshift(item);
          break;
          case '12': item = 'декабря,';
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