<template>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <h3 class="pt-3">
                    購物車
                </h3>
            </div>
        </div>

        <!-- loop over the cart items and display -->

        <div class="row">
            <div class="card" style="width: 100rem;">
                <div class="card-header">
                    所選擇的產品
                </div>
                <ul v-for="cartItem in cartItems" :key="cartItem.product.productID" class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">產品編號</label>
                            <div class="col-sm-2">
                                {{ cartItem.product.productID }}
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">產品名稱</label>
                            <div class="col-sm-2">
                                {{ cartItem.product.productName }}
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">產品價錢</label>
                            <div class="col-sm-2">
                                {{ cartItem.product.productID * cartItem.selectedQuantity }}
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">選擇數量</label>
                            <div class="col-sm-2">
                                {{ cartItem.selectedQuantity }}
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label"></label>
                            <button @click="deleteItem(cartItem.product.productID)">
                                刪除產品
                            </button>
                        </div>

                    </li>
                </ul>

            </div>
        </div>

        <!-- display the price -->
        <div class="total-cost pt-2 text-right">
            <h5>Total : ${{ totalCost }}</h5>
        </div>

        <div class="row">
            <label class="col-sm-2 col-form-label">購買人編號</label>
            <input input="number" v-model="memberID">
        </div>



        <div class="row">
            <div class="col-12 text-center">
                <button @click="sumbitCart">
                    購買
                </button>
            </div>
        </div>


    </div>
</template>

<script>
const axios = require('axios');
const sweetalert = require('sweetalert');

export default {
    data() {
        return {
            baseURL: "http://localhost:8081/api",
            cartItems: [],
            totalCost: 0,
            memberID: ""
        }
    },
    methods: {
        listCartItems() {
            if (localStorage.hasOwnProperty("cart")) {
                let items = JSON.parse(localStorage.getItem("cart"));

                if (items.length > 0) {
                    let total = 0;

                    items.forEach(item => {
                        total += (item.product.price * item.selectedQuantity);
                    });

                    this.cartItems = items;
                    this.totalCost = total;
                }
            }
        },

        deleteItem(productID) {
            let cartItems = JSON.parse(localStorage.getItem("cart"));
            const pos = cartItems.map(item => item.productID).indexOf(productID);
            cartItems.splice(pos, 1);
            localStorage.setItem("cart", JSON.stringify(cartItems));
            this.$router.go(0);
        },

        sumbitCart() {

            if (this.memberID == "") {
                sweetalert({
                    text: 'memberID不可為空!',
                    icon: "error"
                });
                return;
            }

            if (localStorage.hasOwnProperty("cart")) {
                let cartItems = JSON.parse(localStorage.getItem("cart"));

                let form = {
                    memberID: this.memberID,
                    selections: []
                }

                cartItems.forEach(cartItem => {
                    const item = {
                        productID: cartItem.product.productID,
                        selectedQuantity: cartItem.selectedQuantity
                    }
                    form.selections.push(item);
                });

                axios
                    .post("http://localhost:8081/api/orders", form)
                    .then(() => {
                        sweetalert({
                            text: '新增訂單成功!',
                            icon: "success"
                        })
                            .then(() => {
                                localStorage.removeItem("cart");
                                this.$router.push('/orders');
                            });
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    },
    mounted() {
        this.listCartItems();
    },

}
</script>

<style scoped></style>