<template>
  <div id="file">
    <v-container>
      <router-link color="" :to="{ name: 'posts' }">Posts</router-link>

      <template>
        <div>
          <v-breadcrumbs :items="items">
            <template v-slot:divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
        </div>
      </template>

      <PostSubmit title="Modification d'un post" btnSubmit="Modifier" :id=this.$route.params.id />
    </v-container>
  </div>
</template>

<script>

import PostSubmit from "../../components/PostSubmit.vue"

export default {
    name: "EditPost",
    
    components: { 
        PostSubmit 
    },
    data: () => ({
      
      items: [
        {
          text: "Accueil",
          disabled: false,
          href: { name: "home" }
        },
        {
          text: "Profile",
          disabled: false,
          href: { name: "profile" }
        },
        {
          text: "Fichier",
          disabled: false,
          href: { name: "addFile" }
        }
    ],


    alert: {
      type: "error",
      state: false,
      message: ""
    }
  }),

 
};
</script>

<style lang="scss" scoped></style>
