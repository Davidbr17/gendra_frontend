<template>
  <div class="bg-login">
    <b-container class="d-flex justify-content-center align-items-center vh-100">
      <b-card class="login-card p-2 px-4" >
      
        <b-card-title>
          <h5><b-icon-arrow-left-circle-fill style="cursor:pointer" @click="step = 0" v-if="step != 0"/> Gendra prueba</h5>
        </b-card-title>

        <hr>
        
        <b-card-body v-if="step === 0">
          <div class="text-center pt-4 pb-5">
            <a @click="step = 'register'" class="text-white" href="#">Registrar equipo</a>

            <br><br>

            <a href="#" class="text-white" @click="step= 'admin'">Iniciar sesión como administrador</a>
          </div>
        </b-card-body>

        <!--
          FORMULARIO DE REGISTO
        -->

        <b-card-body v-if="step === 'register'">
          <div class="">
            <h5 class="text-center">Registrar equipo</h5>
            <br>
            <b-form @submit.prevent="step = 'team_select'">

              <b-form-group
                label="Nombre:"
                class="mb-2"
              >
                <b-form-input
                  v-model="trainer.name"
                  type="text"
                  v-validate="'required'"
                  placeholder="Nombre"
                  name="trainer_name"
                  required
                ></b-form-input>
              </b-form-group>


              <b-form-group
                label="Apellido:"
                class="mb-2"
              >
                <b-form-input
                  v-model="trainer.lastname"
                  type="text"
                  v-validate="'required'"
                  placeholder="Apellido"
                  name="trainer_lastname"
                  required
                ></b-form-input>
              </b-form-group>


              <b-form-group
                label="Email:"
                class="mb-2"
              >
                <b-form-input
                  v-model="trainer.email"
                  type="email"
                  v-validate="'required'"
                  placeholder="Email"
                  name="trainer_email"
                  required
                ></b-form-input>
              </b-form-group>

                <b-form-group
                  label="Fecha de nacimiento:"
                  class="mb-2"
                >
                  <b-form-input
                    v-model="trainer.date_birth"
                    type="date"
                    v-validate="'required'"
                    placeholder="Fecha de nacimiento"
                    name="trainer_date_birth"
                    required
                  ></b-form-input>
              </b-form-group>


              <button class="w-100 btn btn-primary btn-block mt-4">
                <span>Siguiente</span> 
              </button>

            </b-form>
          </div>
        </b-card-body>
 
        <!--
          SECCIÓN DE SELECCIÓN DE EQUIPO
        -->
        
        <b-card-body v-if="step === 'team_select'">

          <h5 class="text-center">Registrar equipo</h5>
          <br>
          <p class="text-center">
            Selecciona 6 pokemons <br> para crear tu equipo.
          </p>
          <br>
          
          <div style="max-height: 400px;overflow: scroll;" class="px-3" >
            <b-input placeholder="Buscar" class="mb-2" v-model="search"></b-input>
            <b-list-group style="max-height: 200px;overflow: scroll; min-height: 200px; width: 230px;">
              <b-list-group-item 
                style="cursor:pointer;"
                @click="pokemonStatus(pokemon)"
                v-for="(pokemon, i) in searchP" :key="i"
                :class="pokemon.selected ? 'bg-secondary' : 'bg-white'"
                >

                {{ pokemon.nombre}}

              </b-list-group-item>
            </b-list-group>

            <p v-if='selected_pokemons.length < 6' class="text-center mt-2 text-warning">
              Faltan {{ 6 - selected_pokemons.length }} pokemons <br> para completar tu equipo
            </p>

            <br>
            
            <div v-if="selected_pokemons.length > 0">
              <p class="text-center">Tu equipo</p>
              <b-list-group style="max-height: 150px;overflow: scroll; min-height: 200px; width: 230px;">
                <b-list-group-item 
                  style='cursor:pointer;'
                  @click="pokemon.selected = !pokemon.selected; "
                  v-for="(pokemon, i) in selected_pokemons" :key="i"
                  >

                  {{ pokemon.nombre }}

                </b-list-group-item>
              </b-list-group>
            </div>

          </div>

          <button @click="store()" v-if="selected_pokemons.length === 6" class="w-100 btn btn-primary btn-block mt-5" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>Enviar</span>
          </button>
        
        </b-card-body>


        <!--
          FORMULARIO PARA INICIAR SESIÓN ADMIN
        -->

        <b-card-body v-else-if="step === 'admin'">
          <!-- Formulario Login-->
          <b-form @submit.prevent="handleLogin">

            <b-form-group
              label="Email:"
            >
              <b-form-input
                v-model="user.email"
                type="email"
                v-validate="'required'"
                placeholder="Email"
                name="email"
                required
              ></b-form-input>
            </b-form-group>

            <br>

            <b-form-group
              label="Password:"
            >
              <b-form-input
                v-model="user.password"
                type="password"
                v-validate="'required'"
                placeholder="Password"
                name="password"
                required
              ></b-form-input>
            </b-form-group>

            <div v-if="message" class="alert alert-danger mt-3" role="alert">{{message}}</div>

            <button class="w-100 btn btn-primary btn-block mt-5" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Login</span>
            </button>
          </b-form>
        </b-card-body>
      </b-card>
    </b-container>
  </div>
