import {pool} from '../db.js'

export const getProductos = async (req, res) => {
   try {
    const [rows] = await pool.query('SELECT * FROM productos')
    res.json(rows)
   } catch (error) {
    return res.status(500).json({
        message: 'Something goes wrong'
    })
   }
}

export const getProducto = async (req, res) => {
   try {
    const [rows] = await pool.query('SELECT * FROM productos WHERE idproducto = ?', [req.params.id])
    
    if(rows.length <= 0) return res.status(404).json({
        message: 'Producto no encontrado'
    })

    res.json(rows[0])
    
   } catch (error) {
    return res.status(500).json({
        message: 'Something goes wrong'
  })
 }
}

export const createProductos = async (req, res) => {
const {idcategoria, codigo, nombre, precio_venta, stock, descripcion} = req.body
    try {

    const [rows] = await pool.query('INSERT INTO productos (idcategoria, codigo, nombre, precio_venta, stock, descripcion) VALUES (?, ?, ?, ?, ?, ?)', [ idcategoria,codigo, nombre, precio_venta, stock, descripcion])

    res.send({
        idproducto:rows.insertId,
        idcategoria,
        codigo,
        nombre,
        precio_venta,
        stock,
        descripcion,
    })
    
} catch (error) {
    return res.status(500).json({
        message: 'Something goes wrong'
        })
    }
}

export const eliminarProducto = async (req, res) => {
try {
    const [result] = await pool.query('DELETE FROM productos WHERE idproducto = ?', [req.params.id])
    
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Producto no encontrado'
    })

    res.sendStatus(204)
} catch (error) {
    
    }
}

export const updateProducto = async (req, res) => {
    const {id} = req.params
    const {idcategoria, codigo, nombre, precio_venta, stock, descripcion} = req.body
    try {
    const [result] = await pool.query('UPDATE productos SET idcategoria = IFNULL(?,idcategoria), codigo = IFNULL(?,codigo), nombre = IFNULL(?,nombre), precio_venta = IFNULL(?,precio_venta), stock = IFNULL(?,stock), descripcion = IFNULL(?,descripcion) WHERE idproducto = ?', [ idcategoria, codigo, nombre, precio_venta, stock, descripcion, id])

    console.log(result)

    if (result.affectedRows === 0) return res.status(404).json({
        message: 'Producto no encontrado'
    })

    res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
            })
    }
}
