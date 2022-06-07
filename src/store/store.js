import { defineStore } from "pinia";

export const useStore = defineStore('pruebaContador', {
    state: () => ({
        _listaDeCompras: {},
        _idLista: 4,
        _url: "http://localhost:3000/shopping-lists/",
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
        addProduct(product, amount) {
            let prod = this._listaDeCompras.products.find(prod => prod.id === product.id)
            if (prod == undefined) {
                product.amount = amount
                this._listaDeCompras.products.push(product)
            } else {
                console.log("Aumento")
                prod.amount += amount
            }
        },
    },
    getters: {
        listaDeCompras() {
            return this._listaDeCompras;
        }
    },
})