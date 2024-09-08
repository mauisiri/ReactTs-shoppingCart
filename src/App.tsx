import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList/ProductList';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import { Product } from './types/Product';
import { fetchProducts } from './services/productService';
import './index.css';
import './App.css';

interface CartItem extends Product {
  quantity: number;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCartItems((prevCartItems) => {
      const itemInCart = prevCartItems.find((item) => item.code === product.code);

      if (itemInCart) {
        return prevCartItems.map((item) =>
          item.code === product.code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.code === product.code ? { ...p, stock: p.stock - 1 } : p
      )
    );
  };

  const removeFromCart = (productCode: string) => {
    setCartItems((prevCartItems) => {
      const itemInCart = prevCartItems.find((item) => item.code === productCode);

      if (itemInCart && itemInCart.quantity > 1) {
        return prevCartItems.map((item) =>
          item.code === productCode ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCartItems.filter((item) => item.code !== productCode);
      }
    });

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.code === productCode ? { ...p, stock: p.stock + 1 } : p
      )
    );
  };

  const updateQuantity = (productCode: string, quantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.code === productCode ? { ...item, quantity } : item
      )
    );

    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const itemInCart = cartItems.find((item) => item.code === productCode);
        if (p.code === productCode && itemInCart) {
          const stockChange = itemInCart.quantity - quantity;
          return { ...p, stock: p.stock + stockChange };
        }
        return p;
      })
    );
  };

  const handleToggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className='app-container'>
      <div className="product-container">
        <div className="items-container">
          <ProductList products={products} addToCart={addToCart} />
        </div>
        <div className={`cart-container ${isCartVisible ? 'visible' : ''}`}>
          <Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} products={products} />
        </div>
      </div>
      <Footer cartItemsCount={cartItems.length} onToggleCart={handleToggleCart} isCartVisible={isCartVisible} />
    </div>
  );
};

export default App;