export async function getPriceData() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbw0m6UCrer6VTfS0s_sOGnvntwBL29GYIa9CSJmap87qI7-k1bc3jzU3-PpoBlYJ8TW/exec', 
        {   method: 'GET',
            mode: 'no-cors' // Desactiva CORS
        });
    if(response != null){
        const jsonData = await response.json;
    const priceData = jsonData.data;
    return priceData;
    }
    
  }
