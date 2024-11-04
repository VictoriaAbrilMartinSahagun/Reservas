export async function getPriceData() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbw2bOFSKh9Mp3xAdcvTQ8BrjnLLyEs7ik8bcJQHcEtSE7mBUufLY7QqcprhOWjedvf6/exec', 
        {   method: 'GET',
            mode: 'no-cors' // Desactiva CORS
        })
    .then(response => {
        console.log('Solicitud enviada, pero no se puede acceder a la respuesta debido a CORS.');
    })
    .catch(error => {
        console.error('Error:', error);
    });
    const jsonData = await response.json();
    const priceData = jsonData.data;
    return priceData;
  }
