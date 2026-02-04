export const PRODUCT_CATEGORIES = [
    { id: 'Burger', label: 'Burger' },
    { id: 'Poulets', label: 'Poulets' },
    { id: 'Frites', label: 'Frites' },
    { id: 'Boissons', label: 'Boissons' }
];

export const ALL_CATEGORIES = ['Tout', ...PRODUCT_CATEGORIES.map(c => c.id)];