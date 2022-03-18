import { currenciesCards, cryptoCards } from './mockData';
import Card from './Card';
import QuoteCurrency from './QuoteCurrency';
import Calculator from './Calculator';
import { useState } from 'react';

const Panel = () => {
  const [secondCurrency, setSecondCurrency] = useState('PLN');
  const [isCurrenciesActive, setIsCurrenciesActive] = useState('true');
  const [buttonIsActive, setButtonIsActive] = useState(true);

  return (
    <div className="panel">
      <h1>
        All the currencies are displayed in
        <a href="https://en.wikipedia.org/wiki/ISO_4217" className="iso-standard">
          ISO 4217
        </a>{' '}
        standard.
      </h1>
      <QuoteCurrency setSecondCurrency={setSecondCurrency} currenciesCards={currenciesCards} />
      <div className="change-type">
        <button
          className={buttonIsActive ? 'active-button' : undefined}
          onClick={() => {
            setIsCurrenciesActive(true);
            setButtonIsActive(true);
          }}
        >
          Currencies
        </button>
        <button
          className={!buttonIsActive ? 'active-button' : undefined}
          onClick={() => {
            setIsCurrenciesActive(false);
            setButtonIsActive(false);
          }}
        >
          Cryptocurrencies
        </button>
      </div>
      {isCurrenciesActive && <Calculator currenciesCards={currenciesCards} />}
      <div className="cards-container">
        {isCurrenciesActive &&
          currenciesCards.map(
            (el) =>
              !(el === secondCurrency) && (
                <Card firstCurrency={el} secondCurrency={secondCurrency} source="ecb" key={el} />
              )
          )}
        {!isCurrenciesActive &&
          cryptoCards.map((el) => (
            <Card
              firstCurrency={el.firstCurrency}
              secondCurrency={secondCurrency}
              crypto={true}
              cryptoId={el.cryptoId}
              key={el.key}
              className="crypto"
            />
          ))}
      </div>
    </div>
  );
};

export default Panel;
