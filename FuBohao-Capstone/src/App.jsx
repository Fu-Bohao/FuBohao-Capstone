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

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Stock Symbol"
        value={symbol}
        onChange={(submit) => setSymbol(submit.symbol.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.quantity.value)}
        required
      />
      <input
        type="number"
        placeholder="Purchase Price"
        value={price}
        onChange={(e) => setPrice(e.price.value)}
        required
      />
      <button type="submit">Add Stock</button>
    </form>
  );
};


export default StockForm;