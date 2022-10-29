<template>
    <div class="post">
        <router-link :to="{name: 'posts' }">List de posts</router-link>
        <v-container grid-list-xs>
            <h1>{{post.title}}</h1>
            <v-row >

                <v-col cols="12" md="6" lg="6">
                    
                    <template>

                        <v-card
                        class=" ma-5"
                        max-width="400"
                    >

                    <h1>{{post.title}}</h1> 
                    <div>{{post.content}}</div>
                        
                    </v-card>
                    </template>

                </v-col>
                <v-col cols="12" md="6" lg="4">
                    
                    <h1>Image</h1>
                    <template>
                        <v-card
                        class=" ma-5"
                        max-width="400"
                        >
                        
                        <v-img
                                class="white--text align-end"
                                height="200px"
                                :src="post.image"
                                >
                                <v-card-title>{{post.title}}</v-card-title>
                            </v-img>

                            <v-card-subtitle class="pb-0">
                                    Fait par - {{ post.created_by.last_name }}
                            </v-card-subtitle>


                        </v-card>
                    </template>

                    
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService'

    export default {
        name: 'Post',
        mounted() {
            this.get_post()
        },
        data: () => ({
            post: {
                created_by: ''
            }
        }),
        methods: {
            async get_post(){

                this.$store.commit('setIsLoading', true)

                let axiosService = new ApiService()
                await axiosService
                .findOne(`/posts/${this.$route.params.id}/`)
                .then(response => {  
                    this.post = response.data
                    console.log(response.data) 
                }).catch(error => {
                    console.log(error.data)
                })
                    
                this.$store.commit('setIsLoading', false)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>