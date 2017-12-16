import Proxy from './Proxy';

class ShowProxy extends Proxy {
  /**
   * The constructor for the CharacterProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super(parameters);
  }

  /**
   * Method used to get shows.
   *
   * @returns {Promise} The result in a promise.
   */
  get(name) {
    return this.submit('get', `${this.endpoint}/shows/${name}`);
  }

  create(data) {
    return this.submit('post', `${this.endpoint}/admin/show`, data);
  }
}

export default ShowProxy;
