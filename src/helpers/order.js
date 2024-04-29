const orderArray = (array) => {
    const order = array
    order.sort((a, b) => (a.name > b.name) ? 1: -1)
    return order
}

export default orderArray