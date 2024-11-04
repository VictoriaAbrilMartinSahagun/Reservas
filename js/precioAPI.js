export async function getPriceData() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyZ_i2fUxiO2WTRJl97mSpbWmZHp7beXMM46z4nRKD-0EloXIOiEILEFghbcwb0Qqun/exec', {
        method: 'GET',
        mode: 'no-cors' // Desactiva CORS
      });
    const jsonData = await response.json();
    const priceData = jsonData.data;
    return priceData;
  }
