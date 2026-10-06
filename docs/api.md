# Iran Market Pulse API Documentation (v1)

Base URL: http://localhost:3000/api/v1

## Endpoints

### 1. Get Latest Prices
* URL: /latest
* Method: GET
* Response Example:
  {
    "success": true,
    "count": 1,
    "timestamp": 1791297252,
    "data": [
      {
        "symbol": "USD",
        "price": 1120000,
        "currency": "IRR",
        "unit": "تومان",
        "change": 8500,
        "change_percent": 0.76,
        "timestamp": 1791297250,
        "age_seconds": 2,
        "status": "fresh",
        "source": "source_a"
      }
    ]
  }

### 2. Get Asset History
* URL: /history/:symbol
* Method: GET
* Parameters: symbol (e.g., USD, EUR, GOLD_18K)

### 3. Health Check
* URL: /health
* Method: GET
* Description: Returns the status of database and data providers.
* 
