import { defineStore } from "pinia";

export const useStore = defineStore('pruebaContador', {
    state: () => ({
        _stock: [],
        _listedProducts: [],
        _listaDeCompras: {
            id: 1,
            shoppingListName: "",
            products: []
        },
        _alacenaVirtual: [],
        _idAlacenaVirtual: 2,
        _idFamily: 1,
        _url: "https://62b646096999cce2e800f9f0.mockapi.io/listapp/",
        _idListaEnUso: 1,
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
        async inicio() {
            await this.cargarStock();
            await this.cargarListedProducts();
            await this.cargarLista();
            await this.cargarAlacenaVirtual();
        },
        async cargarStock() {
            let response = await fetch(this._url + 'products/')
            let results = await response.json()
            this._stock = results
            console.log("carga stock")
            console.log(this._stock)
        },
        async cargarListedProducts() {
            const response = await fetch(this._url + "listedProducts");
            const results = await response.json();
            this._listedProducts = results;
            console.log("carga lp")
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
                let product = this._stock.find(p => p.id == listedProductsListaDeCompras[i].IdProduct);
                product.amount = listedProductsListaDeCompras[i].amount;
                /* const responseUser = await fetch(this._url + "user/" + listedProductsListaDeCompras[i].IdUser);
                const user = await responseUser.json();
                product.user = user.name; */
                this._listaDeCompras.products.push(product)
            }
            console.log("cargar lista")
            console.log(this._listaDeCompras)
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
                let product = this._stock.find(p => p.id == listedProductsAlacena[i].IdProduct);
                product.amount = listedProductsAlacena[i].amount;
                this._alacenaVirtual.push(product)
            }
            console.log("carga alacena virtual")
            console.log(this._alacenaVirtual)
        },
        async moverProductosAlacena() {
            //busco los listed products de la lista de compras
            let listedProductsLista = this._listedProducts.filter(lp => lp.IdList == this._listaDeCompras.id)
            console.log(listedProductsLista)
            //por cada lp en la lista, me fijo si está en la alacena y lo agrego
            for (let i = 0; i < listedProductsLista.length; i++) {
                let lp = this._listedProducts.find(lp => lp.IdProduct == listedProductsLista[i].IdProduct && lp.IdList == this._idAlacenaVirtual)
                console.log(lp)
                if (lp == undefined) {
                    this._alacenaVirtual.push(this._listaDeCompras.products.find(prod => prod.id == listedProductsLista[i].IdProduct))
                    fetch(this._url + "/listedProducts", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ IdList: this._idAlacenaVirtual, IdProduct: listedProductsLista[i].IdProduct, amount: listedProductsLista[i].amount })
                    }).then(res => {
                        res.json()
                        this._listedProducts.push(res)
                    }).then(res => console.log(res))
                    /* listedProductsLista[i].IdList = this._idAlacenaVirtual
                    this._listedProducts.push(listedProductsLista[i]) */
                } else {
                    console.log("Aumento en alacena")
                    lp.amount += listedProductsLista[i].amount
                    this._alacenaVirtual.find(prod => prod.id == lp.IdProduct).amount = lp.amount
                    fetch(this._url + "/listedProducts/" + lp.id, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ amount: lp.amount })
                    }).then(res => res.json())
                        .then(res => console.log(res))
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
            /* this._alacenaVirtual = [];
            this.cargarAlacenaVirtual(); */

        },
        async addProduct(product, amount) {
            let lp = await this.isProductOnList(this._idListaEnUso, product.id)
            if (lp == undefined) {
                if (this._idListaEnUso == this._listaDeCompras.id) {
                    product.amount = amount
                    this._listaDeCompras.products.push(product)
                }
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
                console.log("id lista: " + this._idListaEnUso + " id product: " + product.id);
                if (this._idListaEnUso == this._listaDeCompras.id) {
                    let prod = this._listaDeCompras.products.find(p => p.id == product.id)
                    prod.amount = cantidad
                }
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
        },
        async actualizarCantListaDeCompras(producto) {
            let prod = this._listaDeCompras.products.find(prod => prod.id == producto.id)
            prod.amount = producto.amount
            let lp = this._listedProducts.find(lp => lp.IdList == this._listaDeCompras.id && lp.IdProduct == producto.id)
            lp.amount = producto.amount
            await this.modificarCantListedProduct(lp)
        },
        async sacarListaDeCompras(producto) {
            this._listaDeCompras.products = this._listaDeCompras.products.filter(function (val) {
                return val != producto;
            })
            let lp = this._listedProducts.find(lp => lp.IdList == this._listaDeCompras.id && lp.IdProduct == producto.id)
            this._listedProducts = this._listedProducts.filter(function (val) {
                return val != lp;
            })
            await this.sacarListedProduct(lp)
        },
        async restarAlacena(amount) {
            console.log("restarAlacena" + amount)
        },
        async sacarAlacena(producto) {
            console.log("sacarAlacena" + producto)
        },
        async modificarCantListedProduct(lp) {
            fetch(this._url + "/listedProducts/" + lp.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: lp.amount })
            }).then(res => {
                res.json()
                console.log("lp modificado")
                console.log(res)
            })
        },
        async sacarListedProduct(lp) {
            fetch(this._url + "/listedProducts/" + lp.id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                res.json()
                console.log("lp eliminado")
                console.log(res)
            })
        }
    },
    getters: {
        listaDeCompras() {
            return this._listaDeCompras;
        },
        alacenaVirtual() {
            return this._alacenaVirtual;
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
        },
        stock() {
            return this._stock;
        }
    },
})