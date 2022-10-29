<template>
    <div id="file">
        <v-row class="d-flex justify-content">
                <v-col cols="12" md="6" >
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
                                    v-model="document.name"
                                    :rules="document.nameRules"
                                    label="Description de fichier"
                                    required
                                    ></v-text-field>
                                </div>                            

                                
                                 <v-file-input
                                    counter
                                    v-model="document.file"
                                    show-size
                                    truncate-length="36"
                                    label="Fichier(s)"
                                    @change="selectFile"
                                ></v-file-input>

                                <div class="progress mb-6">
                                    <progress class="is-primary progress" :value=document.progress max="100">{{document.progress}}%</progress>
                                </div>
                                
                                <v-btn
                                :disabled="!valid"
                                color="success"
                                class="mr-4"
                                @click="register"
                                >
                                {{btnSubmit}}
                                </v-btn>

                                <div class="notification mt-6"> Le message</div>
                                
                            </v-form>
                        </template>
                    </v-card>
                </v-col>
        </v-row>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService'

    export default {
        name: 'InputFile',
        props: {
            title: String,
            btnSubmit: String,
            data: Object
        },
        data:() => ({
            valid: true,
                
            document: {
                name: '',
                nameRules: [
                v => !!v || 'La description est requis',
                v => (v && v.length <= 60) || 'la description doit être moins de 60 caractères.',
                ],
                file:null,
                progress:0

                
            },

            alert: {
                type: 'error',
                state: false,
                message: ''
            }
        }),

        methods: {
            selectFile(){
                console.log(this.document)
            },
            
            register(){
                this.progress = 0

                this.performUpload(this.document.file, event => {
                    this.progress = Math.round((100 * event.loaded) / event.total)
                })
                .then(response => {
                    console.log("Formulaire ajouté avec succes")
                    this.$router.push({'name': 'profile'})
                    this.progress = null
                })
                .catch(error => {
                    this.progress = 0 
                    console.log("Erreur de formulaire")
                })    
            },

            performUpload(file, onUploadProgress){
                let formData = new FormData()
                formData.append('file', file)
                formData.append('name', this.document.name)

                let apiAxios = new ApiService()

                return apiAxios.addForm('/file/crud/', formData, onUploadProgress)

            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>