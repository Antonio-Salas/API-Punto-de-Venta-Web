import {pool} from '../db.js'


export const getUsuarios = async (req, res) => {
   try {
    const [rows] = await pool.query('SELECT * FROM usuario')
    res.json(rows)
   } catch (error) {
    return res.status(500).json({
        message: 'Something goes wrong'
    })
   }
}

export const getUsuario = async (req, res) => {
   try {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE idusuario = ?', [req.params.id])
    
    if(rows.length <= 0) return res.status(404).json({
        message: 'Usuario no encontrado'
    })

    res.json(rows[0])
    
   } catch (error) {
    return res.status(500).json({
        message: 'Something goes wrong'
  })
 }
}

export const createUsuario = async (req, res) => {
    const { genero_persona, nombre, direccion, telefono} = req.body
    const newPersona = {
        genero_persona,
        nombre,
        direccion,
        telefono
    }
    const [rows1] = await pool.query('INSERT INTO persona SET ? ',[newPersona]);

    try {
    const {idpersona, rol, nombre_usuario, email, password} = req.body
    let passwordEncrypted = await bcrypt.hash(password,8)
    console.log(passwordEncrypted) 
    const newUsuario = {
        idpersona:rows1.insertId,
        rol, 
        nombre_usuario, 
        email, 
        password
    }
    

    const [rows] = await pool.query('INSERT INTO usuario  SET ?', [ newUsuario ]);
    res.send({
        idusuario:rows.insertId,
        idpersona,
        rol,
        nombre_usuario,
        email,
        password,
    })
    
} catch (error) {
    return res.status(500).json({
        message: 'Something goes wrong'
        })
    }
    
}

export const eliminarUsuario = async (req, res) => {
try {
    const [result] = await pool.query('DELETE FROM usuario WHERE idusuario = ?', [req.params.id])
    
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Usuario no encontrado'
    })

    res.sendStatus(204)
} catch (error) {
    
    }
}

export const updateUsuario = async (req, res) => {
    const {id} = req.params
    const { idpersona, rol, nombre_usuario, email, password} = req.body
    try {
    const [result] = await pool.query('UPDATE usuario SET idpersona = IFNULL(?,idpersona), rol = IFNULL(?,rol), nombre_usuario = IFNULL(?,nombre_usuario), email = IFNULL(?,email), password = IFNULL(?,password) WHERE idusuario = ?', [idpersona, rol, nombre_usuario, email, password, id])

    console.log(result)

    if (result.affectedRows === 0) return res.status(404).json({
        message: 'Usuario no encontrado'
    })

    res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
            })
    }
}
