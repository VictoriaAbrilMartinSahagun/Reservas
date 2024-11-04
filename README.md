# Sistema de Gestión de Precios para Hospedajes

## Datos del programa

### Hospedajes existentes con numeración asignada:
- **Cabaña 2 personas** [5/6]
- **Cabaña 2 a 4 personas** [3/4/7/8/9/10]
- **Cabaña premium de 2 a 4** [22/23/24/25]
- **Casa 2 a 4 personas – Apta mascota** [21]
- **Casa 4 o 5 personas – Apta mascota** [20]
- **Casa 4 a 6 personas – Apta mascota** [14]
- **Casa 4 a 6 personas** [1/12]
- **Casa 6 a 8 personas** [2]
- **Departamento 2 a 3 personas** [15]
- **Lodge 2 o 3 personas** [19]
- **Lodge 2 a 4 personas** [16]
- **Lodge 2 a 4 personas – Jacuzzi** [18]
- **Lodge 2 a 5 personas** [17]

### Tipos de precios asociados a los distintos hospedajes:
- **precio1**: Cabaña 2 personas, Departamento 2 a 3 personas.
- **precio2**: Cabaña 2 a 4 personas, Casa 2 a 4 personas (Apta mascota).
- **precio3**: Lodges.
- **precio4**: Cabaña premium de 2 a 4.
- **precio5**: Casas de 4 o más personas.

### Tarifas de cada tipo de precio según el día de la reserva:
- **semana**: de domingo a jueves.
- **día**: viernes o sábado por separado.
- **finde**: viernes y sábado juntos.
- **findelargo**: precio especial para fines de semana largos.

### Ejemplo de variación de precios según el mes:
Para el mes de **Enero**:

- **precio1**:
    - semana: 100
    - día: 101
    - finde: 102
    - findelargo: 103
- **precio2**:
    - semana: 110
    - día: 111
    - finde: 112
    - findelargo: 113
- etc.

### Modificación de precios
Los costos de los hospedajes se gestionan a través de un archivo de Google Sheets privado, donde se pueden ajustar los valores de cada tipo de precio de acuerdo al mes y el tipo de día.
