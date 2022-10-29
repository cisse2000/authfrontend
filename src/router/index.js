import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/user/LoginView'
import RegisterView from '../views/user/RegisterView'
import UserProfile from '../views/user/ProfileView'
import LogoutView from '../views/user/LogoutView'
import RequestPasswordReset from '../views/user/RequestPasswordReset'
import ResetPasswordConfirm from '../views/user/ResetPasswordConfirm'
import UserResendActivationEmail from '../views/user/UserResendActivationEmail'
import ActivateAccount from '../views/user/ActivateAccount'
import UploadFile from '../views/files/UploadFileView'
import EditFile from '../views/files/EditFileView'
import ListFileView from '../views/files/ListFileView'
import AllUsers from '../views/user/AllUsers'

// Pour les posts
import Posts from '../views/posts/Posts'
import AddPost from '../views/posts/AddPost'
import EditPost from '../views/posts/EditPost'
import Post from '../views/posts/Post'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  
  {
    path: '/user/login',
    name: 'login',
    component: LoginView,
  
  },
  {
    path: '/user/logout',
    name: 'logout',
    component: LogoutView,
  
  },

  {
    path: '/user/user_resend_activation',
    name: 'user_resend_activation',
    component: UserResendActivationEmail,
  
  },

  //Activation de compte
  {
    path: '/activate/:uid/:token',
    name: 'activate_acount',
    component: ActivateAccount,
  
  },

  {
    path: '/user/reset_password',
    name: 'reset_password',
    component: RequestPasswordReset,
  
  },

  {
    path: '/password/reset/confirm/:uid/:token',
    name: 'reset_password_confirm',
    component: ResetPasswordConfirm,
  
  },

  {
    path: '/user/:user/profile',
    name: 'profile',
    component: UserProfile,
    meta: {
      requiresLogin: true
    }
  
  },

  {
    path: '/user/:user/profile/users',
    name: 'all_users',
    component: AllUsers,
    meta: {
      requiresLogin: true
    }
  
  },

  {
    path: '/user/:user/addfile',
    name: 'addFile',
    component: UploadFile,
    meta: {
      requiresLogin: true
    }
  
  },

  {
    path: '/user/:user/:id/editfile',
    name: 'editFile',
    component: EditFile,
    meta: {
      requiresLogin: true
    }
  
  },

  {
    path: '/user/:user/files',
    name: 'listFile',
    component: ListFileView,
    meta: {
      requiresLogin: true
    }
  
  },

  {
    path: '/user/register',
    name: 'register',
    component: RegisterView,
  
  },

  //Debut Pour les posts

  {
    path: '/user/:user/posts',
    name: 'posts',
    component: Posts,
    meta: {
      requiresLogin: true
    }
  },

  {
      path: '/user/:user/add/post',
      name: 'addPost',
      component: AddPost,
      meta: {
        requiresLogin: true
      },
  },

  {
    path: '/user/:user/post/:id/edit',
    name: 'editPost',
    component: EditPost,
    meta: {
      requiresLogin: true
    }

  },

  {
    path: '/user/:user/post/:id',
    name: 'showPost',
    component: Post,
    meta: {
      requiresLogin: true
    }

  },

  //Fin pour les posts
  
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//La sécurisation des routes
router.beforeEach((to, from, next) => {
  
  if(to.matched.some(record => record.meta.requiresLogin) && !localStorage.getItem('accessToken')){
    next({name: 'login'})
    
  } else {
    next()
  }
})
  




export default router

