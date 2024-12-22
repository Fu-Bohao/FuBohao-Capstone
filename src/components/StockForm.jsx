import { useContext, useState, useCallback, useEffect } from "react";
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

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (symbol && quantity > 0 && purchasePrice > 0) {
            setLoading(true);
            addStock({ symbol, quantity: Number(quantity), purchasePrice: Number(purchasePrice) });
            setSymbol("");
            setQuantity("");
            setPurchasePrice("");
            setError("");
            setLoading(false);
        } else {
            setError("Please fill out all fields correctly.");
        }
    }, [symbol, quantity, purchasePrice, addStock, setSymbol, setQuantity, setPurchasePrice]);

    useEffect(() => {
        if (symbol || quantity || purchasePrice) {
            setError("");
        }
    }, [symbol, quantity, purchasePrice]);

    return (
        <form onSubmit={handleSubmit} aria-live="polite">
            
            <input
                id="symbol"
                type="text"
                placeholder="Stock Symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                required
            />
            
            <input
                id="quantity"
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
            />
            
            <input
                id="purchasePrice"
                type="number"
                step="0.01"
                placeholder="Purchase Price"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                required
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Stock"}
            </button>
        </form>
    );
}

export default StockForm;