<template>
   <div>
  <b-navbar toggleable="lg" class="navbar_color" type="dark" variant="dark">

    <b-collapse id="nav-collapse" is-nav>
      
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" style="margin-left: auto;">

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>Usuario</em>
          </template>
          <b-dropdown-item @click="logout()" href="#">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
  name:'HeaderComponent',
  methods:{
     logout(){
        this.$store.dispatch('auth/logout').then(
              () => {
                this.$router.push('/login');
              }
        )
     }
  }
}
</script>

<style>
  .navbar_color{
    background: #8a1538!important;
  }
  .bm-menu{
    background-color: #8a1538!important;
  }
</style>