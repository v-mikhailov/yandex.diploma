import '../blocks/about/about.css';
import CommitCardList from './componets/CommitCardList';
import CommitCard from './componets/CommitCard';
import GitHubApi from './modules/GitHubApi';

const commitCardList = new CommitCardList(document.querySelector('.carousel'), {CommitCard, GitHubApi});
(async function f () {
  try {
    const result = await commitCardList.render();
    const flkty = new Flickity('.carousel', {
      cellAlign: 'left',
      contain: true,
      wrapAround: true,
    });
  } catch (err) {
    throw new Error(err);
  }
})();


