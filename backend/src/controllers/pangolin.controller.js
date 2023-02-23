const mongoose = require("mongoose")
const Pangolin = mongoose.model("Pangolin")

const getInfoPangolin = async (req, res) => {
  const pangolin = req.pangolin;
  res.json(pangolin);
};

const updateProfile = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const pangolinId = req.pangolin._id;

    const pangolin = await Pangolin.findById(pangolinId);

    if (!pangolin) {
      return res.status(404).json({ message: 'Pangolin not found' });
    }

    if (email) {
      pangolin.email = email;
    }

    if (name) {
      pangolin.name = name;
    }

    if (password) {
      pangolin.password = await bcrypt.hash(password, 10);
    }

    await pangolin.save();

    res.status(200).json({ message: 'Profile updated successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getInfoPangolin, updateProfile }