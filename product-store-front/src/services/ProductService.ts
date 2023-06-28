import { EnvironmentSettings } from '../../config';
import { ProductOrder } from './../models/ProductOrder';

export const productList = async () => 
    await fetch(EnvironmentSettings.productsAPISettings.baseUrl + 'product/list', {
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