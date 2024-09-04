import React, { useState } from 'react';
import { Product } from '../../types/Product';
import addToCartIcon from '../../assets/icons/add-to-cart-icon.png';
import favouriteIcon from '../../assets/icons/favourite-icon.png';
import favouritedIcon from '../../assets/icons/favourited-icon.png';
import noPic from '../../assets/not-available-pic.png';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
  // State to manage favourite status
  const [favouritedProducts, setFavouritedProducts] = useState<Set<string>>(new Set());

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

  return (
    <div className="productList-container">
      <h1>Product List</h1>
      <div className="productList-view">
        {products.map((product) => {
          const isFavourited = favouritedProducts.has(product.code);

          return (
            <div key={product.code} className="product-card">
              {/* Product image with favourite icon overlay */}
              <div className="product-image-container">
                <img
                  src={product.images[0]?.variants['90'].formats.jpg.resolutions['1x'].url || noPic}
                  alt={product.name}
                  className="product-image"
                />
                <img
                  src={isFavourited ? favouritedIcon : favouriteIcon}
                  alt="Favourite Icon"
                  className="favourite-icon"
                  onClick={() => toggleFavourite(product.code)}
                />
              </div>
              {/* Product details */}
              <h2 className="product-name">{product.name}</h2>
              <p className="product-stock">Stock: {product.stock}</p>
              <p className="product-supplier">{product.supplier}</p>
              <p className="product-price">{product.prices.salesPrice.formattedValue}</p>
              {/* Add to Cart button with conditional image */}
              <div className='add-to-cart-button-container'>
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  className={`add-to-cart-button ${product.stock <= 0 ? 'disabled' : ''}`}
                >
                  {/* Conditionally render the image only if in stock */}
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
    </div>
  );
};

export default ProductList;