import { pool } from './database.js'
import dotenv from 'dotenv'
dotenv.config()

const createTable = async () => {
    await pool.query(`
        DROP TABLE IF EXISTS custom_cars;

        CREATE TABLE custom_cars (
            id          SERIAL PRIMARY KEY,
            name        VARCHAR(255) NOT NULL,
            exterior    VARCHAR(50)  NOT NULL,
            roof        VARCHAR(50)  NOT NULL,
            wheels      VARCHAR(50)  NOT NULL,
            interior    VARCHAR(50)  NOT NULL,
            total_price INTEGER      NOT NULL,
            created_at  TIMESTAMP DEFAULT NOW()
        );

        INSERT INTO custom_cars (name, exterior, roof, wheels, interior, total_price) VALUES
            ('Night Rider',   'Black', 'Standard',    'Sport',    'Leather',      51000),
            ('Crimson Storm', 'Red',   'Convertible', 'Luxury',   'Suede',        57500),
            ('Ocean Breeze',  'Blue',  'Panoramic',   'Standard', 'Carbon Fiber', 54500);
    `)
    console.log('Table created and seeded successfully.')
    pool.end()
}

createTable()
