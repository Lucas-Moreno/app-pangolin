const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PangolinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Guerrier', 'Alchimiste', 'Sorcier', 'Espion', 'Enchanteur'], default: 'Guerrier' },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pangolin' }]
});

PangolinSchema.methods.isPasswordCorrect = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model('Pangolin', PangolinSchema);
