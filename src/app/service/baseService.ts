export default class BaseService {
  model: any;
  /**
   * Base service class providing common used operations
   * @param {Model} model
   */
  constructor(model: any) {
    this.model = model;
  }

  /**
   * @param {String} string eg: 'key_1' for ASC / '-key_1' for DESC
   */
  static parseOrder(string: string) {
    if (string[0] === '-') {
      return [{
        column: string.slice(1),
        order: 'DESC'
      }];
    }
    return [{
      column: string,
      order: 'ASC'
    }];
  }

  // static generateLinks(page:any, lastPage:any, url:any, limit: any, orders: any, attributes: any) {
  //   return new Promise((resolve, reject) => {
  //     if (page === 0) {
  //       reject(new Error('page cannot be 0'));
  //     }

  //     const baseUrl = `${config.base_url}${url}?page=`;
  //     orders = typeof orders === 'undefined' ? '' : `&order=${orders}`;
  //     attributes = Object.keys(attributes).length === 0 ? '' : `&fields=${attributes.toString()}`;
  //     const params = `&limit=${limit}${orders}${attributes}`;
  //     const links = {
  //       prev: null,
  //       next: null,
  //       last: `${baseUrl}${lastPage}${params}`,
  //       curr: `${baseUrl}${page}${params}`,
  //     };

  //     if (page > 1) {
  //       links.prev = `${baseUrl}${parseInt(page) - 1}${params}`;
  //     }

  //     if (page < lastPage) {
  //       links.next = `${baseUrl}${parseInt(page) + 1}${params}`;
  //     }

  //     resolve(links);
  //   });
  // }

  /**
   * Paginate fetch result.
   * @param {Integer} page    eg: 1
   * @param {Integer} limit   eg: 10
   * @param {Array}   fields  eg: ['key_1', 'key_2']
   * @param {String}  order   eg: 'key_1' for ASC / '-key_1' for DESC
   * @param {Object}  where   eg: {key: value}
   */
  async paginate(page = 1, limit: any, fields: Array<any>, where: any, order: any ) {
    limit = typeof limit !== 'undefined' ? parseInt(limit) : 10;
    fields = typeof fields !== 'undefined' ? fields : null;
    order =
      typeof order !== 'undefined' ?
      BaseService.parseOrder(order) : [{
        column: 'id',
        order: 'ASC'
      }];
    where =
      typeof where !== 'undefined' ? {
        key: Object.keys(where)[0],
        opr: 'like',
        value: `%${Object.values(where)[0]}`
      } : {
        key: 'id',
        opr: '<>',
        value: '0'
      };
    const offset = typeof page !== 'undefined' ? (page - 1) * limit : page;

    try {
      const {
        table,
        execQuery
      } = this.model;
      const totals = await execQuery(table)
        .count('id')
        .where(where.key, where.opr, where.value)
        .debug();
      const total = Array.isArray(totals) ? Object.values(totals[0])[0] : Object.values(totals);

      const response = await execQuery
        .select(fields)
        .from(table)
        .where(where.key, where.opr, where.value)
        .limit(limit)
        .offset(offset)
        .orderBy(order)
        .debug();

      if (response) {
        const count = response.length;
        const links = {
          page: page,
          count,
          total: total,
        };

        return {
          data: response,
          links,
          count,
          total: total,
        };
      }

      throw Error('Paginating fail to execute');
    } catch (error) {
      throw Error(error.message);
    }
  }
}
