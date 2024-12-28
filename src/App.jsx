import { useState } from "react";
import StockContext from "./components/contexts/StockContext";
import StockForm from "./components/StockForm";
import './components/StockStyling.css';
import stockImage from './assets/stocks.jpg';
import StockList from "./components/StockList";

function App() {
    const [stocks, setStocks] = useState([]);
    const [symbol, setSymbol] = useState("");
    const [quantity, setQuantity] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addStock = (stock) => {
        setStocks((prevStocks) => [...prevStocks, stock]);
    };

    return (
        <StockContext.Provider
            value={{
                stocks,
                addStock,
                symbol,
                setSymbol,
                quantity,
                setQuantity,
                purchasePrice,
                setPurchasePrice,
                loading,
                setLoading,
                error,
                setError
            }}
        >
            <div className="app-container">
                <section className="image-container">
                    <img src={stockImage} alt="stocks" className="stock-image" />
                </section>
                <section className="title-container">
                    <h1>Finance Dashboard</h1>
                </section>
                <section className="form-container">
                    <StockForm />
                    <StockList />
                </section>
            </div>
        </StockContext.Provider>
    );
}

export default App;