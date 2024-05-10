export const getTotalCartCount = () => {
    let totalCart = 0;
    for (let index = 0; index < localStorage.length; index++) {
        const key = localStorage.key(index);
        if (key && key.startsWith('cartCount-')) {
            const count = Number(localStorage.getItem(key));
            totalCart += count;
        }
    }
    return totalCart;
};
