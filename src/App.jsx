import React, { useState } from "react";
import StockContext from "./components/contexts/StockContext";
import StockForm from "./components/StockForm";
import './StockStyling.css';

function App() {
    const [stocks, setStocks] = useState([]);
    const [symbol, setSymbol] = useState("");
    const [quantity, setQuantity] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");

    const addStock = (stock) => {
        setStocks((prevStocks) => [...prevStocks, stock]);
    };

    return (
        <StockContext.Provider
            value={{
                addStock,
                symbol,
                setSymbol,
                quantity,
                setQuantity,
                purchasePrice,
                setPurchasePrice
            }}
        >
            <h1>Finance Dashboard</h1>
            <StockForm />
        </StockContext.Provider>
    );
}

export default App;
