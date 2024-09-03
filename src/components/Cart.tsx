// src/components/Cart.tsx

import React from 'react';
import { Product } from '../types/Product';

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (productCode: string) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, removeFromCart }) => {
  // Correctly access the sales price value
  const totalCost = cartItems.reduce((total, item) => total + item.prices.salesPrice.value * item.quantity, 0);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="p-4 mt-6 bg-gray-100 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <p className="font-semibold">Total Items: {totalQuantity}</p>
          <p className="font-semibold">Total Cost: {totalCost.toFixed(2)}€</p>
          <ul className="mt-4">
            {cartItems.map((item) => (
              <li key={item.code} className="flex justify-between items-center mb-2">
                <span>
                  {item.name} x {item.quantity} = {(item.prices.salesPrice.value * item.quantity).toFixed(2)}€
                </span>
                <button
                  onClick={() => removeFromCart(item.code)}
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Cart;
