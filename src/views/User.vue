<template>
    <v-card-text>
        <v-card-title>{{user.name}}</v-card-title>
    </v-card-text>
</template>

<script>
    export default {
        name: "User",
        data(){
            return{
                user: {},
                errors: []
            }
        },
        created() {
            axios({url:'https://crtdiu-app.ru/wp-json/wp/v2/users/me',method:'GET'})
                .then(res => {
                    this.user = res.data
                })

        }
    }
</script>

<style scoped>

</style>