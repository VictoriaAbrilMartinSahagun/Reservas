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

     calcularPrecioEstadia(fechaInicio, fechaFin) {
       let precioTotal = 0;
       const inicio = new Date(fechaInicio);
       const fin = new Date(fechaFin);
       const currentDate = new Date(inicio);

       while (currentDate <= fin) {
         const dia = currentDate.getDay();
         if (dia === 5) { // Viernes
           const nextDate = new Date(currentDate);
           nextDate.setDate(nextDate.getDate() + 1);
           if (nextDate <= fin) {
             precioTotal += parseFloat(priceData[this.tipoPrecio][2]);
             currentDate.setDate(currentDate.getDate() + 2);
             continue;
           }
         }
         if (dia === 5 || dia === 6) { // Viernes o sábado
           precioTotal += parseFloat(priceData[this.tipoPrecio][1]);
         } else {
           precioTotal += parseFloat(priceData[this.tipoPrecio][0]);
         }
         currentDate.setDate(currentDate.getDate() + 1);
       }

       return precioTotal;
     }
   }