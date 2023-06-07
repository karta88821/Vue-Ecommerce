<template>
    <div class="container">

        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <h1>新增產品</h1>
                <form>
                    <div class="mb-3">
                        <label class="form-label">商品名稱</label>
                        <input type="text" class="form-control" v-model="productName"/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">商品售價</label>
                        <input type=number step=0.01 class="form-control"  v-model="productPrice"/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">商品庫存</label>
                        <input type=number step=1 class="form-control" v-model="productQuantity"/>
                    </div>
                    <button type="button" class="btn btn-primary" @click="addProduct">送出</button>
                </form>
            </div>
            <div class="col-3"></div>

        </div>
    </div>
</template>

<script>
const axios = require('axios');
const sweetalert = require('sweetalert');

export default {
    data() {
        return {
            productName: "",
            productPrice: "",
            productQuantity: "",
        }
    },
    methods: {
        addProduct() {

            if (this.productName == "" || this.price == "" || this.quantity == "") {
                sweetalert({
                    text: '所有欄位皆必須填寫!',
                    icon: "error"
                })
                return;
            }

            if (this.price <= 0) {
                sweetalert({
                    text: '產品價格必須大於0!',
                    icon: "error"
                })
                return;
            }

            if (this.quantity < 0) {
                sweetalert({
                    text: '產品庫存不可為負值!',
                    icon: "error"
                })
                return;
            }

            const newProduct = {
                productName: this.productName,
                price: this.productPrice,
                quantity: this.productQuantity
            };

            //const baseURL = "http://localhost:8081/api";

            axios
            .post("http://localhost:8081/api/products", newProduct)
            .then(() => {
                sweetalert({
                    text: '新增產品成功!',
                    icon: "success"
                })
                .then(() => {
                    this.$router.push('/products/list');
                });
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped></style>