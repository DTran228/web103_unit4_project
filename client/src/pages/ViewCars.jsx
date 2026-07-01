import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllCars, deleteCar } from '../services/CarsAPI'
import { formatPrice } from '../utilities/calcprice'
import '../App.css'

const BORDER_COLORS = {
    'Black': '#1a1a1a', 'Red': '#c0392b', 'Blue': '#2980b9', 'White': '#bdc3c7', 'Silver': '#95a5a6'
}

const ViewCars = () => {
    const navigate = useNavigate()
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getAllCars()
            .then(setCars)
            .catch(() => setError('Failed to load cars.'))
            .finally(() => setLoading(false))
    }, [])

    const handleDelete = async (e, id, name) => {
        e.stopPropagation()
        if (!window.confirm(`Delete "${name}"?`)) return
        try {
            await deleteCar(id)
            setCars(prev => prev.filter(c => c.id !== id))
        } catch {
            alert('Failed to delete car.')
        }
    }

    if (loading) return <main style={{ padding: '40px 50px' }}><p>Loading cars...</p></main>
    if (error) return <main style={{ padding: '40px 50px' }}><p style={{ color: 'red' }}>{error}</p></main>

    return (
        <main style={{ flexDirection: 'column', padding: '20px 50px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Custom Cars ({cars.length})</h2>
                <button onClick={() => navigate('/')}>+ Customize New Car</button>
            </div>

            {cars.length === 0 ? (
                <article><p>No custom cars yet. <a href="/">Create your first one!</a></p></article>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                    {cars.map(car => (
                        <article key={car.id}
                            style={{ cursor: 'pointer', borderLeft: `5px solid ${BORDER_COLORS[car.exterior] || '#555'}` }}
                            onClick={() => navigate(`/customcars/${car.id}`)}>
                            <header>
                                <h3 style={{ margin: 0 }}>{car.name}</h3>
                                <small style={{ color: '#aaa' }}>{new Date(car.created_at).toLocaleDateString()}</small>
                            </header>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '0.9rem', marginBottom: '8px' }}>
                                <span>Exterior: {car.exterior}</span>
                                <span>Roof: {car.roof}</span>
                                <span>Wheels: {car.wheels}</span>
                                <span>Interior: {car.interior}</span>
                            </div>
                            <div style={{
                                background: 'rgba(115,2,12,0.8)', padding: '6px 12px',
                                borderRadius: '6px', display: 'inline-block', fontWeight: 700, marginBottom: '8px'
                            }}>
                                {formatPrice(car.total_price)}
                            </div>
                            <footer onClick={e => e.stopPropagation()}>
                                <button onClick={e => { e.stopPropagation(); navigate(`/edit/${car.id}`) }}
                                    style={{ background: '#2c2c2c' }}>
                                    Edit
                                </button>
                                <button onClick={e => handleDelete(e, car.id, car.name)}
                                    style={{ background: 'rgba(192,0,0,0.8)' }}>
                                    Delete
                                </button>
                            </footer>
                        </article>
                    ))}
                </div>
            )}
        </main>
    )
}

export default ViewCars
