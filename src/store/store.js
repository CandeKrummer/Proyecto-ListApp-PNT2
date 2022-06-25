import { defineStore } from "pinia";

export const useStore = defineStore('pruebaContador', {
    state: () => ({
        _listedProducts: [],
        _listaDeCompras: {
            id: 0,
            shoppingListName: "",
            products: []
        },
        _alacenaVirtual: [],
        _idAlacenaVirtual: 0,
        _listedProductoPrueba: [
            {
                IdList: 2,
                IdProduct: 1,
                amount: 2
            },
            {
                IdList: 2,
                IdProduct: 2,
                amount: 3
            },
            {
                IdList: 2,
                IdProduct: 3,
                amount: 1
            },
            {
                IdList: 2,
                IdProduct: 4,
                amount: 1
            },
            {
                IdList: 2,
                IdProduct: 5,
                amount: 4
            },
            {
                IdList: 1,
                IdProduct: 1,
                IdUser: 2,
                amount: 4
            },
            {
                IdList: 1,
                IdProduct: 2,
                IdUser: 2,
                amount: 2
            },
            {
                IdList: 1,
                IdProduct: 3,
                IdUser: 2,
                amount: 1
            },
            {
                IdList: 1,
                IdProduct: 4,
                IdUser: 2,
                amount: 2
            },
            {
                IdList: 1,
                IdProduct: 5,
                IdUser: 2,
                amount: 3
            },
        ],
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
        async cargarListedProducts() {
            const response = await fetch(this._url + "listedProducts");
            const results = await response.json();
            this._listedProducts = results;
            console.log(this._listedProducts)
        },
        async cargarLista() {
            const response = await fetch(this._url + "shoppingList?IdFamily=" + this._idFamily);
            const results = await response.json();
            //busco la lista de compras de la familia
            let listaCompras = results.find(list => list.IdFamily == this._idFamily && list.category == "Lista de compras");
            //le pongo el shoppingListName y el id correspondiente a la lista de compras
            this._listaDeCompras.shoppingListName = listaCompras.ShoppingListName;
            this._listaDeCompras.id = listaCompras.id;
            //busco los listed products de esa lista de compras
            let listedProductsListaDeCompras = this._listedProductoPrueba.filter(lp => lp.IdList == listaCompras.id);
            //agrego cada producto junto con su cantidad en la lista de compras
            for (let i = 0; i < listedProductsListaDeCompras.length; i++) {
                const responseProduct = await fetch(this._url + "products/" + listedProductsListaDeCompras[i].IdProduct);
                const product = await responseProduct.json();
                product.amount = listedProductsListaDeCompras[i].amount;
                /*                 const responseUser = await fetch(this._url + "user/" + listedProductsListaDeCompras[i].IdUser);
                                const user = await responseUser.json();
                                product.user = user.name; */
                this._listaDeCompras.products.push(product)
            }
        },
        async cargarAlacenaVirtual() {
            const response = await fetch(this._url + "shoppingList?IdFamily=" + this._idFamily);
            const results = await response.json();
            //busco la alacena de la familia
            let listaAlacena = results.find(list => list.IdFamily == this._idFamily && list.category == "Alacena virtual");
            //guardo el id de la alacena
            this._idAlacenaVirtual = listaAlacena.id
            //busco los listed products de esa alacena
            let listedProductsAlacena = this._listedProductoPrueba.filter(lp => lp.IdList == this._idAlacenaVirtual)
            //agrego cada producto junto con su cantidad en la alacena
            for (let i = 0; i < listedProductsAlacena.length; i++) {
                const responseProduct = await fetch(this._url + "products/" + listedProductsAlacena[i].IdProduct);
                const product = await responseProduct.json();
                product.amount = listedProductsAlacena[i].amount;
                this._alacenaVirtual.push(product)
            }
        },
        moverProductosAlacena() {
            //busco los listed products de la lista de compras
            let listedProductsLista = this._listedProductoPrueba.filter(lp => lp.IdList == this._listaDeCompras.id)
            //por cada lp en la lista, me fijo si está en la alacena y lo agrego
            for (let i = 0; i < listedProductsLista.length; i++) {
                let lp = this._listedProductoPrueba.find(lp => lp.IdProduct === listedProductsLista[i].IdProduct && lp.IdList == this._idAlacenaVirtual)
                if (lp == undefined) {
                    listedProductsLista[i].IdList = this._idAlacenaVirtual
                    this._listedProductoPrueba.push(listedProductsLista[i])
                } else {
                    console.log("Aumento en alacena")
                    lp.amount += listedProductsLista[i].amount
                }
                // y borro los listed products de la lista de compras
                this._listedProductoPrueba = this._listedProductoPrueba.filter(function (val) {
                    return val.IdList != this._listaDeCompras.id && val.IdProduct != listedProductsLista[i].pr;
                });
            }
            //borro los productos de la lista de compras
            this._listaDeCompras.products = [];

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