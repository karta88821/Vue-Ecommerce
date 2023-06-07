import { createRouter, createWebHistory } from 'vue-router'
import Product from '../views/product/Product.vue'
import AddProduct from '../views/product/AddProduct.vue'
import Shop from '../views/shop/Shop.vue'
import ShopDetail from '../views/shop/ShopDetail.vue'
import Cart from '../views/cart/Cart.vue'
import Order from '../views/order/Order.vue'

const routes = [
  {
    path: '/products/list',
    name: 'Product',
    component: Product
  },
  {
    path: '/products/add',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/shop/:productID',
    name: 'ShopDetail',
    component: ShopDetail
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
