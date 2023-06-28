import type { ProductOrder } from '../models/ProductOrder';
import { EnvironmentSettings } from '../../config';
import type internal from 'stream';


export const productList = async (category: string, isByAvailability: boolean, first: number, per_page_count: number) => 
    await fetch(EnvironmentSettings.productsAPISettings.baseUrl + 
        `product/list?category=${category}&stock_availability=${isByAvailability}&first=${first}&products_per_page=${per_page_count}`, {
        method: 'GET',
        headers: EnvironmentSettings.productsAPISettings.headers
    });

export const categoryList = async () => 
    await fetch(EnvironmentSettings.productsAPISettings.baseUrl + 'category/list', {
        method: 'GET',
        headers: EnvironmentSettings.productsAPISettings.headers
    }).then(data => data.json());   

export const postOrder = async (order: ProductOrder) => 
    await fetch(EnvironmentSettings.productsAPISettings.baseUrl + 'order', {
        method: 'POST',
        headers: EnvironmentSettings.productsAPISettings.headers,
        body: JSON.stringify(order)
    });