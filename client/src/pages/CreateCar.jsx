import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCar } from '../services/CarsAPI'
import { OPTION_PRICES, calcTotalPrice, formatPrice } from '../utilities/calcprice'
import { validateCombination } from '../utilities/validation'
import '../App.css'

const EXTERIOR_COLORS = {
    'Black':  '#1a1a1a',
    'Red':    '#c0392b',
    'Blue':   '#2980b9',
    'White':  '#ecf0f1',
    'Silver': '#95a5a6'
}

const CarPreview = ({ form }) => {
    const c = EXTERIOR_COLORS[form.exterior] || '#555'
    const wheelColor = form.wheels === 'Luxury' ? '#c0a030'
        : form.wheels === 'Sport' ? '#e74c3c'
        : form.wheels === 'Off-Road' ? '#7f8c8d' : '#555'
    const intColor = form.interior === 'Carbon Fiber' ? '#2c2c2c'
        : form.interior === 'Leather' ? '#8B4513'
        : form.interior === 'Suede' ? '#8e7b5e' : '#d5c8b0'
    const winColor = form.roof === 'Panoramic' ? '#7ecef4' : '#aaddff'
    return (
        <svg viewBox="0 0 400 160" width="380" height="152" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="80" width="320" height="55" rx="10" fill={c} stroke="#000" strokeWidth="2" />
            {form.roof !== 'Convertible' && <>
                <path d="M110,80 L150,35 L260,35 L300,80 Z" fill={c} stroke="#000" strokeWidth="2" />
                <path d="M155,38 L148,78 L195,78 L195,38 Z" fill={winColor} stroke="#000" strokeWidth="1.5" opacity="0.8" />
                <path d="M215,38 L215,78 L262,78 L255,38 Z" fill={winColor} stroke="#000" strokeWidth="1.5" opacity="0.8" />
            </>}
            {form.roof === 'Panoramic' && <rect x="152" y="36" width="106" height="8" fill="#7ecef4" opacity="0.95" />}
            {form.roof === 'Convertible' && <path d="M110,80 Q200,50 300,80" fill="none" stroke={c} strokeWidth="3" strokeDasharray="8,4" />}
            <circle cx="115" cy="135" r="22" fill={wheelColor} stroke="#000" strokeWidth="2" />
            <circle cx="115" cy="135" r="10" fill="#222" stroke="#888" strokeWidth="1.5" />
            <circle cx="285" cy="135" r="22" fill={wheelColor} stroke="#000" strokeWidth="2" />
            <circle cx="285" cy="135" r="10" fill="#222" stroke="#888" strokeWidth="1.5" />
            <rect x="155" y="82" width="90" height="30" rx="4" fill={intColor} opacity="0.7" />
        </svg>
    )
}

const CreateCar = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '', exterior: 'Black', roof: 'Standard', wheels: 'Standard', interior: 'Cloth'
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const totalPrice = calcTotalPrice(form)
    const carColor = EXTERIOR_COLORS[form.exterior]

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const comboError = validateCombination(form)
        if (comboError) { setError(comboError); return }
        if (!form.name.trim()) { setError('Please give your car a name.'); return }
        setLoading(true)
        try {
            await createCar({ ...form, total_price: totalPrice })
            navigate('/customcars')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main style={{ flexDirection: 'column', padding: '20px 50px' }}>
            <div style={{
                width: '100%', height: '200px', borderRadius: '12px', marginBottom: '20px',
                background: `linear-gradient(135deg, ${carColor}cc 0%, ${carColor}44 100%)`,
                border: `3px solid ${carColor}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.4s ease', position: 'relative', overflow: 'hidden'
            }}>
                <CarPreview form={form} />
                <div style={{
                    position: 'absolute', bottom: '10px', left: '20px',
                    background: 'rgba(0,0,0,0.75)', padding: '6px 14px',
                    borderRadius: '8px', fontSize: '1.3rem', fontWeight: 700, color: 'white'
                }}>
                    {formatPrice(totalPrice)}
                </div>
            </div>

            <article>
                <header><h2>Customize Your Car</h2></header>
                {error && (
                    <div style={{ background: 'rgba(192,0,0,0.85)', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', color: 'white' }}>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <label>
                        Car Name
                        <input type="text" name="name" placeholder="e.g. Night Rider"
                            value={form.name} onChange={handleChange} required />
                    </label>
                    <div className="grid">
                        <label>
                            Exterior Color&nbsp;
                            <span style={{ color: carColor === '#1a1a1a' ? '#aaa' : carColor, fontWeight: 700 }}>
                                {form.exterior}
                            </span>
                            <select name="exterior" value={form.exterior} onChange={handleChange}>
                                {Object.entries(OPTION_PRICES.exterior).map(([opt, price]) => (
                                    <option key={opt} value={opt}>{opt} {price > 0 ? `(+${formatPrice(price)})` : '(included)'}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Roof Type
                            <select name="roof" value={form.roof} onChange={handleChange}>
                                {Object.entries(OPTION_PRICES.roof).map(([opt, price]) => (
                                    <option key={opt} value={opt}>{opt} {price > 0 ? `(+${formatPrice(price)})` : '(included)'}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="grid">
                        <label>
                            Wheels
                            <select name="wheels" value={form.wheels} onChange={handleChange}>
                                {Object.entries(OPTION_PRICES.wheels).map(([opt, price]) => (
                                    <option key={opt} value={opt}>{opt} {price > 0 ? `(+${formatPrice(price)})` : '(included)'}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Interior
                            <select name="interior" value={form.interior} onChange={handleChange}>
                                {Object.entries(OPTION_PRICES.interior).map(([opt, price]) => (
                                    <option key={opt} value={opt}>{opt} {price > 0 ? `(+${formatPrice(price)})` : '(included)'}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <footer style={{ justifyContent: 'flex-end' }}>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Creating...' : `Create Car — ${formatPrice(totalPrice)}`}
                        </button>
                    </footer>
                </form>
            </article>
        </main>
    )
}

export default CreateCar
