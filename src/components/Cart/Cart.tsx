import React from 'react';
import { Product } from '../../types/Product';
import bin from '../../assets/icons/bin.png';
import noPic from '../../assets/not-available-pic.png';

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (productCode: string) => void;
  updateQuantity: (productCode: string, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, removeFromCart, updateQuantity }) => {
  const totalCost = cartItems.reduce((total, item) => total + item.prices.salesPrice.value * item.quantity, 0);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleIncrement = (productCode: string) => {
    const item = cartItems.find(item => item.code === productCode);
    if (item) {
      updateQuantity(productCode, item.quantity + 1);
    }
  };

  const handleDecrement = (productCode: string) => {
    const item = cartItems.find(item => item.code === productCode);
    if (item && item.quantity > 1) {
      updateQuantity(productCode, item.quantity - 1);
    }
  };

  return (
    <div className='cart-container'>
      <p>Added to cart</p>
      {cartItems.length === 0 ? (
        <p style={{ color: '#a0aec0' }}>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <div key={item.code} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <img
                    src={item.images[0]?.variants['90'].formats.jpg.resolutions['1x'].url || noPic}
                    alt={item.name}
                    className="product-image"
                    style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '16px' }}
                  />
                </div>
                <span style={{ flex: 1 }}>
                  {item.name}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={() => handleDecrement(item.code)} style={{ marginRight: '8px' }}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item.code)} style={{ marginLeft: '8px' }}>+</button>
                  </div>
                  <span>{(item.prices.salesPrice.value * item.quantity).toFixed(2)}€</span>
                </div>
                <button
                  onClick={() => removeFromCart(item.code)}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', marginLeft: '16px' }}
                >
                  <img
                    src={bin}
                    alt="Delete"
                    style={{ width: '20px', height: '20px' }}
                  />
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