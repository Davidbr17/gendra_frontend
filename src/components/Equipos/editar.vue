<template>
    <b-modal id="equipos-modal-editar" hide-footer title="Editar equipo">
        <b-form @submit.prevent="store">
            <b-form-group
                label="Nombre:"
                label-for="input-nombre"
            >
                <b-form-input
                    id="input-nombre"
                    v-model="nombre"
                    placeholder="Nombre"
                    v-validate="'required'"
                    name="nombre"
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
    export default {
        name:'EditarComponent',
        props: ['equipo'],
        data() {
            return {
                nombre: this.equipo.nombre,
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

                    if (this.equipo.nombre) {
                        this.$axios.put('/equipo/' + this.equipo.id, {Nombre : this.nombre}).then( () => {
                            this.loading = false;
                            this.$store.dispatch('crudHelper/isChanged')
                            this.$bvModal.hide('equipos-modal-editar')
                        })
                    }
                })
            }
        }
    }
</script>