import { useState } from 'react'
import './App.css'

const StockForm = ({ addStock }) => {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (submit) => {
    submit.preventDefault();
    addStock({ symbol, quantity: parseInt(quantity), price: parseFloat(price) });
    setSymbol('');
    setQuantity('');
    setPrice('');
  };

  const title = (
    <section className="top-container">
      <h1>Finance Dashboard</h1>
      <img src="./assets/stocks.jpg" alt="Stocks" />
    </section>
  );

  const form = (
    <section className="middle-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Stock Symbol"
          value={symbol}
          onChange={(submit) => setSymbol(submit.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(submit) => setQuantity(submit.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Purchase Price"
          value={price}
          onChange={(submit) => setPrice(submit.target.value)}
          required
        />
        <button type="submit">Add Stock</button>
      </form>
    </section>
  );

  const stockListHeader = (
    <section className="bottom-container">
      <h2>Stock List</h2>
      <p>No stocks added yet.</p>
    </section>
  );

  const formContainer = (
    <div className="form-container">
      {title}
      {form}
      {stockListHeader}
    </div>
  );

  return (
    <div>
      {formContainer}
    </div>
  );
};


function App() {
  return (
    <div>
      <StockForm />
    </div>
  );
}

export default App;