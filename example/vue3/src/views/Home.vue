<template>
  <div>
    <h1>Home</h1>
    <p>{{ message }}</p>
    <button @click="increment">Increment</button>
    <p>Count: {{ count }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
const message = ref('Hello, Vue 3!')
const increment = () => {
  count.value++
}
</script>
