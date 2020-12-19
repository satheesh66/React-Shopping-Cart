import React from 'react';
import handlePrice from '../util';

let filteredProducts;
export default function Products(props) {

  const { products, size, sort,addToCart} = props;

  return (
    <div>
      <ul className="products">
        {
          products.map(product => {
            return (
              <li key={product.id}>
                <div className="product">
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '350px' }}
                  />
                  <a href={'#' + product.id} visited='false'>
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{handlePrice(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={()=>addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </li>

            );
          })
        }
      </ul>
    </div>
  )
}
