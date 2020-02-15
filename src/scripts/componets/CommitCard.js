// класс карточки коммитов

export default class CommitCard {
  constructor(template) {
    this.template = template;
  }

  renderCard(card) {
    const divCard = document.createElement('div');
    divCard.className = 'card';
    divCard.append(this.fillTemplate(card).cloneNode(true));
    return divCard;
  }

  fillTemplate(obj) {
    const template = this.template.content;
    const link = template.firstElementChild.setAttribute('href', obj.commit.url);
    const date  = template.firstElementChild.children[0].innerText = this._switchDate(obj.commit.committer.date);
    const pic = template.firstElementChild.children[1].children[0].setAttribute('src', obj.author.avatar_url);
    const name = template.firstElementChild.children[1].children[1].children[0].innerText = obj.commit.committer.name;
    const email = template.firstElementChild.children[1].children[1].children[1].innerText =  obj.commit.committer.email;
    const text = template.firstElementChild.children[2].textContent = obj.commit.message;
    return template
  }

  // toDo сделать базовый класс для карточки, добавить все манипуляции с датами или сдлеать общние функции.
  _switchDate(commitedDate) {
    const date = commitedDate.split('').slice(0, 10).join('').split('-');
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
