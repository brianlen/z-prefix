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
    knex('Item')
        .join('User', 'Item.user_id', '=', 'User.user_id')
        .select('Item.*', 'User.username')
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

    // Check if the username already exists
    knex('User')
        .where({ username: newAccount.username })
        .first()
        .then(user => {
            if (user) {
                // If the username already exists, send a 409 Conflict response
                res.status(409).json({ message: 'Username already exists' });
            } else {
                // If the username doesn't exist, insert the new account
                return knex('User')
                    .insert(newAccount)
                    .returning(['user_id', 'first_name', 'last_name', 'username'])
                    .then(accounts => res.status(201).json(accounts[0]));
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error creating user', error: error });
        });
});
  

// login authentication
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    const user = await knex('User').where({ username }).first();
  
    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  
    // bcrypt compare
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
app.patch('/inventory/item/:item_id', (req, res) => {
    const { item_id } = req.params;
    const { item_name, description, quantity } = req.body;

    knex('Item')
        .where({item_id: item_id})
        .update({
            item_name,
            description,
            quantity,
        })
        .then((count) => {
            if (count > 0) {
                res.status(200).json({ message: `Item updated successfully!` });
            } else {
                res.status(404).json({ message: `item_id ${item_id} not found` });
            }
        });
});

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
