import {Component} from 'react'
import {FaRupeeSign} from 'react-icons/fa'
import {BsFillStarFill} from 'react-icons/bs'
import Counter from '../Counter'
import './index.css'

class FoodItem extends Component {
  state = {quantity: 0}

  componentDidMount() {
    this.getCartItemQuantity()
  }

  getCartItemQuantity = () => {
    const {eachFoodItem} = this.props
    const {id} = eachFoodItem
    const cartList = JSON.parse(localStorage.getItem('cartData'))
    if (cartList !== null) {
      const cartItem = cartList.filter(eachItem => eachItem.id === id) // We will  get a list containing one object //
      if (cartItem.length !== 0) {
        this.setState({quantity: cartItem[0].quantity})
      }
    }
  }

  addItem = () => {
    const {eachFoodItem} = this.props
    const cartItem = {
      id: eachFoodItem.id,
      name: eachFoodItem.name,
      imageUrl: eachFoodItem.image_url,
      cost: eachFoodItem.cost,
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

    this.setState({quantity: 1})
  }

  onIncrement = () => {
    const {eachFoodItem} = this.props
    const {id} = eachFoodItem
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
    this.setState({quantity: quantity + 1})
  }

  onDecrement = () => {
    const {eachFoodItem} = this.props
    const {id} = eachFoodItem
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
    this.setState({quantity: quantity - 1})
  }

  render() {
    const {quantity} = this.state
    const {eachFoodItem} = this.props
    const testIdValues = {
      dec: 'decrement-count',
      inc: 'increment-count',
      current: 'active-count',
    }
    return (
      <li data-testid="foodItem" className="food-item-card">
        <div>
          <img
            className="food-item-img"
            src={eachFoodItem.image_url}
            alt={eachFoodItem.name}
          />
        </div>
        <div className="food-item-details">
          <div>
            <h1 className="food-item-name">{eachFoodItem.name}</h1>
            <div className="food-item-cost-container">
              <FaRupeeSign size={13} />
              <p className="food-item-cost">{eachFoodItem.cost}</p>
            </div>
            <div className="food-item-ratings-container">
              <BsFillStarFill size={14} color="gold" />
              <p className="food-rating">{eachFoodItem.rating}</p>
            </div>
          </div>
          <Counter
            onIncrement={this.onIncrement}
            onDecrement={this.onDecrement}
            addItem={this.addItem}
            quantity={quantity}
            testIdValues={testIdValues}
          />
        </div>
      </li>
    )
  }
}

export default FoodItem
