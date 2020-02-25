// класс карточки коммитов
import { TRANSLATED_WORDS } from '../constants/TRANSLATED_WORDS';

export default class CommitCard {
  constructor(template) {
    this.template = template;
  }

  renderCard(apiData) {
    return this.fillTemplate(apiData);
  }

  fillTemplate(gitHubData) {
    const gitCard = this.template.content.children.namedItem('js-card');
    const link = gitCard.children.namedItem('js-link');
    link.setAttribute('href', gitHubData.commit.url);
    link.children.namedItem('js-date').innerText = this._switchDate(gitHubData.commit.committer.date);
    link.children.namedItem('js-container').children.namedItem('js-pic').setAttribute('src', gitHubData.author.avatar_url);
    link.children.namedItem('js-container').children.namedItem('js-name-container').children.namedItem('js-name').innerText = gitHubData.commit.committer.name;
    link.children.namedItem('js-container').children.namedItem('js-name-container').children.namedItem('js-email').innerText = gitHubData.commit.committer.email;
    link.children.namedItem('js-text').textContent = gitHubData.commit.message;
   
    return gitCard.cloneNode(true);
  }

  _switchDate(commitedDate) {
    const date = commitedDate.split('').slice(0, 10).join('').split('-');
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
