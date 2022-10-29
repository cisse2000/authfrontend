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
            
    
            <FileSubmit title="Ajout des fichiers" btnSubmit="Ajouter" />
           
        </v-container>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService'
import FileSubmit from '../../components/FileSubmit.vue'

    export default {
    components: { FileSubmit },
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
        }),

        methods: {
            selectFile(){
                console.log(this.document)
            },
        }
        
    }
</script>

<style lang="scss" scoped>

</style>