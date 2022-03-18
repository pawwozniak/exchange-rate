import { useEffect, useState } from 'react';
import axios from 'axios';

const Card = ({ firstCurrency, secondCurrency, crypto, cryptoId, className = '' }) => {
  const [exchangeRate, setExchangeRate] = useState('');

  const currencyCall = async () => {
    const response = await axios.get(
      `https://api.exchangerate.host/convert?from=${firstCurrency}&to=${secondCurrency}`,
      {
        params: { places: 3, source: 'ecb' },
      }
    );
    setExchangeRate(response.data.result);
  };

  const cryptocurrencyCall = async () => {
    const cryptoUsdResponse = await axios.get(`https://api.coincap.io/v2/assets/${cryptoId}`);
    const currencyToUsdResponse = await axios.get(
      `https://api.exchangerate.host/convert?from=${secondCurrency}&to=USD`,
      {
        params: { source: 'ecb' },
      }
    );

    const responseCalculation =
      Math.round(
        (cryptoUsdResponse.data.data.priceUsd / currencyToUsdResponse.data.result) * 1000
      ) / 1000;

    setExchangeRate(responseCalculation);
  };

  useEffect(() => {
    const apiCalls = () => {
      !crypto && currencyCall();
      crypto && cryptocurrencyCall();
    };
    apiCalls();
  });

  return (
    <div className={`card ${className ? className : undefined}`}>
      <div className="first-line">
        <p>
          {firstCurrency}
          {!crypto ? (
            <img
              src={`https://flagcdn.com/24x18/${firstCurrency.toLowerCase().slice(0, 2)}.png`}
              width="24"
              height="18"
              alt={firstCurrency.toLowerCase().slice(0, 2)}
            />
          ) : (
            <img
              src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/color/${firstCurrency.toLowerCase()}.svg`}
              width="18"
              height="18"
              alt={firstCurrency.toLowerCase()}
            />
          )}
        </p>
        to
        <p>
          {secondCurrency}
          <img
            src={`https://flagcdn.com/24x18/${secondCurrency.toLowerCase().slice(0, 2)}.png`}
            width="24"
            height="18"
            alt={secondCurrency.toLowerCase().slice(0, 2)}
          />
        </p>
      </div>
      <p>{exchangeRate}</p>
    </div>
  );
};

export default Card;
