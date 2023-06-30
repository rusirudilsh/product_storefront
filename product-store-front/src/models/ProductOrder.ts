
export interface OrderItem{
    product_id: number
    quantity: number
}

export interface ProductOrder {
    items: Array<OrderItem>
    total: number
}
   