import Cookies from 'js-cookie'
import {Component} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
import {FaRupeeSign} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import Footer from '../Footer'
import FoodItem from '../FoodItem'

import './index.css'

const apiStatusConstants = {
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Restaurant extends Component {
  state = {
    restaurantDetailsApiStatus: apiStatusConstants.inProgress,
    restaurantDetails: {},
    foodItemsList: [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({restaurantDetailsApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const updatedData = {
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      foodItems: data.food_items,
      id: data.id,
      imageUrl: data.image_url,
      itemsCount: data.items_count,
      location: data.location,
      name: data.name,
      opensAt: data.opens_at,
      rating: data.rating,
      reviewsCount: data.reviews_count,
    }
    this.setState({
      restaurantDetails: updatedData,
      foodItemsList: updatedData.foodItems,
      restaurantDetailsApiStatus: apiStatusConstants.success,
    })
  }

  renderRestaurantDetailsBody = () => {
    const {foodItemsList, restaurantDetails} = this.state
    return (
      <div className="restaurant-details-body">
        <div className="restaurant-details-banner-bg-container">
          <div className="restaurant-details-banner">
            <img
              className="restaurant-image"
              src={restaurantDetails.imageUrl}
              alt="restaurant"
            />

            <div className="restaurant-details-section">
              <h1 className="restaurant-name">{restaurantDetails.name}</h1>
              <p className="restaurant-cuisine">{restaurantDetails.cuisine}</p>
              <p className="restaurant-location">
                {restaurantDetails.location}
              </p>
              <div className="restaurant-rating-cost-container">
                <div className="ratings-container">
                  <div className="star-rating">
                    <BsFillStarFill size={13} color="#ffffff" />
                    <p className="restaurant-rating">
                      {restaurantDetails.rating}
                    </p>
                  </div>
                  <p className="reviews-count">
                    {restaurantDetails.reviewsCount} Ratings
                  </p>
                </div>
                <div className="cost-container">
                  <div className="rupee-cost">
                    <FaRupeeSign size={14} color="#ffffff" />
                    <p className="cost-for-two">
                      {restaurantDetails.costForTwo}
                    </p>
                  </div>
                  <p className="cost-for-two-label">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="restaurant-list-container">
          <ul className="food-items-list">
            {foodItemsList.map(eachFoodItem => (
              <FoodItem key={eachFoodItem.id} eachFoodItem={eachFoodItem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {restaurantDetailsApiStatus} = this.state
    return (
      <div className="restaurant-details-route">
        <NavBar />
        {restaurantDetailsApiStatus === apiStatusConstants.success ? (
          this.renderRestaurantDetailsBody()
        ) : (
          <div
            data-testid="restaurant-details-loader"
            className="restaurant-details-loader-container"
          >
            <Loader
              className="restaurant-details-loader"
              type="TailSpin"
              color="#F7931E"
              height={45}
              width={45}
              style={{margin: 'auto'}}
            />
          </div>
        )}
        <Footer />
      </div>
    )
  }
}

export default Restaurant
