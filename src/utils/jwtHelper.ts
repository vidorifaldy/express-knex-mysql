import jwt from 'jsonwebtoken';

export default class JwtHelper {
  constructor() {}

  /**
   * Sign new jwt token from passed data.
   * @param {Object} data
   */
  createJWT(data: Object) {
    
    const options = {
      expiresIn: `${process.env.JWT_EXPIRATION}h`,
      issuer: 'example.id-backend',
      jwtid: 'example.user',
      subject: 'example-access-token',
    };

    return jwt.sign(data, process.env.JWT_SECRET, options);
  }

  /**
   * parse JWT with specified options.
   * @param {String} token
   */
  verifyJwt(token: any) {
    const options = {
      expiresIn: `${process.env.JWT_EXPIRATION}h`,
      issuer: 'example.id-backend',
      jwtid: 'example.user',
      subject: 'example-access-token',
    };

    let verify:any = jwt.verify(token, process.env.JWT_SECRET, options, function (err, decoded) {
      if (err) return err;
      return decoded;
    });

    return verify
  }

  /**
   * Parse authorization header
   * @param {String} token
   */
  parseToken(token: string | string[]) {
    if (token.includes('Bearer ')) {
      return token.slice('Bearer '.length);
    }

    throw new Error('Invalid token format');
  }
}
