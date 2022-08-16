const prendaRemeras = []
const prendaPantalones = []
const prendaZapatillas = []
const prendas = prendaRemeras.concat(prendaPantalones)
const productosTotales = prendas.concat(prendaZapatillas)

class Remeras {
    constructor(id, nombre, valor) {
        this.id = id;
        this.nombre = nombre;
        this.valor = valor;
    }
}

class Pantalones {
    constructor(id, nombre, valor) {
        this.id = id;
        this.nombre = nombre;
        this.valor = valor;
    }
}

class Zapatillas {
    constructor(id, nombre, valor) {
        this.id = id;
        this.nombre = nombre;
        this.valor = valor;
    }
}


class Carrito {
    constructor(id) {
        this.id = id;
        this.productos = [];
    }

    calcularTotal() {
        let total = 0;
        for(let i = 0; i < this.productos.length; i++) {
            total = total + this.productos[i].valor;
        }
        return total;
    }
}

let formulario;
let inputNombre;
let inputPrenda;
let cards;
let tablaCarrito;
let tablaBody;
let botones;
let eliminar;
let finalizar;
let totalCompra;
let precioFinalCompra;

function inicializarElementos(){
    formulario = document.getElementById("formulario");
    inputNombre = document.getElementById("inputNombre");
    inputPrenda = document.getElementById("inputPrenda");
    cards = document.getElementById("cards");
    tablaCarrito = document.getElementById("tablaCarrito");
    tablaBody = document.getElementById("tBody");
    botones = document.getElementsByClassName("compra");
    eliminar = document.getElementById("eliminar");
    finalizar = document.getElementById("finalizar");
    totalCompra = document.getElementById("totalCompra");
    precioFinalCompra = document.getElementById("precioFinalCompra");
}

function inicializarEventos() {
    formulario.onsubmit = (event) => validarFormulario(event);
    }

function validarFormulario(event) {
    event.preventDefault();
    let nombre = inputNombre.value;
    let prenda = inputPrenda.value;

    if ((prenda === "Remeras") && (nombre !== "")){
        cards.innerHTML = "";
        prendaRemeras.forEach(producto => {
        cards.innerHTML += renderCard(producto);
        })
    }
    else if ((prenda === "Pantalones") && (nombre !== "")){
        cards.innerHTML = "";
        prendaPantalones.forEach(producto => {
        cards.innerHTML += renderCard(producto);
        })
    }
    else if ((prenda === "Zapatillas") && (nombre !== "")){
        cards.innerHTML = "";
        prendaZapatillas.forEach(producto => {
        cards.innerHTML += renderCard(producto);
        })
    }

    
    let st = actualizarCarrito();
    agregarCarrito(st);
}

function renderCard(prenda) {
    let cardRendered = `    
    <div class="card col-lg-5 col-md-5 m-3" style="width: 18rem;">
        <div class="card-body col-lg-12">
            <h5 class="card-title">${prenda.id}. ${prenda.nombre}</h5>
            <p class="card-text">$ ${prenda.valor}</p>
            <a href="#" class="btn btn-primary compra" id="${prenda.id}">Agregar al carrito</a>
        </div>
    </div>
    `;
    return cardRendered;
}

function agregarCarrito (st) {
    let carrito = new Carrito(1);
    if(st !== null){
        for (const item of st.productos) {
            carrito.productos.push(item);
            limpiarCarrito();
            renderizarCarrito(carrito);
            renovarStorage(carrito);
        }
    }

    let arrayDeBotones = Array.from(botones);
    arrayDeBotones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            let productoSeleccionado = productosTotales.find(producto => producto.id == e.target.id);
            carrito.productos.push(productoSeleccionado);
            limpiarCarrito();
            renderizarCarrito(carrito);
            renovarStorage(carrito);
        })
    })

    eliminar.onclick = () => {eliminadoCarrito()};
    finalizar.onclick = () => {finalizarCompra(carrito), formaPago(carrito)};
}


function actualizarCarrito (){
    let storage = JSON.parse(localStorage.getItem("carrito"));
    localStorage.removeItem("carrito"); 
    return storage;
}

function renovarStorage(carrito) {
    localStorage.removeItem("carrito"); 
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function limpiarCarrito() {
    tablaCarrito.innerHTML = "";
}


function eliminadoCarrito() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
        title: 'Estas segura/o de limpiar tu carrito compra?',
        text: "Esta accion es irreversible!",
        icon: '¡Stop!',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar mi carrito de compra',
        cancelButtonText: 'No, continuar comprando',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

                tablaCarrito.innerHTML = "";
                localStorage.clear();
                
        swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Tu carrito de compra ha sido borrado',
            'Exitoso'
        )
        } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
        ) {
        swalWithBootstrapButtons.fire(
            'Cancelado!',
            'Continuar la compra.',
            'Error'
        )
        }
    })
}

