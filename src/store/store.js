import { defineStore } from "pinia";

export const useStore = defineStore('pruebaContador', {
    state: () => ({
        _listedProducts: [

        ],
        _listaDeCompras: {},
        _alacenaVirtual: [],
        _idFamily: 1,
        _idLista: 4,
        _url: "https://62b646096999cce2e800f9f0.mockapi.io/listapp/",
        _listaUsandose: {},
        _listasFavoritas: [{
            id: 0,
            shoppingListName: "Crear nueva compra",
            // fechaCreacion:"01/01/01",  
            products: [],
        }],
        _user: {
            mail: 'a@a.com',
            password: 'admin'
        },
        _userValid: false,
    }),
    actions: {
        validarUsuario(mail, password) {
            if (mail == this._user.mail && password == this._user.password) {
                this._userValid = true;
            }
            return this._userValid;
        },

        async cargarLista() {
            /* const response = await fetch(this._url + this._idLista);
            const results = await response.json();
            console.log(results); */

            let results = {
                shoppingListName: "Lista 1",
                products: [
                    {
                        id: 1,
                        name: "Pepitos",
                        brand: "Pepitos",
                        price: 240.65,
                        content: "400 gr",
                        category: "Alacena",
                        amount: 4
                    },
                    {
                        id: 2,
                        name: "Chocolinas",
                        brand: "Chocolinas",
                        price: 200.50,
                        content: "450 gr",
                        category: "Alacena",
                        amount: 2
                    },
                    {
                        id: 3,
                        name: "Dulce de leche",
                        brand: "La Serenisima",
                        price: 323.15,
                        content: "300 gr",
                        category: "Heladera",
                        amount: 1
                    },
                    {
                        id: 4,
                        name: "Queso crema",
                        brand: "Cassancrem",
                        price: 540.50,
                        content: "600 gr",
                        category: "Heladera",
                        amount: 2
                    },
                    {
                        id: 5,
                        name: "Jugo de naranja",
                        brand: "Cepita",
                        price: 240.65,
                        content: "200 ml",
                        category: "Alacena",
                        amount: 3
                    },
                ],
            }
            this._listaDeCompras = results;
        },
        async cargarAlacenaVirtual() {
            const response = await fetch(this._url + "shoppingList?IdFamily=" + this._idFamily);
            const results = await response.json();
            console.log(results);
            this._alacenaVirtual = results.find(list => list.IdFamily === this._idFamily && list.category == "Alacena virtual")
            console.log(this._alacenaVirtual);
        },
        addProduct(product, amount) {
            console.log(this._listaUsandose)
            let prod = this._listaUsandose.products.find(prod => prod.id === product.id)
            if (prod == undefined) {
                product.amount = amount
                this._listaUsandose.products.push(product)
            } else {
                console.log("Aumento")
                prod.amount += amount
            }
        },
        cambiarListaEnUso(lista) {
            this._listaUsandose = lista;
            console.log('1 ' + this._listaUsandose)
        },
        addListaFav(lista) {
            this._listasFavoritas.push(lista)
        }
    },
    getters: {
        listaDeCompras() {
            return this._listaDeCompras;
        },
        alacenaVirtual() {
            return this._alacenaVirtual;
        },
        listaEnUso() {
            return this._listaUsandose
        },
        listasFav() {
            return this._listasFavoritas
        }
    },
})