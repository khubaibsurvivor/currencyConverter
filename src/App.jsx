import { useState, useEffect, onChange } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

const url = "https://api.exchangerate-api.com/v4/latest/USD"

function fetchExchangeRate() {

  const response = fetch(url)
  const data= response.jason()
  return data.rates.PKR
}
useEffect(() => {
  const fetchRate =  () => {
    const rate =  fetchExchangeRate();
    setAnswer(given * rate);
  };
  fetchRate();
}, [given]);

function App() {
  const [amount, setAmount] = useState(0)
  const [answer, setAnswer] = useState(0)
  const [given, setGiven] = useState(0)

  return (
    <>


      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
            Currency Converter
          </h1>

          <div className="space-y-6">
            {/* Input Section */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-500">From USD</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full rounded-xl border border-gray-200 py-3 pl-8 pr-4 text-lg outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    setGiven(value);
                  }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">$</span>
              </div>
            </div>



            {/* Output Section */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-500">To PKR</label>
              <div className="relative">
                <input
                  type="text"
                  value={answer}
                  readOnly
                  className="w-full rounded-xl border border-gray-100 bg-gray-50 py-3 px-4 text-lg font-semibold text-gray-700 outline-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">PKR</span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            Live exchange rates updated daily
          </p>
        </div>
      </div>


    </>
  )
}

export default App
