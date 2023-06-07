<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h1 class="pt-3">訂單</h1>

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">訂單編號</th>
                            <th scope="col">會員編號</th>
                            <th scope="col">總價</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="order in orderList" :key='order'>
                            <td>{{ order.orderID }}</td>
                            <td>{{ order.memberID }}</td>
                            <td>{{ order.price }}</td>
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
            orderList: []
        }
    },
    methods: {
        async getOrderList() {
            await axios.get(`${this.baseURL}/orders`)
                .then(res => {
                    this.orderList = res.data.data
                })
                .catch(err => console.log(err));
        }
    },
    mounted() {
        this.getOrderList();
    },

}
</script>

<style scoped></style>