import { useContext, useEffect, useState } from "react";
import StockContext from "./contexts/StockContext";

function StockList() {
    const { stocks } = useContext(StockContext);
    const [stockData, setStockData] = useState({});
    const API_KEY = "YOUR_ALPHA_VANTAGE_API_KEY";

    // Fetch current price for each stock
    useEffect(() => {
        const fetchStockPrices = async () => {
            const data = {};
            for (const stock of stocks) {
                const response = await fetch(
                    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${API_KEY}`
                );
                const result = await response.json();
                const price = result["Global Quote"]?.["05. price"] || 0;
                data[stock.symbol] = parseFloat(price);
            }
            setStockData(data);
        };

        if (stocks.length > 0) {
            fetchStockPrices();
        }
    }, [stocks]);

    return (
        <div>
            <h2>Stock List</h2>
            {stocks.length === 0 ? (
                <p>No stocks added yet.</p>
            ) : (
                stocks.map((stock, index) => {
                    const currentPrice = stockData[stock.symbol] || 0;
                    const profitLoss =
                        currentPrice > 0
                            ? (currentPrice - stock.purchasePrice) * stock.quantity
                            : "Fetching...";
                    const isProfit = profitLoss > 0;

                    return (
                        <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                            <p><b>Symbol:</b> {stock.symbol}</p>
                            <p><b>Quantity:</b> {stock.quantity}</p>
                            <p><b>Purchase Price:</b> ${stock.purchasePrice}</p>
                            <p><b>Current Price:</b> ${currentPrice || "Fetching..."}</p>
                            <p style={{ color: isProfit ? "green" : "red" }}>
                                <b>Profit/Loss:</b> {typeof profitLoss === "string" ? profitLoss : `$${profitLoss.toFixed(2)}`}
                            </p>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default StockList;
