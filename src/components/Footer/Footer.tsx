import React from 'react';
import './Footer.css';

interface FooterProps {
  cartItemsCount: number;
  onToggleCart: () => void;
}

const Footer: React.FC<FooterProps> = ({ cartItemsCount, onToggleCart }) => {
  return (
    <div className="footer">
      <span>{cartItemsCount} product{cartItemsCount !== 1 ? 's' : ''} in cart</span>
      <button onClick={onToggleCart}>Open Cart</button>
    </div>
  );
};

export default Footer;