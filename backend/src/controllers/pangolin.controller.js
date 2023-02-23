const getInfoPangolin = async (req, res) => {
  const pangolin = req.pangolin;
  res.json(pangolin);
};

module.exports = { getInfoPangolin }