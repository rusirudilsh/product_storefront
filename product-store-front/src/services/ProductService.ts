
export const productList = async () => 
    await fetch('http://localhost:8000/product/list');

export const categoryList = async () => 
    await fetch('http://localhost:8000/category/list').then(data => data.json());   