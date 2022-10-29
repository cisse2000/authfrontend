<template>
    <div id="file">
        <v-container>
            
            <router-link color="" :to="{name: 'posts'}">List de Posts</router-link>
            
            <template>
                <div>
                    <v-breadcrumbs :items="items">
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                    </v-breadcrumbs>
                </div>
            </template>
            
    
            <PostSubmit title="Ajout des Posts" btnSubmit="Ajouter" />
           
        </v-container>
    </div>
</template>

<script>

import PostSubmit from '../../components/PostSubmit.vue'

    export default {
    components: { PostSubmit },
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
        }
        
    }
</script>

<style lang="scss" scoped>

</style>