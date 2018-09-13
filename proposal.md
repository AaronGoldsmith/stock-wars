# Stock Wars Proposal

## Team Members

Aaron Goldsmith. Jordan Hua, Grant Kourey, Darios 

## Project Description

Stock Wars is an application where users are able to compete with their friends, or publically using "fake money" on the stock market. Users will be able to have a set beginning cash amount and then invest in any number of stocks to see how they perform. The user with the highest score will win and have bragging rights.

### Included Features

1) We will have user authentication through passport so users can track their stocks over time.

2) User information will be stored in a mySQL database. 

3) Our initial high-level tables are: a users table, a transactions table (which wil contain the user ID (as a foreign ID) the transaction is tied to), and a games table which will contain the names and user ID's of members associated.

4) Users will be able to "purchase" stocks and this will be deducted from their "total cash amount".

5) We will use the iextrading.com API to pull live stock pricing information, this API is free and doesn't require an application key.

6) Based on performance we will have a leaderboard for users to see how they are ranking currently.

## Breakdown of Responsibilities

Authentication: Whole Team



