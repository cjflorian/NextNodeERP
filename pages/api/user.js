const db = require('../../components/database/database');
const User = require('../../components/models/user');
import { json } from 'express';
import { verifyToken }  from '../../components/utils/Utils'

export default async (req, res) => {

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
          let id = JSON.stringify(req.query.id)? JSON.stringify(req.query.id) : 0
          let rpt = JSON.stringify(req.query.rpt)? JSON.stringify(req.query.rpt) : false
          console.log(id)
          if( id === 0 && rpt === false)
          {
            //pagination api side
            const search = req.query.search ? req.query.search : '' ;
            const page = req.query.page ? parseInt(req.query.page) : 0;
            const limit = req.query.limit  ? parseInt(req.query.limit) : 10;
            const iniRange = page * limit-limit;
            const endRange =  iniRange+limit;
            let dataCollection;
            let dataCollectionCount;
            const users = await db.query('SELECT * FROM users');
            const usersJson = (users.rows)
            if (search) {
              dataCollection = await usersJson.filter(item => item.name.toLowerCase().includes(search)).slice(0,limit);
              dataCollectionCount = await Object.keys(dataCollection).length;
            } else {
              dataCollection = await usersJson.slice(iniRange,endRange);
              dataCollectionCount = await Object.keys(usersJson).length;
            }
            const totalPages = Math.ceil(dataCollectionCount / limit);
            const currentPage = page;
           res.status(200).send({
            data: dataCollection,
            paging: {
              total: dataCollectionCount,
              page: currentPage,
              pages: totalPages,
            },
          });
          }
          else if(rpt === true)
          {
            console.log('rpt')
            const users = await db.query('SELECT * FROM users ');
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

  

  