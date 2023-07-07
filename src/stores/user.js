import {defineStore} from "pinia";
import {ref} from "vue";
import {loginAPI} from "@/apis/user";
import {useCartStore} from "@/stores/cartStore";
import {mergeCartAPI} from "@/apis/cart";

export const useUserStore = defineStore('user', ()=>{
    const userInfo = ref({})
    const cartStore = useCartStore()
    const getUserInfo = async ({account, password}) => {
        const res = await loginAPI({account, password})
        userInfo.value = res.result
        mergeCartAPI(cartStore.cartList.map(item=>{
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))
        await cartStore.updateNewList()
    }
    const clearUserInfo = () => {
        userInfo.value = {}
        cartStore.clearCart()
    }
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},{
    persist: true
})