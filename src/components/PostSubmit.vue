<template>
    <div id="file">
        <v-row class="d-flex justify-content">
                <v-col cols="8" md="6" >
                    <v-card class="pa-6">
                        <h1>{{title}}</h1>
                        <template>

                            <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                            >


                                <div class="mb-3">

                                    <v-text-field
                                    v-model="post.title"
                                    :rules="post.titleRules"
                                    label="Titre"
                                    required
                                    ></v-text-field>
                                </div>  
                                
                                <v-file-input
                                    counter
                                    v-model="post.image"
                                    show-size
                                    truncate-length="36"
                                    label="Image"
                                    @click="selectImage"
                                    
                                ></v-file-input>

                                <div class="mb-3">
                                    
                                    <v-textarea
                                    v-model="post.content"
                                    :rules="post.contentRules"
                                    required
                                    label="Un petit commentaire"
                                    ></v-textarea>
                            
                                </div>                            


                                <!-- <div class="progress mb-6">
                                
                                    <progress class="is-primary progress" :value=post.progress max="100">{{document.progress}}%</progress>
                                </div> -->
                                <v-btn
                                :disabled="!valid"
                                color="success"
                                class="mr-4"
                                @click="register"
                                >
                                {{btnSubmit}}
                                </v-btn>

                                <div class="notification mt-6"> {{id}}</div>
                                
                            </v-form>
                        </template>
                    </v-card>
                </v-col>

                <v-col cols="4" md="6" >
                    <h1>Image</h1>
                    <template>


                        <v-card
                        class=" ma-5"
                        max-width="400"
                    >
                        
                        <v-img
                            class="white--text align-end"
                            height="200px"
                            :src="post.img"
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
    </div>
</template>

<script>
import ApiService from '@/services/ApiService'
// import axios from 'axios'


    export default {
        name: 'PostSubmit',
        props: {
            title: String,
            btnSubmit: String,
            id: null
        },
        mounted() {
            if(this.id) this.getNote()
        },
       
        data:() => ({
            valid: true,
            post: {
                title: '',
                titleRules: [
                    v => !!v || 'Le titre est requis',
                    v => (v && v.length <= 60) || 'Le titre doit être moins de 60 caractères.',
                ],

                content: '',
                contentRules: [
                    v => !!v || 'Le contenu est requis',
                ],
                
                created_by: '',    
                img: '',
            },

            progress: null,

            alert: {
                type: 'error',
                state: false,
                message: ''
            }
        }),
       

        methods: {

            async getNote(){
                this.$store.commit('setIsLoading', true);

                let axiosService = new ApiService()
                await axiosService
                .findOne(`/posts/${this.id}/`)
                .then(response => {  
                    this.$store.state.post = response.data.results
                    console.log(response.data)

                    this.post.title = response.data.title
                    this.post.content = response.data.content
                    this.post.get_image = response.data.get_image
                    this.post.img = response.data.image
                    this.post.created_by = response.data.created_by
                    // console.log(response.data)
                    
                })
                .catch(error => {
                    console.log(error.data);
                });

                this.$store.commit('setIsLoading', false);
               
            },

            addFormData(file, onUploadProgress){
                let formData = new FormData()
                formData.append('title', this.post.title)
                formData.append('content', this.post.content)
                formData.append('image', file)

                let apiAxios = new ApiService()

                return apiAxios.addForm('/posts/', formData, onUploadProgress)
            },

            updateFormData( onUploadProgress){
                let formData = new FormData()
                formData.append('title', this.post.title)
                formData.append('content', this.post.content)
                
                if(this.selectImage()){

                    formData.append('image', this.selectImage())
                }
                
                let apiAxios = new ApiService()

                return apiAxios.updateForm(`/posts/${this.id}/`, formData, this.id, onUploadProgress)
            },

            selectImage(){
                return this.post.image 
            },
            
            register(){
                this.progress = 0

                if(this.id){

                    this.updateFormData(this.post.image, event => {
                    this.progress = Math.round((100 * event.loaded) / event.total)
                    })
                    .then(response => {
                        console.log("Formulaire ajouté avec succes")
                        this.$router.push({'name': 'posts'})
                        this.progress = null
                    })
                    .catch(error => {
                        this.progress = 0 
                        console.log("Erreur de formulaire")
                    })    

                } else {

                    this.addFormData(this.post.image, event => {
                    this.progress = Math.round((100 * event.loaded) / event.total)
                    })
                    .then(response => {
                        console.log("Formulaire ajouté avec succes")
                        this.$router.push({'name': 'posts'})
                        this.progress = null
                    })
                    .catch(error => {
                        this.progress = 0 
                        console.log("Erreur de formulaire")
                    })    
                    
                }

                
            },
        }
        
    }
</script>

<style lang="scss" scoped>

</style>