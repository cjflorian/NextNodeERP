import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const db = require('../../components/database/database');
const User = require('../../components/models/user');

/* JWT secret key */
const KEY = process.env.JWT_KEY;


export default async (req, res) => {
      const { method } = req;
      try {
        switch (method) {
          case 'POST':
            /* Get Post Data */
            const { name, password } = req.body;
            /* Any how email or password is blank */
            if (!name|| !password) {
              return res.status(400).json({
                status: 'error',
                error: 'Request missing username or password',
              });
            }
            /* Check user email in database */
             const strQuery =  `CALL public.sp_userslogin('${name}', '${password}',	0, 	'')`;

            const user = await db.query(strQuery);
           // res.json(user.rows);
            
            
            /* Check if exists */
            if (user.rows[0].iduser===null) {
              /* Send error with message */
              res.status(400).json({ status: 'error', error: 'User Not Found' });
            }
            /* Variables checking */
            else {
                
                /* Create JWT Payload */
                const payload = {
                    id: user.rows[0].iduser,
                    email: user.rows[0].emailuser
                  };
                  
                console.log(payload)
                  jwt.sign(
                    payload,
                    KEY,
                    {
                      expiresIn: 31556926, // 1 year in seconds
                    },
                    (err, token) => {
                      /* Send succes with token */
                      res.status(200).json({
                        payload,
                        success: true,
                        token: 'Bearer ' + token,
                      });
                    },
                  );
                //res.json(user.rows);
            }
            break;
          case 'PUT':
            break;
          case 'PATCH':
            break;
          default:
            break;
        }
      } catch (error) {
        throw error;
      }
  };