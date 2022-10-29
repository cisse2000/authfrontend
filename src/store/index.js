import Vue from 'vue'
import Vuex from 'vuex'
import ApiService from '@/services/ApiService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    
    // Les données
    user: null,
    fileData: null,
    postData: null,
    posts: null,
    post : null
  
  },
  getters: {
    loggedIn(state){
      return state.accessToken != null
    },

    accessToken(state){
      return state.accessToken
    }
  },
  mutations: {
    setFileData(state, data){
      state.fileData = data
    },

    initializeStore(state){
      if(localStorage.getItem('accessToken')){
        state.accessToken = localStorage.getItem('accessToken'),
        state.refreshToken = localStorage.getItem('refreshToken'),
        state.isAuthenticated = true

      } else {
        state.accessToken = null,
        state.isAuthenticated = false
        
      }
    },

    updateStorage(state, {access, refresh}){
      state.accessToken = access
      state.refreshToken = refresh
      state.isAuthenticated = true
    },

    destroyToken(state){
      state.accessToken = null,
      state.refreshToken = null,
      state.isAuthenticated = false
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('username')
      localStorage.removeItem('userid')
    },
    setIsLoading(state, status){
      state.isLoading = status
    },
  },
  actions: {
    userLogout(context){
      if(context.getters.loggedIn){
        context.commit('destroyToken')

      }
    },
    userLogin(context, userCredentials){
      
      return new Promise((resolve, reject) => {

        let service = new ApiService()
        service.add('/jwt/create/',{
          email: userCredentials.username,
          password: userCredentials.password
        })
        .then(response => {
          context.commit('updateStorage', { access: response.data.access, refresh: response.data.refresh})
          resolve()
        })
        .catch(error => {
          reject(error)
        })
        
        
      })
    }

    

  },
  modules: {
  }
  
})
