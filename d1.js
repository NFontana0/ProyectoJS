let nombre = prompt("Hola! Ingrese su nombre para iniciar")
let opciones = prompt(`Ahora si, ${nombre} ! \n Recorda que nuestra consulta tiene un valor de $100, con un 10% de descuento en efectivo y con un 10% de recargo con tarjeta de credito ! \n\n.Ingresa "1" para ingresar a nuestra web.  \n .O bien ingresa "2" si queres salir`)

if ((opciones !== "") && ((opciones == "1") || (opciones == "2") )){
    while ((opciones !== "2")){
        menu()
    }
} else {
    alert("Opcion Incorrecta")
}

function menu(){
    let menu = parseInt(prompt('Motivo de la consulta? \n\n 1. Alquiler \n 2. Compra/Venta'))
    switch (menu){    
        case 1:
            alquiler()
            break;
        case 2: 
            compraVenta()
            break;
        default:
            alert("Opcion Incorrecta");
            menu()
            break;   
    }
}

function alquiler(){
    let menuInmo = parseInt(prompt(`Nuestras opciones de alquiler \n\n 1. Departamentos \n 2. Casas\n 3. PH \n 4. Casa Quinta \n 5. Vacacional`))
    switch (menuInmo){
        case 1:
            alert("La opcion seleccionada es Departamentos")
            pagar()
            break;
        case 2: 
            alert("La opcion seleccionada es Casas")
            pagar()
            break;
        case 3:
            alert("La opcion seleccionada es PH")
            pagar()
            break;
        case 4:
            alert("La opcion seleccionada es Casa Quinta")
            pagar()
            break;
        case 5:
            alert("La opcion seleccionada es Vacacional")
            pagar()
            break;
        default:
            alert("Opcion Incorrecta");
            menu()
            break;   
    }
}


function compraVenta(){
    let menuInmo = parseInt(prompt(`Nuestras opciones de Compra/Venta \n\n 1. Departamentos \n 2. Casas \n 3.Chalets `))
    switch (menuInmo){
        case 1:
            alert("La opcion seleccionada es Departamentos")
            pagar()
            break;
        case 2: 
            alert("La opcion seleccionada es Casas")
            pagar()
            break;
        case 3:
            alert("La opcion seleccionada es Chalets")
            pagar()
            break;
        default:
            alert("Opcion Incorrecta");
            menu()
            break;   
    }
}

function pagar(){
    let pago = parseInt(prompt("Forma de pago:\n\n 1. Efectivo\n 2. Tarjeta de credito\n 3. CrediCuotas "))
    switch (pago){
        case 1:
            alert('Por ser pago en efectivo, le hacemos un 10% de descuento')
            let efvo = 100
            let calculo1 = efvo * 0.9
            alert(`Su pago es de: ${calculo1}`)
            break;
        case 2:
            alert('Por ser pago con tarjeta de credito, tenes un 10% de recargo')
            let cred = 100
            let calculo2 = cred * 1.10
            alert(`Su pago es de: ${calculo2}`)
            break;
        case 3:
            alert('Pago en 3 cuotas sin interes')
            let cuotas = 100
            let qCuotas = 3
            let calculo3 = cuotas / qCuotas
            let calculo4 = cuotas * 1
            alert(`Su pago es de: 3 cuotas de ${calculo3}, con un total de ${calculo4} al finalizar la 3er cuota. `)
            break;
        default:
            alert("Opcion Incorrecta")
            menu()
            break;   
    }
}
