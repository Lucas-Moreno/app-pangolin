module.exports = (app) => {
  const mongoose = require("mongoose")
  const authController = require('../controllers/auth.controller');

  /**
   * TEST API
   */

  app.get("/", (req, res) => {
    res.send("Welcome to Pangolin Api.")
  })

  app.get("/health", (req, res) => {
    const uri = `mongodb+srv://${process.env.NAME_DB}:${process.env.PASSWORD_DB}@cluster0.bqizz.mongodb.net/pangolin-db?retryWrites=true&w=majority`
    mongoose.connect(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (!err) {
          res.send("MongoDB Connection Succeeded")
        } else {
          res.send("Error in db connection :" + err)
        }
      }
    )
  })

  /**
   * AUTHENTIFICATION
   */

  app.post('/signup', authController.signup);
  app.post('/signin', authController.signin);

  /**
   * 404 NOT FOUND
   */

  app.use((req, res) => {
    res.status(404).json({
      URL_ERROR: req.originalUrl,
      STATUS_ERROR: "404",
      ERROR: "NOT FOUND",
    })
  })
}
