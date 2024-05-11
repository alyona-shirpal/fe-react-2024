export const getCartTotalAmount = (): number => {
    const totalArray = localStorage.getItem('cartIds');
    const total = totalArray ? JSON.parse(totalArray) : [];

    return total.length;
};
