const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt= require('bcrypt-nodejs');
let cors = require('cors');


const database ={
    users: [
        {
            id: '123',
            name: 'Sthefano',
            email: 'sthefano@masteradin.com',
            password: 'bolacha',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Aynoan',
            email: 'aynoan@fofinha.com',
            password: 'biscoito',
            entries: 0,
            joined: new Date()
        },
        
        
    ],
    secrets: {
    users_id: '123',
    hash: 'wghhh'
  }
}

app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    let info = req.body;
    if (info.email === database.users[0].email &&
            info.password === database.users[0].password) {
        res.json(database.users[0])
    } else {
        res.status(400).json("error logging in")
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
      });
    database.users.push({
        id: (Number(database.users[database.users.length - 1].id) + 1).toString(),
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length -1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json("not found");
    }
})

app.put('/image', (req, res)=> {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json("not found");
    }
});

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
//   });
  
//   // Load hash from your password DB.
//   bcrypt.compare("bacon", hash, function(err, res) {
//       // res == true
//   });
//   bcrypt.compare("veggies", hash, function(err, res) {
//       // res = false
//   });


  app.listen(3000, ()=> {
    console.log('App is running on: http://localhost:3000/');
})