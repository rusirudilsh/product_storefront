import type { ProductOrder } from '../models/ProductOrder';
import { EnvironmentSettings } from '../../config';
import axios from 'axios';


const headers = EnvironmentSettings.productsAPISettings.headers;

export const productList = async (category: string, isByAvailability: boolean, first: number, per_page_count: number) => 
    await axios.get(EnvironmentSettings.productsAPISettings.baseUrl + 
        `product/list?category=${category}&stock_availability=${isByAvailability}&first=${first}&products_per_page=${per_page_count}`,
         {headers});

export const categoryList = async () => 
    await axios.get(EnvironmentSettings.productsAPISettings.baseUrl + 'category/list', {headers});

export const postOrder = async (order: ProductOrder) => 
    await axios.post(EnvironmentSettings.productsAPISettings.baseUrl + 'order/', JSON.stringify(order), {headers});