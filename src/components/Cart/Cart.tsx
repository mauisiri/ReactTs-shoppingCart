import React, { useState } from 'react';
import './Cart.css';
import { Product } from '../../types/Product';
import bin from '../../assets/icons/bin.png';
import noPic from '../../assets/not-available-pic.png';
import DeletePopup from './DeletePopup/DeletePopup';

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  removeFromCart: (productCode: string) => void;
  updateQuantity: (productCode: string, quantity: number) => void;
  products: Product[];
}

const Cart: React.FC<CartProps> = ({ cartItems, removeFromCart, updateQuantity, products }) => {
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
    <div className="product-cart-container" aria-live="polite">
      <p className="added-to-cart-message">Added to cart</p>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message" role="alert">Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items-list" aria-label="Shopping cart items">
            {cartItems.map((item) => {
              const product = products.find(p => p.code === item.code);
              const isOutOfStock = product ? product.stock <= 0 : false;

              return (
                <li key={item.code} className="cart-item" role="region" aria-labelledby={`item-${item.code}`}>
                  <div className="cart-item-image">
                    <img
                      src={item.images[0]?.variants['90'].formats.jpg.resolutions['1x'].url || noPic}
                      alt={item.name}
                      className="cart-product-image"
                    />
                  </div>
                  <div className="cart-item-details-container">
                    <div className="cart-item-details">
                      <span id={`item-${item.code}`} className="cart-item-name">
                        {item.name}
                      </span>
                      <button
                        onClick={() => handleRemoveClick(item.code)}
                        className="remove-item-button"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <img
                          src={bin}
                          alt="Delete"
                          className="remove-item-icon"
                        />
                      </button>
                    </div>
                    <div className="cart-item-details">
                      <div className="cart-item-quantity" aria-label={`Change quantity for ${item.name}`}>
                        <button
                          onClick={() => handleDecrement(item.code)}
                          className={`quantity-button ${item.quantity === 1 ? 'disabled' : ''}`}
                          aria-label={`Decrease quantity of ${item.name}`}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span aria-live="polite" aria-atomic="true">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrement(item.code)}
                          className="quantity-button"
                          aria-label={`Increase quantity of ${item.name}`}
                          disabled={isOutOfStock}
                        >
                          +
                        </button>
                      </div>
                      <span className="cart-item-price">{(item.prices.salesPrice.value * item.quantity).toFixed(2)}€</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="cart-summary-details">
            <h3>Total</h3>
            <div className="cart-summe-quantity-container">
              <p>Summe ({totalQuantity} product{totalQuantity >= 2 ? 's' : ''})</p>
              <p className="cart-total-cost">{totalCost.toFixed(2)}€</p>
            </div>
          </div>
        </>
      )}
      <DeletePopup showModal={showModal} setShowModal={setShowModal} confirmRemove={confirmRemove} />
    </div>
  );
};

export default Cart;
