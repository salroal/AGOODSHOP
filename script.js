import Carrito from "./Carrito.js"; // Importar la clase Carrito

const carrito = new Carrito(); // Inicializar una instancia del carrito

var productos = [];

document.addEventListener('DOMContentLoaded', function (event) {
    function cargarTabla(productos) {
        const tablaProducts = document.getElementById("tablaProductos");
        productos.forEach(product => {
            // Crear la celda para el título y SKU
            const titleSKUCell = document.createElement('td');

            // Crear elementos para el título y SKU
            const titleElement = document.createElement('p');
            titleElement.innerText = product.title;

            const skuElement = document.createElement('p');
            skuElement.innerText = ("REF. " + product.SKU);
            skuElement.classList.add('sku'); // Crea clase 'sku' para aplicar estilo diferente en CSS (fuente más pequeña)

            // Añadir los elementos de título y SKU a la misma celda
            titleSKUCell.appendChild(titleElement);
            titleSKUCell.appendChild(skuElement);

            // Crear celda para la cantidad
            const quantityCell = document.createElement('td');

            // Crear contenedor div para meter los elementos necesarios
            const miDiv = document.createElement('div');
            miDiv.style.display = 'flex';  // Para alinear los botones y el contador horizontalmente

            const miButtonMenos = document.createElement('button');
            miButtonMenos.textContent = "-";

            const contador = document.createElement('input'); // Usar <input> en lugar de <span>
            contador.type = 'number';
            contador.value = 0; // Inicializar el contador en 0
            contador.min = 0;   // No permitir valores negativos
            contador.style.width = '50px'; // Ajustar el tamaño del input

            const miButtonMas = document.createElement('button');        
            miButtonMas.textContent = "+";

            // Añadir los elementos al contenedor
            miDiv.append(miButtonMenos, contador, miButtonMas);

            // Añadir el contenedor a la celda
            quantityCell.appendChild(miDiv);

            // Crear celda para el precio
            const priceCell = document.createElement('td');
            priceCell.innerText = product.price + " €";

            // Crear celda para el total
            const totalPriceCell = document.createElement('td');
            totalPriceCell.innerText = "0 €"; // Inicializar el total en 0

            // Función para actualizar el total usando la clase Carrito
            function actualizarTotal() {
                const cantidadActual = parseInt(contador.value) || 0;
                carrito.actualizarUnidades(product.SKU, cantidadActual, product.title, product.price);
                const producto = carrito.obtenerInformacionProducto(product.SKU);
                const total = producto.quantity * product.price;
                totalPriceCell.innerText = total.toFixed(2) + " €";

                // Actualizar la información del carrito en la sección derecha
                actualizarInformacionCarrito();
            }

            // Evento para disminuir el contador
            miButtonMenos.addEventListener('click', function () {
                let cantidadActual = parseInt(contador.value) || 0;
                if (cantidadActual > 0) {
                    cantidadActual--;
                    contador.value = cantidadActual;
                    actualizarTotal(); // Actualizar el total después de modificar la cantidad
                }
            });

            // Evento para aumentar el contador
            miButtonMas.addEventListener('click', function () {
                let cantidadActual = parseInt(contador.value) || 0;
                cantidadActual++;
                contador.value = cantidadActual;
                actualizarTotal(); // Actualizar el total después de modificar la cantidad
            });

            // Evento para introducir la cantidad manualmente
            contador.addEventListener('input', function () {
                let cantidadActual = parseInt(contador.value);
                if (isNaN(cantidadActual) || cantidadActual < 0) {
                    contador.value = 0; // Restablecer a 0 si el valor es inválido o menor que 0
                }
                actualizarTotal(); // Actualizar el total después de modificar la cantidad manualmente
            });

            // Crear la fila y agregar las celdas
            const tr = document.createElement('tr');
            tr.append(titleSKUCell, quantityCell, priceCell, totalPriceCell);

            // Agregar la fila al cuerpo de la tabla
            tablaProducts.appendChild(tr);
        });
    }

    function actualizarInformacionCarrito() {
        const carritoInfoDivArticulo = document.getElementById("unidadesPorArticulo");
        const carritoInfoDivPrecio = document.getElementById("unidadesPorPrecioUnitario");
        const totalFinal = document.getElementById("totalFinal");
        carritoInfoDivArticulo.innerHTML = ""; // Limpiar el contenido actual
        carritoInfoDivPrecio.innerHTML = ""; // Limpiar el contenido actual

        const carritoInfo = carrito.obtenerCarrito();
        carritoInfo.products.forEach(product => {
            if (product.quantity > 0) {
                const productInfoArticulo = document.createElement('p');
                productInfoArticulo.innerText = `${product.quantity} x ${product.title}`;
                carritoInfoDivArticulo.appendChild(productInfoArticulo);

                const productInfoPrecio = document.createElement('p');
                productInfoPrecio.innerText = `${product.quantity} x ${product.price} € = ${(product.quantity * product.price).toFixed(2)} €`;
                carritoInfoDivPrecio.appendChild(productInfoPrecio);
            }
        });

        // Actualizar el total general del carrito
        totalFinal.innerText = `${carritoInfo.total}€`;
    }

    fetch('https://jsonblob.com/api/1297122584360247296')
    .then(response => response.json())
    .then(stock => {
        productos = stock.products;
        cargarTabla(productos);
    });
});