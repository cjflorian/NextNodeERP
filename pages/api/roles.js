const db = require('../../components/database/database');
const Role = require('../../components/models/role');
import { json } from 'express';
import { verifyToken }  from '../../components/utils/Utils'

export default async (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    //console.log(token)
    if(verifyToken(token))
      {
        if(req.method === 'POST'){
          try {            
            Role.name = req.body.name;
            Role.description = req.body.description;
            const strQuery =  `INSERT INTO roles (name, description) values ('${Role.name}','${Role.description}');`;
            const user = await db.query(strQuery);
            res.json(user);
          } catch (error) {
            console.error(error);
            res.json(error);
          }
        }
        else if(req.method === 'PUT'){
          try {
            Role.id = req.body.id;
            Role.name = req.body.name;
            Role.description = req.body.description;
            Role.active = req.body.active;
            const strQuery =  `UPDATE roles SET description='${Role.description}', name='${Role.name}', active = '${Role.active}' WHERE id=${Role.id};`;
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
            const strQuery =  `DELETE FROM roles WHERE id=${idUser};`;
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
          console.log(id)
          if( id === 0)
          {
           
            const roles = await db.query('SELECT * FROM roles');
            const rolesJson = (roles.rows)
          
           res.status(200).send({
            data: rolesJson
          });
          }
          else
          {
            console.log(JSON.stringify(req.query.id));
            const idUser = parseInt(req.query.id)
            const roles = await db.query('SELECT * FROM roles where id='+idUser);
            res.json(roles.rows);
          }        
        }
      }
    else  
      res.status(403).json({'Forbidden':'Not Authorized'})
  }

  

  