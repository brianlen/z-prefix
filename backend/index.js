const bcrypt = require('bcryptjs');
const express = require('express');
const cors = require('cors');
const knex = require('knex')(require("./knexfile.js")["development"]);
const port = 8080;
const app = express();


app.use(cors());
app.use(express.json());

// get the entire inventory
app.get('/inventory', (req, res) => {
    knex.select('*')
        .from('Item')
        .then(data => res.status(200).json(data));
});

// get the details of one item
app.get('/inventory/item/:item_id', (req, res) => {
    const { item_id } = req.params;
    knex.select('*')
        .from('Item')
        .where({item_id: item_id})
        .then(data => res.status(200).json(data));
});

// create a new account
app.post('/createAccount', (req, res) => {
    const newAccount = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password
    };
    // todo: needs to check if the username already exists
    knex('User')
        .insert(newAccount)
        .returning(['user_id', 'first_name', 'last_name', 'username'])
        .then(accounts => res.status(201).json(accounts[0]));
});

// login authentication
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    const user = await knex('User').where({ username }).first();
  
    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password);
  
    // Check if password matches
    if (passwordMatch) {
      return res.status(200).json({
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
      });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
   
    // knex.select('*')
    //     .from('User')
    //     .where({ username: username,
    //         password: password })
    //     .then(data => res.status(201).json({
    //         user_id: data.user_id,
    //         first_name: data.first_name,
    //         last_name: data.last_name,
    //         username: data.username,
    //     }));
});

// create a new item
app.post('/inventory/createItem', (req, res) => {
    const newItem = {
        user_id: req.body.user_id,
        item_name: req.body.item_name,
        description: req.body.description,
        quantity: req.body.quantity
    };
    knex('Item')
    .insert(newItem)
    .then(() => res.status(201).json(newItem));
});

// update an existing item
app.patch('/inventory/item/:id', (req, res) => {

})

// http://localhost:8080/inventory/item/${item_id}
// delete an item
app.delete('/inventory/item/:item_id', (req, res) => {
    const { item_id } = req.params;

    knex('Item')
        .where({item_id: item_id})
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `Item with ID ${item_id} deleted successfully` });
            } else {
                res.status(404).json({ message: `Item with ID ${item_id} not found` });
            }
        });

})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
