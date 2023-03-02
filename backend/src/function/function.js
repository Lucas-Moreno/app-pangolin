const mongoose = require("mongoose")
const Pangolin = mongoose.model("Pangolin")
var bcrypt = require("bcryptjs")

const registerNewPangolin = async (name, email, password) => {

  const existingPangolin = await Pangolin.findOne({ email });
  if (existingPangolin) {
    throw new Error('Cette adresse e-mail est déjà enregistrée');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newPangolin = new Pangolin({ name, email, password: hashedPassword });

  await newPangolin.save();

  const newPangolinId = newPangolin._id;

  return { message: 'Pangolin enregistré avec succès', id: newPangolinId, success: true };
};

const addNewFriend = async (friendId, pangolin) => {
  const friend = await Pangolin.findById(friendId);
  if (!friend) {
    return res.status(404).json({ message: 'Friend not found' });
  }

  if (pangolin.friends.includes(friendId)) {
    return res.status(400).json({ message: 'Friend already added' });
  }

  pangolin.friends.push(friendId);
  await pangolin.save();

  return { message: 'Success Friend added', success: true };
}

module.exports = { registerNewPangolin, addNewFriend }