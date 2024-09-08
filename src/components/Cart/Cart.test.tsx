import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from './Cart';
import { Product } from '../../types/Product';

const mockProduct: Product = {
  code: '123',
  name: 'Test Product',
  supplier: 'Test Supplier',
  dosageForm: 'Tablet',
  rating: 4,
  reviewCount: 100,
  packagingSize: '50 tablets',
  defaultSaleCondition: 'OR',
  baseprice: '0,05 €/St.',
  url: '/test-product',
  available: true,
  stock: 10,
  categories: [{ id: 'category1', name: 'Category 1' }],
  saleConditions: {
    OR: [{ code: '123', packagingSize: '50 tablets' }]
  },
  prices: {
    salesPrice: { value: 10, formattedValue: '10,00 €' },
    recommendedRetailPrice: { value: 15, formattedValue: '15,00 €' },
    savings: { value: 5, formattedValue: '5,00 €' },
    savingsPercentageFormatted: '33%'
  },
  images: [] 
};

const mockCartItem = {
  ...mockProduct,
  quantity: 2
};

const setup = (cartItems = [mockCartItem]) => {
  const mockRemoveFromCart = jest.fn();
  const mockUpdateQuantity = jest.fn();

  const utils = render(
    <Cart
      cartItems={cartItems}
      removeFromCart={mockRemoveFromCart}
      updateQuantity={mockUpdateQuantity}
      products={[mockProduct]}
    />
  );

  return {
    ...utils,
    mockRemoveFromCart,
    mockUpdateQuantity
  };
};

describe('Cart Component', () => {
  test('renders empty cart message when there are no items', () => {
    setup([]);
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
  });

  test('increments item quantity when "+" button is clicked', () => {
    const { mockUpdateQuantity } = setup();
    const incrementButton = screen.getByText('+');
    fireEvent.click(incrementButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockCartItem.code, mockCartItem.quantity + 1);
  });

  test('decrements item quantity when "-" button is clicked', () => {
    const { mockUpdateQuantity } = setup();
    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockCartItem.code, mockCartItem.quantity - 1);
  });

  test('does not decrement quantity below 1', () => {
    const cartItemWithOneQuantity = { ...mockCartItem, quantity: 1 };
    const { mockUpdateQuantity } = setup([cartItemWithOneQuantity]);
    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);
    expect(mockUpdateQuantity).not.toHaveBeenCalled();
  });

  test('displays total cost and quantity correctly', () => {
    setup();
    const totalCost = (mockCartItem.prices.salesPrice.value * mockCartItem.quantity).toFixed(2);
    expect(screen.getByText(`Summe (2 products)`)).toBeInTheDocument();
    expect(screen.getByText(`${totalCost}€`, { selector: '.cart-total-cost' })).toBeInTheDocument();
  });
  

  test('renders items in the cart correctly', () => {
    setup();
    expect(screen.getByText(mockCartItem.name)).toBeInTheDocument();
    expect(screen.getByText(`${(mockCartItem.prices.salesPrice.value * mockCartItem.quantity).toFixed(2)}€`, { selector: '.cart-item-price' })).toBeInTheDocument();
    expect(screen.getByText(`${mockCartItem.quantity}`)).toBeInTheDocument();
  });
});