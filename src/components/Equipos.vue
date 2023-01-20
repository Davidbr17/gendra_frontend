<template>
  <b-container class="mt-5">
    <b-card title="Equipos">
        <b-card-body>

             <div style="text-align: right;">
                Periodo de inscripción
                <b-form-checkbox v-model="checked" name="check-button" size="lg" switch></b-form-checkbox>
             </div> 

             <v-server-table ref="trainers" url="/trainer" :columns="columns" :options="options" >
                <div slot="acciones" slot-scope="props" style="text-align:center;">

                     <b-button @click="infoEquipo = props.row" v-b-tooltip.hover title="Info" size="sm" v-b-modal.equipos-modal-info variant="primary">
                        <b-icon-info-circle-fill/>
                     </b-button>
                      
                </div>

                <span slot="pokemon 1" slot-scope="props">{{ props.row.team[0].pokemon }}</span>
                <span slot="pokemon 2" slot-scope="props">{{ props.row.team[1].pokemon }}</span>
                <span slot="pokemon 3" slot-scope="props">{{ props.row.team[2].pokemon }}</span>
             </v-server-table>
        </b-card-body>

        <Info v-if="infoEquipo" :equipo="infoEquipo"/>
    </b-card>
  </b-container>
</template>

<script>
   import {ServerTable} from 'vue-tables-2';
   import Vue from 'vue'
   import VueSweetalert2 from 'vue-sweetalert2';
   import 'sweetalert2/dist/sweetalert2.min.css';
   import Info from "@/components/Equipos/info.vue"

   Vue.use(VueSweetalert2);
   Vue.use(ServerTable);

   export default {
        name:'EquiposComponent',
        components: {
            Info
        },
        data() {
            return {
                checked: null,
                infoEquipo: null,
                columns: ['id','name','lastname','email','date_birth','pokemon 1','pokemon 2','pokemon 3','acciones'],
                equipos:[],
                options:{
                    filterable:['id','name','lastname','email','date_birth'],
                    async requestFunction(data) {
                        const result = await this.$axios.get('/trainer', {
                            params: data
                        }).catch(function (e) {
                            this.dispatch('error', e);
                        });

                        return result.data
                    },
                    headings: {
                        name: 'Nombre',
                        lastname: 'Apellido',
                        'date_birth' : 'Fecha de nacimiento',
                        acciones : ''
                    }
                },
                editEquipo : null
            };
        },
        watch:{
            checked(nV,lV){
                if(lV != null){
                    this.subcription(nV)
                }
            }
        },
        computed: {
            change () {
                return this.$store.state.crudHelper.changes
            }
        },
        methods:{
            subcription(v){
                this.$axios.put('/inscription', {inscription_period : v})
            },
            getInscription(){
                this.$axios.get('/inscription').then( r => {
                    this.checked = r.data.inscription_period != 0 ? true : false
                })
            }
        },
        created(){
            this.getInscription()
        }
   }
</script>