const prendaRemeras = [
    {nombre: "Remera Lisa B o N", valor : 3000},
    {nombre: "Remera Lisa Color", valor : 3200},
    {nombre: "Remera Estampada", valor : 3700},
    {nombre: "Remera Diseño de autor", valor : 4800}
]

const prendaPantalones = [
    {nombre: "Pantalon Chino", valor : 5500},
    {nombre: "Pantalon Jean", valor : 6300},
    {nombre: "Pantalon Jogger", valor : 5200},
    {nombre: "Pantalon Jogging", valor : 4900}
]

const prendaZapatillas = [
    {nombre: "Zapatillas de Lona", valor : 7000},
    {nombre: "Zapatillas de Gabardina", valor : 8500},
    {nombre: "Zapatillas de Eco Cuero", valor : 10000},
    {nombre: "Zapatillas de Cuero Premium", valor : 15750}
]

const prendas = prendaRemeras.concat(prendaPantalones)

const productosTotales = prendas.concat(prendaZapatillas)

let nombreUsuario = prompt("Buenas! Por favor ingrese su nombre")
let numeroPrendas = parseInt(prompt(`Ahora si ${nombreUsuario}, bienvenida/o al shop online de "Toleke", en esta sección encontrará las siguiente opciones para comprar: \n\n. Remeras \n. Pantalones \n. Zapatillas \n\nPor favor indique la cantidad de prendas que va a comprar`))


