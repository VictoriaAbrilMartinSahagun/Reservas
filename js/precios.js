import { getPriceData } from './precioAPI.js';

// Obtener los datos de precios desde la API
const priceData = await getPriceData();

   // Actualizar la clase Hospedaje para utilizar los precios de la API
   export class Hospedaje {
     constructor(id, nombre, tipoPrecio, basePersonas, maxPersonas, descripcion, link) {
       this.id = id;
       this.nombre = nombre;
       this.tipoPrecio = tipoPrecio;
       this.basePersonas = basePersonas;
       this.maxPersonas = maxPersonas;
       this.descripcion = descripcion;
       this.link = link;
     }

     calcularPrecioEstadia(fechaInicio, fechaFin, findeLargo, cargoPersonas) {
       let precioTotal = 0;
       const inicio = new Date(fechaInicio);
       const fin = new Date(fechaFin);
       const currentDate = new Date(inicio);

       while (currentDate < fin) {
         const dia = currentDate.getDay();
         const mes = currentDate.getMonth();

         if (findeLargo) {
          precioTotal += parseFloat(priceData[mes][this.tipoPrecio][3]);
         }else{
            if (dia === 5) { // Viernes
              const nextDate = new Date(currentDate);
              nextDate.setDate(nextDate.getDate() + 1);
              if (nextDate < fin) { // Si el día que sigue es sábado
                precioTotal += parseFloat(priceData[mes][this.tipoPrecio][2])*2; // Sumo el precio de finde, es por día.
                currentDate.setDate(currentDate.getDate() + 2);
                continue;
              }
            }
  
            if (dia === 5 || dia === 6) { // Viernes o sábado
              precioTotal += parseFloat(priceData[mes][this.tipoPrecio][1]); // Sumo precio día.
            } else {
              precioTotal += parseFloat(priceData[mes][this.tipoPrecio][0]); // Sumo precio semana.
            }
         }
         precioTotal += cargoPersonas;
         currentDate.setDate(currentDate.getDate() + 1);
       }

       return precioTotal;
     }
   }