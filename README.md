# Coffee Shop ☕️

A virtual coffee shop where coffee orders are queued and delivered to a finished queue.

Try it out in [CodeSandbox](https://codesandbox.io/s/intelligent-lederberg-frw71).

<img width="654" alt="Screen Shot 2020-08-31 at 10 58 18 PM" src="https://user-images.githubusercontent.com/890659/91800734-618b2f00-ebde-11ea-8e60-a5945220fa07.png">

## Description

This is a React application that simulates a coffee shop.

- When the customer clicks on a button in the Menu to order, that type of coffee is added to the Orders list.
- Each type of coffee takes a different amount of time to brew.
- There is only one barista who can only brew one coffee at a time.
- When the barista finishes an order, the coffee is added to the Finished list.
- Orders are removed from the Finished list after 5 seconds.

## Running the server

```
yarn
yarn start
```

## Running the tests

```
yarn test
```
