const initialCryptos = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' },
    { id: 'polygon', name: 'Polygon', symbol: 'MATIC', image: 'https://cryptologos.cc/logos/polygon-matic-logo.png' }
];

async function fetchCryptoPrices() {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    const data = await response.json();
    return data;
}

function displayCryptoPrices(prices) {
    const container = document.getElementById('crypto-prices');
    container.innerHTML = '';
    prices.forEach(price => {
        const cryptoDiv = document.createElement('div');
        cryptoDiv.className = 'crypto';
        cryptoDiv.innerHTML = `
        <div>
        <h2>${price.name} (${price.symbol.toUpperCase()})</h2>
        <p>Current Price: $${price.current_price}</p>
        </div>
        <img src="${price.image}" alt="${price.name} Logo">
        `;
        container.appendChild(cryptoDiv);
    });
}

async function updateCryptoPrices() {
    const prices = await fetchCryptoPrices();
    const filteredPrices = prices.filter(price => initialCryptos.some(crypto => crypto.id === price.id));
    const enrichedPrices = filteredPrices.map(price => {
        const matchingCrypto = initialCryptos.find(crypto => crypto.id === price.id);
        return { ...price, image: matchingCrypto.image };
    });
    displayCryptoPrices(enrichedPrices);
}

async function showMoreCryptoPrices() {
    const prices = await fetchCryptoPrices();
    displayCryptoPrices(prices);
}

document.getElementById('show-more').addEventListener('click', showMoreCryptoPrices);

updateCryptoPrices(); 
