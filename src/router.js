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
import AppAdmin from "./components/AppAdmin.vue";

import AppRealizarCompra from "./components/AppRealizarCompra.vue";
import { useStore } from './store/store';
import pinia from './store/index.js'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: AppHome,
        // meta: { login: true }
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
        meta: { login: true }
    },
    {
        path: '/alacena-virtual',
        name: 'alacenaVirtual',
        component: AppAlacenaVirtual,
        meta: { login: true }
    },
    {
        path: '/agregar-productos',
        name: 'agregarProducto',
        component: AppAgregarProductos,
        meta: { login: true }
    },
    {
        path: '/realizar-compra',
        name: 'realizarCompra',
        component: AppRealizarCompra,
        meta: { login: true }
    },
    {
        path: '/compras-favoritas',
        name: 'comprasFavoritas',
        component: AppComprasFavoritas,
        meta: { login: true }
    },
    {
        path: '/lista',
        name: 'lista',
        component: AppLista,
        meta: { login: true }
    },
    {
        path: '/historial',
        name: 'historial',
        component: AppHistorial,
        meta: { login: true }
    },
    {
        path: '/admin',
        name: 'admin',
        component: AppAdmin,
        meta: { login: true }
    },
]

//Se genera el objeto router
const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    //console.log(to);
    //Preguntar si está autenticado para elegir a dónde se lo lleva

    // meta:{requiereAuth:true}
    // //Dentro de cada ruta que requiere autenticación
    //NEXT siempre se maneja
    // next();
    // else{
    //     //Envío si NO está
    //     next({name:login})
    // }
    let store = useStore(pinia)


    if (to.meta.login && !store.estaAutenticado) {
        next({ name: 'login' })
    } else {
        next()
    }
    if (store.isAdmin) {
        console.log("Admin quedate en tu componente de admin")
        next({ name: 'admin' })
    }


})

export default router;




