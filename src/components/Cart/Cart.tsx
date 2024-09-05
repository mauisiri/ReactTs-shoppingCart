import React from 'react';
import { Product } from '../../types/Product';

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (productCode: string) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, removeFromCart }) => {
  const totalCost = cartItems.reduce((total, item) => total + item.prices.salesPrice.value * item.quantity, 0);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className='cart-container'>
      <p>Added to cart</p>
      {cartItems.length === 0 ? (
        <p style={{ color: '#a0aec0' }}>Your cart is empty</p>
      ) : (
        <>
          <ul style={{ marginTop: '16px' }}>
            {cartItems.map((item) => (
              <div>
                <span>
                  {item.name}
                </span>
                <div>
                  <span>{item.quantity}</span>
                  <span>{(item.prices.salesPrice.value * item.quantity).toFixed(2)}€</span>
                </div>
                <button
                  onClick={() => removeFromCart(item.code)}
                >
                  Remove
                </button>
              </div>
            ))}
          </ul>
          <hr />
          <div>
            <div>
              <p>Total</p>
              <p>Summe ({totalQuantity} product{totalQuantity >= 2 ? 's' : ''})</p>
            </div>
            <p>{totalCost.toFixed(2)}€</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;