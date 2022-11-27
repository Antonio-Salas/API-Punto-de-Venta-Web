import {pool} from '../db.js'

export const getProductos = async (req, res) => {
   const [rows] = await pool.query('SELECT * FROM productos')
    res.json(rows)
}

export const getProducto = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM productos WHERE idproducto = ?', [req.params.id])
    
    if(rows.length <= 0) return res.status(404).json({
        message: 'Producto no encontrado'
    })

    res.json(rows[0])
 }

export const createProductos = async (req, res) => {
    const {idcategoria, codigo, nombre, precio_venta, stock, descripcion} = req.body
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
}

export const eliminarProducto = async (req, res) => {
    const [result] = await pool.query('DELETE FROM productos WHERE idproducto = ?', [req.params.id])
    
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Producto no encontrado'
    })

    res.sendStatus(204)
}

export const updateProducto = async (req, res) => {
    const {id} = req.params
    const {idcategoria, codigo, nombre, precio_venta, stock, descripcion} = req.body
    const [result] = await pool.query('UPDATE productos SET idcategoria = ?, codigo = ?, nombre = ?, precio_venta = ?, stock = ?, descripcion = ? WHERE idproducto = ?', [ idcategoria, codigo, nombre, precio_venta, stock, descripcion, id])
    console.log(result)

    if (result.affectedRows === 0) return res.status(404).json({
        message: 'Producto no encontrado'
    })

    res.sendStatus(204)
}
