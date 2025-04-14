import { Hospedaje } from './precios.js';

const hospedajes = {
    1: new Hospedaje(1, "Cabañas 5/6", 0, 2, 2, "Cabaña para 2 personas", "https://balcondelgolf.com/alojamiento/cab2pax/"),
    2: new Hospedaje(2, "Cabañas 3/4/7/8/9/10", 1, 2, 4, "Cabaña para 2 a 4 personas", "https://balcondelgolf.com/alojamiento/cab2a4pax/"),
    3: new Hospedaje(3, "Cabañas 22/23/24/25", 3, 2, 4, "Cabaña premium para 2 a 4 personas con jacuzzi doble", "https://balcondelgolf.com/hosp-premium-de-2-a-4-pers-con-jacuzzi-doble/"),
    4: new Hospedaje(4, "Casa 21", 1, 2, 4, "Casa para 2 a 4 personas apta mascotas", "https://balcondelgolf.com/alojamiento/cab2a4pax-masc/"),
    5: new Hospedaje(5, "Casa 20", 4, 4, 5, "Casa para 4 a 5 personas apta mascotas", "https://balcondelgolf.com/alojamiento/casa4o5pax-masc/"),
    6: new Hospedaje(6, "Casa 14", 4, 4 , 6, "Casa para 4 a 6 personas apta mascotas", "https://balcondelgolf.com/alojamiento/casa4a6-masc/"),
    7: new Hospedaje(7, "Casa 1/2", 4, 4, 6, "Casa para 4 a 6 personas", "https://balcondelgolf.com/alojamiento/casa4a6/"),
    8: new Hospedaje(8, "Casa 2", 4, 4, 8, "Casa para 4 a 8 personas", "https://balcondelgolf.com/alojamiento/casa67u8pax/"),
    9: new Hospedaje(9, "Departamento 15", 0, 2, 3, "Departamento para 2 a 3 personas", "https://balcondelgolf.com/alojamiento/cab6a8pax/"),
    10: new Hospedaje(10, "Lodge 19", 2, 2, 3, "Lodge para 2 a 3 personas", "https://balcondelgolf.com/alojamiento/lodge2a3pax-2/"),
    11: new Hospedaje(11, "Lodge 16", 2, 2, 4, "Lodge para 2 a 4 personas", "https://balcondelgolf.com/alojamiento/lodge2a4pax/"),
    12: new Hospedaje(13, "Lodge 17", 2, 2, 5, "Lodge para 2 a 5 personas", "https://balcondelgolf.com/alojamiento/lodge2a5pax/"),
    13: new Hospedaje(12, "Lodge 18", 2, 2, 4, "Lodge para 2 a 4 personas con jacuzzi", "https://balcondelgolf.com/alojamiento/lodge2a3pax/"),
};

