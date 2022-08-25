const app = require('./src/app');
const dotenv=require('dotenv').config();
const port = process.env.PORT;
app.listen(port, function () {
    console.log(`app listening on port ${port}`)
});