import '../blocks/about/about.css';
import CommitCardList from './componets/CommitCardList';
import CommitCard from './componets/CommitCard';
import GitHubApi from './modules/GitHubApi';
import Flickity from 'flickity';

import { GITHUB_API_KEY } from './constants/GITHUB_API_KEY';

const commitCard = new CommitCard(document.querySelector('#js-gitCard'));
const gitHubApi = new GitHubApi(GITHUB_API_KEY);
const commitCardList = new CommitCardList(document.querySelector('.carousel'), commitCard, gitHubApi);

(async () => {
  try {
    await commitCardList.render();
    const flkty = new Flickity('.carousel', {
      cellAlign: 'left',
      contain: true,
      wrapAround: true,
    });
  } catch (err) {
    throw new Error(err);
  }
})();
