<template>
    <div id="file">
        <v-container>
                       <!-- Breadcrud -->
            <template>
                <div>
                    <v-breadcrumbs :items="items">
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                    </v-breadcrumbs>
                </div>
            </template>
            <!-- Breadcrumb -->

            <div class=" d-flex ">
            
                <router-link color="" class="ma-10 mb-5" :to="{name: 'addPost' }">Ajouter</router-link>
                <form @keyup.prevent="SearchForm" class="ma-10 mt-4 mx-auto">
                    <v-text-field
                        v-model="search"
                        label="Rechercher un par nom"
                    ></v-text-field>
                </form>

            </div>

            <h1 class="ma-5">Liste des fichiers</h1>
            <v-row class="d-flex justify-content">
                <!-- <v-col cols="6" md="6" > -->
                    
                <div v-for="item in posts" :key="item.id">
                    
                    <template>
                        <v-card
                            class=" ma-5"
                            max-width="300"
                        >
                            <v-img
                            class="white--text align-end"
                            height="200px"
                            :src="item.image"
                            >
                            <v-card-title>{{item.title}}</v-card-title>
                            </v-img>

                            <!-- Fait par - {{item.created_by.last_name}} -->
                            <v-card-subtitle class="pb-0">
                            </v-card-subtitle>

                            <v-card-text class="text--primary">
                            <div>{{item.title}}</div>

                            <div>{{item.content}}</div>
                            </v-card-text>

                            <v-card-actions>
                            <v-btn
                                color="orange"
                                text
                                :to="{name: 'showPost', params:{'id': item.id } }"
                            >
                                Voir
                            </v-btn>

                            <v-btn
                                color="primary"
                                text
                                :to="{name: 'editPost', params:{'id': item.id } }"
                            >
                                Modifier
                            </v-btn>

                            <v-btn
                                color="red"
                                text
                                @click="supprimer(item.id)"
                            >
                                Suprimer
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>

                </div>
        
            </v-row>
            <div class="buttons ma-10 grey">
                <button @click="gotoNextPage" class="button mt-2 mx-2 is-light" v-if="showNextButton">Suivant</button>
                <button @click="gotoPreviousPage" class="button mt-2 mx-2 is-light" v-if="showPreviosButton">Précédant</button>
            </div>
                            
        </v-container>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService'
import {mapState} from 'vuex'
    export default {
        name: 'Posts',
        created(){
          this.get_posts()
        },
        computed: mapState(['posts']),
        data:() => ({
            valid: true,
            show: false,
            search: '',

            //Les buttons de navigation
            showNextButton: false,
            showPreviosButton: false,
            currentPage: 1,
            
           
            items: [
                {
                text: 'Accueil',
                disabled: false,
                href: {name: 'home'},
                },
                {
                text: 'Profile',
                disabled: false,
                href: {name: 'profile'},
                },
                {
                text: 'Liste de Posts',
                disabled: false,
                href: {name: 'addFile'},
                },
            ],

            
        }),

        methods: {
            gotoNextPage(){
                this.currentPage += 1
                this.get_posts()
            },
            gotoPreviousPage(){
                this.currentPage -= 1
                this.get_posts()
            },

            SearchForm(){
                this.get_posts()
            },


            async get_posts(){
                this.$store.commit('setIsLoading', true);
                this.showNextButton = false
                this.showPreviosButton = false

                let apiAxios = new ApiService()
                await apiAxios
                .find(`/posts/?page=${this.currentPage}&search=${this.search}`)
                .then(response => {
                    this.$store.state.posts = response.data.results
                    console.log(this.$store.state.posts) 

                    if(response.data.previous) this.showPreviosButton = true
                    if(response.data.next) this.showNextButton = true
                    
                })
                .catch(error => {
                    console.log(error)
                })

                this.$store.commit('setIsLoading', false);
            },
            supprimer(id){
                
                let apiAxios = new ApiService()
                apiAxios.delete(`/posts/${id}/`, id)
                .then(response => {
                    // this.$store.state.posts = response.data
                    console.log(this.$store.state.posts) 
                    
                    this.get_posts()
                    
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>