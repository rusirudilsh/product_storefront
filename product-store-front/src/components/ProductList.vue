<script setup lang="ts">
import { onMounted, ref } from "vue"
import {productList,categoryList, postOrder} from "../services/ProductService"
import type { Product } from "../models/Product";
import Dropdown from 'primevue/dropdown';
import type { Category } from "../models/Category";
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import Checkbox from 'primevue/checkbox';
import type { OrderItem, ProductOrder } from "../models/ProductOrder";
import Paginator from 'primevue/paginator';
import Tag from 'primevue/tag';

const products = ref(new Array<Product>())
const totalProductCount = ref(0)
const defaulCategory = {"category_id": -1, "name": "All"} as Category
const selectedCategory = ref(defaulCategory)
const categories = ref(new Array<Category>());
const isOnlyAvailableProducts = ref(false)
const toast = useToast();
const firstPage = ref(0)
const productsPerPage = ref(10)

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
  console.log(selectedCategory.value)
  await productList(selectedCategory.value.name, 
  isOnlyAvailableProducts.value, 
  firstPage.value, 
  productsPerPage.value)
  .then(res => {
    if (res.status != 200){
      showProductLoadingError()
    }  
    return res.json()
  })
  .then(data => {
    products.value = data?.products;
    totalProductCount.value = data?.product_count;
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
    showProductPurchaseMessage(data?.isSuccess, data?.message, statusCode);
  })
  .catch(errror => {
    showProductPurchaseMessage(false);
  });
 
}

async function handlePagination() {
  await getProducts();
}

const getSeverity = (product: Product) => {
  return product.stock_count > 0 ? "success" : "danger";
};

const getProductInventoryStatus = (product: Product) => {
  return product.stock_count > 0 ? 'INSTOCK' : 'OUTOFSTOCK';
}

const resetFilters = async () => {
    selectedCategory.value = defaulCategory;
    isOnlyAvailableProducts.value = false;
    await getProducts()
}

onMounted(async() => {
  await getProducts()
  await getCategories()
})

</script>


<template>
  <div>
    <div class="card flex justify-content-end filter-bar">
        <Dropdown v-model="selectedCategory" :options="categories" optionLabel="name" placeholder="Filter by Category" class="" @change="getProducts()"/>
        <div class="flex align-items-center">
          <Checkbox class="ml-3" v-model="isOnlyAvailableProducts" inputId="availability"  :binary="true" @change="getProducts()"/>
          <label for="availability" class="ml-2" > Show only availaple Products</label>
          <Button class="ml-3" label="Clear" icon="pi pi-times" severity="danger" text raised rounded aria-label="Cancel" @click="resetFilters()"/>
        </div>
    </div>
    
    <div class="card">     
      <div class="card-box">
        <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" v-for="product in products" :key="product.product_id">
            <div class="p-4 border-1 surface-border surface-card border-round">
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-tag"></i>
                        <span class="font-semibold">{{ product.category }}</span>
                    </div>
                    <Tag :value="getProductInventoryStatus(product)" :severity="getSeverity(product)"></Tag>
                </div>
                <div class="flex flex-column align-items-center gap-3 py-5">
                    <!-- <img class="w-9 shadow-2 border-round" :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.name" /> -->
                    <div class="text-2xl font-bold">{{ product.name }}</div>
                    <Rating value="{product.rating}" readonly :cancel="false"></Rating>
                </div>
                <div class="flex align-items-center justify-content-between">
                    <span class="text-2xl font-semibold">£{{ product.price }}</span>
                    <Button icon="pi pi-shopping-cart" label="Buy" rounded :disabled="getProductInventoryStatus(product) === 'OUTOFSTOCK'"></Button>
                </div>
            </div>
        </div>
        
          <!-- <div class="product-card" v-for="product in products" :key="product.product_id">
      
              <div class="product-details-container">
                  <h3><b>{{ product.name }}</b></h3>
                  <h4><b>{{ product.category }}</b></h4>
                  <p>£{{ product.price }}</p>
                  <Tag :value="getProductInventoryStatus(product)" :severity="getSeverity(product)"></Tag>
              </div>   
              <div>
                <Button icon="pi pi-check" label="Buy" size="small" @click="makePurchase(product)"/>
              </div>     
          </div> -->
      </div>
      <div class="card" v-if="products.length > 0">
        <Paginator v-model:first="firstPage" v-model:rows="productsPerPage" 
        :totalRecords="totalProductCount" :rowsPerPageOptions="[10, 20]"  
        v-on:page="handlePagination()"></Paginator>
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


</style>