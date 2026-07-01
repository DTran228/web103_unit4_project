import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCar, deleteCar } from '../services/CarsAPI'
import { formatPrice } from '../utilities/calcprice'
import '../App.css'

const EXTERIOR_COLORS = {
    'Black': '#1a1a1a', 'Red': '#c0392b', 'Blue': '#2980b9', 'White': '#ecf0f1', 'Silver': '#95a5a6'
}

const CarPreview = ({ car }) => {
    const c = EXTERIOR_COLORS[car.exterior] || '#555'
    const wheelColor = car.wheels === 'Luxury' ? '#c0a030'
        : car.wheels === 'Sport' ? '#e74c3c'
        : car.wheels === 'Off-Road' ? '#7f8c8d' : '#555'
    const intColor = car.interior === 'Carbon Fiber' ? '#2c2c2c'
        : car.interior === 'Leather' ? '#8B4513'
        : car.interior === 'Suede' ? '#8e7b5e' : '#d5c8b0'
    const winColor = car.roof === 'Panoramic' ? '#7ecef4' : '#aaddff'
    return (
        <svg viewBox="0 0 400 160" width="380" height="152" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="80" width="320" height="55" rx="10" fill={c} stroke="#000" strokeWidth="2" />
            {car.roof !== 'Convertible' && <>
                <path d="M110,80 L150,35 L260,35 L300,80 Z" fill={c} stroke="#000" strokeWidth="2" />
                <path d="M155,38 L148,78 L195,78 L195,38 Z" fill={winColor} stroke="#000" strokeWidth="1.5" opacity="0.8" />
                <path d="M215,38 L215,78 L262,78 L255,38 Z" fill={winColor} stroke="#000" strokeWidth="1.5" opacity="0.8" />
            </>}
            {car.roof === 'Panoramic' && <rect x="152" y="36" width="106" height="8" fill="#7ecef4" opacity="0.95" />}
            {car.roof === 'Convertible' && <path d="M110,80 Q200,50 300,80" fill="none" stroke={c} strokeWidth="3" strokeDasharray="8,4" />}
            <circle cx="115" cy="135" r="22" fill={wheelColor} stroke="#000" strokeWidth="2" />
            <circle cx="115" cy="135" r="10" fill="#222" stroke="#888" strokeWidth="1.5" />
            <circle cx="285" cy="135" r="22" fill={wheelColor} stroke="#000" strokeWidth="2" />
            <circle cx="285" cy="135" r="10" fill="#222" stroke="#888" strokeWidth="1.5" />
            <rect x="155" y="82" width="90" height="30" rx="4" fill={intColor} opacity="0.7" />
        </svg>
    )
}

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCar(id)
            .then(setCar)
            .catch(() => navigate('/customcars'))
            .finally(() => setLoading(false))
    }, [id])

    const handleDelete = async () => {
        if (!window.confirm(`Delete "${car.name}"?`)) return
        await deleteCar(car.id)
        navigate('/customcars')
    }

    if (loading) return <main style={{ padding: '40px 50px' }}><p>Loading...</p></main>
    if (!car) return null

    const color = EXTERIOR_COLORS[car.exterior] || '#555'

    return (
        <main style={{ flexDirection: 'column', padding: '20px 50px' }}>
            <div style={{
                width: '100%', height: '200px', borderRadius: '12px', marginBottom: '20px',
                background: `linear-gradient(135deg, ${color}cc 0%, ${color}44 100%)`,
                border: `3px solid ${color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden'
            }}>
                <CarPreview car={car} />
                <div style={{
                    position: 'absolute', bottom: '10px', left: '20px',
                    background: 'rgba(0,0,0,0.75)', padding: '6px 14px',
                    borderRadius: '8px', fontSize: '1.3rem', fontWeight: 700, color: 'white'
                }}>
                    {formatPrice(car.total_price)}
                </div>
            </div>

            <article>
                <header>
                    <h2 style={{ marginBottom: '4px' }}>{car.name}</h2>
                    <small style={{ color: '#aaa' }}>Created {new Date(car.created_at).toLocaleString()}</small>
                </header>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    {[['Exterior', car.exterior], ['Roof', car.roof], ['Wheels', car.wheels], ['Interior', car.interior]].map(([label, val]) => (
                        <div key={label} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '8px' }}>
                            <div style={{ fontSize: '0.85rem', color: '#aaa' }}>{label}</div>
                            <div style={{ fontWeight: 600 }}>{val}</div>
                        </div>
                    ))}
                </div>
                <footer>
                    <button onClick={() => navigate('/customcars')}>Back</button>
                    <button onClick={() => navigate(`/edit/${car.id}`)} style={{ background: '#2c2c2c' }}>Edit</button>
                    <button onClick={handleDelete} style={{ background: 'rgba(192,0,0,0.8)' }}>Delete</button>
                </footer>
            </article>
        </main>
    )
}

export default CarDetails
