// Класс, отвечающий за логику работы графиков со статистикой на странице аналитики.
// Конструктор класса получает объект, содержащий текущее состояние локального браузерного хранилища.

export default class Statistics {
  constructor(titleBlock, dependencies = {}, utils = []) {
    this.titleBlock = titleBlock;
    this.dependencies = dependencies;
    this.week = document.querySelector('#js-week');
    this.tableData = document.querySelector('#js-table-data');
    this.getPreviousDate = utils[0];
    if (this.dependencies.DataStorage) {
      this.dataStorage = new this.dependencies.DataStorage();
    }


    this.allNews = this.dataStorage.getSavedNews();
    this.savedTitle = this.dataStorage.getSavedTitle()

    this.datesOfWeek = [];
  }

  renderStatistics() {
    this._addTitle();
    this._addSubtitle()
    this._renderDateColumn()
    this._renderWeekStat()
  }

  _addTitle() {
    const title = this.savedTitle[0].toUpperCase() + this.savedTitle.slice(1);
    this.titleBlock.textContent = `«${title}»`;
  }

  _addSubtitle() {
    this.titleBlock.nextElementSibling.firstElementChild.textContent = this.dataStorage.getSavedNewsCount();
    this.titleBlock.nextElementSibling.nextElementSibling.firstElementChild.textContent = this._countKeyWord(this.allNews);
  }

  _renderDateColumn() {
    for (let i = 0; i < 7; i++) {
      const innerTextDay = this._switchDateFormat(i);
      this.week.children[i].textContent = innerTextDay; 
    }
  }

  _renderWeekStat() {
    const datesArr = [];
    this.datesOfWeek.forEach(elem => {
      if (elem.length === 1) {
        elem = '0' + elem[0];
        datesArr.push(elem)
      } else {
        datesArr.push(elem);
      }
    })
    this._calcProportion(datesArr);
  } 

  _calcProportion(arr) {
    let totalAmount = 0;
    arr.forEach((elem, index ) => {
      const amount = this._setCellData(elem, index)
      totalAmount = totalAmount + amount;
    })
    this.tableData.children.forEach(elem => {
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
    const date = this.getPreviousDate(i, true);
    const dayOfWeek = date.getDay()
    const rusDayOfWeek = this._translateDayOfWeek(dayOfWeek);
    const day = date.getDate();
    this.datesOfWeek.push(`${day}`);
    return `${day}, ${rusDayOfWeek}`
  }

  _translateDayOfWeek(dayOfWeek) {
    switch(dayOfWeek) {
      case 0: return 'вс';
      case 1: return 'пн';
      case 2: return 'вт';
      case 3: return 'ср';
      case 4: return 'чт';
      case 5: return 'пт';
      case 6: return 'сб';
    }
  }

  _setCellData(elem, index) {
    const mention = this._dataForSpecificDay(elem, this.allNews);
    this.tableData.children[index].textContent = mention;
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