const mongoose = require("mongoose")
const Pangolin = mongoose.model("Pangolin")
var bcrypt = require("bcrypt")

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
}

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pangolin = await Pangolin.findOne({ email });

    if (!pangolin || !await pangolin.isPasswordCorrect(password)) {
      return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect' });
    }

    return res.status(200).json({ message: 'Connecté avec succès' });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, signin }
