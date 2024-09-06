import React, { useState } from 'react';
import './Cart.css';
import { Product } from '../../types/Product';
import bin from '../../assets/icons/bin.png';
import noPic from '../../assets/not-available-pic.png';
import Modal from 'react-modal';

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (productCode: string) => void;
  updateQuantity: (productCode: string, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, removeFromCart, updateQuantity }) => {
  const [showModal, setShowModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState<string | null>(null);

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

  const handleRemoveClick = (productCode: string) => {
    setProductToRemove(productCode);
    setShowModal(true);
  };

  const confirmRemove = () => {
    if (productToRemove) {
      removeFromCart(productToRemove);
      setProductToRemove(null);
    }
    setShowModal(false);
  };

  return (
    <div className='product-cart-container'>
      <p className='added-to-cart-message'>Added to cart</p>
      {cartItems.length === 0 ? (
        <p className='empty-cart-message'>Your cart is empty</p>
      ) : (
        <>
          <ul className='cart-items-list'>
            {cartItems.map((item) => (
              <div key={item.code} className='cart-item'>
                <div className='cart-item-image'>
                  <img
                    src={item.images[0]?.variants['90'].formats.jpg.resolutions['1x'].url || noPic}
                    alt={item.name}
                    className="cart-product-image"
                  />
                </div>
                <div className='cart-item-details-container'>
                  <div className='cart-item-details'>
                    <span className='cart-item-name'>
                      {item.name}
                    </span>
                    <button
                      onClick={() => handleRemoveClick(item.code)}
                      className='remove-item-button'
                    >
                      <img
                        src={bin}
                        alt="Delete"
                        className='remove-item-icon'
                      />
                    </button>
                  </div>
                  <div className='cart-item-details'>
                    <div className='cart-item-quantity'>
                      <button
                        onClick={() => handleDecrement(item.code)}
                        className={`quantity-button ${item.quantity === 1 ? 'disabled' : ''}`}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrement(item.code)} className='quantity-button'>+</button>
                    </div>
                    <span className='cart-item-price'>{(item.prices.salesPrice.value * item.quantity).toFixed(2)}€</span>
                  </div>
                </div>
              </div>
            ))}
          </ul>
          <div className='cart-summary-details'>
            <h3>Total</h3>
            <div className='cart-summe-quantity-container'>
              <p>Summe ({totalQuantity} product{totalQuantity >= 2 ? 's' : ''})</p>
              <p className='cart-total-cost'>{totalCost.toFixed(2)}€</p>
            </div>
          </div>
        </>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Confirm Remove"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Confirm Remove</h2>
        <p>Are you sure you want to remove this product from the cart?</p>
        <button onClick={() => setShowModal(false)}>Cancel</button>
        <button onClick={confirmRemove}>Remove</button>
      </Modal>
    </div>
  );
};

export default Cart;