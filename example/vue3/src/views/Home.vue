<template>
  <div>
    <h1>Home</h1>
    <dl>
        <dt>自定义指令埋点:</dt>
        <dd>v-burypoint</dd>
    </dl>
    <button  v-burypoint="{ id: 'home_button_click', eventResource: '{xxid: 12}' }" data-track="getLoadingTime">Increment</button>
  </div>
</template>
<script setup lang="ts">

</script>
