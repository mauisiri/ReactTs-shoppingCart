// src/App.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock the fetchProducts function
jest.mock('./services/productService', () => ({
  fetchProducts: jest.fn(),
}));

// Import the mocked fetchProducts function
import { fetchProducts } from './services/productService';

// Updated mock data for products
const mockProducts = [
  {
    code: "14024547",
    name: "Dextro Energy Dextrose Sport Tablets",
    supplier: "Kyberg Pharma Vertriebs GmbH",
    dosageForm: "Tabletten",
    rating: 0,
    reviewCount: 0,
    packagingSize: "2 x 14 St",
    defaultSaleCondition: "OR",
    baseprice: "0,07 €/St.",
    url: "/dextro-energy-dextrose-sport-tablets/14024547",
    available: true,
    stock: 10,
    categories: [
      {
        id: "EN001",
        name: "Ernährung & Lifestyle"
      },
      {
        id: "EN001F004",
        name: "Für Sportler"
      },
      {
        id: "EN001F004S001",
        name: "Schnelle Energie"
      }
    ],
    saleConditions: {
      OR: [
        {
          code: "14024547",
          packagingSize: "2 x 14 St."
        }
      ]
    },
    prices: {
      salesPrice: {
        value: 2.04,
        formattedValue: "2,04 €"
      },
      recommendedRetailPrice: {
        value: 2.4,
        formattedValue: "2,40 €"
      },
      savings: {
        value: 0.36,
        formattedValue: "0,36 €"
      },
      savingsPercentageFormatted: "15%"
    },
    images: [
      {
        id: 1036930,
        versionNumber: 2,
        meta: {
          tags: [
            "/packshot",
            "/perspective/default",
            "/source/hersteller"
          ]
        },
        variants: {
          "90": {
            formats: {
              jpg: {
                resolutions: {
                  "1x": {
                    url: "https://media.docmorris.de/produkte-pzn/14024547/dextro-energy-dextrose-sport-tablets-2-x-14-st-14024547-default-90-1662679355.jpg"
                  },
                  "2x": {
                    url: "https://media.docmorris.de/produkte-pzn/14024547/dextro-energy-dextrose-sport-tablets-2-x-14-st-14024547-default-90-1662679355@2x.jpg"
                  }
                }
              }
            },
            width: 90,
            height: 90
          }
        }
      }
    ]
  }
];

describe('Shopping Cart Functionality', () => {
  beforeEach(() => {
    // Mock the implementation of fetchProducts to return the mock data
    (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  test('initially renders with products and empty cart', async () => {
    render(<App />);
    
    // Wait for products to be fetched and displayed
    expect(await screen.findByText(/Dextro Energy Dextrose Sport Tablets/i)).toBeInTheDocument();
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
  });

  test('adds a product to the cart and updates the total quantity and cost', async () => {
    render(<App />);
    
    const addToCartButtons = await screen.findAllByText(/Add to Cart/i);

    // Add the first product to the cart
    fireEvent.click(addToCartButtons[0]);

    // Check that the product is added to the cart
    expect(screen.getByText(/Total Items: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Cost: 2.04€/i)).toBeInTheDocument();

    // Add the first product again
    fireEvent.click(addToCartButtons[0]);

    // Check that the product quantity is updated in the cart
    expect(screen.getByText(/Total Items: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Cost: 4.08€/i)).toBeInTheDocument();
  });

  test('removes a product from the cart and updates the total quantity and cost', async () => {
    render(<App />);

    const addToCartButtons = await screen.findAllByText(/Add to Cart/i);
    fireEvent.click(addToCartButtons[0]); // Add Product 1 to the cart

    expect(screen.getByText(/Total Items: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Cost: 2.04€/i)).toBeInTheDocument();

    const removeFromCartButtons = await screen.findAllByText(/Remove/i);
    fireEvent.click(removeFromCartButtons[0]); // Remove Product 1 from the cart

    // Check that the cart is empty again
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
  });

  test('handles out-of-stock products correctly', async () => {
    render(<App />);

    const addToCartButtons = await screen.findAllByText(/Add to Cart/i);

    // Add Product 1 to the cart 10 times (it only has 10 in stock)
    for (let i = 0; i < 10; i++) {
      fireEvent.click(addToCartButtons[0]);
    }

    // Product 1 should now be out of stock, so the button should be disabled
    expect(addToCartButtons[0]).toBeDisabled();
  });

  test('adding multiple items and removing one updates cart correctly', async () => {
    render(<App />);

    const addToCartButtons = await screen.findAllByText(/Add to Cart/i);

    // Add Product 1 to the cart
    fireEvent.click(addToCartButtons[0]);
    fireEvent.click(addToCartButtons[0]);

    expect(screen.getByText(/Total Items: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Cost: 4.08€/i)).toBeInTheDocument();

    const removeFromCartButtons = await screen.findAllByText(/Remove/i);
    fireEvent.click(removeFromCartButtons[0]); // Remove Product 1 from the cart

    // Check that the cart updates correctly
    expect(screen.getByText(/Total Items: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Cost: 2.04€/i)).toBeInTheDocument();
  });
});
