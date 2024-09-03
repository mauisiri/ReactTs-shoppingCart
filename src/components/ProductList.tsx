import React from 'react';
import { Product } from '../types/Product';

interface ProductListProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      {/* Grid container with responsive column layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.code}
            className="border p-4 rounded shadow-sm hover:shadow-lg transition-shadow duration-200"
          >
            {/* Product image */}
            <img
              src={product.images[0]?.variants['90'].formats.jpg.resolutions['1x'].url}
              alt={product.name}
              className="w-full h-auto mb-4"
            />
            {/* Product details */}
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.supplier}</p>
            <p className="text-gray-600">{product.packagingSize}</p>
            <p className="text-gray-600">{product.prices.salesPrice.formattedValue}</p>
            <p className="text-gray-600">Stock: {product.stock}</p>
            {/* Add to Cart button */}
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              className={`mt-2 py-2 px-4 rounded ${
                product.stock <= 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-700 text-white'
              }`}
            >
              {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
