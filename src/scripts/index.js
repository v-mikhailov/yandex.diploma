import "../blocks/main/style.css";
/* componets */
import Validation from './componets/Validation';
import SearchInput from './componets/SearchInput';
import NewsCardList from './componets/NewsCardList';
import NewsCard from './componets/NewsCard';
/* modules */
import NewsApi from './modules/NewsApi';
import DataStorage from './modules/DataStorage';
/* utils */

const newsCardList =  new NewsCardList(document.querySelector('.result'),
  {
    DataStorage,
    NewsCard,
  }
);

const searchInput = new SearchInput(document.forms.searchForm,
{
  Validation,
  NewsApi,
  DataStorage,
}
);

searchInput.addEventListener('submit', event => {
  event.preventDefault();
  (async () => {
    try {
      newsCardList.hideList();
      searchInput.deactivateNotfount();
      await searchInput.saveApiData();
      newsCardList.renderList(false);
    } catch (error) {
      searchInput.activateNotFound();
      throw new Error(error)
    }
  })();
});

newsCardList.addEventListener('click', event => {
  if (event.target.className === 'button button_place_result') {
    newsCardList.renderList(true);
  }
})






