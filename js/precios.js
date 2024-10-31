export const PRECIOS = {
    precio1: {
        semana: 1000,    // domingo a jueves
        dia: 1500,       // viernes o sábado individual
        finde: 2800      // viernes y sábado juntos
    },
    precio2: {
        semana: 1200,
        dia: 1800,
        finde: 3400
    },
    precio3: {
        semana: 1500,
        dia: 2000,
        finde: 3800
    },
    precio4: {
        semana: 1800,
        dia: 2300,
        finde: 4200
    },
    precio5: {
        semana: 2000,
        dia: 2500,
        finde: 4500
    }
};

export class Hospedaje {
    constructor(id, nombre, tipoPrecio, basePersonas, descripcion, link) {
        this.id = id;
        this.nombre = nombre;
        this.tipoPrecio = tipoPrecio;
        this.basePersonas = basePersonas;
        this.descripcion = descripcion;
        this.link = link;
    }

    calcularPrecioEstadia(fechaInicio, fechaFin) {
        let precioTotal = 0;
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        const currentDate = new Date(inicio);

        while (currentDate <= fin) {
            // Si es viernes, verificamos si el siguiente día está incluido (sábado)
            if (currentDate.getDay() === 5) { // Viernes
                const nextDate = new Date(currentDate);
                nextDate.setDate(nextDate.getDate() + 1);

                // Si el sábado está incluido en la estadía, aplicamos tarifa de finde
                if (nextDate <= fin) {
                    precioTotal += PRECIOS[this.tipoPrecio].finde;
                    currentDate.setDate(currentDate.getDate() + 2);
                    continue;
                }
            }

            // Para otros días
            const dia = currentDate.getDay();
            if (dia === 5 || dia === 6) { // Viernes o sábado individual
                precioTotal += PRECIOS[this.tipoPrecio].dia;
            } else { // Domingo a jueves
                precioTotal += PRECIOS[this.tipoPrecio].semana;
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }

        return precioTotal;
    }
}
