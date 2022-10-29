<template>
    <div id="login">
        <v-container>
            <v-row class="d-flex justify-center">
                <v-col cols="12" md="6" lg="5">
                <v-card class="pa-6">
                    <h1 class="text-center">Authentification</h1>
                    <template>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-text-field
                        v-model="user.username"
                        :rules="user.usernameRules"
                        label="Nom d'utilisateur"
                        required
                        ></v-text-field>


                        <v-text-field
        
                        :rules="user.passwordRules"
                        v-model="user.password"
                        label="Mot de passe"
                        required
                        ></v-text-field>


                        <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="login"
                        >
                        Connexion
                        </v-btn>

                    </v-form>
                    <div class=" ma-4 d-flex justify-space-between ">
                        <span><router-link :to="{name: 'register'}">Inscription</router-link></span>
                        <span><router-link :to="{name: 'reset_password'}">Mot de passe oublié</router-link></span>
                        <span><router-link :to="{name: 'user_resend_activation'}">Renvoyer le mail d'activation</router-link></span>
                    </div>
                    </template>
                </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import ApiService from '@/services/ApiService'
    export default {
        
        name: 'Login',
        data(){
            return {
                valid: true,
            
                
                user: {
                
                    username: '',
                    usernameRules: [
                        v => !!v || "Nom d'utilisateur est requis",
                        v => (v && v.length <= 30 ) || "Nom d'utilisateur doit être moins de 30 caractères.",
                    ],
                    
                    password: '',
                    passwordRules: [
                        v => !!v || "Mot de passe est requis."
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
            login(){

                this.$store.dispatch('userLogin',{
                    username: this.user.username,
                    password: this.user.password
                })
                .then(() => {
                    localStorage.setItem('accessToken', this.$store.state.accessToken)
                    localStorage.setItem('refreshToken', this.$store.state.refreshToken)

                    //Récuperation des infos de user

                    let service = new ApiService()
                    service.find('/users/me/')
                    .then(response => {
                        this.$store.state.user = response.data
                        
                        this.$router.push({'name': 'profile', params:{'user': response.data.username}})
                        
                    }).catch(error => {
                        console.log(error.data,"Error ")
                    })
                    
                })
                .catch(error => {
                    console.log(error)
                })
            
                // this.$store.commit('setIsLoading', false)
                
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>