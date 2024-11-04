export async function getPriceData() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyOF-qFKmO2hYb2tanXu4Z4MEW5NMQ7bC-7e2h8twgg8_Mt6A0fKyealg3jEgVfHolY/exec');
    const jsonData = await response.json();
    const priceData = jsonData.data;
    return priceData;
  }