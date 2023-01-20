<template>
    <b-modal id="equipos-modal-crear" hide-footer title="Agregar nuevo equipo">
        <b-form @submit.prevent="store">
            <b-form-group
                label="Nombre:"
                label-for="input-nombre"
            >
                <b-form-input
                    id="input-nombre"
                    v-model="equipo.Nombre"
                    placeholder="Nombre"
                    v-validate="'required'"
                    name="Nombre"
                    required
                ></b-form-input>
            </b-form-group>
            <b-button @click="store()" variant="success" class="w-100 mt-3" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Guardar</span>
            </b-button>
        </b-form>
    </b-modal>
</template>

<script>
    import Equipo from '../../models/equipo';
    export default {
        name:'CrearComponent',
        data() {
            return {
                equipo: new Equipo(''),
                loading:false
            };
        },
        methods:{
            store(){
                this.loading = true;
                this.$validator.validateAll().then(isValid => {
                    if (!isValid) {
                        this.loading = false;
                        return;
                    }

                    if (this.equipo.Nombre) {
                        this.$axios.post('/equipo', this.equipo).then( () => {
                            this.loading = false;
                            this.equipo = new Equipo('')
                            this.$store.dispatch('crudHelper/isChanged')
                            this.$bvModal.hide('equipos-modal-crear')
                        })
                    }
                })
            }
        }
    }
</script>