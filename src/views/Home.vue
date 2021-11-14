<template>
  <div class="home">
    <!--img alt="Vue logo" src="../assets/logo.png"-->
    <NeurusCard />
  </div>
</template>

<script>
// @ is an alias to /src
import NeurusCard from '@/components/NeurusCard.vue'

export default {
  name: 'Home',
  components: {
    NeurusCard
  }
}
</script>
