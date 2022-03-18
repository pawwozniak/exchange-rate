import { useState } from 'react';

const QuoteCurrency = (props) => {
  const [activeQuoteCurrency, setActiveQuoteCurrency] = useState('PLN');

  return (
    <>
      <h3>Change quote currency</h3>
      <div className="quote-currency__container">
        {props.currenciesCards.map((el, index) => (
          <div className="quote-currency-item" key={index}>
            <p
              className={activeQuoteCurrency === el ? 'active' : undefined}
              onClick={() => {
                props.setSecondCurrency(el);
                setActiveQuoteCurrency(el);
              }}
            >
              {el}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuoteCurrency;
