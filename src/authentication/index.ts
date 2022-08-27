import {Router as rtr} from 'express';
import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

const router = rtr();

router.post('/login', (req, res) => {
  const {username, password} = req.body;
  if (
    username === 'admin' &&
    password === 'admin'
    // bcrypt.compareSync(password, 'hash from db')
  ) {
    const token = jwt.sign({username}, 'secret', {expiresIn: '1h'});
    req.session = {token};
    res.json({msg: 'Login successful'});
  } else {
    res.status(401).json({msg: 'Invalid credentials'});
  }
});

// refresh token / verify validity
router.post('/refresh', (req, res) => {
  const token = req.session?.token;
  if (token) {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        res.status(401).json({msg: 'Invalid token'});
      } else {
        const newToken = jwt.sign(decoded, 'secret', {expiresIn: '1h'});
        req.session = {token: newToken};
        res.json({msg: 'Token refreshed'});
      }
    });
  } else {
    res.status(401).json({msg: 'Invalid token'});
  }
});

router.post('/logout', (req, res) => {
  req.session = null;
  res.json({msg: 'Logout successful'});
});

export default router;
