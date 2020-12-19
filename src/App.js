//feature 1
import React, { useState, useEffect } from 'react';
import Filter from './components/filter';
import Products from './components/products';
import data from "./data.json";
import Cart from './components/cart';


function App() {

  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState('');
  const [cartItems, setCartItems] = useState([])


  const addToCart = (product) => {
    console.log('cart Items inside addtocart:',cartItems);
    const tempCartItems = cartItems.slice();
    console.log('tempCartItems:', tempCartItems);
    let alreadyInCart = false;
    tempCartItems.forEach((item) => {
      if (item.id === product.id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      tempCartItems.push({ ...product, count: 1 });
    }
    setCartItems(tempCartItems);
  }

  const removeFromCart=(index)=>{
    const tempCartItems=cartItems.slice();
    tempCartItems.splice(index,1);
    setCartItems(tempCartItems);
  }

  const filterSort = (sort) => {
    setSort(sort);
    let sortArray = products.slice().sort((a, b) =>
      sort === 'lowest'
        ? a.price > b.price
          ? 1
          : -1
        : sort === 'highest'
          ? a.price < b.price
            ? 1
            : -1
          : a.id < b.id
            ? 1
            : -1);
    setProducts(sortArray);
  }

  const filterSize = (size) => {
    console.log(size);
    if (size === "") {
      setProducts(data.products);
      setSize(size);
    } else {
      let filteredProducts = data.products.filter(product => product.availableSize.includes(size));

      setProducts(filteredProducts);
      setSize(size);
    }
  }





  return (
    <div className='grid-container'>

      <header>
        <a href='/'>React Shopping Cart</a>
      </header>

      <main>
        <div className='content'>
          <div className="main">
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              filterSize={filterSize}
              filterSort={filterSort}
            />
            <Products
              products={products}
              size={size}
              sort={sort}
              addToCart={addToCart}
            />
          </div>
          <div className="sidebar">
            <Cart cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          </div>
        </div>
      </main>

      <footer>
        All rights reserved
      </footer>
    </div>
  );
}

export default App;
