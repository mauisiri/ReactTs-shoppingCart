import React, { useState } from 'react';
import { Product } from '../../types/Product';
import './ProductList.css';

import addToCartIcon from '../../assets/icons/add-to-cart-icon.png';
import favouriteIcon from '../../assets/icons/favourite-icon.png';
import favouritedIcon from '../../assets/icons/favourited-icon.png';
import noPic from '../../assets/not-available-pic.png';
import plichtangaber from '../../assets/pflichtangaber.png';

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
  const [favouritedProducts, setFavouritedProducts] = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const toggleFavourite = (productCode: string) => {
    setFavouritedProducts((prevFavourites) => {
      const updatedFavourites = new Set(prevFavourites);
      if (updatedFavourites.has(productCode)) {
        updatedFavourites.delete(productCode);
      } else {
        updatedFavourites.add(productCode);
      }
      return updatedFavourites;
    });
  };

  const openPopup = (product: Product) => {
    setSelectedProduct(product);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setSelectedProduct(null);
    setIsPopupVisible(false);
  };

  return (
    <div className="productList-container">
      <div className="productList-view">
        {products.map((product) => {
          const isFavourited = favouritedProducts.has(product.code);

          return (
            <div key={product.code} className="product-card">
              <img 
                src={plichtangaber} 
                alt="Plichtangaber" 
                className="plichtangaber"
                />
              <div className="product-image-container" onClick={() => openPopup(product)}>
                <img
                  src={product.images[0]?.variants['90'].formats.jpg.resolutions['1x'].url || noPic}
                  alt={product.name}
                  className="product-image"
                />
                <img
                  src={isFavourited ? favouritedIcon : favouriteIcon}
                  alt="Favourite Icon"
                  className="favourite-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavourite(product.code);
                  }}
                />
              </div>
              <div className='product-data'>
                <h2 className="product-name" onClick={() => openPopup(product)}>
                  {product.name}
                </h2>
                <p className="product-stock">Stock: {product.stock}</p>
                <p className="product-supplier">{product.supplier}</p>
                <p className="product-price">{product.prices.salesPrice.formattedValue}</p>
              </div>

              <div className="add-to-cart-button-container">
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  className={`add-to-cart-button ${product.stock <= 0 ? 'disabled' : ''}`}
                >
                  {product.stock > 0 && (
                    <img src={addToCartIcon} alt="Add to cart" className="add-to-cart-button-icon" />
                  )}
                  {product.stock <= 0 ? 'Out of Stock' : ''}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isPopupVisible && selectedProduct && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProduct.name}</h2>
            <p>Supplier: {selectedProduct.supplier}</p>
            <p>Dosage Form: {selectedProduct.dosageForm}</p>
            <p>Rating: {selectedProduct.rating.toFixed(1)} ({selectedProduct.reviewCount} reviews)</p>
            <p>Packaging Size: {selectedProduct.packagingSize}</p>
            <p>Base Price: {selectedProduct.baseprice}</p>
            <p>Stock: {selectedProduct.stock}</p>
            <p>Sales Price: {selectedProduct.prices.salesPrice.formattedValue}</p>
            <button onClick={closePopup} className="close-popup-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
