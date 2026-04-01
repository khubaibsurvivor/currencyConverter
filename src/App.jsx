import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

const getUrl = (fromCurrency) => {
  return `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
};

async function fetchExchangeRate(fromCurrency, toCurrency) {
  try {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.rates[toCurrency]; // ✅ dynamic access
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return null;
  }
}
function App() {
   const [given, setGiven] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");

  const currencies = ["USD", "PKR", "EUR", "GBP", "INR"];

  
 useEffect(() => {
  const fetchRate = async () => {
    if (!given) {
      setAnswer(0);
      return;
    }

    const rate = await fetchExchangeRate(fromCurrency, toCurrency);

    if (rate) {
      setAnswer((given * rate).toFixed(2));
    }
  };

  fetchRate();
}, [given, fromCurrency, toCurrency]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Currency Converter
        </h1>

        <div className="space-y-6">

          {/* FROM SECTION */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-500">
              From
            </label>

            <div className="flex gap-2">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="rounded-xl border border-gray-200 px-3 py-2"
              >
                {currencies.map((cur) => (
                  <option key={cur}>{cur}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="0.00"
                className="w-full rounded-xl border border-gray-200 py-3 px-4 text-lg outline-none focus:border-blue-500"
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0;
                  setGiven(value);
                }}
              />
            </div>
          </div>

          {/* TO SECTION */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-500">
              To
            </label>

            <div className="flex gap-2">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="rounded-xl border border-gray-200 px-3 py-2"
              >
                {currencies.map((cur) => (
                  <option key={cur}>{cur}</option>
                ))}
              </select>

              <input
                type="text"
                value={answer}
                readOnly
                className="w-full rounded-xl border border-gray-100 bg-gray-50 py-3 px-4 text-lg font-semibold text-gray-700"
              />
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Live exchange rates updated daily
        </p>
      </div>
    </div>
  );
}
export default App
