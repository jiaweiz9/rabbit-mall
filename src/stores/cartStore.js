import {defineStore} from "pinia";
import {computed, ref} from 'vue';
import {useUserStore} from "@/stores/user";
import {insertCartAPI, findNewCartListAPI, delCartAPI} from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])
    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    const addCart = async (goods) => {
        const {skuId, count} = goods
        if(isLogin.value) {
            await insertCartAPI({skuId, count})
            const res = await findNewCartListAPI()
            cartList.value = res.result
        }
        else {
            // 添加购物车操作
            // 已添加过 - count + 1
            // 没有添加过 - 直接push
            // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                // 找到了
                item.count = item.count + goods.count
            } else {
                // 没找到
                cartList.value.push(goods)
            }
        }
    }
    // 删除购物车
    const delCart = async (skuId) => {
        if(isLogin.value) {
            await delCartAPI([skuId])
            const res = await findNewCartListAPI()
            cartList.value = res.result
        }
        else{
            // 思路：
            // 1. 找到要删除项的下标值 - splice
            // 2. 使用数组的过滤方法 - filter
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx, 1)
        }
    }

    const clearCart = () => {
        cartList.value = []
    }

    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }
    // 全选功能action
    const allCheck = (selected) => {
        // 把cartList中的每一项的selected都设置为当前的全选框状态
        cartList.value.forEach(item => item.selected = selected)
    }

// 是否全选计算属性
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce(
        (a, c) => a + c.count, 0))
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce(
        (a, c) => a + c.count * c.price, 0))
    return {
        cartList,
        allCount,
        allPrice,
        updateNewList,
        addCart,
        delCart,
        clearCart,
        isAll,
        singleCheck,
        allCheck,
        selectedCount,
        selectedPrice
    }
}, {
    persist: true
})