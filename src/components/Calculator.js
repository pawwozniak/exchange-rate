import axios from 'axios';
import { useState } from 'react';

const Calculator = (props) => {
  const [baseCurrency, setBaseCurrency] = useState('');
  const [quoteCurrency, setQuoteCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);

  const baseCurrencyHandler = (event) => {
    setShowResult(false);
    setBaseCurrency(event.target.value);
  };

  const quoteCurrencyHandler = (event) => {
    setShowResult(false);
    setQuoteCurrency(event.target.value);
  };

  const amountHandler = (event) => {
    setShowResult(false);
    setAmount(event.target.value);
  };

  const handleCalculate = async () => {
    const response = await axios.get(
      `https://api.exchangerate.host/convert?from=${baseCurrency}&to=${quoteCurrency}`,
      {
        params: { places: 3, source: 'ecb' },
      }
    );

    const resultCalculation = Math.round(response.data.result * amount * 1000) / 1000;

    setResult(resultCalculation);
    setShowResult(true);
  };

  return (
    <>
      <div className="calculator">
        <h2>Calculator</h2>
        <div className="select-row">
          <select
            placeholder="Base currency ISO code"
            defaultValue="Base currency"
            onChange={baseCurrencyHandler}
          >
            <option value="Base currency" disabled hidden>
              Base currency
            </option>
            {props.currenciesCards.map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
          <select
            placeholder="Quote currency ISO code"
            defaultValue="Quote currency"
            onChange={quoteCurrencyHandler}
          >
            <option value="Quote currency" disabled hidden>
              Quote currency
            </option>
            {props.currenciesCards.map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
          <input placeholder="Amount" onChange={amountHandler} type="number"></input>
          <button onClick={handleCalculate}>Calculate</button>
        </div>
        <p className="result">
          {showResult &&
            `${amount} ${baseCurrency.toUpperCase()} is equal to ${result} ${quoteCurrency.toUpperCase()}`}
        </p>
      </div>
    </>
  );
};

export default Calculator;
