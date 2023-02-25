const mongoose = require("mongoose")
const Pangolin = mongoose.model("Pangolin")
var bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const process = require('process')

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingPangolin = await Pangolin.findOne({ email });
    if (existingPangolin) {
      return res.status(409).json({ message: 'Cette adresse e-mail est déjà enregistrée' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPangolin = new Pangolin({ name, email, password: hashedPassword });

    await newPangolin.save();

    res.status(201).json({ message: 'Pangolin enregistré avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement du Pangolin' });
  }
};

const signin = async (req, res) => {

  try {
    const { email, password } = req.body;

    const pangolin = await Pangolin.findOne({ email });

    if (!pangolin || !pangolin.isPasswordCorrect(password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: pangolin._id, email: pangolin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ email: pangolin.email, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const logout = async (req, res) => {

  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Vous n'êtes pas connecté" });
  }

  res.clearCookie('jwt');

  res.status(200).json({ message: "Vous avez été déconnecté avec succès" });
};

module.exports = { signup, signin, logout }