const prendaRemeras = [
    {id: 1, nombre: "Remera Lisa B o N", valor : 3000},
    {id: 2, nombre: "Remera Lisa Color", valor : 3200},
    {id: 3, nombre: "Remera Estampada", valor : 3700},
    {id: 4, nombre: "Remera Diseño de autor", valor : 4800}
]

const prendaPantalones = [
    {id: 5, nombre: "Pantalon Chino", valor : 5500},
    {id: 6, nombre: "Pantalon Jean", valor : 6300},
    {id: 7, nombre: "Pantalon Jogger", valor : 5200},
    {id: 8, nombre: "Pantalon Jogging", valor : 4900}
]

const prendaZapatillas = [
    {id: 9, nombre: "Zapatillas de Lona", valor : 7000},
    {id: 10, nombre: "Zapatillas de Gabardina", valor : 8500},
    {id: 11, nombre: "Zapatillas de Eco Cuero", valor : 10000},
    {id: 12, nombre: "Zapatillas de Cuero Premium", valor : 15750}
]

const prendas = prendaRemeras.concat(prendaPantalones)
const productosTotales = prendas.concat(prendaZapatillas)


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

    eliminar.onclick = () => {eliminarCarrito()};
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

function eliminarCarrito() {
    tablaCarrito.innerHTML = "";
    localStorage.clear();
}

function finalizarCompra(carrito){
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

function main (){
    inicializarElementos();
    inicializarEventos();
}

main();