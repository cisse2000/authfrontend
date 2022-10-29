<template>
    <div id="login">
        <v-container>
            <v-row class="d-flex justify-center">
                <v-col cols="12" md="6" lg="5">
                <v-card class="pa-6">
                    <h2 class="text-center">Nouveau mot de passe</h2>
                    
                    <template>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-text-field
                        v-model="user.new_password"
                        :rules="user.new_passwordRules"
                        :counter="50"
                        label="Nonveau mot de passe"
                        required
                        type="password"
                        ></v-text-field>

                        <v-text-field
                        v-model="user.re_new_password"
                        :rules="user.re_new_passwordRules"
                        :counter="8"
                        label="Confirmation"
                        required
                        type="password"
                        ></v-text-field>



                        <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="reset"
                        >
                        Réinitialiser
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
                
                    uid: this.$route.params.uid,
                    token: this.$route.params.token,
                    
                    new_password: '',
                    new_passwordRules: [
                        v => !!v || "Le mot de passe est requis",
                        v => (v && v.length <= 8) || "Le mot de passe doit être moins de 8 caractères.",
                    ],
                    re_new_password: '',
                    
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
                axiosApi.add('/users/reset_password_confirm/', this.user)
                .then(response => {
                    console.log("Le mot de passe à bien été modifié", response.data)
                    this.$router.push({name: 'login'})
                }).catch(error => {
                    console.log("Erreur de modification de mot passe", error.data)
                })
                

                this.$store.commit('setIsLoading', false)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>