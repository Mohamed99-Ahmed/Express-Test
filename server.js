const  app = require("./app.js");
const dotenv = require('dotenv');
dotenv.config({path:"./config.js"})
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log('heoo');
});
