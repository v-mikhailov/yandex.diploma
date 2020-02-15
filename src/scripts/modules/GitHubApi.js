// Класс,  отвечает за взаимодействие с Github. метод getCommits

export default class GitHubApi {
  constructor(url) {
    this.url = url
  }
  getResponseJson(data) {
    if (data.ok) {
      return data.json();
    }
    return Promise.reject(`Ошибка: ${data.status}`)
  }

  async getCommits() {
    const result = await fetch(this.url, {
      method: 'GET',
    })
    return this.getResponseJson(result);
  }
}