import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  if (process.client) {
    import('bootstrap/dist/css/bootstrap.min.css')
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
  }
})
