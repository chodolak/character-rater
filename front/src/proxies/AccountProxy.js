import Proxy from './Proxy';

class AccountProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super(parameters);
  }

  me() {
    return this.submit('get', `${this.endpoint}/auth/me`);
  }
}

export default AccountProxy;
