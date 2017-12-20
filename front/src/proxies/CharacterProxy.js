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
    const dataObj = { name: data.name,
      bio: data.bio,
      show: data.show.value,
      fileName: data.fileName,
      image: data.image };

    return this.submit('post', `${this.endpoint}/admin/character/upload`, dataObj);
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

  getById(id) {
    return this.submit('get', `${this.endpoint}/characters/id/${id}`);
  }
  /**
   * Method used to get a character.
   *
   * @returns {Promise} The result in a promise.
   */
  getByShowCharacter(show, character) {
    return this.submit('get', `${this.endpoint}/characters/${show}/${character}`);
  }

  update(id, data, orginalImage) {
    const dataObj = { name: data.name,
      bio: data.bio,
      show: data.show,
      fileName: data.fileName,
      image: data.image };

    if (orginalImage) {
      delete dataObj.image;
    }
    if (dataObj.show) {
      dataObj.show = dataObj.show.value;
    }
    return this.submit('put', `${this.endpoint}/admin/character/${id}`, dataObj);
  }
}

export default CharacterProxy;
