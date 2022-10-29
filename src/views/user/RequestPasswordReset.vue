<template>
    <div id="login">
        <v-container>
            <v-row class="d-flex justify-center">
                <v-col cols="12" md="6" lg="5">
                <v-card class="pa-6">
                    <h2 class="text-center">Réinitialisation de mot de passe</h2>
                    <template>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-text-field
                        v-model="user.email"
                        :rules="user.emailRules"
                        :counter="50"
                        label="Nom d'utilisateur"
                        required
                        ></v-text-field>



                        <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="reset"
                        >
                        Réinitialiser le mot de passe
                        </v-btn>

                    </v-form>
                
                    </template>
                </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import ApiService from '@/services/ClientApiService'
    export default {
        name: 'Login',
        data(){
            return{
                valid: true,
                user: {
                
                    email: '',
                    emailRules: [
                        v => !!v || "Nom d'utilisateur est requis",
                        v => (v && v.length <= 50) || "Nom d'utilisateur doit être moins de 50 caractères.",
                    ],
                    
                },
                
                alert: {
                    type: 'error',
                    state: false,
                    message: ''
                }
            }
        },
        methods:{
            reset(){
                this.$store.commit('setIsLoading', true)

                let axiosApi = new ApiService();
                axiosApi.add('/users/reset_password/', this.user)
                .then(response => {
                    console.log("Réquête de mot de passe envoyé", response.data)
                    this.$router.push({name: 'login'})
                }).catch(error => {
                    console.log("Erreur d'envoie de réquête", error.data)
                })
                

                this.$store.commit('setIsLoading', false)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>