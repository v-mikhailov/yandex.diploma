import "../blocks/main/style.css";
/* componets */
import SearchInput from './componets/SearchInput';
import NewsCardList from './componets/NewsCardList';
import NewsCard from './componets/NewsCard';
/* modules */
import NewsApi from './modules/NewsApi';
import DataStorage from './modules/DataStorage';
import Validation from './modules/Validation';
/* utils */
import { NEWS_API_KEY } from './constants/NEWS_API_KEY';
import { getCurrentDate } from './utils/getCurrentDate';
import { getPreviousDate } from './utils/getPreviousDate';


const searchForm = document.forms.searchForm;

const dataStorage = new DataStorage();
const newsCard = new NewsCard(document.querySelector('#js-newsCard'));
const validation = new Validation(searchForm);
const newsApi = new NewsApi(NEWS_API_KEY, getPreviousDate(7), getCurrentDate());

const newsCardList =  new NewsCardList(document.querySelector('.result'), dataStorage, newsCard);
const searchInput = new SearchInput(searchForm, newsCardList, validation, newsApi, dataStorage);

searchInput.addEventListener('submit', searchInput.renderNewsCard);
newsCardList.addEventListener('click', newsCardList.showMoreCards);