function alertClean () {
    Swal.fire({
        icon: 'warning',
        title: 'Su carrito esta vacío',
    })
}

function finalizarCompra(carrito){

    if(carrito.calcularTotal() !== 0){
    let finalDeCompra = document.createElement("h3");
    totalCompra.innerHTML = "";
    finalDeCompra.innerHTML = `
        Valor actualizado del carrito: <b>${carrito.calcularTotal()}</b>. ¿Que medio de pago preferis utilizar?.
    `;
    totalCompra.appendChild(finalDeCompra);

    let divtotal = document.createElement("div");
    divtotal.innerHTML = `
        <button type="submit" id="efectivo" class="btn btn-primary mt-1 mb-1 align-self-center" id="">Efectivo - 15% de descuento</button><br>
        <button type="submit" id="debito/transferencia" class="btn btn-primary mt-1 mb-1 align-self-center" id="">Tarjeta de débito / Transferencia bancaria - Precio original (sin descuento)</button><br>
        <button type="submit" id="credito" class="btn btn-primary mt-1 mb-1 align-self-center" id="">Tarjeta de crédito - 10% de recargo</button>`;
    totalCompra.appendChild(divtotal);
    } else {
    alertClean();
    }
}

function formaPago (carrito) {

    let efectivo = document.getElementById("efectivo");
    let debitoTransferencia = document.getElementById("debito/transferencia");
    let credito = document.getElementById("credito");

    efectivo.onclick = () => {
        precioFinalCompra.innerHTML = "";
        let precioCarrito = document.createElement("h3");
        precioCarrito.innerHTML = `
            Valor total a pagar: <b>${carrito.calcularTotal()*0.85}</b>.`;
        precioFinalCompra.appendChild(precioCarrito);
    };

    debitoTransferencia.onclick = () => {
        precioFinalCompra.innerHTML = "";
        let precioCarrito = document.createElement("h3");
        precioCarrito.innerHTML = `
            Valor total a pagar: <b>${carrito.calcularTotal()*1.0}</b>.`;
        precioFinalCompra.appendChild(precioCarrito);
    };

    credito.onclick = () => {
        precioFinalCompra.innerHTML = "";
        let precioCarrito = document.createElement("h3");
        precioCarrito.innerHTML = `
            Valor total a pagar: <b>${carrito.calcularTotal()*1.10}</b>.`;
        precioFinalCompra.appendChild(precioCarrito);
    };

    eliminarCarrito();
}

function renderizarCarrito(carrito) {
    carrito.productos.forEach(producto => {
        let filaTabla = document.createElement("tr");
        filaTabla.innerHTML = `
            <td class="text-center">${producto.id}</td>
            <td class="text-center">${producto.nombre}</td>
            <td class="text-center">${producto.valor}</td>`;
            tablaCarrito.appendChild(filaTabla);
    })

    let filaTotal = document.createElement("tr");
    filaTotal.innerHTML = `
        <td class="text-center"><b>Subtotal</b></td>
        <td class=""></td>
        <td class="text-center"><b>${carrito.calcularTotal()}</b></td>`;
    tablaCarrito.appendChild(filaTotal);
}

async function obtenerArrayRemeras() {
    const res = await fetch("remeras.json");
    const data = await res.json();
    data.forEach(item => {
        let remeras = new Remeras (item.id, item.nombre, item.valor);
        prendaRemeras.push(remeras)
        productosTotales.push(remeras);
        })
}

async function obtenerArrayPantalones() {
    const res = await fetch("pantalones.json");
    const data = await res.json();
    data.forEach(item => {
        let pantalones = new Pantalones (item.id, item.nombre, item.valor);
        prendaPantalones.push(pantalones)
        productosTotales.push(pantalones);
        })
}

async function obtenerArrayZapatillas() {
    const res = await fetch("zapatillas.json");
    const data = await res.json();
    data.forEach(item => {
        let zapatillas = new Zapatillas (item.id, item.nombre, item.valor);
        prendaZapatillas.push(zapatillas)
        productosTotales.push(zapatillas);
        })
}

async function main (){
    inicializarElementos();
    inicializarEventos();
    await obtenerArrayRemeras();
    await obtenerArrayPantalones();
    await obtenerArrayZapatillas();
}

main();