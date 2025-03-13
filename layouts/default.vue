<template>
  <div>
    <Header />
    <main class="container mt-3">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'

</script>
