import Cookies from 'js-cookie'
import {Component} from 'react'

import {Link} from 'react-router-dom'

import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import {BsFilterLeft, BsFillStarFill} from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import NavBar from '../NavBar'
import Footer from '../Footer'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 1,
    displayText: 'Highest',
    value: 'Highest',
  },
]

const apiStatusConstants = {
  inProgress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const LIMIT = 9

class Home extends Component {
  state = {
    searchInput: '',
    restaurantsOffersList: [],
    restaurantsOffersApiStatus: apiStatusConstants.inProgress,
    restaurantsList: [],
    restaurantsListApiStatus: apiStatusConstants.inProgress,
    selectedSortByValue: sortByOptions[0].value,
    activePage: 1,
  }

  componentDidMount() {
    this.getRestaurantsOffers()
    this.getRestaurantsList()
  }

  getRestaurantsOffers = async () => {
    this.setState({
      restaurantsOffersApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {offers} = data
      this.setState({
        restaurantsOffersApiStatus: apiStatusConstants.success,
        restaurantsOffersList: offers,
      })
    } else {
      this.setState({
        restaurantsOffersApiStatus: apiStatusConstants.failure,
      })
    }
  }

  getModifiedList = restaurants =>
    restaurants.map(eachRestaurant => ({
      id: eachRestaurant.id,
      name: eachRestaurant.name,
      cuisine: eachRestaurant.cuisine,
      userRating: eachRestaurant.user_rating,
      constForTwo: eachRestaurant.cost_for_two,
      groupByTime: eachRestaurant.group_by_time,
      hasOnlineDelivery: eachRestaurant.has_online_delivery,
      hasTableBooking: eachRestaurant.has_table_booking,
      imageUrl: eachRestaurant.image_url,
      isDeliveringNow: eachRestaurant.is_delivering_now,
      location: eachRestaurant.location,
      menuType: eachRestaurant.menu_type,
      opensAt: eachRestaurant.opens_at,
    }))

  getRestaurantsList = async () => {
    console.log('this should more')
    this.setState({restaurantsListApiStatus: apiStatusConstants.inProgress})
    const {activePage, selectedSortByValue, searchInput} = this.state
    const offset = (activePage - 1) * LIMIT
    const jwtToken = Cookies.get('jwt_token')
    let url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortByValue}`
    if (searchInput !== '') {
      url = `https://apis.ccbp.in/restaurants-list?search=${searchInput}`
    }
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const {restaurants} = data
      const updatedRestaurantsList = this.getModifiedList(restaurants)
      this.setState({
        restaurantsList: updatedRestaurantsList,
        restaurantsListApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        restaurantsList: [],
        restaurantsListApiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderOffersSlider = () => {
    const settings = {
      arrows: false, // this helped to avoid the overflow
      dots: true,
      dotsClass: 'slick-dots',
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 700,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
    }
    const {restaurantsOffersList} = this.state

    return (
      <div className="home-carousal-section">
        <Slider {...settings}>
          {restaurantsOffersList.map(eachOffer => (
            <div key={eachOffer.id}>
              <img
                className="offers-img"
                src={eachOffer.image_url}
                alt="offer"
                align="center"
                style={{marginLeft: 'auto', marginRight: 'auto'}} // Important to keep slides in center
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  onSelectSortBy = async event => {
    console.log(event.target.value)
    await this.setState({selectedSortByValue: event.target.value})
    this.getRestaurantsList()
  }

  renderNoResultsView = () => {
    const {searchInput} = this.state
    return (
      <div className="no-results-view">
        <h1 className="no-results-heading">Uh-oh!</h1>
        <p className="no-results-description">
          No results found for {searchInput}. Please try something else.
        </p>
      </div>
    )
  }

  renderPopularRestaurantsList = () => {
    const {restaurantsList} = this.state
    return (
      <ul className="restaurants-list">
        {restaurantsList.map(eachRestaurant => (
          <Link
            key={eachRestaurant.id}
            style={{textDecoration: 'none'}}
            to={`/restaurant/${eachRestaurant.id}`}
          >
            <li data-testid="restaurant-item" className="restaurants-list-item">
              <div className="popular-restaurant-image-container">
                <img
                  className="popular-restaurant-image"
                  src={eachRestaurant.imageUrl}
                  alt="restaurant"
                />
              </div>
              <div className="popular-restaurant-details">
                <div>
                  <h1 className="popular-restaurant-name">
                    {eachRestaurant.name}
                  </h1>
                  <p className="popular-restaurant-cuisine">
                    {eachRestaurant.cuisine}
                  </p>
                </div>
                <div className="ratings-and-reviews">
                  <BsFillStarFill size={15} color="gold" />
                  <p className="popular-restaurant-rating">
                    {eachRestaurant.userRating.rating}
                  </p>
                  <p className="popular-restaurant-review">
                    ({eachRestaurant.userRating.total_reviews})
                  </p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  goToNextPage = async () => {
    const {activePage} = this.state
    console.log(activePage)
    await this.setState({activePage: activePage + 1})
    this.getRestaurantsList()
  }

  goToPreviousPage = async () => {
    const {activePage} = this.state
    console.log(activePage)
    await this.setState({activePage: activePage - 1})
    this.getRestaurantsList()
  }

  onChangeSearchInput = async event => {
    await this.setState({searchInput: event.target.value})
    this.getRestaurantsList()
  }

  render() {
    const {
      restaurantsOffersApiStatus,
      restaurantsListApiStatus,
      selectedSortByValue,
      activePage,
      searchInput,
    } = this.state
    return (
      <div className="home-route">
        <NavBar isHomeRoute />
        {restaurantsOffersApiStatus === apiStatusConstants.inProgress ? (
          <div data-testid="restaurants-offers-loader">
            <Loader
              className="offers-loader-container"
              type="TailSpin"
              color="#F7931E"
            />
          </div>
        ) : (
          this.renderOffersSlider()
        )}
        <div className="popular-restaurants-section">
          <div className="popular-restaurants-header">
            <div>
              <h1 className="popular-restaurants-heading">
                Popular Restaurants
              </h1>
              <p className="popular-restaurants-description">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
            </div>
            <div className="search-bar">
              <AiOutlineSearch />
              <input
                className="search-input"
                onChange={this.onChangeSearchInput}
                value={searchInput}
                type="search"
                placeholder="Search Your Favorite Restaurant..."
              />
            </div>
            <div className="sort-by-container">
              <BsFilterLeft />
              <p htmlFor="select" className="sort-by-label">
                Sort by
              </p>
              <p className="space">&nbsp;</p>
              <select
                onChange={this.onSelectSortBy}
                value={selectedSortByValue}
                id="select"
                className="sort-by"
                name="sort-by"
              >
                {sortByOptions.map(eachOption => (
                  <option
                    className="sort-by-option"
                    key={eachOption.id}
                    value={eachOption.value}
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {restaurantsListApiStatus === apiStatusConstants.success &&
            this.renderPopularRestaurantsList()}
          {restaurantsListApiStatus === apiStatusConstants.inProgress && (
            <div
              data-testid="restaurants-list-loader"
              className="popular-loader-container"
            >
              <Loader
                type="TailSpin"
                color="#F7931E"
                style={{marginLeft: 'auto', marginRight: 'auto'}}
              />
            </div>
          )}

          {restaurantsListApiStatus === apiStatusConstants.failure &&
            this.renderNoResultsView()}
          <div className="pagination-buttons-bar">
            <button
              data-testid="pagination-left-button"
              onClick={this.goToPreviousPage}
              type="button"
              className="pagination-btn"
            >
              {' '}
              <IoIosArrowBack size={15} />
            </button>
            <p className="page-no">
              <span data-testid="active-page-number">{activePage}</span> of 4
            </p>
            <button
              data-testid="pagination-right-button"
              onClick={this.goToNextPage}
              type="button"
              className="pagination-btn"
            >
              {' '}
              <IoIosArrowForward size={15} />
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
