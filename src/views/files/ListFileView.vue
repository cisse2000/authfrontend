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

            <router-link color="" class="ma-10" :to="{name: 'addFile'}">Ajouter</router-link>


            <h1 class="ma-5">Liste des fichiers</h1>
            <v-row class="d-flex justify-content">
                <v-col cols="6" md="6" >
                    <template>
                        <div v-for="item in document" :key="item.id">
                        <v-card class="ma-10">
                            {{ item }}
                            <router-link color="" class="ma-10" :to="{name: 'editFile', params: {'id': item.id} }">Modifier</router-link>
                        </v-card>
                        </div>
                        
                        
                    </template>
        
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService'

    export default {
        name: 'UploadFile',
        created(){
            let apiAxios = new ApiService()
            apiAxios.find('/file/crud/')
            .then(response => {
                console.log(JSON.stringify(response.data))
                this.document = response.data
            })
            .catch(error => {
                console.log(error)
            })
        },
        data:() => ({
            valid: true,
           
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
                text: 'Liste de fichier',
                disabled: false,
                href: {name: 'addFile'},
                },
            ],

            document: null,
        }),

        methods: {
            
        }
        
    }
</script>

<style lang="scss" scoped>

</style>