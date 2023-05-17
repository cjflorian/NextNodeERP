const express = require('express');
const app = express();
const db = require('../../components/database/database');
const bodyParser = require('body-parser')


app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

export default async (req, res) => {

    console.log(JSON.stringify(req.query))
    if(req.method === 'POST'){

    }
    else if(req.method === 'PUT'){

    }
    else if(req.method === 'DELETE'){
      
    }
    else
    {
      if(JSON.stringify(req.query)=== "{}")
      {
        console.log('All');
        const posts = await db.query('SELECT * FROM users');
        res.json(posts.rows);
      }
      else
      {
        console.log(JSON.stringify(req.query.id));
        const idUser = parseInt(req.query.id)
        const posts = await db.query('SELECT * FROM users where id='+idUser);
        res.json(posts.rows);
      }
      
    }
  }

  

  