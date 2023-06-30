<script setup>
import LayoutNav from "@/views/Layout/components/LayoutNav.vue";
import LayoutHeader from "@/views/Layout/components/LayoutHeader.vue";
import LayoutFooter from "@/views/Layout/components/LayoutFooter.vue";
import LayoutSticky from "@/views/Layout/components/LayoutSticky.vue";
import { onMounted } from "vue";
import { useCategoryStore } from "@/stores/category";

const categoryStore = useCategoryStore()
onMounted(() => categoryStore.getCategory())

</script>

<template>
  <LayoutSticky />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>