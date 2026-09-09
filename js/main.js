// Cargar tarjetas de productos en catálogo
function cargarProductos() {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    contenedor.innerHTML = "";
    productosGas.forEach(p => {
        contenedor.innerHTML += `
            <div class="col-md-4 col-lg-3 mb-4">
                <div class="card card-producto h-100">
                    <img src="${p.img}" class="card-img-top" alt="${p.nombre}">
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-secondary mb-2 text-wrap" style="width: max-content;">${p.categoria}</span>
                        <h5 class="card-title h6 fw-bold">${p.nombre}</h5>
                        <p class="card-text text-muted small flex-grow-1">${p.desc}</p>
                        <p class="fw-bold fs-5 text-dark mb-2">$${p.precioResidencial.toLocaleString("es-CL")}</p>
                        <button onclick="agregarAlCarrito('${p.codigo}')" class="btn btn-warning w-100 mt-auto fw-bold">Añadir al Carrito</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Carrito de compras usando LocalStorage
function agregarAlCarrito(codigo) {
    let carrito = JSON.parse(localStorage.getItem("carrito_gas")) || [];
    const producto = productosGas.find(p => p.codigo === codigo);
    
    if (producto) {
        carrito.push(producto);
        localStorage.setItem("carrito_gas", JSON.stringify(carrito));
        alert(`¡${producto.nombre} agregado al carrito!`);
        renderizarCarrito();
    }
}

function renderizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total-carrito");
    if (!listaCarrito) return;

    let carrito = JSON.parse(localStorage.getItem("carrito_gas")) || [];
    listaCarrito.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = `<li class="list-group-item text-center text-muted">El carrito está vacío</li>`;
    } else {
        carrito.forEach((item, index) => {
            total += item.precioResidencial;
            listaCarrito.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong class="d-block">${item.nombre}</strong>
                        <small class="text-muted">$${item.precioResidencial.toLocaleString("es-CL")}</small>
                    </div>
                    <button onclick="eliminarDelCarrito(${index})" class="btn btn-sm btn-outline-danger">Quitar</button>
                </li>
            `;
        });
    }

    if (totalElemento) {
        totalElemento.innerText = `$${total.toLocaleString("es-CL")}`;
    }
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito_gas")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito_gas", JSON.stringify(carrito));
    renderizarCarrito();
}

// Selector Dinámico de Región y Comuna
function inicializarRegionComunas() {
    const selectRegion = document.getElementById("select-region");
    const selectComuna = document.getElementById("select-comuna");

    if (!selectRegion || !selectComuna) return;

    selectRegion.innerHTML = '<option value="">Seleccione Región</option>';
    regionesYComunas.forEach(r => {
        const opt = document.createElement("option");
        opt.value = r.region;
        opt.textContent = r.region;
        selectRegion.appendChild(opt);
    });

    selectRegion.addEventListener("change", function () {
        selectComuna.innerHTML = '<option value="">Seleccione Comuna</option>';
        const regionSel = regionesYComunas.find(r => r.region === this.value);
        if (regionSel) {
            regionSel.comunas.forEach(c => {
                const opt = document.createElement("option");
                opt.value = c;
                opt.textContent = c;
                selectComuna.appendChild(opt);
            });
        }
    });
}

// Inicialización general al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    renderizarCarrito();
    inicializarRegionComunas();
});