class Prendas {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

if ((numeroPrendas !== "" && nombreUsuario !== "")){
    function main() {

            let pedidoFinal = pedido()
            console.log(pedidoFinal)

            condicionMain: 
            if (pedidoFinal.length > 0){
                alert("Tu carrito tiene los siguientes productos")
                for (const producto of pedidoFinal) {
                    alert (`${producto.nombre} por: $${producto.precio} `)
                }

                let precioFinal = pedidoFinal.reduce((acumulador, elemento) => acumulador + elemento.precio, 0)
                console.log(precioFinal)

                formaPago(precioFinal)
            }
            else {
                break condicionMain
            }
    }

    main()
}
else {
    alert("No ingresaste tu nombre y cantidad de prendas!")
}

function pedido(){
    let prendasLista = []
    let prendaARegistrar = 0

    buclePedido: for (let i = 1; i<=numeroPrendas; i++){
        let nombrePrenda = parseInt(prompt(`Seleccione que prendas desea comprar \n\n1. Remeras \n2. Pantalones \n3. Zapatillas \n4. Salir`))

        switch (nombrePrenda){
            case 1: 
                remeras()
                    prendaARegistrar = new Prendas(
                    nombre,
                    precio,
                    )
                prendasLista.push(prendaARegistrar)
                break

            case 2:
                pantalones()
                    prendaARegistrar = new Prendas(
                    nombre,
                    precio,
                    )
                prendasLista.push(prendaARegistrar)
                break

            case 3:
                zapatillas()
                    prendaARegistrar = new Prendas(
                    nombre,
                    precio,
                    )
                prendasLista.push(prendaARegistrar)
                break

            case 4:
                alert("Hasta luego! gracias por visitar Toloke")
                break buclePedido

            default:
                alert ("Opcion invalida")
                break
        }
    }
    return prendasLista
}


function remeras() {

    let menuRemeras = parseInt(prompt(`Que remera preferis? \n\n 1. Lisa Blanca O Negra - ($3000)\n 2. Lisa Color - ($3200)\n 3. Estampada - ($3700)\n 4. Diseño de autor - ($4800)`))

    switch (menuRemeras) {
        case 1:
            alert("Excelente! Seleccionaste Lisa Blanca O Negra por $3000")
            nombre = productosTotales[0].nombre
            precio = productosTotales[0].valor
            return nombre, precio

        case 2:
            alert("Excelente! Seleccionaste Lisa Color por $3200")
            nombre = productosTotales[1].nombre
            precio = productosTotales[1].valor
            return nombre, precio

        case 3:
            alert("Excelente! Seleccionaste Estampada por 3$700")
            nombre = productosTotales[2].nombre
            precio = productosTotales[2].valor
            return nombre, precio

        case 4:
            alert("Excelente! Seleccionaste Diseño de autor por $4800")
            nombre = productosTotales[3].nombre
            precio = productosTotales[3].valor
            return nombre, precio

        default:
            alert("Opcion Incorrecta");
            remeras()
            break
    }
}

function pantalones() {

    let menuPantalones = parseInt(prompt(`Que pantalon preferis? \n\n 1. Chino - ($5500)\n 2. Jean - ($6300)\n 3. Jogger - ($5200)\n 4. Jogging - ($4900)`))

    switch (menuPantalones) {
        case 1:
            alert("Excelente! Seleccionaste pantalon Chino por $5500")
            nombre = productosTotales[4].nombre
            precio = productosTotales[4].valor
            return nombre, precio

        case 2:
            alert("Excelente! Seleccionaste pantalon Jean por $6300")
            nombre = productosTotales[5].nombre
            precio = productosTotales[5].valor
            return nombre, precio

        case 3:
            alert("Excelente! Seleccionaste pantalon Jogger por $5200")
            nombre = productosTotales[6].nombre
            precio = productosTotales[6].valor
            return nombre, precio

        case 4:
            alert("Excelente! Seleccionaste pantalon Jogging por $4900")
            nombre = productosTotales[7].nombre
            precio = productosTotales[7].valor
            return nombre, precio

        default:
            alert("Opcion Incorrecta");
            peaton()
            break
    }

}

function zapatillas() {

    let menuZapatillas = parseInt(prompt(`Que zapatillas preferis? \n\n 1. Lona - ($7000)\n 2. Gabardina - ($8500)\n 3. Eco Cuero - ($10000)\n 4. Cuero Premium - ($15750)`))

    switch (menuZapatillas) {
        case 1:
            alert("Excelente! Seleccionaste Zapas de Lona por $7000")
            nombre = productosTotales[8].nombre
            precio = productosTotales[8].valor
            return nombre, precio

        case 2:
            alert("Excelente! Seleccionaste Zapas de Gabardina por $8500")
            nombre = productosTotales[9].nombre
            precio = productosTotales[9].valor
            return nombre, precio

        case 3:
            alert("Excelente! Seleccionaste Zapas de Eco Cuero por $10000")
            nombre = productosTotales[10].nombre
            precio = productosTotales[10].valor
            return nombre, precio

        case 4:
            alert("Excelente! Seleccionaste Zapas de Cuero Premium por $15750")
            nombre = productosTotales[11].nombre
            precio = productosTotales[11].valor
            return nombre, precio

        default:
            alert("Opcion Incorrecta");
            rental()
            break
    }
}

function valorProducto(producto, formaPago){
    return parseInt(producto * formaPago)
}

function formaPago(precioFinal) {
    let medioPago = parseInt(prompt("Elija su medio de pago:\n\n 1. Efectivo / Transferencia\n 2. Tarjeta de débito\n 3. Tarjeta de crédito \n\n El pago en efectivo o transferencia, tiene un 10% de descuento\n El pago con tarjeta de crédito, tiene un 5% de recargo"))

    switch (medioPago) {
        case 1:
            alert('En efectivo tenes el 15% de descuento')
            let pagoEfectivo = 0.85
            alert(`Su pago es de: ${valorProducto(precioFinal, pagoEfectivo)}`)
            break

        case 2:
            alert('Precio normal por pago con debito')
            let pagoDebito = 1.0
            alert(`Su pago es de: ${valorProducto(precioFinal, pagoDebito)}`)
            break

        case 3:
            alert('Con tarjeta de credito tenes un 10% de recargo')
            let pagoCredito = 1.10
            alert(`Su pago es de: ${valorProducto(precioFinal, pagoCredito)}`)
            break

        default:
            alert("No ingreso una selección válida")
            pagar()
            break
    }
} 