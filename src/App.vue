  <template>
  <v-app>
    <Navbar/>
    
    <v-main>
      <div class="is-loading-bar has-text-centered " v-bind:class="{'is-loading': $store.state.isLoading}" >
        <div class="lds-dual-ring"></div>
      </div>
      <!-- <div>{{user}}</div> -->
      <!-- <div class="text-center ">Vous serez déconnecter dans {{ IDLE_TIMEOUT - idleSecondsCounter}} secondes</div> -->
      
      
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Navbar from "./components/Navbar.vue";
import ApiService from "./services/ApiService";
import ApiClient from "./services/ClientApiService";

export default {
    name: "App",
    computed: mapState(['user']),
    data: () => ({
        
      IDLE_TIMEOUT : 60 * 10,
      idleSecondesTimer:0,
      idleSecondsCounter:0

    }),
    mounted(){
      document.onclick = () => {
        this.idleSecondsCounter = 0;

      //   //Pour chaque click on actualise le token
      //   let axiosService = new ApiService()
      //   axiosService.add('/jwt/refresh/', { refresh: localStorage.getItem('refreshToken')})
      //   .then(response => {
  
      //     localStorage.setItem('accessToken', response.data.access)            
          
      //   })
      //   .catch(error => {
      //     console.log(error, "Erreur de clique")
      //   })
      };


      document.onmousemove = () => {
        this.idleSecondsCounter = 0;
      };
      //On appel cette fonction chaque 1 seconde
      this.idleSecondesTimer = window.setInterval(this.chekIdleTime, 1000);

    },
    methods:{

      chekIdleTime(){
        this.idleSecondsCounter++;
        
        if(this.idleSecondsCounter >= this.IDLE_TIMEOUT ){
          //On reinitialise le compteur
          window.clearInterval(this.idleSecondesTimer);
          this.$store.state.user = null
          
          this.$router.push({name: 'logout'})
          
        }
      }
    }
    ,
    components: { 
      Navbar 
    },
    beforeCreate(){
    
      this.$store.commit('initializeStore')
      
      //Si un utilisateur est connecté.
      if(this.$store.state.accessToken){

        let axioApi = new ApiClient()
         axioApi.add('/jwt/verify/', {
          token: this.$store.state.accessToken
         })
        .then(response => {
          console.log(JSON.stringify(response.data))
        })
        .catch(error => {
          
          //Si le token de connexion est expiré On l'actualise
          
          axioApi.add('/jwt/refresh/', { refresh: localStorage.getItem('refreshToken')})
          .then(response => {
          
            localStorage.setItem('accessToken', response.data.access)            
            
          })
          .catch(error => {
            console.log(error, "Pas d'access au token")
          })
          
        })

        let service = new ApiService()
        service.find('/users/me/')
        .then(response => {
          let user = JSON.stringify(response.data)
          
            this.$store.state.user = user
            // console.log(user)
        })
        .catch(error => {
            console.log(error.data,"Error ")
        })


      } else {
        
      }
    }
};
</script>


<style lang="scss">
  @import '../node_modules/bulma';
  
  .lds-dual-ring{
      display: 'inline-block';
      width: 80px;
      height: 80px;
  }
  
  .lds-dual-ring:after{
      content: "";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid #ccc;
      border-color: #ccc transparent #ccc transparent;
      animation: lds-dual-ring 1.2s linear infinite;
  }
  
  
  @keyframes lds-dual-ring{
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
  }
  
  
  .is-loading-bar {
      height: 0;
      overflow: hidden;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
  
      &.is-loading{
          height: 80px;
      }
  }
  
  </style>
  