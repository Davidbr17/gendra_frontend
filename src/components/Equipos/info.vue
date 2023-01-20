<template>
    <b-modal id="equipos-modal-info" hide-footer title="Info de equipo">

        <h5 class="text-center"><strong>Nombre:</strong> {{ equipo.name}} {{ equipo.lastname}} </h5>
        <br>

        <h5  class="text-center">Pokemons</h5>
        <br>

        <div class="text-center" >
            <b-card
                v-for="(pokemon, i ) in data" :key="i"
                :title="pokemon.name"
                :img-src="pokemon.sprites.other['official-artwork'].front_default"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 17rem;margin: 0 auto;"
                class="mb-2"
            >
                <b-card-text>
                  <strong>Tipos: </strong>
                  <span v-for="(tipo, index) in pokemon.types" :key="index">{{ tipo.type.name + (index + 1 >= pokemon.types.length ? '' : ', ') }}</span> 
                </b-card-text>
            </b-card>
        </div>

    </b-modal>
</template>

<script>
    export default {
        name:'InfoComponent',
        props: ['equipo'],
        data() {
            return {
                data: []
            };
        },
        computed:{
            email(){
                return this.equipo.email
            }
        },
        watch:{
            email(){
                this.data = []
                this.get()
            }
        },
        methods:{
            get(){
                this.equipo.team.map( p => {
                    this.$axios.get(p.url).then( r => {
                        this.data.push(r.data)
                    })
                })
            }
        },
        created(){
            this.get()
        }
    }
</script>