import {Link} from 'react-router-dom'
import {Component} from 'react'
import {FaRupeeSign} from 'react-icons/fa'

import NavBar from '../NavBar'
import CartItem from '../CartItem'
import './index.css'

class Cart extends Component {
  state = {cartList: [], isCartEmpty: true, orderPlaced: false, orderTotal: 0}

  componentDidMount() {
    this.getCartList()
  }

  onPlaceOrder = () => {
    this.setState({orderPlaced: true})
    localStorage.setItem('cartData', JSON.stringify([]))
  }

  getCartList = () => {
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    if (cartList !== null) {
      if (cartList.length !== 0) {
        const itemTotalsList = cartList.map(
          eachItem => eachItem.cost * eachItem.quantity,
        )
        const orderTotal = itemTotalsList.reduce((a, b) => a + b)
        this.setState({cartList, isCartEmpty: false, orderTotal})
      } else {
        this.setState({isCartEmpty: true})
      }
    }
  }

  onClickGoToHomePage = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderOrderPlacedView = () => (
    <div className="payment-successful-view">
      <img
        className="payment-success-tick-img"
        src="https://res.cloudinary.com/dndtpnlzv/image/upload/v1678632802/Tasty%20Kitchen/Vectorpayment-successful-tick-img-sm_fqersf.png"
        alt="payment successful"
      />
      <h1 className="payment-success-text">Payment Successful</h1>
      <p className="payment-success-description">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link style={{textDecoration: 'none'}} to="/">
        <button
          onClick={this.onClickGoToHomePage}
          className="go-to-home-btn"
          type="button"
        >
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  renderCartItemsView = () => {
    const {cartList, orderPlaced, orderTotal} = this.state

    return orderPlaced ? (
      this.renderOrderPlacedView()
    ) : (
      <div className="cart-items-body">
        <ul className="cart-items-list">
          <div className="cart-list-header">
            <p className="item-header">Item</p>
            <p className="quantity-header">Quantity</p>
            <p className="price-header">Price</p>
          </div>
          {cartList.map(eachItem => (
            <CartItem
              key={eachItem.id}
              foodItemDetails={eachItem}
              quantity={eachItem.quantity}
              getCartList={this.getCartList}
            />
          ))}
        </ul>
        <hr className="cart-items-line" />
        <div className="cart-order-total-bar">
          <h1 className="order-total-label">Order Total:</h1>
          <div className="cart-bill-box">
            <div className="bill-amount-container">
              <FaRupeeSign size={14} color="#3E4C59" />
              <p data-testid="total-price" className="order-total-amount">
                {orderTotal}
              </p>
            </div>
            <button
              onClick={this.onPlaceOrder}
              type="button"
              className="place-order-btn"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {isCartEmpty} = this.state
    return (
      <div className="cart-route">
        <NavBar />
        {isCartEmpty ? (
          <div className="empty-cart-view">
            <img
              src="https://res.cloudinary.com/dndtpnlzv/image/upload/v1678631415/Tasty%20Kitchen/cooking_1empty-cart-image-sm_zxs7pm.png"
              alt="empty cart"
              className="empty-cart-img"
            />
            <h1 className="no-orders-text">No Order Yet!</h1>
            <p className="empty-cart-view-description">
              Your cart is empty. Add something from the menu.
            </p>
            <Link className="order-now-btn-decoration" to="/">
              <button type="button" className="order-now-btn">
                Order now
              </button>
            </Link>
          </div>
        ) : (
          this.renderCartItemsView()
        )}
      </div>
    )
  }
}

export default Cart
