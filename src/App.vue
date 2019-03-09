<template>
    <v-app>
        <v-navigation-drawer app clipped v-model="drawer">
            <v-list>
                <template v-for="(item, index) in drawerItems">
                    <v-subheader v-if="item.header" :key="item.header" light>{{item.header}}</v-subheader>
                    <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>
                    <v-list-tile
                        v-else-if="item.href" :key="item.title"
                        @click=""
                        :href="item.to"
                    >
                        <v-list-tile-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.title}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile
                        v-else :key="item.title"
                        @click=""
                        :to="item.to"
                    >
                        <v-list-tile-action>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.title}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app :clipped-left="$vuetify.breakpoint.mdAndUp">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="hidden-xs-only">ЦРТДиЮ Личный кабинет</v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-fade-transition mode="out-in">
                <router-view></router-view>
            </v-fade-transition>
        </v-content>
        <v-footer app></v-footer>
    </v-app>
</template>

<script>
    export default {
        data: function () {
            return {
                drawer: null,
                drawerItems: [
                    {header: 'Меню'},
                    {title: 'Главная', to:'/', icon:'home'},
                    {divider: true, inset: true},
                    {title: 'Авторизация', to:'/auth', icon:'link'},
                    {divider: true, inset: true},
                    {title: 'Пользователь', to:'/user', icon:'link'},
                    {divider: true, inset: true},
                    {title: 'crtdiu-app.ru', href:true, to:'https://crtdiu-app.ru', icon:'link'}
                ]
            }
        }
    }
</script>