export default function genPrice(price: number) {
    return parseFloat(price.toFixed(1))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
