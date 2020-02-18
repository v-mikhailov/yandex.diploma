// Отвечает за взаимодействие с NewsAPI. У класса есть конструктор, принимающий опции и единственный обязательный метод getNews.
// getNews возвращает список новостей на основе запроса
export default class NewsApi {
  constructor(apiKey, keyWord, from, to ) {
   this._apiKey = apiKey;
   this.url = `https://newsapi.org/v2/everything?q=${keyWord}&from=${from}&to=${to}&sortBy=publishedAt&pageSize=100&language=ru`
  }

  getResponseJson(data) {
    if (data.ok) {
      return data.json();
    }
    Promise.reject(`Ошибка: ${data.status}`)
  }
  
  async getNews() {
    const result = await fetch(this.url,{
      method : 'GET',
      headers: {
        authorization: this._apiKey
      },
    })
    return this.getResponseJson(result)
  }
}