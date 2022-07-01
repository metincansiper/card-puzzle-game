# Card Puzzle Game

A 2D board game developed using React. 

## Game Objects

### Shape
Each shape has a direction and length. Direction would be one of up, down, left, and right. On the other hand, the length of a shape must be between 2 and 4. Therefore, there are 12 different shapes in the game.

### Card
Each card holds a shape and is colored based on the type of deck it belongs to.

### Deck
Each deck has its deck type and initially contains 1 card for every possible shape. Therefore, there are 12 cards in a deck initially. Cards are located in random order. Once a card is used, it is removed from the deck.

### Board
A board is a 2D grid whose inner width and inner height are 25. However, there are cells representing outside of the board as well. When these cells are considered, the board is represented by a 28 * 28 matrix.

## Game Description
One deck is selected by default at the beginning of the game. However, the player can update the selected deck at any time. It is possible to select a deck as long as it is not empty. The shape of the card from the top of the selected deck is located on the board when the player clicks on an empty cell. Locating a shape on board means filling the cells starting from the clicked cell with the color representing the deck type. For example, assume that the selected shape has the direction of left and length of 3, and the user clicked on a cell located in row 5 and column 7. In this case, the cells located in {row 5, column 7}, {row 5, column 6} and {row 5, column 5} will be occupied by that shape if all of these cells are available. If any of the cells are unavailable, the user will lose the game. A cell is unavailable if it is occupied or located outside board borders. The user will win the game when all of the decks become empty. The user's score will increase with every successful move by the length of the located shape.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
