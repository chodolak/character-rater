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

  get(page, search) {
    let query = `?page=${page}`;
    if (search.name) {
      query += `&name=${search.name}`;
    }
    return this.submit('get', `${this.endpoint}/shows${query}`);
  }
  /**
   * Method used to get shows.
   *
   * @returns {Promise} The result in a promise.
   */
  getByName(name) {
    return this.submit('get', `${this.endpoint}/shows/${name}`);
  }

  getById(id) {
    return this.submit('get', `${this.endpoint}/shows/id/${id}`);
  }

  create(data) {
    return this.submit('post', `${this.endpoint}/admin/show`, data);
  }

  update(id, data, orginalImage, orginalThumbnail) {
    const dataObj = { name: data.name,
      bio: data.bio,
      fileName: data.fileName,
      image: data.image,
      thumbnail: data.thumbnail };

    if (orginalImage) {
      delete dataObj.image;
    }
    if (orginalThumbnail) {
      delete dataObj.thumbnail;
    }
    return this.submit('put', `${this.endpoint}/admin/show/${id}`, dataObj);
  }

  delete(id) {
    return this.submit('delete', `${this.endpoint}/admin/show/${id}`);
  }
}

export default ShowProxy;
