export default class ResponseBuilder {
  
  /**
   * Response builder class
   */

  meta: any;
  format: {};
  data: {};
  action: {};
  links: any;
  includes: any;
  constructor() {
    this.meta = {
      status: 200,
      message: 'Operations success',
      success: true,
      errors: [],
    };
    this.format = {};
    this.data = {};
    this.action = {};
    this.links = null;
    this.includes = null;
  }

  /**
   * data getter
   * @param {Object} format
   */
  setFormat(format: any) {
    this.format = format;
    return this;
  }

  /**
   * data setter
   * @param {Object} data
   */
  setData(data: object) {
    this.data = data;
    return this;
  }

  /**
   * action setter
   * @param {Object} action
   */
  setAction(action: object) {
    this.action = action;
    return this;
  }

  /**
   * links setter
   * @param {Object} links
   */
  setLinks(links: object) {
    this.links = links;
    return this;
  }

  /**
   * include setter
   * @param {Object} includes
   */
  setIncludes(includes: object) {
    this.includes = includes;
    return this;
  }

  /**
   * status setter
   * @param {Number} status
   */
  setStatus(status: Number) {
    this.meta.status = status;
    return this;
  }

  /**
   * success setter
   * @param {Boolean} success
   */
  setSuccess(success: boolean) {
    this.meta.success = success;
    return this;
  }

  /**
   * message setter
   * @param {String} message
   */
  setMessage(message: string) {
    this.meta.message = message;
    return this;
  }

  /**
   * set the total row count
   * @param {Number} total
   */
  setTotal(total: Number) {
    this.meta.total = total;
    return this;
  }

  /**
   * set row count fetched
   * @param {Number} count
   */
  setCount(count: Number) {
    this.meta.count = count;
    return this;
  }

  /**
   * set errors
   * @param {Array} errors
   */
  setErrors(errors: Array<any>) {
    this.meta.errors = errors;
    return this;
  }

  build() {
    return {
      meta: this.meta,
      data: this.data,
      format: this.format,
      action: this.action,
      links: this.links,
      include: this.includes,
    };
  }
}
