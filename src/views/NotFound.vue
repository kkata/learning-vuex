<template>
  <div>
    <h1>Ooops!</h1>
    <h2>The {{ resource }} you're looking for is not here.</h2>
    <router-link :to="{name: 'event-list'}">Back to the home page</router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>
</style>
