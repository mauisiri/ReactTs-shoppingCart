Shopping Cart Feature
Overview
This project is a simple shopping cart application built using React and TypeScript. It demonstrates a dynamic product listing and a shopping cart component, where products can be added and removed from the cart. The application fetches product data from a local JSON file and updates the product list and total cost dynamically based on user interactions.

Features
Product Listing: Displays a list of products fetched from a local JSON file. Users can add products to the cart until they are out of stock.
Shopping Cart: Displays products added to the cart, the total quantity of items, and the total cost. Users can remove products from the cart.
Responsive Design: On mobile screens, the cart is displayed as a sticky section at the bottom, showing only the total cost and quantity of items.
TypeScript Support: The project is fully typed using TypeScript for better code quality and maintainability.
Testing: Includes unit tests for key functionalities to ensure the application works as expected.
Technologies Used
React: A JavaScript library for building user interfaces.
TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
Tailwind CSS: A utility-first CSS framework for rapid UI development.
Jest and React Testing Library: Used for writing and running unit tests.
Installation
Follow these steps to get a local copy of the project up and running:

Clone the repository:

bash
Copiar código
git clone https://github.com/your-username/shopping-cart.git
Navigate into the project directory:

bash
Copiar código
cd shopping-cart
Install the dependencies:

bash
Copiar código
npm install
Usage
To start the application locally, run:

bash
Copiar código
npm start
This command will run the app in development mode. Open http://localhost:3000 to view it in your browser.

The page will automatically reload if you make edits. You will also see any lint errors in the console.

Project Structure
csharp
Copiar código
shopping-cart/
├── public/
│   └── products.json          # Mock API data
├── src/
│   ├── components/            # React components
│   │   ├── Cart.tsx
│   │   └── ProductList.tsx
│   ├── services/
│   │   └── productService.ts  # API call service
│   ├── types/
│   │   └── Product.ts         # TypeScript types
│   ├── App.tsx                # Main application component
│   ├── App.test.tsx           # Unit tests
│   └── index.tsx              # Entry point
├── tailwind.config.js         # Tailwind CSS configuration
└── package.json
API
The application uses a mock API to fetch product data from a JSON file. The products.json file is located in the public directory and contains an array of product objects:

json
Copiar código
[
  {
    "id": 1,
    "name": "Product 1",
    "price": 20,
    "stock": 10
  },
  {
    "id": 2,
    "name": "Product 2",
    "price": 30,
    "stock": 5
  }
]
Testing
To run the unit tests, use the following command:

bash
Copiar código
npm test
This command will run Jest in watch mode and execute all test files matching the *.test.tsx pattern.

Contributing
Contributions are welcome! If you have any suggestions or improvements, please feel free to submit a pull request.

License
This project is open-source and available under the MIT License.

Contact
For questions or feedback, feel free to contact your-email@example.com.