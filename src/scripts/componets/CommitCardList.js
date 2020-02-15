// класс списка карточек коммитов
import { GITHUB_API_KEY } from '../constants/GITHUB_API_KEY';

export default class CommitCardList {
  constructor(domElem, dependencies = {}) {
    this.cardListEl = domElem;
    this.dependencies = dependencies;

    if (this.dependencies.CommitCard) {
      this.commitCard = new this.dependencies.CommitCard(document.querySelector('#js-gitCard'));
    }

    if (this.dependencies.GitHubApi) {
      this.gitHubApi = new this.dependencies.GitHubApi(GITHUB_API_KEY);
    }

   this._renderCardList = this._renderCardList.bind(this);
  }

  async render() {
    try {
      const commits = await this.gitHubApi.getCommits();
      this._renderCardList(commits);
    } catch (error) {
      throw new Error(error);
    }
  }
  
  _renderCardList(commitsArr) {
    commitsArr.forEach((card, index) => {
      if (index <= 20) {
        const renderedCard = this.commitCard.renderCard(card);
        this.cardListEl.append(renderedCard);
      }
    });
  }
 }