# Getting Started
  1. Ensure Node.js is installed on machine

  2. Install the needed packages by running "npm install" at the root directory of this project

  3. Navigate to browser and test any of the actions below using their URL to get appropriate response. However, POST requests would only work using a request simulator tool like Postman

  Note: Ensure that at least an empty square brace is maintained in the "stagedShares.json" file for the program to run effictively without errors.
  



# Actions

## List Shares
  ### Request
  Method: GET
  URL: http://localhost:3001/api

  ### Response
  [
    {
      "company_name": "Amazon",
      "company_symbol": "aws",
      "avaliable_shares": 479,
      "currency": "USD",
      "price": 3000,
      "last_updated": "01/05/2022"
    },
    {
      "company_name": "Atlassian",
      "company_symbol": "atl",
      "avaliable_shares": 315,
      "currency": "USD",
      "price": 2000,
      "last_updated": "05/05/2022"
    },
    {
      "company_name": "Tesla",
      "company_symbol": "tsl",
      "avaliable_shares": 150,
      "currency": "EUR",
      "price": 4200,
      "last_updated": "01/06/2022"
    },
    {
      "company_name": "Google",
      "company_symbol": "goo",
      "avaliable_shares": 200,
      "currency": "USD",
      "price": 4000,
      "last_updated": "03/01/2022"
    },
    {
      "company_name": "Meta",
      "company_symbol": "met",
      "avaliable_shares": 135,
      "currency": "USD",
      "price": 3500,
      "last_updated": "04/06/2022"
    }
  ]




## Purchase Share
  ### Request
  method: POST
  URL: http://localhost:3001/api/purchase_share
  body
  {
    "company_name": "Meta",
    "num_of_shares": 3,
    "buyer": "John Doe"
  }

  ### Response
  {
    "message": "3 share(s) staged for purchase from Meta"
  }





## Sell Share
  ### Request
  Method: POST
  URL: http://localhost:3001/api/sell_share
  body
  {
    "company_name": "Meta"
  }

  ### Response
  {
    "message": "shares sucessfully sold"
  }





## Find Offer Based On Crieterion
  ### Request
  Method: GET
  URL: http://localhost:3001/api/find_on?crieterion=company_name&value=Meta

  ### Response
  {
    "company_name": "Meta",
    "company_symbol": "met",
    "avaliable_shares": 135,
    "currency": "USD",
    "price": 3500,
    "last_updated": "04/06/2022"
  }



## Find Offer Based On Highest Share Price
  ### Request
  Method: GET
  URL: http://localhost:3001/api/find_highest_share_price?currency=USD

  ### Response
  [
    {
      "company_name": "Google",
      "company_symbol": "goo",
      "avaliable_shares": 200,
      "currency": "USD",
      "price": 4000,
      "last_updated": "03/01/2022"
    }
  ]



## Find Offer Based On Lowest Share Price
  ### Request
  Method: GET
  URL: http://localhost:3001/api/find_lowest_share_price?currency=USD

  ### Response
  [
    {
      "company_name": "Atlassian",
      "company_symbol": "atl",
      "avaliable_shares": 315,
      "currency": "USD",
      "price": 2000,
      "last_updated": "05/05/2022"
    }
  ]



## Find Offers In A Price Range
  ### Request
  Method: GET
  URL: http://localhost:3001/api/find_shares_in_range?lowerBound=3000&upperBound=4000&currency=USD

  ### Response
  [
    {
      "company_name": "Amazon",
      "company_symbol": "aws",
      "avaliable_shares": 479,
      "currency": "USD",
      "price": 3000,
      "last_updated": "01/05/2022"
    },
    {
      "company_name": "Google",
      "company_symbol": "goo",
      "avaliable_shares": 200,
      "currency": "USD",
      "price": 4000,
      "last_updated": "03/01/2022"
    },
    {
      "company_name": "Meta",
      "company_symbol": "met",
      "avaliable_shares": 135,
      "currency": "USD",
      "price": 3500,
      "last_updated": "04/06/2022"
    }
  ]