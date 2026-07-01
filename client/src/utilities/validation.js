/**
 * Returns an error message string if the combo is impossible, otherwise null.
 */
export const validateCombination = ({ roof, wheels }) => {
    if (roof === 'Convertible' && wheels === 'Off-Road') {
        return 'Impossible combination: A convertible roof cannot be paired with off-road wheels. Please choose a different roof or wheel option.'
    }
    return null
}
