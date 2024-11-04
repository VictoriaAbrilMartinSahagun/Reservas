export async function getPriceData() {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyZ_t_tsoDja4hauCFGRQ39yQdrZs1kthoXIm5-W3PZMGcIOE3-18O_f4npVQIHdINm/exec');
    const jsonData = await response.json();
    const priceData = jsonData.data;
    return priceData;
  }
