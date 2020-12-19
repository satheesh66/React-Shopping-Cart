import React from 'react'
import handlePrice from '../util';

export default function Cart(props) {

  const { cartItems, removeFromCart } = props;

  console.log('inside cart Items:', props);

  return (
    <div>
      {
        cartItems.length === 0
          ? <div className='cart cart-header'>Cart is Empty</div>
          : <div className='cart cart-header'>You have {cartItems.length} in the cart</div>
      }
      <div className="cart">
        <ul className="cart-items">
          {
            cartItems.map((product, index) => {
              return <li key={product.id}>
                <div>
                  <img src={product.image} alt={product.title} />
                </div>
                <div>
                  <div>{product.title}</div>
                  <div className="right">
                    {handlePrice(product.price)} x {product.count}{' '}
                    <button className='button' onClick={() => removeFromCart(index)}>Remove</button>
                  </div>
                </div>
              </li>
            })
          }
        </ul>
      </div>
      {
        cartItems.length!==0
          ?
          <div className="cart">
            <div className="total">
              <div>
                Total:{' '}
                {
                  handlePrice(
                    cartItems.reduce((acc, cur) => acc = acc + cur.price * cur.count, 0)
                  )
                }
              </div>
              <button className='button primary'>Proceed</button>
            </div>
          </div>
          : null
      }

    </div>
  )
}
