import { DB_USER } from '../config.js'
import {pool} from '../db.js'
import {encrypt, compare} from '../helpers/handleBcrypt.js'

export const postLogin = async (req, res) => {
    const { email, password } = req.body


    try {
        if(email && password){
     const [user] = await pool.query('SELECT * FROM usuario WHERE email = ?',[email]) 
    // async (error,result) =>{
    //     if(result.length == 0 || !(await compare(password,result[0].password))){
    //         res.send('Usuario y/o password incorrectas');
    //     }else{
    //         res.send('Login Correcto')
    //     }
        
    //  }) 
     res.send(user)
        }else{
            res.send('Usuario y/o contraseña no introducidas')
        }
    } catch (error) {
     return res.status(500).json({
         message: 'Something goes wrong'
     })
    }
 }