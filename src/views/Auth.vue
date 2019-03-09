<template>
    <v-card-text>
        <v-text-field
                label="Логин"
                type="text"
                v-model="username"
        ></v-text-field>
        <v-text-field
                label="Пароль"
                type="password"
                v-model="password"
        ></v-text-field>
        <v-btn
                color="primary"
                depressed
                @click="auth"
        >
            Войти
        </v-btn>
        <v-btn
                color="red"
                depressed
                @click="logout"
        >
            Выйти
        </v-btn>
    </v-card-text>
</template>

<script>
    import {myLoginRoutine} from "@/api/auth"

    export default {
        name: "Auth",
        data: function () {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            auth() {
                const {username, password} = this
                this.$store.dispatch('AUTH_REQUEST', {username, password}).then(() => {
                    this.$router.push('/user')
                })
            },
            logout() {
                this.$store.dispatch('AUTH_LOGOUT')
                    .then(() => {
                        this.$router.push('/auth')
                    })
            }
        },
    }
</script>

<style scoped>

</style>