import { defineStore } from "pinia";

export const useStore = defineStore('pruebaContador', {
    state: () => ({
        _listedProducts: [
            {
                id: 1,
                IdList: 31,
                IdProduct: 1,
                amount: 2
            },
            {
                id: 2,
                IdList: 21,
                IdProduct: 2,

            },
        ],
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
        _idListaEnUso: 0,
        _listasFavoritas: [{
            id: 0,
            ShoppingListName: "Crear nueva compra",
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
            let listedProductsListaDeCompras = this._listedProducts.filter(lp => lp.IdList == listaCompras.id);
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
            let listedProductsAlacena = this._listedProducts.filter(lp => lp.IdList == this._idAlacenaVirtual)
            //agrego cada producto junto con su cantidad en la alacena
            for (let i = 0; i < listedProductsAlacena.length; i++) {
                const responseProduct = await fetch(this._url + "products/" + listedProductsAlacena[i].IdProduct);
                const product = await responseProduct.json();
                product.amount = listedProductsAlacena[i].amount;
                this._alacenaVirtual.push(product)
            }
        },
        async moverProductosAlacena() {
            //busco los listed products de la lista de compras
            let listedProductsLista = this._listedProducts.filter(lp => lp.IdList == this._listaDeCompras.id)
            //por cada lp en la lista, me fijo si está en la alacena y lo agrego
            for (let i = 0; i < listedProductsLista.length; i++) {
                let lp = this._listedProducts.find(lp => lp.IdProduct === listedProductsLista[i].IdProduct && lp.IdList == this._idAlacenaVirtual)
                if (lp == undefined) {
                    listedProductsLista[i].IdList = this._idAlacenaVirtual
                    this._listedProducts.push(listedProductsLista[i])
                } else {
                    console.log("Aumento en alacena")
                    lp.amount += listedProductsLista[i].amount
                }
                // y borro los listed products de la lista de compras
                this._listedProducts = this._listedProducts.filter(function (val) {
                    console.log("borrar lp")
                    return val.id != listedProductsLista[i].id;
                });
            }
            //borro los productos de la lista de compras
            this._listaDeCompras.products = [];
            //llamo a cargar la alacena devuelta
            this._alacenaVirtual = [];
            await this.cargarAlacenaVirtual();

        },
        async addProduct(product, amount) {
            let lp = await this.isProductOnList(this._idListaEnUso, product.id)
            if (lp == undefined) {
                fetch(this._url + "/listedProducts", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ IdList: this._idListaEnUso, IdProduct: product.id, amount: amount })
                }).then(res => res.json())
                    .then(res => console.log(res))
            } else {
                let cantidad = lp.amount + amount
                fetch(this._url + "/listedProducts/" + lp.id, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ IdList: this._idListaEnUso, IdProduct: product.id, amount: cantidad })
                }).then(res => res.json())
                    .then(res => console.log(res))
            }
        },
        async isProductOnList(idList, prodId) {
            let listedProduct
            let i = 0
            let products = await this.getListedProdFromList(idList)
            console.log(products)
            while (i < products.length && listedProduct == undefined) {
                if (products[i].IdProduct == prodId) {
                    listedProduct = products[i]
                }
                i++
            }
            console.log(listedProduct)
            return listedProduct
        },
        cambiarListaEnUso(id) {
            this._idListaEnUso = id;
        },
        addListaFav(lista) {
            this._listasFavoritas.push(lista)
        },
        async getListedProdFromList(idList) {
            let lps = await fetch(this._url + "listedProducts?IdList=" + idList);
            lps = await lps.json();
            lps = lps.filter(prod => prod.IdList == idList)
            return lps
        },
        async getProductsFromList(idList) {
            let products = []
            let listedProducts = await this.getListedProdFromList(idList)
            let product
            for (let i = 0; i < listedProducts.length; i++) {
                product = await fetch(this._url + 'products/' + listedProducts[i].IdProduct);
                console.log("")
                product = await product.json();
                product.amount = listedProducts[i].amount
                products.push(product)
            }
            return products
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
        },
        idFamily() {
            return this._idFamily
        },
        url() {
            return this._url
        },
        idLista() {
            return this._idListaEnUso
        }
    },
})