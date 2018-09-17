# Stock Wars Proposal

## Team Members

Aaron Goldsmith, Jordan Hua, Grant Kourey, Darios Teklemariam

## Project Description

Stock Wars is an application where users are able to compete with their friends, or publically using "fake money" on the stock market. Users will be able to have a set beginning cash amount and then invest in any number of stocks to see how they perform.

### Included Features

1) We will have user authentication through passport so users can track their stocks over time.

2) User information will be stored in a mySQL database. 

3) Our initial ~high-level~ tables are:
#### **USER TABLE**

| ID             | username | firstName | lastName | email | initialCash |
|----------------|----------|-----------|----------|-------|-------------|

#### **TRANSACTION TABLE**

| ID 	| ticker 	| quantity 	| purchased_date 	| price_per_share 	|
|----	|--------	|----------	|----------------	|-----------------	|


Users will be able to virtually "purchase" stocks and track it's progress on the current stock market. The intention behind making the website is to teach individuals about the stock market by jumping right in without the reprecussions that the real stock market may bring. 

We will be using the API provided by iextrading.com to pull current stock prices, news, and even graphics. The API is free to use and _**requires no API key**_

## Breakdown of Responsibilities

1) Grant Kourey: Frontend 

2) Jordan Hua: Frontend

3) Aaron Goldsmith: Frontend & Backend

4) Darios Teklemariam: Backend







