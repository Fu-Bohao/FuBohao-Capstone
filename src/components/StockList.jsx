import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import StockContext from "./contexts/StockContext";

function StockList() {
    const { stocks } = useContext(StockContext);
    const [stockData, setStockData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_KEY = "2DE014XRGWY8JQFV";

    // Fetch current price for each stock
    const fetchStockPrices = useCallback(async () => {
        setLoading(true);
        setError(null);
        const data = {};
        try {
            for (const stock of stocks) {
                const response = await fetch(
                    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${API_KEY}`
                );
                const result = await response.json();
                const price = result["Global Quote"]?.["05. price"] || 0;
                data[stock.symbol] = parseFloat(price);
            }
            setStockData(data);
        } catch (err) {
            setError("Failed to fetch stock prices. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [stocks, API_KEY]);

    useEffect(() => {
        if (stocks.length > 0) {
            fetchStockPrices();
        }
    }, [stocks, fetchStockPrices]);

    const stockItems = useMemo(() => {
        return stocks.map((stock, index) => {
            const currentPrice = stockData[stock.symbol] || 0;
            const profitLoss =
                currentPrice > 0
                    ? (currentPrice - stock.purchasePrice) * stock.quantity
                    : "Fetching...";
            const isProfit = profitLoss > 0;

            return (
                <div key={index} className="stock-details">
                    <p><b>Symbol:</b> {stock.symbol}</p>
                    <p><b>Quantity:</b> {stock.quantity}</p>
                    <p><b>Purchase Price:</b> ${stock.purchasePrice}</p>
                    <p><b>Current Price:</b> ${currentPrice || "Fetching..."}</p>
                    <p style={{ color: isProfit ? "green" : "red" }}>
                        <b>Profit/Loss:</b> {typeof profitLoss === "string" ? profitLoss : `$${profitLoss.toFixed(2)}`}
                    </p>
                </div>
            );
        });
    }, [stocks, stockData]);

    return (
        <div>
            <h2>Stock List</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {stocks.length === 0 ? (
                <p>No stocks added yet.</p>
            ) : (
                stockItems
            )}
        </div>
    );
}

export default StockList;