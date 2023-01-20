<template>
    <Slide>
      <a id="equipos" class='click-route' @click="currentRouteName != 'equipos' ? $router.push('/') : ''"> 
        <span>Equiopos</span>
      </a>
    </Slide>
</template>


<script>
// import an animation
import { Slide } from 'vue-burger-menu'
// register the component
export default {
  name:'MenuComponent',
  components: {
    Slide
  },
  computed:{
    currentRouteName() {
        return this.$route.name;
    }
  },
  created(){
  }
}
</script>

<style>
  .bm-burger-button{
    left: 17px!important;
    top: 14px!important;
  }

  .click-route{
    cursor:pointer
  }

  .bm-overlay{
    background: rgba(0,0,0,0)!important;
  }
</style>