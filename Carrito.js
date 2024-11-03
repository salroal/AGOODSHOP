export default class Carrito {
    constructor(productos = []) {
        // Lista de productos con sus unidades en el carrito
        this.productos = productos; // Inicializamos el carrito con los productos pasados (si existen)
    }

    actualizarUnidades(sku, unidades, title = "", price = 0) {
        // Encuentra el producto con el SKU especificado
        const producto = this.productos.find(product => product.sku === sku);

        if (producto) {
            // Si el producto ya está en el carrito, actualiza las unidades
            producto.quantity = unidades;
        } else {
            // Si el producto no está en el carrito, añádelo con las unidades especificadas
            this.productos.push({ sku: sku, title: title, price: price, quantity: unidades });
        }
    }

    obtenerInformacionProducto(sku) {
        // Encuentra el producto con el SKU especificado y devuelve sus datos
        const producto = this.productos.find(product => product.sku === sku);

        if (producto) {
            // Devuelve el objeto con los datos del producto
            return {
                sku: producto.sku,
                title: producto.title,
                price: producto.price,
                quantity: producto.quantity
            };
        } else {
            // Si el producto no está en el carrito, devuelve null o un mensaje indicando que no está disponible
            return null;
        }
    }

    obtenerCarrito() {
        // Calcula el total del carrito
        let total = 0;
        const currency = " €"; // Moneda para representar el total

        // Creamos una copia del array de productos del carrito
        const products = this.productos.map(product => {
            total += product.quantity * product.price; // Asumimos que cada producto tiene un precio asociado

            return {
                sku: product.sku,
                title: product.title,
                price: product.price,
                quantity: product.quantity
            };
        });

        // Devuelve la información del carrito junto con el total
        return {
            total: total.toFixed(2),
            currency: currency,
            products: products
        };
    }
}