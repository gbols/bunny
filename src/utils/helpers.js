import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

export const getToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET);
  }

export const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
      res.status(403).send({
        success: false,
        message: 'valid token must be provided to access route'
      })
  }
  const token = header.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        success: false,
        error: 'Token is not valid',
      });
    }
    req.userToken = token;
    req.user = decodedToken;
  });
  return next();
}

export const getHash = (plaintextPassword) => {
  return bcrypt.hashSync(plaintextPassword, parseInt(process.env.SALT));
}

export const comparePassword = (plaintextPassword, hash) => {
  return bcrypt.compareSync(plaintextPassword, hash);
}