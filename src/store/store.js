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
            name: 'Admin',
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
            name: "Hettie",
            email: "Humberto89@hotmail.com",
            password: "_A73UBAIS_A4Xq7",
            familyId: 2,
            id: "4"
        },
        {
            name: "Abelardo",
            email: "Houston_Jacobs31@hotmail.com",
            password: "DabNk7cvFJhZbTJ",
            familyId: 2,
            id: "5"
        },
        {
            name: "Desmond",
            email: "Marquise.Reinger5@yahoo.com",
            password: "rauG1_ksFvBHINd",
            familyId: 3,
            id: "6"
        },
        {
            name: "Leonora",
            email: "Stella15@yahoo.com",
            password: "IwiT2xpr8UXF6V1",
            familyId: 3,
            id: "7"
        },
        {
            name: "Nicklaus",
            email: "Martin59@gmail.com",
            password: "7bPrehx5y7OAcqt",
            familyId: 4,
            id: "8"
        },
        {
            name: "Carissa",
            email: "Kristian_Stark@hotmail.com",
            password: "_8lu1mDAKt7jA5S",
            familyId: 4,
            id: "9"
        },
        {
            name: "Santina",
            email: "Shaylee.Davis@yahoo.com",
            password: "I1qRIrU1Z8xvhjk",
            familyId: 5,
            id: "10"
        },
        {
            name: "Major",
            email: "Barbara.Sporer@gmail.com",
            password: "NHmzj0HlwOmIGeb",
            familyId: 5,
            id: "11"
        },
        {
            name: "Dianna",
            email: "Cynthia82@hotmail.com",
            password: "EulpYDrpU3Wd_VU",
            familyId: 6,
            id: "12"
        },
        {
            name: "Zita",
            email: "Ana58@gmail.com",
            password: "zdzD3MZXERmqlfq",
            familyId: 7,
            id: "13"
        },
        {
            name: "Dorothy",
            email: "Antonina.Emmerich75@hotmail.com",
            password: "zc8Kjklb5bYf3rf",
            familyId: 8,
            id: "14"
        },
        {
            name: "Cary",
            email: "Lavina98@yahoo.com",
            password: "jMfV4PWKqVbhut1",
            familyId: 9,
            id: "15"
        },
        {
            name: "Marlee",
            email: "Una_Bayer@yahoo.com",
            password: "PsYXxp8f2bItLy7",
            familyId: 10,
            id: "16"
        }
        ],
        _userValid: false,
        _isAdmin: false,
        _userName: '',

    }),
    actions: {
        validarUsuario(mail, password) {
            let i = 0
            while (!this._userValid && i < this._users.length) {
                if (mail == this._users[i].mail && password == this._users[i].password) {
                    this._userValid = true;
                    this._userName = this._users[i].name
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
            let listedProductsLista = this._listedProducts.filter(lp => lp.IdList == this._listaDeCompras.id)
            //por cada lp en la lista, me fijo si está en la alacena y lo agrego
            for (let i = 0; i < listedProductsLista.length; i++) {
                let lp = this._listedProducts.find(lp => lp.IdProduct == listedProductsLista[i].IdProduct && lp.IdList == this._idAlacenaVirtual)
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
                        this.agregarListedProduct(this._idAlacenaVirtual, listedProductsLista[i].IdProduct)
                    })
                    /* listedProductsLista[i].IdList = this._idAlacenaVirtual
                    this._listedProducts.push(listedProductsLista[i]) */
                } else {
                    lp.amount += listedProductsLista[i].amount
                    this._alacenaVirtual.find(prod => prod.id == lp.IdProduct).amount = lp.amount
                    fetch(this._url + "/listedProducts/" + lp.id, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ amount: lp.amount })
                    })
                }
                // y borro los listed products de la lista de compras
                this._listedProducts = this._listedProducts.filter(function (val) {
                    return val.id != listedProductsLista[i].id;
                });
                this.sacarListedProduct(listedProductsLista[i])
            }
            //borro los productos de la lista de compras
            this._listaDeCompras.products = [];

        },
        async addProduct(product, amount) {
            let lp = await this.isProductOnList(this._idListaEnUso, product.id)
            if (lp == undefined) {
                if (this._idListaEnUso == this._listaDeCompras.id) {
                    const prod = {
                        id: product.id,
                        name: product.name,
                        brand: product.brand,
                        img: product.img,
                        price: product.price,
                        content: product.content,
                        category: product.category,
                        amount: amount
                    }
                    this._listaDeCompras.products.push(prod)
                }
                fetch(this._url + "/listedProducts", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ IdList: this._idListaEnUso, IdProduct: product.id, amount: amount })
                }).then(res => {
                    res.json()
                    this.agregarListedProduct(this._idListaEnUso, product.id)
                })
            } else {
                let cantidad = lp.amount + amount
                if (this._idListaEnUso == this._listaDeCompras.id) {
                    let prod = this._listaDeCompras.products.find(p => p.id == product.id)
                    prod.amount = cantidad
                }
                this._listedProducts.find(listedProd => listedProd.id == lp.id).amount = cantidad
                fetch(this._url + "/listedProducts/" + lp.id, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ IdList: this._idListaEnUso, IdProduct: product.id, amount: cantidad })
                })
            }
        },
        async isProductOnList(idList, prodId) {

            let listedProduct = this._listedProducts.find(lp => lp.IdList == idList && lp.IdProduct == prodId)
            return listedProduct
        },
        cambiarListaEnUso(id) {
            this._idListaEnUso = id;
        },
        addListaFav(lista) {
            this._listasFavoritas.push(lista)
        },
        async agregarListedProduct(idList, idProduct) {
            let lps = await fetch(this._url + "listedProducts?IdList=" + idList);
            lps = await lps.json();
            let lp = lps.find(prod => prod.IdList == idList && prod.IdProduct == idProduct)
            this._listedProducts.push(lp)
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
                //console.log("")
                product = await product.json();
                product.amount = listedProducts[i].amount
                products.push(product)
            }
            return products
        },
        async actualizarCantListaDeCompras(producto) {
            let lp = this._listedProducts.find(lp => lp.IdList == this._idListaEnUso && lp.IdProduct == producto.id)
            lp.amount = producto.amount
            await this.modificarCantListedProduct(lp)
        },
        async sacarListaDeCompras(producto) {
            if (this._idListaEnUso == this._listaDeCompras.id) {
                this._listaDeCompras.products = this._listaDeCompras.products.filter(function (val) {
                    return val != producto;
                })
            }
            let lp = this._listedProducts.find(lp => lp.IdList == this._idListaEnUso && lp.IdProduct == producto.id)
            this._listedProducts = this._listedProducts.filter(function (val) {
                return val != lp;
            })
            await this.sacarListedProduct(lp)
        },
        async restarAlacena(producto) {
            let prod = this._alacenaVirtual.find(p => p.id == producto.id)
            prod.amount = producto.amount
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
            })
        },
        async sacarListedProduct(lp) {
            fetch(this._url + "/listedProducts/" + lp.id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
        },
        cerrarSesion() {
            this._isAdmin = false
            this._userValid = false
            this._userName = ''
            this.reset()
        },
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
        },
        cantUsers() {
            return this._users.length
        },
        userName() {
            return this._userName
        },
        prodsEnStock() {
            return this._stock.length
        }
    },
})