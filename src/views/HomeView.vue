<template>
  <div>
    <Header/>
    <Menu/>
    <Equipos/>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
import Header from '@/components/Header.vue'
import Equipos from '@/components/Equipos.vue'

export default {
  name: 'HomeView',
  components: {
    Menu,
    Header,
    Equipos
  }
}
</script>
