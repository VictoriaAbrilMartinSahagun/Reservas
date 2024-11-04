export async function getPriceData() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyVkSt3EuAZSrJJLKI5V0B6IYUjG3xfQJ9lQy67nd3hyZiDPhT_j4Sk-P6TgOMA5apW/exec');
    const jsonData = await response.json();
    const priceData = jsonData.data;
    return priceData;
  }