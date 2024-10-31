import { Hospedaje } from './precios.js';

const hospedajes = {
    1: new Hospedaje(1, "Cabañas 5/6", "precio1", 2, "Cabaña para 2 personas", "balcondelgolf.com/alojamiento/cab2pax/"),
    2: new Hospedaje(2, "Cabañas 3/4/7/8/9/10", "precio2", 2, "Cabaña para 2 a 4 personas", "balcondelgolf.com/alojamiento/cab2a4pax/"),
    3: new Hospedaje(3, "Cabañas 22/23/24/25", "precio4", 2, "Cabaña premium para 2 a 4 personas con jacuzzi doble", "balcondelgolf.com/hosp-premium-de-2-a-4-pers-con-jacuzzi-doble/"),
    4: new Hospedaje(4, "Casa 21", "precio2", 2, "Casa para 2 a 4 personas apta mascotas", "https://balcondelgolf.com/alojamiento/cab2a4pax-masc/"),
    5: new Hospedaje(5, "Hospedaje 5", "precio5", 4, "Casa para 4 a 5 personas apta mascotas", "https://balcondelgolf.com/alojamiento/casa4o5pax-masc/"),
    6: new Hospedaje(6, "Hospedaje 6", "precio5", 4 ,"Casa para 4 a 6 personas apta mascotas", "https://balcondelgolf.com/alojamiento/casa4a6-masc/"),
    7: new Hospedaje(7, "Hospedaje 7", "precio5", 4, "Casa para 4 a 6 personas", "https://balcondelgolf.com/alojamiento/casa4a6/"),
    8: new Hospedaje(8, "Hospedaje 8", "precio5", 4, "Casa para 4 a 8 personas", "https://balcondelgolf.com/alojamiento/casa67u8pax/"),
    9: new Hospedaje(9, "Hospedaje 9", "precio1", 2, "Departamento para 2 a 3 personas", "https://balcondelgolf.com/alojamiento/cab6a8pax/"),
    10: new Hospedaje(10, "Hospedaje 10", "precio3", 2, "Lodge para 2 a 3 personas", "https://balcondelgolf.com/alojamiento/lodge2a3pax-2/"),
    11: new Hospedaje(11, "Hospedaje 11", "precio3", 2, "Lodge para 2 a 4 personas", "https://balcondelgolf.com/alojamiento/lodge2a4pax/"),
    12: new Hospedaje(12, "Hospedaje 12", "precio3", 2, "Lodge para 2 a 4 personas con jacuzzi", "https://balcondelgolf.com/alojamiento/lodge2a3pax/"),
    13: new Hospedaje(13, "Hospedaje 13", "precio3", 2, "Lodge para 2 a 5 personas", "https://balcondelgolf.com/alojamiento/lodge2a5pax/")
};

function calcularCargoPorPersonas(cantidadPersonas, hosp) {
    const limite = hosp.basePersonas;
    if (cantidadPersonas > limite) {
        return (cantidadPersonas - limite) * 5;
    }
    return 0;
}

window.calcularPrecios = function() {
    const cantidadPersonas = parseInt(document.getElementById('peopleCount').value);

    if (cantidadPersonas < 1) {
        alert('La cantidad de personas debe ser al menos 1');
        return;
    }

    const cabañasSeleccionadas = document.querySelectorAll('#listaHosp input:checked');
    if (cabañasSeleccionadas.length === 0) {
        alert('Por favor seleccione al menos una cabaña');
        return;
    }    


    if (!fechaInicio || !fechaFin) {
        alert('Por favor seleccione una fecha');
        return;
    }

    let resultadosHTML = 
        `<h2>Mensaje: </h2>
        <p> Estimado/a: </p>
        <p> Gracias por su interés en hospedarse en Balcón del Golf, en Sierra de la Ventana. Nos complace informarle que contamos con disponibilidad en las fechas consultadas.
        A continuación, le detallo las opciones de hospedaje disponibles, junto con el precio total de la estadía y la capacidad máxima de cada cabaña:</p>`;

    cabañasSeleccionadas.forEach(element => {
        const hospId = element.value;
        const hosp = hospedajes[hospId];
        
        const precioBase = hosp.calcularPrecioEstadia(fechaInicio, fechaFin);
        const cargoPersonas = calcularCargoPorPersonas(cantidadPersonas, hosp);
        const precioTotal = precioBase + cargoPersonas;

        /*
        Estimado/a:
        Gracias por su interés en hospedarse en Balcón del Golf, en Sierra de la Ventana. Nos complace informarle que contamos con disponibilidad en las fechas consultadas.
        A continuación, le detallo las opciones de hospedaje disponibles, junto con el precio total de la estadía y la capacidad máxima de cada cabaña:

        [Nombre o Tipo de Cabaña]: para [Cantidad de Personas] personas tiene un precio de $[Total por la Estancia] total por la estadía.

        Si desea proceder con la reserva o necesita más información, no dude en ponerse en contacto con nosotros. Estaremos encantados de asistirlo para asegurar una estadía placentera en nuestro complejo.
        */

        resultadosHTML += `
            <p>
            <a href="${hosp.link}" target="_blank">${hosp.descripcion}</a> 
            | Capacidad: ${cantidadPersonas} personas 
            | Precio Total: $${precioTotal.toLocaleString()} 
            </p>`;
    });

    resultadosHTML += 
        `<p> Si desea proceder con la reserva o necesita más información, no dude en ponerse en contacto con nosotros.
        Estaremos encantados de asistirlo para asegurar una estadía placentera en nuestro complejo.</p>`

    document.getElementById('results').innerHTML = resultadosHTML;
};