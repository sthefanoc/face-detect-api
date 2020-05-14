const express = require('express');

const app = express();

app.get('/',(req,res) => {
    res.send('this is working')
})

app.post('/signin', (req, res) => {
    res.send('signin is working')
}

app.post('/register', (req, res) => {
    res.send('register is working')
}

app.get('/profile/:userId', (req, res) => {
    res.send('profile is working')
})

app.put('/image', (req, res)=> {
    res.send('image is working')
})

app.listen(3000, ()=> {
    console.log('App is running on: http://localhost:3000/');
})

/*
Routes:
/ --> res = this is working
/signin --> POST = success/ fail
/register --> POST = user object

/profile/:userId --> GET = user
/image --> PUT --> user count

*/

