const mongoose = require("mongoose")
const Pangolin = mongoose.model("Pangolin")
var bcrypt = require("bcrypt")

const getPangolins = async (req, res) => {
  try {
    const pangolins = await Pangolin.find().select('-password');
    res.status(200).json(pangolins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getPangolinById = async (req, res) => {
  try {
    const pangolin = await Pangolin.findById(req.params.id);

    if (!pangolin) {
      return res.status(404).json({ message: 'Pangolin not found' });
    }

    const { _id, name, email } = pangolin;

    res.status(200).json({ id: _id, name, email });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getInfoPangolin = async (req, res) => {
  let pangolin = req.pangolin;
  pangolin = await Pangolin.populate(pangolin, { path: 'friends' });
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

const updateRole = async (req, res) => {
  try {
    const pangolinId = req.pangolin._id;
    const { role } = req.body;

    const pangolin = await Pangolin.findById(pangolinId);

    if (!pangolin) {
      return res.status(404).json({ message: 'Pangolin not found' });
    }

    pangolin.role = role;
    await pangolin.save();

    res.status(200).json({ message: 'Role updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addFriend = async (req, res) => {
  try {
    const pangolin = req.pangolin;
    const friendId = req.params.id;

    const friend = await Pangolin.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    if (pangolin.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Friend already added' });
    }

    pangolin.friends.push(friendId);
    await pangolin.save();

    res.status(200).json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteFriend = async (req, res) => {
  try {
    const pangolinId = req.pangolin._id;
    const friendId = req.params.id;

    const pangolin = await Pangolin.findById(pangolinId).populate('friends');
    if (!pangolin) {
      return res.status(404).json({ message: 'Pangolin not found' });
    }

    const friend = pangolin.friends.find(f => f._id.toString() === friendId);
    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    pangolin.friends = pangolin.friends.filter(f => f._id.toString() !== friendId);
    await pangolin.save();

    res.status(200).json({ message: 'Friend removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getPangolins, getPangolinById, getInfoPangolin, updateProfile, updateRole, addFriend, deleteFriend }