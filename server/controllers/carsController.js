import { pool } from '../config/database.js'

// GET all cars
export const getCars = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM custom_cars ORDER BY created_at DESC'
        )
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to retrieve cars.' })
    }
}

// GET single car by id
export const getCar = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query(
            'SELECT * FROM custom_cars WHERE id = $1',
            [id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found.' })
        }
        res.json(result.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to retrieve car.' })
    }
}

// POST create new car
export const createCar = async (req, res) => {
    try {
        const { name, exterior, roof, wheels, interior, total_price } = req.body
        if (!name || !exterior || !roof || !wheels || !interior || total_price === undefined) {
            return res.status(400).json({ error: 'All fields are required.' })
        }
        // Impossible combo check
        if (roof === 'Convertible' && wheels === 'Off-Road') {
            return res.status(400).json({
                error: 'Impossible combination: A convertible cannot be paired with off-road wheels.'
            })
        }
        const result = await pool.query(
            `INSERT INTO custom_cars (name, exterior, roof, wheels, interior, total_price)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, exterior, roof, wheels, interior, total_price]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to create car.' })
    }
}

// PUT update existing car
export const updateCar = async (req, res) => {
    try {
        const { id } = req.params
        const { name, exterior, roof, wheels, interior, total_price } = req.body
        if (!name || !exterior || !roof || !wheels || !interior || total_price === undefined) {
            return res.status(400).json({ error: 'All fields are required.' })
        }
        // Impossible combo check
        if (roof === 'Convertible' && wheels === 'Off-Road') {
            return res.status(400).json({
                error: 'Impossible combination: A convertible cannot be paired with off-road wheels.'
            })
        }
        const result = await pool.query(
            `UPDATE custom_cars
             SET name = $1, exterior = $2, roof = $3, wheels = $4, interior = $5, total_price = $6
             WHERE id = $7 RETURNING *`,
            [name, exterior, roof, wheels, interior, total_price, id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found.' })
        }
        res.json(result.rows[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to update car.' })
    }
}

// DELETE car
export const deleteCar = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query(
            'DELETE FROM custom_cars WHERE id = $1 RETURNING *',
            [id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found.' })
        }
        res.json({ message: 'Car deleted successfully.', car: result.rows[0] })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to delete car.' })
    }
}
