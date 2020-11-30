import React from 'react';
import handlePrice from '../util';

export default function Products(props) {

  const { products } = props;

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
                  <a href={'#' + product.id}>
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{ handlePrice(product.price)}</div>
                    <button
                      className="button primary"
                    >
                      Add to Cart
                  </button>
                  </div>
                </div>
              </li>
            );
          }
          )
        }
      </ul>
    </div>
  )
}
