import { Hospedaje } from './precios.js';

const hospedajes = {
    1: new Hospedaje(1, "Cabañas 5/6", "precio1", 2, 2, "Cabaña para 2 personas", "https://balcondelgolf.com/alojamiento/cab2pax/"),
    2: new Hospedaje(2, "Cabañas 3/4/7/8/9/10", "precio2", 2, 4, "Cabaña para 2 a 4 personas", "https://balcondelgolf.com/alojamiento/cab2a4pax/"),
    3: new Hospedaje(3, "Cabañas 22/23/24/25", "precio4", 2, 4, "Cabaña premium para 2 a 4 personas con jacuzzi doble", "https://balcondelgolf.com/hosp-premium-de-2-a-4-pers-con-jacuzzi-doble/"),
    4: new Hospedaje(4, "Casa 21", "precio2", 2, 4, "Casa para 2 a 4 personas apta mascotas", "https://balcondelgolf.com/alojamiento/cab2a4pax-masc/"),
    5: new Hospedaje(5, "Casa 20", "precio5", 4, 5, "Casa para 4 a 5 personas apta mascotas", "https://balcondelgolf.com/alojamiento/casa4o5pax-masc/"),
    6: new Hospedaje(6, "Casa 14", "precio5", 4 , 6, "Casa para 4 a 6 personas apta mascotas", "https://balcondelgolf.com/alojamiento/casa4a6-masc/"),
    7: new Hospedaje(7, "Casa 1/2", "precio5", 4, 6, "Casa para 4 a 6 personas", "https://balcondelgolf.com/alojamiento/casa4a6/"),
    8: new Hospedaje(8, "Casa 2", "precio5", 4, 8, "Casa para 4 a 8 personas", "https://balcondelgolf.com/alojamiento/casa67u8pax/"),
    9: new Hospedaje(9, "Departamento 15", "precio1", 2, 3, "Departamento para 2 a 3 personas", "https://balcondelgolf.com/alojamiento/cab6a8pax/"),
    10: new Hospedaje(10, "Lodge 19", "precio3", 2, 3, "Lodge para 2 a 3 personas", "https://balcondelgolf.com/alojamiento/lodge2a3pax-2/"),
    11: new Hospedaje(11, "Lodge 16", "precio3", 2, 4, "Lodge para 2 a 4 personas", "https://balcondelgolf.com/alojamiento/lodge2a4pax/"),
    12: new Hospedaje(12, "Lodge 17", "precio3", 2, 4, "Lodge para 2 a 4 personas con jacuzzi", "https://balcondelgolf.com/alojamiento/lodge2a3pax/"),
    13: new Hospedaje(13, "Lodge 18", "precio3", 2, 5, "Lodge para 2 a 5 personas", "https://balcondelgolf.com/alojamiento/lodge2a5pax/")
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

    // Construir el HTML para mostrar
    let resultadosHTML = 
        `<h2>Mensaje: </h2>
        <div class="mensaje-container">
            <p> Estimado/a: </p>
            <p> Gracias por su interés en hospedarse en Balcón del Golf, en Sierra de la Ventana. Nos complace informarle que contamos con disponibilidad en las fechas consultadas.
            A continuación, le detallo las opciones de hospedaje disponibles, junto con el precio total de la estadía y la capacidad máxima de cada cabaña:</p>`;

    // Construir el texto para copiar (formato email)
    let textoEmail = 
`Estimado/a:

Gracias por su interés en hospedarse en Balcón del Golf, en Sierra de la Ventana. Nos complace informarle que contamos con disponibilidad en las fechas consultadas.

A continuación, le detallo las opciones de hospedaje disponibles, junto con el precio total de la estadía y la capacidad máxima de cada cabaña:
`;

    cabañasSeleccionadas.forEach((element, index) => {
        const hospId = element.value;
        const hosp = hospedajes[hospId];
        
        if(cantidadPersonas > hosp.maxPersonas){
            alert('El hospedaje: '+hosp.nombre+' no es apto para '+cantidadPersonas+ ' personas.');
        } else {
            const precioBase = hosp.calcularPrecioEstadia(fechaInicio, fechaFin);
            const cargoPersonas = calcularCargoPorPersonas(cantidadPersonas, hosp);
            const precioTotal = precioBase + cargoPersonas;

            // HTML para mostrar
            resultadosHTML += `
                <p class="hospedaje-item">
                    <span class="descripcion-link" onclick="window.open('${hosp.link}', '_blank')">${hosp.descripcion}</span>
                    | Capacidad: ${cantidadPersonas} personas 
                    | Precio Total: $${precioTotal.toLocaleString()} 
                </p>`;

            // Texto para email
            textoEmail += `
${index + 1}) ${hosp.descripcion}
   Capacidad: ${cantidadPersonas} personas
   Precio Total: $${precioTotal.toLocaleString()}
   Más información: ${hosp.link}
`;
        }
    });

    const mensajeFinal = `
Si desea proceder con la reserva o necesita más información, no dude en ponerse en contacto con nosotros.
Estaremos encantados de asistirlo para asegurar una estadía placentera en nuestro complejo.

Saludos cordiales.`;

    resultadosHTML += `
        <p>${mensajeFinal}</p>
        </div>
        <button id="copyButton" class="copy-button" onclick="copiarResultados()">
            <span class="button-text">Copiar mensaje</span>
        </button>`;

    textoEmail += mensajeFinal;

    document.getElementById('results').innerHTML = resultadosHTML;
    document.getElementById('results').setAttribute('data-text', textoEmail);
};

// Función para copiar los resultados
window.copiarResultados = async function() {
    const texto = document.getElementById('results').getAttribute('data-text');
    const boton = document.getElementById('copyButton');
    
    try {
        await navigator.clipboard.writeText(texto);
        
        // Cambiar el texto del botón temporalmente
        const textoOriginal = boton.innerHTML;
        boton.innerHTML = '<span class="button-text">¡Copiado!</span>';
        
        // Volver al texto original después de 2 segundos
        setTimeout(() => {
            boton.innerHTML = textoOriginal;
        }, 2000);
    } catch (err) {
        console.error('Error al copiar:', err);
        alert('No se pudo copiar el texto. Por favor, inténtelo de nuevo.');
    }
};

/*
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
        
        if(cantidadPersonas>hosp.maxPersonas){
            alert('El hospedaje: '+hosp.nombre+' no es apto para '+cantidadPersonas+ ' personas.');
        } else {

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
/*
        resultadosHTML += `
            <p>
            <a href="${hosp.link}" target="_blank">${hosp.descripcion}</a> 
            | Capacidad: ${cantidadPersonas} personas 
            | Precio Total: $${precioTotal.toLocaleString()} 
            </p>`;
        
        }
    });

    resultadosHTML += 
        `<p> Si desea proceder con la reserva o necesita más información, no dude en ponerse en contacto con nosotros.
        Estaremos encantados de asistirlo para asegurar una estadía placentera en nuestro complejo.</p>`

    document.getElementById('results').innerHTML = resultadosHTML;
};

*/