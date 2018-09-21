# Stock Wars

## Project Description

Stock Wars is an application where users are able to compete with their friends, or publically using "fake money" on the stock market. Users will be able to have a set beginning cash amount and then invest in any number of stocks to see how they perform.
A game where users track how their fake money does on the real sock market!

Users can invest up to $100,000 without consequence to play the stock market, without reprucussions.




## Team Members

Aaron Goldsmith, Jordan Hua, Grant Kourey, Darios Teklemariam

## Try it out 
Try out an existing account below: 

| email          | password |Initial Cash|
|----------------|----------|------------|
|stockwars1234@gmail.com|stock-wars|$100,000|
|makemoney4321@gmail.com|stocks-r-us|$10,000|
|wallstreetguy@gmail.com|stock-wars-now|$100,000|


### Included Features

1) We will have user authentication through passport so users can track their stocks over time.

2) User information along with their transaction history is stored in a mySQL database 

3) Site deployed to Heroku

#### **USER TABLE**

| ID             | email    | firstName | lastName | initialCash | activeCash |
|----------------|----------|-----------|----------|-------------|------------|

#### **TRANSACTION TABLE**

| ID 	| ticker 	| quantity 	| price 	| total_price 	|
|----	|--------	|----------	|--------	|-------------	|


Users will be able to virtually "purchase" stocks and track it's progress on the current stock market. The intention behind making the website is to teach individuals about the stock market by jumping right in without the reprecussions that the real stock market may bring. 

We will be using the API provided by iextrading.com to pull current stock prices, news, and even graphics. The API is free to use and _**requires no API key**_



## Breakdown of Responsibilities

1) Grant Kourey: Frontend 

2) Jordan Hua: Frontend

3) Aaron Goldsmith: Frontend & Backend

4) Darios Teklemariam: Backend
