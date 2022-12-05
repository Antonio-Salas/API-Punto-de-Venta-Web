import {pool} from '../db.js'
import { encrypt, compare } from '../helpers/handleBcrypt.js'

export const getAutentificacion = async (req,res) =>{
    const {email, password}  = req.body
    let passwordEncrypted = await encrypt(password)
    
    if(email && password){
        const [user] = await pool.query('SELECT * FROM usuario WHERE email = ?',[email], async (error,result) =>{
            if(result.email == 0 || !(await compare(password,result.password))){
                res.send('Usuario y/o incorrectas')
                console.log(user)
            }else{
                res.send('login correcto')
            }
        })
    

    }
}
