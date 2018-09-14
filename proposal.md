# Stock Wars Proposal

## Team Members

Aaron Goldsmith, Jordan Hua, Grant Kourey, Darios 

## Project Description

Stock Wars is an application where users are able to compete with their friends, or publically using "fake money" on the stock market. Users will be able to have a set beginning cash amount and then invest in any number of stocks to see how they perform.

### Included Features

1) We will have user authentication through passport so users can track their stocks over time.

2) User information will be stored in a mySQL database. 

3) Our initial high-level tables are: 
    a) A users table with: ID, username, first, last, email, initial cash amount
    b) A transactions table: User ID, ticker symbol, quantity, purchase_date, price_per_share

4) Users will be able to "purchase" stocks and this will be deducted from their "total cash amount".

5) We will use the iextrading.com API to pull live stock pricing information, this API is free and doesn't require an application key.

## Breakdown of Responsibilities






