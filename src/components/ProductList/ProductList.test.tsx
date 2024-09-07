import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductList from './ProductList';
import { Product } from '../../types/Product';

const mockProducts: Product[] = [
  {
    code: '123',
    name: 'Test Product 1',
    supplier: 'Test Supplier 1',
    dosageForm: 'Tablet',
    rating: 4.5,
    reviewCount: 10,
    packagingSize: '50 tablets',
    baseprice: '0,05 €/St.',
    url: '/test-product-1',
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
    images: [{ variants: { '90': { formats: { jpg: { resolutions: { '1x': { url: 'test-image-1.jpg' } } } } } } }]
  },
  {
    code: '456',
    name: 'Test Product 2',
    supplier: 'Test Supplier 2',
    dosageForm: 'Capsule',
    rating: 4.0,
    reviewCount: 20,
    packagingSize: '30 capsules',
    baseprice: '0,10 €/St.',
    url: '/test-product-2',
    available: true,
    stock: 0,
    categories: [{ id: 'category2', name: 'Category 2' }],
    saleConditions: {
      OR: [{ code: '456', packagingSize: '30 capsules' }]
    },
    prices: {
      salesPrice: { value: 20, formattedValue: '20,00 €' },
      recommendedRetailPrice: { value: 25, formattedValue: '25,00 €' },
      savings: { value: 5, formattedValue: '5,00 €' },
      savingsPercentageFormatted: '20%'
    },
    images: [{ variants: { '90': { formats: { jpg: { resolutions: { '1x': { url: 'test-image-2.jpg' } } } } } } }]
  }
];

const favouriteIcon = 'favourite-icon.png';
const favouritedIcon = 'favourited-icon.png';

const setup = (products = mockProducts) => {
  const mockAddToCart = jest.fn();
  const utils = render(<ProductList products={products} addToCart={mockAddToCart} />);
  return {
    ...utils,
    mockAddToCart
  };
};

describe('ProductList Component', () => {
  test('renders products correctly', () => {
    setup();
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  test('toggles favourite status', () => {
    setup();
    const favouriteIconElement = screen.getAllByAltText('Favourite Icon')[0];
    fireEvent.click(favouriteIconElement);
    expect(favouriteIconElement).toHaveAttribute('src', favouritedIcon);
    fireEvent.click(favouriteIconElement);
    expect(favouriteIconElement).toHaveAttribute('src', favouriteIcon);
  });

  test('opens and closes product popup', () => {
    setup();
    const productImage = screen.getAllByAltText('Test Product 1')[0];
    fireEvent.click(productImage);
    expect(screen.getByText('Supplier: Test Supplier 1')).toBeInTheDocument();
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(screen.queryByText('Supplier: Test Supplier 1')).not.toBeInTheDocument();
  });

  test('adds product to cart', () => {
    const { mockAddToCart } = setup();
    const addToCartButton = screen.getAllByRole('button', { name: /Add to cart/i })[0];
    fireEvent.click(addToCartButton);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0]);
  });

  test('disables add to cart button when product is out of stock', () => {
    setup();
    const outOfStockButton = screen.getByText('Out of Stock');
    expect(outOfStockButton).toBeDisabled();
  });
});