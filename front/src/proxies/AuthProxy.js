import Proxy from './Proxy';

class AuthProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super(parameters);
  }

  /**
   * Method used to login.
   *
   * @param {Object} data The register data.
   *
   * @returns {Promise} The result in a promise.
   */
  login(data) {
    return this.submit('post', `${this.endpoint}/auth/login`, data);
  }

  /**
   * Method used to register the user.
   *
   * @param {Object} data The register data.
   *
   * @returns {Promise} The result in a promise.
   */
  register(data) {
    return this.submit('post', `${this.endpoint}/auth/signup`, data);
  }

  logout() {
    return this.submit('post', `${this.endpoint}/auth/logout`);
  }
}

export default AuthProxy;
