const db = require('../../components/database/database');
const User = require('../../components/models/user');
import { verifyToken }  from '../../components/utils/Utils'

export default async (req, res) => {

    console.log(JSON.stringify(req.query))
    const token = req.headers.authorization.split(' ')[1];
    //console.log(token)
    if(verifyToken(token))
      {
        if(req.method === 'POST'){
          try {
            User.email = req.body.email;
            User.name = req.body.name;
            User.password = req.body.password;
            const strQuery =  `INSERT INTO users (email, name, password) VALUES ('${User.email}','${User.name}',crypt('${User.password}', gen_salt('bf', 4)));`;
            const user = await db.query(strQuery);
            res.json(user);
          } catch (error) {
            console.error(error);
            res.json(error);
          }
        }
        else if(req.method === 'PUT'){
          try {
            User.id = parseInt(req.body.id);
            User.email = req.body.email;
            User.name = req.body.name;
            User.password = req.body.password;
            User.active = req.body.active;
            const strQuery =  `UPDATE users SET email='${User.email}', name='${User.name}', password=crypt('${User.password}', gen_salt('bf', 4)), active = '${User.active}' WHERE id=${User.id};`;
            const user = await db.query(strQuery);
            res.json(user);
          } catch (error) {
            console.error(error);
            res.json(error);
          }
        
        }
        else if(req.method === 'DELETE'){
          try {
            const idUser = parseInt(req.query.id)
            const strQuery =  `DELETE FROM users WHERE id=${idUser};`;
            const user = await db.query(strQuery);
            res.json(user);
          } catch (error) {
            console.error(error);
            res.json(error);
          }
        
        }
        else
        {
          if(JSON.stringify(req.query)=== "{}")
          {
            console.log('All');
            const users = await db.query('SELECT * FROM users');
            res.json(users.rows);
          }
          else
          {
            console.log(JSON.stringify(req.query.id));
            const idUser = parseInt(req.query.id)
            const users = await db.query('SELECT * FROM users where id='+idUser);
            res.json(users.rows);
          }
          
        }
      }
    else  
      res.status(403).json({'Forbidden':'Not Authorized'})
  }

  

  