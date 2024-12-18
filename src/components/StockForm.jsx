import { useContext, useState } from "react";
import StockContext from "./contexts/StockContext";

function StockForm() {
    const {
        addStock,
        symbol,
        setSymbol,
        quantity,
        setQuantity,
        purchasePrice,
        setPurchasePrice
    } = useContext(StockContext);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (symbol && quantity > 0 && purchasePrice > 0) {
            addStock({ symbol, quantity: Number(quantity), purchasePrice: Number(purchasePrice) });
            setSymbol("");
            setQuantity("");
            setPurchasePrice("");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
                type="text"
                placeholder="Stock Symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                required
            />
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
            />
            <input
                type="number"
                step="0.01"
                placeholder="Purchase Price"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                required
            />
            <button type="submit">Add Stock</button>
        </form>
    );
}

export default StockForm;