</template>

<script>
  import User from '../models/user';
  import Trainer from '../models/trainer';
  import Vue from 'vue'
  import VueSweetalert2 from 'vue-sweetalert2';
  import 'sweetalert2/dist/sweetalert2.min.css';

  Vue.use(VueSweetalert2);

  export default {
    name:'LoginView',
    data() {
      return {
        user: new User('', ''),
        loading: false,
        message: '',
        error: false,
        step : 0,
        trainer : new Trainer("","","",""),
        pokemons:[],
        search: ''
      };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      searchP(){
         const search = this.search

         if(search === ''){
           return this.pokemons
         }

         return this.pokemons.filter( p => p.nombre.includes(search) )
      },
      selected_pokemons(){
        return this.pokemons.filter( p => p.selected)
      }
    },
    methods: {
      pokemonStatus(p){
         if(!p.selected && this.selected_pokemons.length >= 6){
            this.$swal.fire(
              '',
              'El máximo de pokemons en un equipo es de 6',
              'warning'
            )
         }else{
           p.selected = !p.selected
         }
      },
      store(){
        this.loading = true;

        let data = this.trainer
        let pokemons = this.selected_pokemons

        data.pokemons = pokemons.map(p => {
          return {
            pokemon : p.nombre,
            url : p.url
          }
        })

        const self = this

        this.$axios.post('/trainer',data).then( () => {
              this.$swal.fire(
                'Registro exitoso',
                '',
                'success'
              )
              this.loading = false;
              this.trainer = new Trainer("","","","")
              this.step = 0
              this.pokemons.map(p => {
                p.selected = false
              })
        }).catch(function (error) {
          if (error.response) {
            switch (error.response.status) {
              case 422:
                  self.$swal.fire(
                    error.response.data.message,
                    '',
                    'danger'
                  )
                  self.step = 'register'
                break;
              case 423:
                  self.$swal.fire(
                    error.response.data.message,
                    '',
                    'danger'
                  )
                  self.step = 0
                break;  
            
              default:
                  self.$swal.fire(
                        'Hay un problema, intenta de nuevo más tarde.',
                        '',
                        'danger'
                  )
                 self.step = 0
                break;
            }
            
            self.loading = false
          }
        })
      },
      handleLogin() {
        this.loading = true;
        this.$validator.validateAll().then(isValid => {
          if (!isValid) {
            this.loading = false;
            return;
          }

          if (this.user.email && this.user.password) {
            this.$store.dispatch('auth/login', this.user).then(
              r => {
                this.$axios.defaults.headers.common['Authorization'] = `Bearer ${r.accessToken}`;
                this.$router.push('/');
              },
              () => {
                this.loading = false;
                this.message = 'Credenciales inválidas'
              }
            );
          }
        });
      },

      getAllPokemon(){
        this.$axios.get('https://pokeapi.co/api/v2/pokemon?limit=2000').then( r => {
              this.pokemons = r.data.results
              this.pokemons = this.pokemons.map(p => {
                return {
                  selected : false,
                  nombre: p.name,
                  url : p.url
                }
                
              })
        })
      }
    },
    created() {
      if (this.loggedIn) {
        this.$router.push('/');
      }

      this.getAllPokemon()
      //this.$axios.get('/jugador')
    },
  };
</script>


<style>
 .vh-100{
   height : 100vh;
 }


 .login-card{
   max-width: 30rem;
   background-color: #0167c6!important;
   color: white;
 }

 .bg-login{
    background-image: url(https://lh3.googleusercontent.com/05JfZ1ZdyzrRNvhJosUFdcjjJRFE7k2KhmeM2ujqeCbrcrCb1hkq7O_JdUBpQ3r9hi0YeSn4WgmKx3Ai8LHdM2SucxSzl9TRZ4fCAqETJ6WtHgE=w1440-e365);
    background-size: cover;
 }
</style>