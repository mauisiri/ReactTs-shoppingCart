# Shopping Cart Feature:
## Overview
This project is a code callenge of a responsive shopping cart application built using React and TypeScript.<br>  
It demonstrates a dynamic product listing and a shopping cart component, where products can be added and removed from the cart.<br>  
The application fetches product data from a local JSON file and updates the product list and total cost dynamically based on user interactions.<br> <br>

Achieved requirements will be marked with the following icon: ✅
Meawhile pending requirements or features will be marked with 🔨

### **General Requirements:**

✅ The codebase should be written in TypeScript and follow a modular approach.<br> 
🔨 Each component must have accompanying unit tests.<br> 
🔨 Efficient and mindful resource use and performance optimisation.<br> 
✅ Prioritise functionality over aesthetic precision.<br> 

### **Additional Points of Interest:**

The "Additional Points of Interest" are elements that we commonly review and value in our software development process. While they are not stringent requirements for this task, we may engage in further discussions or ask for explanations on these topics during later stages of the hiring process.

- State management
- Performance optimisation
- A mobile-first development approach
- Code simplicity and readability (SOLID principles)
- Component design (We use Tailwind)
- Error handling
- Testing
- Accessibility
- Use of external libraries
- Project setup

## Features
**- Product Listing:** Displays a list of products fetched from a local JSON file. Users can add products to the cart until they are out of stock.<br> 
**- Shopping Cart:** Displays products added to the cart, the total quantity of items, and the total cost. Users can remove products from the cart.<br> 
**- Responsive Design:** On mobile screens, the cart is displayed as a sticky section at the bottom, showing only the total cost and quantity of items.<br> 
**- TypeScript Support:** The project is fully typed using TypeScript for better code quality and maintainability.<br> 
**- Testing:** Includes unit tests for key functionalities to ensure the application works as expected.<br> <br> 

##Technologies Used
**React:** A JavaScript library for building user interfaces.<br> 
**TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.<br> 
**Tailwind CSS: A utility-first CSS framework for rapid UI development.<br> 
**Jest and React Testing Library: Used for writing and running unit tests.<br> <br> 

##Installation
Follow these steps to get a local copy of the project up and running:

### Clone the repository:

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

### Project Structure
csharp<br>
Copiar código<br>
shopping-cart/<br>
├── public/<br>
│   └── products.json          # Mock API data<br>
├── src/
│   ├── components/            # React components<br>
│   │   ├── Cart.tsx<br>
│   │   └── ProductList.tsx<br>
│   ├── services/<br>
│   │   └── productService.ts  # API call service<br>
│   ├── types/<br>
│   │   └── Product.ts         # TypeScript types<br>
│   ├── App.tsx                # Main application component<br>
│   ├── App.test.tsx           # Unit tests<br>
│   └── index.tsx              # Entry point<br>
├── tailwind.config.js         # Tailwind CSS configuration<br>
└── package.json<br>

### API
The application uses a mock API to fetch product data from a JSON file. The products.json file is located in the public directory and contains an array of product objects:


### Testing
To run the unit tests, use the following command:

bash
Copiar código
npm test
This command will run Jest in watch mode and execute all test files matching the *.test.tsx pattern.

### Contributing
Contributions are welcome! If you have any suggestions or improvements, please feel free to submit a pull request.

### License
This project is open-source and available under the MIT License.

### Contact
For questions or feedback, feel free to contact me:<br>
[ ℹ️ on LinkedIn](https://www.linkedin.com/in/irisleo/)<br>
📧 **by mail**: [  irisleo.com@gmail.com](mailto:irisleo.com@egmail.com)