function calcularCargoPorPersonas(cantidadPersonas, hosp, findeLargo) {
    const limite = hosp.basePersonas;
    if (cantidadPersonas>limite) {
        if (findeLargo){
            return (cantidadPersonas - limite) * 50000;            
        }
        return (cantidadPersonas - limite) * 45000;
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

    const checkboxFindeLargo = document.getElementById("findeLargo");
    let findeLargo = checkboxFindeLargo.checked;

    if (!fechaInicio || !fechaFin || fechaFin==fechaInicio){
        alert('Por favor seleccione una fecha valida');
        return;
    }

    // Construir el HTML para mostrar
    let resultadosHTML = `<div class="mensaje-container" id="mensajeParaCopiar">`;

    // Construir el texto para copiar (formato whatsapp llamado Email :/)
    let textoEmail = 
    `Estimado/a:

    Gracias por su interés en hospedarse en Balcón del Golf, en Sierra de la Ventana. Nos complace detallarle los servicios incluídos en su estadía:
        - Desayuno buffet y cena gourmet (sin bebidas incluidas).
        - Acceso ilimitado a nuestras instalaciones.
        - Actividades diarias.
        - Late check-out gratuito hasta las 20:00 hs (dejando la cabaña a las 10:00 hs).
        - Estacionamiento.
        
    A continuación, le detallo las opciones de hospedaje disponibles para la fecha indicada, junto con el precio total de la estadía y la capacidad máxima de cada cabaña:
    `;

    cabañasSeleccionadas.forEach((element, index) => {
        const hospId = element.value;
        const hosp = hospedajes[hospId];
        
        if(cantidadPersonas > hosp.maxPersonas){
            alert('El hospedaje: '+hosp.nombre+' no es apto para '+cantidadPersonas+ ' personas.');
        } else {
            const cargoPersonas = calcularCargoPorPersonas(cantidadPersonas, hosp, findeLargo);
            const precioTotal = hosp.calcularPrecioEstadia(fechaInicio, fechaFin, findeLargo, cargoPersonas);

            // HTML para mostrar
            resultadosHTML += `
            <p>
            <a href="${hosp.link}" target="_blank">${hosp.descripcion}</a> 
            | Capacidad: ${cantidadPersonas} personas 
            | Precio Total: $${precioTotal.toLocaleString()} 
            </p>`;

            // Texto para whatsapp
            textoEmail += `
            ${index + 1}) ${hosp.descripcion} 
            Capacidad: ${cantidadPersonas} personas
            Precio Total: $${precioTotal.toLocaleString()}
            Más información: ${hosp.link}
            `;
        }
    });

    const mensajeFinal = `
    Precios en efectivo, consultar precio de lista con plan cuota simple (6 pagos sin recargo).
    Si desea proceder con la reserva o necesita más información, no dude en ponerse en contacto con nosotros.
    Estaremos encantados de asistirlo para asegurar una estancia placentera en nuestro complejo.`;

    // HTML para mostrar
    resultadosHTML += `
        <p>Precios en efectivo, consultar precio de lista con plan cuota simple (6 pagos sin recargo).</p>
        </div>
        <div class="button-container">
            <button id="copyHTMLButton" class="copy-button" onclick="copiarHTML()">
                <span class="button-text">Copiar email</span>
            </button>
            <button id="copyTextButton" class="copy-button" onclick="copiarResultados()">
                <span class="button-text">Copiar whatsapp</span>
            </button>
        </div>`;

    //Texto final whatapp
    textoEmail += mensajeFinal;

    document.getElementById('results').innerHTML = resultadosHTML;
    document.getElementById('results').setAttribute('data-text', textoEmail);
};

// Función para copiar el texto plano (existente)
window.copiarResultados = async function() {
    const texto = document.getElementById('results').getAttribute('data-text');
    const boton = document.getElementById('copyTextButton');
    
    try {
        await navigator.clipboard.writeText(texto);
        mostrarCopiado(boton);
    } catch (err) {
        console.error('Error al copiar:', err);
        alert('No se pudo copiar el texto. Por favor, inténtelo de nuevo.');
    }
};

// Nueva función para copiar el HTML formateado
window.copiarHTML = async function() {
    const mensajeContainer = document.getElementById('mensajeParaCopiar');
    const boton = document.getElementById('copyHTMLButton');
    
    try {
        const type = 'text/html';
        const blob = new Blob([mensajeContainer.innerHTML], { type });
        const data = [new ClipboardItem({ [type]: blob })];
        
        await navigator.clipboard.write(data);
        mostrarCopiado(boton);
    } catch (err) {
        console.error('Error al copiar HTML:', err);
        alert('No se pudo copiar el texto formateado. Por favor, inténtelo de nuevo.');
    }
};

// Función auxiliar para mostrar el mensaje de copiado
function mostrarCopiado(boton) {
    const textoOriginal = boton.innerHTML;
    boton.innerHTML = '<span class="button-text">¡Copiado!</span>';
    
    setTimeout(() => {
        boton.innerHTML = textoOriginal;
    }, 2000);
};
