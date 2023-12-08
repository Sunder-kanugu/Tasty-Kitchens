import {Component} from 'react'
import {FaRupeeSign} from 'react-icons/fa'

import Counter from '../Counter'
import './index.css'

class CartItem extends Component {
  constructor(props) {
    super(props)
    const {quantity} = this.props
    this.state = {quantity}
  }

  addItem = () => {
    const {foodItemDetails, getCartList} = this.props
    const cartItem = {
      id: foodItemDetails.id,
      name: foodItemDetails.name,
      imageUrl: foodItemDetails.image_url,
      cost: foodItemDetails.cost,
      quantity: 1,
    }
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    if (cartList !== null) {
      cartList.push(cartItem)
      const updatedCartList = JSON.stringify(cartList)
      localStorage.setItem('cartData', updatedCartList)
    } else {
      localStorage.setItem('cartData', JSON.stringify([cartItem]))
    }
    getCartList()

    this.setState({quantity: 1})
  }

  onIncrement = () => {
    const {foodItemDetails, getCartList} = this.props
    const {id} = foodItemDetails
    const {quantity} = this.state
    console.log(quantity)
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const updatedList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        return {...eachItem, quantity: quantity + 1}
      }
      return eachItem
    })
    console.log(updatedList)
    localStorage.setItem('cartData', JSON.stringify(updatedList))
    getCartList()

    this.setState({quantity: quantity + 1})
  }

  onDecrement = () => {
    const {foodItemDetails, getCartList} = this.props
    const {id} = foodItemDetails
    const {quantity} = this.state
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    const updatedQuantity = quantity - 1
    if (updatedQuantity === 0) {
      const updatedList = cartList.filter(eachItem => eachItem.id !== id)
      localStorage.setItem('cartData', JSON.stringify(updatedList))
    } else {
      const updatedList = cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity: quantity - 1}
        }
        return eachItem
      })
      localStorage.setItem('cartData', JSON.stringify(updatedList))
    }
    getCartList()

    this.setState({quantity: quantity - 1})
  }

  render() {
    const {foodItemDetails} = this.props
    const {quantity} = this.state
    const itemTotal = foodItemDetails.cost * quantity
    const testIdValues = {
      dec: 'decrement-quantity',
      inc: 'increment-quantity',
      current: 'item-quantity',
    }
    return (
      <div data-testid="cartItem" className="cart-item">
        <div className="cart-item-img-container">
          <img
            className="cart-item-img"
            src={foodItemDetails.imageUrl}
            alt={foodItemDetails.name}
          />
        </div>
        <div className="cart-item-details">
          <h1 className="cart-item-name">{foodItemDetails.name}</h1>
          <Counter
            addItem={this.addItem}
            onIncrement={this.onIncrement}
            onDecrement={this.onDecrement}
            quantity={quantity}
            testIdValues={testIdValues}
          />
          <div className="cart-item-total-container">
            <FaRupeeSign color="#ffa412" size={13} />
            <p className="cart-item-total">{itemTotal}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default CartItem
