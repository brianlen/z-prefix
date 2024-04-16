const express = require('express');
const cors = require('cors');
const knex = require('knex')(require("./knexfile.js")["development"]);
const port = 8080;
const app = express();

app.use(cors());
app.use(express.json());

// read all inventory
app.get('/inventory', (req, res) => {

})

// create a new item
app.post('/inventory/item', (req, res) => {

})

// update an existing item
app.patch('/inventory/item/:id', (req, res) => {

})

// delete an item
app.delete('/inventory/item/:id', (req, res) => {

})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
