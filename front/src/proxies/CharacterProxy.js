import Proxy from './Proxy';

class CharacterProxy extends Proxy {
  /**
   * The constructor for the CharacterProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super(parameters);
  }

  /**
   * Method used to upload a character.
   *
   * @param {Object} data The register data.
   *
   * @returns {Promise} The result in a promise.
   */
  upload(data) {
    data.show = data.show.value;
    return this.submit('post', `${this.endpoint}/admin/character/upload`, data);
  }

  get(page, search) {
    let query = `?page=${page}`;
    if (search.name) {
      query += `&name=${search.name}`;
    }
    if (search.show) {
      query += `&show=${search.show}`;
    }
    return this.submit('get', `${this.endpoint}/characters${query}`);
  }
  /**
   * Method used to get a character.
   *
   * @returns {Promise} The result in a promise.
   */
  getByShowCharacter(show, character) {
    return this.submit('get', `${this.endpoint}/character/${show}/${character}`);
  }
}

export default CharacterProxy;