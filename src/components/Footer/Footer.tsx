import React, { useState } from 'react';
import './Footer.css';

interface FooterProps {
  cartItemsCount: number;
  onToggleCart: () => void;
  isCartVisible: boolean;
}

const Footer: React.FC<FooterProps> = ({ cartItemsCount, onToggleCart, isCartVisible }) => {
  return (
    <div className="footer">
      <span>{cartItemsCount} product{cartItemsCount !== 1 ? 's' : ''} in cart</span>
      <button onClick={onToggleCart}>{isCartVisible ? 'Close Cart' : 'Open Cart'}</button>
    </div>
  );
};

export default Footer;