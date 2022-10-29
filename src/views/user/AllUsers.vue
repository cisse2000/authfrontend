<template>

    <div class="users_list">
        <v-container v-for="item in 8" :key="item" >
            <v-row >
                <v-col cols="6" md="4" lg="2">
                    <v-card>
                        {{item}}
                    </v-card>
                </v-col>
            
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name:'All_users'
    }
</script>

<style lang="scss" scoped>

</style>