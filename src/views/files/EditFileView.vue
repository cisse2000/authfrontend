<template>
    <div id="file">
        <v-container>
            
            <router-link color="" :to="{name: 'listFile'}">List de fichier</router-link>
            
            <template>
                <div>
                    <v-breadcrumbs :items="items">
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                    </v-breadcrumbs>
                </div>
            </template>
            
    
            <FileSubmit title="Modification des fichiers" btnSubmit="Modifier" />
           
        </v-container>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService'
import FileSubmit from '../../components/FileSubmit.vue'

    export default {
    components: { FileSubmit },
        created(){
            
            let axiosService = new ApiService()
            axiosService.findOne('file/crud/', this.$route.params.id)
            .then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error.data)
            })
        },
        name: 'UploadFile',
        data:() => ({
        
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
                    text: 'Fichier',
                    disabled: false,
                    href: {name: 'addFile'},
                },
            ],

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

                return apiAxios.addFile('/file/crud/', formData, onUploadProgress)

            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>