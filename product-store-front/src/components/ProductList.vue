<script setup lang="ts">
import { onMounted, ref } from "vue"
import {productList,categoryList, postOrder} from "../services/ProductService"
import type { Product } from "../models/Products";
import Dropdown from 'primevue/dropdown';
import type { Category } from "../models/Categories";
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import Checkbox from 'primevue/checkbox';
import type { OrderItem, ProductOrder } from "../models/ProductOrder";


const products = ref(new Array<Product>())
const selectedCategory = ref("Filter by Category")
const categories = ref(new Array<Category>());
const isOnlyAvailableProducts = ref(false)
const toast = useToast();

const showProductLoadingError = () => {
  toast.add({ severity: 'error', 
  summary: 'Error Message', 
  detail: 'Error Loading Products', 
  life: 4000 });
}

const showProductPurchaseMessage = (isSuccess: boolean, messge?: string, statusCode?: number, ) => {
  toast.add({ severity: isSuccess == true ? 'success' : 'error', 
  summary: isSuccess ? 'Success' : 'Error Message' , 
  detail: statusCode == 200 ? messge : "Error Processing Order", 
  life: 4000 });
}

async function getProducts(){
  await productList()
  .then(res => {
    if (res.status != 200){
      showProductLoadingError()
    }  
    return res.json()
  })
  .then(data => {
    products.value = data?.products;
  })
  .catch(errror => {
    showProductLoadingError()
  });
}

async function getCategories() {
  await categoryList()
  .then(data=>{
    data?.productCategories.forEach((element: string, index: number) => {
    let category = {} as Category
    category.category_id = index;
    category.name = element
    categories.value.push(category)})})
  .catch(error=>{
    toast.add({ severity: 'error', 
    summary: 'Error Message', 
    detail: 'Error Loading Product Categorties', 
    life: 4000 });
  });
 
}

async function filterPoructs() {
  
}

async function makePurchase(product: Product){
  const orderItem = {"product_id" : product.product_id, "quantity": 1} as OrderItem;
  const productOrder = {"items" : [orderItem], "total": product.price} as ProductOrder;
  let statusCode = 0;
  await postOrder(productOrder)
  .then(res => {
    statusCode = res.status;
    return res.json()
  })
  .then(data => {
    console.log(statusCode)
    showProductPurchaseMessage(data?.isSuccess, data?.message, statusCode);
  })
  .catch(errror => {
    showProductPurchaseMessage(false);
  });
 
}




onMounted(async() => {
  await getProducts()
  await getCategories()
})

</script>


<template>
  <div>
    <div class="card flex justify-content-center">
        <Dropdown v-model="selectedCategory" :options="categories" optionLabel="name" placeholder="Select a City" class="w-full md:w-14rem" @change="hi()"/>
        <div class="flex align-items-center">
          <Checkbox v-model="isOnlyAvailableProducts" inputId="availability"  :binary="true" @change="filterPoructs()"/>
          <label for="availability" class="ml-2" > Show only availaple Products</label>
        </div>
    </div>
    
    <div class="card-box-container">     
      <div class="card-box">
          <div class="product-card" v-for="product in products" :key="product.product_id">
              <!-- <div class="img-container">
                <img src="../assets/img/top.png" alt="Avatar">
              </div>           -->
              <div class="container">
                  <h4><b>{{ product.name }}</b></h4>
                  <p>£{{ product.price }}</p>
              </div>   
              <div>
                <Button icon="pi pi-check" label="Buy" size="small" @click="makePurchase(product)"/>
              </div>     
          </div>
      </div>
    </div>
    <Toast />
  </div>
    
   
</template>

<style scoped>


.card-box-container{
  width: 1142px;
  margin: 0 auto;
}

.card-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 50px 0;
}
.product-card {
  display: inline-block;
  box-shadow: 0 20px 10px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  margin: 28px;
  width: 20%;
  height: 180px;
  background: floralwhite;
  color: black;
  padding: 10px;
}

img {
  border-radius: 5px 5px 0 0;
  width: 50%;
}


@media only screen and (max-width: 979px) {
  .ag-courses_item {
    -ms-flex-preferred-size: calc(50% - 30px);
    flex-basis: calc(50% - 30px);
  }
  .ag-courses-item_title {
    font-size: 24px;
  }
}

@media only screen and (max-width: 767px) {
  .card-box-container {
    width: 96%;
  }

}
@media only screen and (max-width: 639px) {
  .card {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
  }
  .ag-courses-item_title {
    min-height: 72px;
    line-height: 1;

    font-size: 24px;
  }
  .ag-courses-item_link {
    padding: 22px 40px;
  }
  .ag-courses-item_date-box {
    font-size: 16px;
  }
}

</style>