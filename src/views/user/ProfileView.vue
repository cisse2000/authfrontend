<template>
    <div id="profile">
        <v-main>
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


            <h1 class="display-2">

                Bienvenue sur la page de profile.      
            </h1>


            <v-container grid-list-xs>
                <v-btn color="success" :to="{name: 'addFile'}">Ajouter un fichier</v-btn>

                <v-btn color="success" :to="{name: 'posts'}">Posts</v-btn>
                <v-row>
                    <v-col cols="12" md="6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita rerum dolore corrupti hic quas doloremque similique, rem, natus vero, enim a. Animi doloremque obcaecati accusamus itaque dolorem, aliquid reprehenderit ut!
                    </v-col>
                </v-row>

                <v-btn color="success" :to="{name: 'all_users'}">Tous les Utilisateurs</v-btn>
            </v-container>
        </v-main>
    </div>
</template>

<script>

import ApiService from '@/services/ApiService'

export default {
    name:'Profile',
    
    created(){      
       
    },
    data(){
        return{
            drawer: null,

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
                }
                
            ],
        }
    }
}
</script>

<style lang="scss" scoped>

</style>