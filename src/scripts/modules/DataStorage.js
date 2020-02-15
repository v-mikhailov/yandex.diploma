// Класс DataStorage предоставляет интерфейс для работы с локальным хранилищем браузера.

export default class DataStorage {

  saveAllNews(propsList) {
    localStorage.setItem('newsList', JSON.stringify(propsList))
  }

  saveNewsTitle(newstitle) {
    localStorage.setItem('title', newstitle);
  }

  saveNewsCount(newsCount) {
    localStorage.setItem('newsCount', newsCount);
  }

  getSavedNews() {
    return JSON.parse(localStorage.getItem('newsList'));
  }

  getSavedTitle() {
    return localStorage.getItem('title');
  }

  getSavedNewsCount() {
    return localStorage.getItem('newsCount');
  }

  deletePreviousData() {
    localStorage.clear();
  }

}
