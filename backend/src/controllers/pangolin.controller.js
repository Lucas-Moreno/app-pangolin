const mongoose = require("mongoose")
const Pangolin = mongoose.model("Pangolin")
var bcrypt = require("bcryptjs")
const { registerNewPangolin, addNewFriend } = require('../function/function')

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

    const { success } = await addNewFriend(friendId, pangolin)

    if (success) {
      res.status(200).json({ message: 'Friend added successfully' });
    } else {
      res.status(500).json({ message: 'Friend not added' });
    }
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

const addEmail = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { id, success } = await registerNewPangolin(name, email, password);

    if (success) {
      try {
        const pangolin = req.pangolin;
        const { success } = await addNewFriend(id, pangolin);
        if (success) {
          res.status(200).json({ message: 'Friend added successfully' });
        } else {
          res.status(500).json({ message: 'Friend not added' });
        }
      } catch (e) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout d\amis' });
      }
    }

  } catch (error) {
    console.log('hello', error)
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'e-mail' });
  }
};

module.exports = { getPangolins, getPangolinById, getInfoPangolin, updateProfile, updateRole, addFriend, deleteFriend, addEmail }