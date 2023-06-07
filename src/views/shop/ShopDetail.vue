<template>
    <div class="container">

        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">

                <div class="card">
                    <h5 class="card-header">產品詳細資訊</h5>
                    <div class="card-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-3">
                                    產品編號
                                </div>
                                <div class="col-3">
                                    {{ this.product.productID }}
                                </div>
                                <div class="col-4">

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-3">
                                    產品名稱
                                </div>
                                <div class="col-3">
                                    {{ this.product.productName }}
                                </div>
                                <div class="col-4">

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-3">
                                    產品單價
                                </div>
                                <div class="col-3">
                                    {{ this.product.price }}
                                </div>
                                <div class="col-4">

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-3">
                                    產品庫存
                                </div>
                                <div class="col-3">
                                    {{ this.product.quantity }}
                                </div>
                                <div class="col-4">

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-3">
                                    選擇數量
                                </div>
                                <div class="col-3">
                                    <input v-model="selectedQuantity" type="number">
                                </div>
                                <div class="col-4">

                                </div>
                            </div>
                        </div>

                        <button @click="addToCart">
                            加入購物車
                        </button>

                    </div>
                </div>
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
            quantityInCart: "",
            selectedQuantity: "",
            baseURL: "http://localhost:8081/api",
            product: ""
        }
    },

    methods: {
        async getProduct() {
            await axios.get(`${this.baseURL}/products/${this.$route.params.productID}`)
                .then(res => {
                    this.product = res.data.data
                })
                .catch(err => console.log(err));
        },
        getCartInfo() {
            if (localStorage.hasOwnProperty("cart")) {
                let cart = JSON.parse(localStorage.getItem("cart"));

                cart.forEach(item => {
                    if (item.productID == this.product.productID) {
                        this.quantityInCart = item.selectedQuantity;
                    }
                });
            }
        },
        addToCart() {

            if (this.selectedQuantity + this.quantityInCart > this.product.quantity) {
                sweetalert({
                    text: '所選擇數量不可大於庫存數量!',
                    icon: "error"
                })
                return;
            }

            let cart = [];

            if (localStorage.hasOwnProperty("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }

            if (this.quantityInCart > 0) {
                cart.forEach((item, index) => {
                    if (item.productID == this.product.productID) {
                        cart[index].selectedQuantity += this.selectedQuantity;
                    }
                });
            } else {
                let cartItem = {
                    product: this.product,
                    selectedQuantity: this.selectedQuantity
                }
                cart.push(cartItem);
            }


            localStorage.setItem("cart", JSON.stringify(cart));

            this.$router.push({ path: "/shop" });
        }
    },
    mounted() {
        this.getProduct();
        this.getCartInfo();
    },
}
</script>

<style scoped></style>