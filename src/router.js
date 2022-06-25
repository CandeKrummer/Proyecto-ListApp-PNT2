import Vue from 'vue'
import VueRouter from 'vue-router'

import AppHome from "./components/AppHome.vue";
import AppListaDeCompras from "./components/AppListaDeCompras.vue";
import AppAlacenaVirtual from "./components/AppAlacenaVirtual.vue";
import AppAgregarProductos from "./components/AppAgregarProductos.vue";
import AppLogin from "./components/AppLogin.vue";
import AppLista from "./components/AppLista.vue";
import AppConfig from "./components/AppConfig.vue";
import AppComprasFavoritas from "./components/AppComprasFavoritas.vue";
import AppHistorial from "./components/AppHistorial.vue";
import AppRealizarCompra from "./components/AppRealizarCompra.vue";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: AppHome,
        meta: { login: true }
    },
    {
        path: '/login',
        name: 'login',
        component: AppLogin,
    },
    {
        path: '/config',
        name: 'config',
        component: AppConfig,
    },
    {
        path: '/lista-de-compras',
        name: 'listaDeCompras',
        component: AppListaDeCompras,
    },
    {
        path: '/alacena-virtual',
        name: 'alacenaVirtual',
        component: AppAlacenaVirtual,
    },
    {
        path: '/agregar-productos',
        name: 'agregarProducto',
        component: AppAgregarProductos,
    },
    {
        path: '/realizar-compra',
        name: 'realizarCompra',
        component: AppRealizarCompra,
    },
    {
        path: '/compras-favoritas',
        name: 'comprasFavoritas',
        component: AppComprasFavoritas,
    },
    {
        path: '/lista',
        name: 'lista',
        component: AppLista,
    },
    {
        path: '/historial',
        name: 'historial',
        component: AppHistorial,
    },
    {
        path: "/lista/:lista",
        name: "lista",
        component: AppLista,
    },
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    //console.log(to);

    next();
})

export default router;