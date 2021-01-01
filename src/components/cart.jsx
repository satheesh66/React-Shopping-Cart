import React, { useState } from 'react'
import handlePrice from '../util';

export default function Cart(props) {

  const { cartItems, removeFromCart,createOrder } = props;

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutInputData, setCheckoutInputData] = useState({
    name: '',
    email: '',
    address: ''
  });



  const handleCheckoutData = (e) => {
    setCheckoutInputData({
      ...checkoutInputData,
      [e.target.name]: e.target.value
    });
  }

  const handleOrderData=(e)=>{
    e.preventDefault();
    const order={
      ...checkoutInputData,
      cartItems
    }
    console.log('order data is :',order);
    createOrder(order);
  }


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
        cartItems.length !== 0
          ?
          <div className="cart">
            <div className="total">
              <div />
              <button
                className='button primary'
                onClick={() => setShowCheckoutForm(true)}
              >Proceed</button>
            </div>
          </div>
          : null
      }
      {
        showCheckoutForm
        && <div className='cart'>
          <form onSubmit={handleOrderData}>
            <ul className="form-container">
              <li>
                <label>Email</label>
                <input
                  value={checkoutInputData.email}
                  name='email'
                  type="email"
                  required
                  onChange={(e) => handleCheckoutData(e)}
                />
              </li>
              <li>
                <label>Name</label>
                <input
                  value={checkoutInputData.name}
                  name='name'
                  type="text"
                  required
                  onChange={(e) => handleCheckoutData(e)}
                />
              </li>
              <li>
                <label>Address</label>
                <input
                  value={checkoutInputData.address}
                  name='address'
                  type="text"
                  required
                  onChange={(e) => handleCheckoutData(e)}
                />
              </li>
              <li>
                <button className='button primary' type='submit'>Checkout</button>
              </li>
            </ul>
          </form>
        </div>

      }

    </div>
  )
}
