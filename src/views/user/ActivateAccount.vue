<template>
    <div id="login">
        <v-container>
            <v-row class="d-flex justify-center">
                <v-col cols="12" md="6" lg="5">
                <v-card class="pa-6">
                    <h2 class="text-center">Activation de compte</h2>
                    
                    <template>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        class=" ma-5 d-flex justify-center"
                    >
                       



                        <v-btn
                        
                        class="mr-4"
                        color="success "
                        @click="activate"
                        >
                        Activer le compte
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
                },
                
                alert: {
                    type: 'error',
                    state: false,
                    message: ''
                }
            }
        },
        methods:{
            activate(){
                
                this.$store.commit('setIsLoading', true)

                let axiosApi = new ApiService();
                axiosApi.add('/users/activation/', this.user)
                .then(response => {
                    console.log("Votre compte à bien été activé", response.data)
                    this.$router.push({ name: 'login'})
                }).catch(error => {
                    console.log("Erreur d'activation de compte", error.data)
                })
                

                this.$store.commit('setIsLoading', false)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>