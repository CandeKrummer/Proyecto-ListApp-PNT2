import { defineStore } from "pinia";

export const useStore = defineStore('pruebaContador', {
    state: () => ({
        _stock: [],
        _listedProducts: [],
        _listaDeCompras: {
            id: 0,
            shoppingListName: "",
            products: []
        },
        _alacenaVirtual: [],
        _idAlacenaVirtual: 0,
        _idFamily: 0,
        _url: "https://62b646096999cce2e800f9f0.mockapi.io/listapp/",
        _idListaEnUso: 0,
        _users: [{
            mail: 'admin@a.com',
            password: 'admin',
            familyId: 0,
        },
        {
            name: "Cande",
            mail: 'cande@a.com',
            password: 'branch',
            familyId: 1,
        },
        {
            name: "Martin",
            mail: 'martin@a.com',
            password: 'branch',
            familyId: 1,
        },
        {
            name: "Juan",
            mail: 'juan@a.com',
            password: 'branch',
            familyId: 2,
        },
        {
            name: "Juana",
            mail: 'juana@a.com',
            password: 'branch',
            familyId: 2,
        },
        ],
        _userValid: false,
        _isAdmin: false

    }),
    actions: {
        validarUsuario(mail, password) {
            let i = 0
            while (!this._userValid && i < this._users.length) {
                if (mail == this._users[i].mail && password == this._users[i].password) {
                    this._userValid = true;

                    this._idFamily = this._users[i].familyId
                    if (this._idFamily == 0) {
                        console.log("hola admin")
                        this._isAdmin = true;
                    }
                }
                i++
            }

            return this._userValid;
        },
        reset() {
            this._listaDeCompras = {
                id: 0,
                shoppingListName: "",
                products: []
            }
            this._alacenaVirtual = []
        },
        async inicio() {
            await this.cargarStock();
            await this.cargarListedProducts();
            await this.cargarLista();
            await this.cargarAlacenaVirtual();
        },
        async cargarStock() {
            const response = await fetch(this._url + 'products/')
            const results = await response.json()
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
            let listedProductsListaDeCompras = this._listedProducts.filter(lp => lp.IdList == this._listaDeCompras.id);
            //agrego cada producto junto con su cantidad en la lista de compras
            for (let i = 0; i < listedProductsListaDeCompras.length; i++) {
                const prod = this._stock.find(p => p.id == listedProductsListaDeCompras[i].IdProduct);
                const product = {
                    id: prod.id,
                    name: prod.name,
                    brand: prod.brand,
                    img: prod.img,
                    price: prod.price,
                    content: prod.content,
                    category: prod.category,
                    amount: listedProductsListaDeCompras[i].amount
                }
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
                const prod = this._stock.find(p => p.id == listedProductsAlacena[i].IdProduct);
                const product = {
                    id: prod.id,
                    name: prod.name,
                    brand: prod.brand,
                    img: prod.img,
                    price: prod.price,
                    content: prod.content,
                    category: prod.category,
                    amount: listedProductsAlacena[i].amount
                }
                this._alacenaVirtual.push(product)
            }
            console.log("carga alacena virtual")
            console.log(this._alacenaVirtual)
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
        },
        async actualizarCantListaDeCompras(producto) {
            let prod = this._listaDeCompras.products.find(prod => prod.id == producto.id)
            prod.amount = producto.amount
            console.log("cant product: " + prod.amount)
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
        async restarAlacena(producto) {
            let prod = this._alacenaVirtual.find(p => p.id == producto.id)
            prod.amount = producto.amount
            console.log("cant product: " + prod.amount)
            let lp = this._listedProducts.find(lp => lp.IdList == this._idAlacenaVirtual && lp.IdProduct == producto.id)
            lp.amount = producto.amount
            await this.modificarCantListedProduct(lp)
        },
        async sacarAlacena(producto) {
            this._alacenaVirtual = this._alacenaVirtual.filter(function (val) {
                return val != producto;
            })
            let lp = this._listedProducts.find(lp => lp.IdList == this._idAlacenaVirtual && lp.IdProduct == producto.id)
            this._listedProducts = this._listedProducts.filter(function (val) {
                return val != lp;
            })
            await this.sacarListedProduct(lp)
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
        },
        estaAutenticado() {
            return this._userValid
        },
        isAdmin() {
            return this._isAdmin
        }
    },
})