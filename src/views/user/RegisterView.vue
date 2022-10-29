<template>
    <div id="register">
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col cols="12" md="6" lg="5">
            <v-card class="pa-6">
                <h2 class="text-center">Enregistrement</h2>

                <template>
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="user.username"
                      :counter="5"
                      :rules="user.usernameRules"
                      label="Nom d'utilisateur"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="user.first_name"
                      :counter="10"
                      :rules="user.first_nameRules"
                      label="Prénom"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="user.last_name"
                      :counter="10"
                      :rules="user.last_nameRules"
                      label="Nom"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="user.email"
                      :rules="user.emailRules"
                      label="E-mail"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="user.password"
                      :counter="20"
                      :rules="user.passwordRules"
                      label="Mot de passe"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="user.re_password"
                      :counter="8"
                      :rules="user.re_passwordRules"
                      label="Confirmation"
                      required
                    ></v-text-field>

                    <v-file-input
                      counter
                      
                      show-size
                      truncate-length="36"
                      label="Selectionner une image"
                      
                    ></v-file-input>


                    <v-btn
                      :disabled="!valid"
                      color="success"
                      class="mr-4"
                      @click="register"
                    >
                      Ajouter
                    </v-btn>

                    <v-btn
                      color="error"
                      class="mr-4"
                      @click="reset"
                    >
                      Reset Form
                    </v-btn>

                    <v-btn
                      color="warning"
                      @click="resetValidation"
                    >
                      Reset Validation
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

import ApiService from '@/services/ClientApiService';

    export default {
        name:'Register',
        data(){
          return {
            valid: true,

            user: {
              first_name: '',
              first_nameRules: [
                v => !!v || 'Prénom est requis',
                v => (v && v.length <= 10) || 'Prénom doit être moins de 10 caractères.',
              ],

              last_name: '',
              last_nameRules: [
                v => !!v || 'Nom est requis',
                v => (v && v.length <= 10) || 'Nom doit être moins de 10 caractères.',
              ],
              username: '',
              usernameRules: [
                v => !!v || "Nom d'utilisateur est requis",
                v => (v && v.length <= 10) || "Nom d'utilisateur doit être moins de 5 caractères.",
              ],
              email:'',
              emailRules: [
                v => !!v || "Email est requis",
                v => (v && v.length <= 30) || "Nom d'utilisateur doit être moins de 30 caractères.",
              ],
              password: '',
              passwordRules: [
                v => !!v || "Mot de passe est requis",
                
              ],
              re_password:'',
              photo:'',
            },
            alert: {
              type: 'error',
              state: false,
              message: ''
          }
          }
        },
        methods: {
          async register(){
            this.$store.commit('setIsLoading', true)

            let service = new ApiService()
             await service.add('/users/',this.user)
            .then(response => {
              console.log(response.data, "Bien ajouté")
              this.$router.push({ name: 'login'})
            }).catch(error => {
              console.log(error)
            })

            this.$store.commit('setIsLoading', false)
          },

          validate () {
            this.$refs.form.validate()
          },
          reset () {
            this.$refs.form.reset()
          },
          resetValidation () {
            this.$refs.form.resetValidation()
          },
        }
    }
</script>

<style lang="scss" scoped>

</style>