
// класс списка карточек новостей

export default class NewsCardList {
  constructor(domElement, dataStorage, newsCard) {
    this.domElement = domElement;
    this.dataStorage = dataStorage;
    this.newsCard = newsCard;
    this._counter = 3; /* открыте новостных карточек по три штуки */

    this.renderList = this.renderList.bind(this);
    this.showMoreCards = this.showMoreCards.bind(this);
  }

  addEventListener(...args) {
    this.domElement.children.namedItem('show-more-bttn').addEventListener(...args);
  }

  renderList(isShowMoreBttn) {
    if (isShowMoreBttn) {
      this._counter += 3; // если нажание на кнопку, то открывается еще 3 карточки
    } else {
      this._counter = 3; //если новый запрос, то только первые 3
    }
    this.clearNews();
    this.domElement.children.forEach(elem => {
        if (elem.className === 'result__grid-container') {
          const newsData = this.dataStorage.getSavedNews();
          newsData.forEach((newsObj, index) => {
            if (index < this._counter) {
              elem.append(this.newsCard.renderCard(newsObj));
            } 
          })
        if (this._counter >= newsData.length && newsData.length > 3) {
          this.removeShowMoreBttn() // еслии карточки законнчились, то кнопка "показать еще" удаляется, а при новом запросе отрисуется 3 карточки
          this._counter = 3;
        }
        if (newsData.length < 3) {
          this._counter = 0; // еслии новостей меньше трех, то счетчик обнуляется, чтобы при новом запросе отрисовались только 3 карточки
        }
      }
    });
    this.domElement.classList.add('result_active');
  }

  hideList() {
    this.clearNews();
    this.domElement.classList.remove('result_active');
  }

  clearNews() {
    this.domElement.children.forEach(elem => {
      if (elem.className === 'result__grid-container') {
        for (let i = elem.children.length - 1; i >= 0; i -= 1 ) {
          elem.children[i].remove();
        }
      }
    })
  }

  removeShowMoreBttn() {
    this.showMoreBttn.remove();
  }

  showMoreCards() {
    this.renderList(true);
  }
}