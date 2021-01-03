import React, { useState } from 'react';
import handlePrice from '../util';
import Slide from 'react-reveal/Slide'
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

let filteredProducts;
export default function Products(props) {

  const { products, size, sort, addToCart } = props;

  const [product, setProduct] = useState(null);

  const openModal = (product) => {
    console.log('product is', product);
    setProduct(product);
  }

  const closeModal = () => {
    setProduct(null);
  }

  return (
    <div>
      <Slide bottom cascade>
        <ul className="products">
          {
            products.map(product => {
              return (
                <li key={product.id}>
                  <div className="product">
                    <a
                      href={'#' + product.id}
                      visited='false'
                      onClick={() => openModal(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: '350px' }}
                      />
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{handlePrice(product.price)}</div>
                      <button
                        className="button primary"
                        onClick={() => addToCart(product)}
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
      </Slide>
      {
        product && (
          <Modal
            isOpen={true}
            onRequestClose={closeModal}
          >
            <Zoom>
              <button className='close-modal' onClick={() => closeModal()}>x</button>
              <div className='product-details'>
                <img src={product.image} alt={product.title} />
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>
                    {product.description}
                  </p>
                  <p>
                    Available Sizes:{' '}
                    {product.availableSize.map(size =>
                      <span>
                        {' '}
                        <button className="button">{size}</button>
                      </span>
                    )}
                  </p>
                  <div className="product-details-price">
                    <p><strong>{handlePrice(product.price)}</strong></p>
                    <button className="button primary"
                      onClick={() => {
                        addToCart(product);
                        closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )
      }
    </div>
  )
}
