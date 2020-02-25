// Класс, отвечающий за логику работы графиков со статистикой на странице аналитики.
// Конструктор класса получает объект, содержащий текущее состояние локального браузерного хранилища.
import { getPreviousDate } from '../utils/getPreviousDate';
import { TRANSLATED_WORDS } from '../constants/TRANSLATED_WORDS';

export default class Statistics {
  constructor(dataStorage) {  
    this.dataStorage = dataStorage;
    this.allNews = this.dataStorage.getSavedNews();
    this.savedTitle = this.dataStorage.getSavedTitle()
    this.datesOfWeek = [];
  }

  renderStatistics() {
    this._renderTitleBlock();
    this._renderDateColumn()
    this._renderWeekStat()
  }

  _renderTitleBlock() {
    const newsContainer = document.querySelector('.news__container');
    const title = this.savedTitle[0].toUpperCase() + this.savedTitle.slice(1);
    const titleBlock = document.querySelector('#js-title-block').content;

    titleBlock.children.namedItem('js-news').textContent = `«${title}»`;
    titleBlock.children.namedItem('js-week').children.namedItem('js-news-for-week').innerText = this.dataStorage.getSavedNewsCount();
    titleBlock.children.namedItem('js-mention').children.namedItem('js-key-words').innerText = this._countKeyWord(this.allNews);
    newsContainer.append(titleBlock.cloneNode(true));
  }

  _renderDateColumn() {
    const week = document.querySelector('#js-week-ul');
    const days = document.querySelector('#js-week-days').content;
    for (let i = 0; i < 7; i++) {
      days.children[i].textContent = this._switchDateFormat(i)
    }
    week.append(days.cloneNode(true));
  }

  _renderWeekStat() {
    const tableData = document.querySelector('#js-table-data');
    const newsCountLiTempl = document.querySelector('#js-news-count').content;
    const datesArr = [];
    this.datesOfWeek.forEach(elem => {
      if (elem.length === 1) {
        elem = '0' + elem[0];
        datesArr.push(elem)
      } else {
        datesArr.push(elem);
      }
    })
    this._calcProportion(datesArr, newsCountLiTempl);
    tableData.append(newsCountLiTempl.cloneNode(true));
  } 

  _calcProportion(arr, template) {
    let totalAmount = 0;
    arr.forEach((elem, index ) => {
      const amount = this._setCellData(elem, template.children[index])
      totalAmount = totalAmount + amount;
    })
    template.children.forEach(elem => {
      const percent = (elem.textContent / totalAmount) * 100;
      elem.style.width = `${percent}%`;
   })
  }

  _countKeyWord(newsArr, isDescr) {
    let counter = 0;
    newsArr.forEach((elem) => {
      if (elem.title !== null) {
        if (elem.title.toLowerCase().includes(this.savedTitle.toLowerCase())) {
          counter++;
        }
      }
      if(isDescr) {
        if(elem.description !== null) {
          if (elem.description.toLowerCase().includes(this.savedTitle.toLowerCase())) {
            counter++;
          }
        }
      }
    });
    return counter;
  }

  _switchDateFormat(i) {
    const date = getPreviousDate(i, true);
    const rusDayOfWeek = this._translateDayOfWeek(date.getDay());
    const day = date.getDate();
    this.datesOfWeek.push(`${day}`);
    return `${day}, ${rusDayOfWeek}`
  }

  _translateDayOfWeek(dayOfWeek) {
    switch(dayOfWeek) {
      case 0: return TRANSLATED_WORDS.week.sun;
      case 1: return TRANSLATED_WORDS.week.mon;
      case 2: return TRANSLATED_WORDS.week.tue;
      case 3: return TRANSLATED_WORDS.week.wed;
      case 4: return TRANSLATED_WORDS.week.thu;
      case 5: return TRANSLATED_WORDS.week.fri;
      case 6: return TRANSLATED_WORDS.week.sat;
    }
  }

  _setCellData(elem, template) {
    const mention = this._dataForSpecificDay(elem, this.allNews);
    template.textContent = mention;
    return mention;
  }

  _dataForSpecificDay(day, newsArr) {
    let keyWordCounter = 0;
    newsArr.forEach(news => {
      const newsDate = news.publishedAt.toString().split('').splice(8,2).join('');
      if (newsDate.toString() === day.toString()) {
        const title = this._countKeyWord([news], true);
        keyWordCounter = keyWordCounter + title;
      }
    })
    return keyWordCounter
  }
}