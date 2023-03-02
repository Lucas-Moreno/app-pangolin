const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Pangolin = mongoose.model("Pangolin");
const process = require('process');

const authMiddleware = async (req, res, next) => {
  try {

    const token = req.cookies.jwt;

    console.log('hello', token)
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const pangolin = await Pangolin.findById(decodedToken.id);

    if (!pangolin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.pangolin = pangolin;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
