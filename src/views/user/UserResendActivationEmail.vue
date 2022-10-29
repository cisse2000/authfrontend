<template>
    <div id="login">
        <v-container>
            <v-row class="d-flex justify-center">
                <v-col cols="12" md="6" lg="5">
                <v-card class="pa-6">
                    <h2 class="text-center">Renvoyer l'Email d'activation de compte</h2>
                    
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
                        label="E-mail"
                        required
                        
                        ></v-text-field>



                        <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="resend_email"
                        >
                        Envoyer l'E-mail
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
                        v => !!v || "E-mail est requis",
                        
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
            async resend_email(){
                
                this.$store.commit('setIsLoading', true)

                let axiosApi = new ApiService();
                await axiosApi.add('/users/resend_activation/', this.user)
                .then(response => {
                    console.log("Email envoyé",response.data)
                    this.$router.push({name: 'login'})
                })
                .then(error => {
                    console.log("Email no envoyé", error.data)
                })
                
                this.$store.commit('setIsLoading', false)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>