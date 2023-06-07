<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h1 class="pt-3">產品管理</h1>
                <div>
                    <router-link to="/products/add" custom v-slot="{ navigate }">
                        <button @click="navigate" role="link">
                            新增產品
                        </button>
                    </router-link>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">產品編號</th>
                            <th scope="col">產品名稱</th>
                            <th scope="col">價格</th>
                            <th scope="col">庫存</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="product in productList" :key='product'>
                            <td>{{ product.productID }}</td>
                            <td>{{ product.productName }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.quantity }}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

export default {
    data() {
        return {
            baseURL: "http://localhost:8081/api",
            productList: []
        }
    },
    methods: {
        async getProductList() {
            await axios.get(`${this.baseURL}/products`, { params: { in_stock: 0 } })
                .then(res => {
                    this.productList = res.data.data
                })
                .catch(err => console.log(err));
        }
    },
    mounted() {
        this.getProductList();
    },

}
</script>

<style scoped></style>