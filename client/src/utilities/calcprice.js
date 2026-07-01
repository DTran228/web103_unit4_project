export const BASE_PRICE = 35000

export const OPTION_PRICES = {
    exterior: {
        'Black':  0,
        'Red':    2000,
        'Blue':   1500,
        'White':  1000,
        'Silver': 1800
    },
    roof: {
        'Standard':   0,
        'Panoramic':  5000,
        'Convertible': 8000
    },
    wheels: {
        'Standard': 0,
        'Sport':    3000,
        'Luxury':   4500,
        'Off-Road': 2500
    },
    interior: {
        'Cloth':        0,
        'Leather':      6000,
        'Suede':        7500,
        'Carbon Fiber': 9000
    }
}

export const calcTotalPrice = ({ exterior, roof, wheels, interior }) => {
    return (
        BASE_PRICE +
        (OPTION_PRICES.exterior[exterior] ?? 0) +
        (OPTION_PRICES.roof[roof] ?? 0) +
        (OPTION_PRICES.wheels[wheels] ?? 0) +
        (OPTION_PRICES.interior[interior] ?? 0)
    )
}

export const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
