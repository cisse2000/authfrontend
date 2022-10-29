<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: 'Logout',
        created(){
            this.$store.dispatch('userLogout')
            .then(() => {
                console.log("Déconnexion effectuée")
                this.$store.state.user = null
                this.$router.push({name: 'login'})
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>