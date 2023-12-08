import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {Component} from 'react'
import {FiMenu} from 'react-icons/fi'
import {IoIosCloseCircle} from 'react-icons/io'
import './index.css'

class NavBar extends Component {
  state = {showNavMenu: false}

  openNavMenu = () => {
    this.setState({showNavMenu: true})
  }

  closeNavMenu = () => {
    this.setState({showNavMenu: false})
  }

  renderDesktopNavbar = () => {
    const {isHomeRoute} = this.props
    const homeClass = isHomeRoute ? 'home-style' : null
    const cartClass = !isHomeRoute ? 'cart-style' : null
    return (
      <div className="nav-container-md">
        <div className="nav-body">
          <div className="nav-logo-name-container">
            <Link style={{textDecoration: 'none'}} to="/">
              <img
                src="https://res.cloudinary.com/dndtpnlzv/image/upload/v1678443336/Tasty%20Kitchen/Frame_274website-home-logo_syudgm.png"
                alt="website logo"
                className="nav-website-logo"
              />
            </Link>
            <h1 className="nav-website-name">Tasty Kitchens</h1>
          </div>
          <ul className="nav-menu-list">
            <Link style={{textDecoration: 'none'}} to="/">
              <li className={`nav-menu-list-item ${homeClass}`}>Home</li>
            </Link>
            <Link style={{textDecoration: 'none'}} to="/cart">
              <li className={`nav-menu-list-item ${cartClass}`}>Cart</li>
            </Link>
            <li>
              <button
                onClick={this.onClickLogout}
                type="button"
                className="logout-btn"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    console.log(this.props)
    history.replace('/login')
  }

  render() {
    const {showNavMenu} = this.state
    const {isHomeRoute} = this.props
    const homeClass = isHomeRoute ? 'home-style' : null
    const cartClass = !isHomeRoute ? 'cart-style' : null
    return (
      <>
        <div className="nav-container-sm">
          <nav className="nav-bar-sm">
            <div className="nav-logo-name-container">
              <img
                src="https://res.cloudinary.com/dndtpnlzv/image/upload/v1678443336/Tasty%20Kitchen/Frame_274website-home-logo_syudgm.png"
                alt="website logo"
                className="nav-website-logo"
              />
              <h1 className="nav-website-name">Tasty Kitchens</h1>
            </div>
            <button
              onClick={this.openNavMenu}
              type="button"
              className="hamburger-toggle-button"
            >
              {' '}
              <FiMenu className="hamburger-icon" />
            </button>
          </nav>
          {showNavMenu && (
            <div className="nav-bar-menu-sm">
              <ul className="nav-menu-list">
                <Link style={{textDecoration: 'none'}} to="/">
                  <li className={`nav-menu-list-item ${homeClass}`}>Home</li>
                </Link>
                <Link style={{textDecoration: 'none'}} to="/cart">
                  <li className={`nav-menu-list-item ${cartClass}`}>Cart</li>
                </Link>
                <li>
                  <button
                    onClick={this.onClickLogout}
                    type="button"
                    className="logout-btn"
                  >
                    Logout
                  </button>
                </li>
              </ul>
              <button
                onClick={this.closeNavMenu}
                type="button"
                className="nav-menu-close-button"
              >
                {' '}
                <IoIosCloseCircle className="nav-close-icon" />
              </button>
            </div>
          )}
        </div>
        {this.renderDesktopNavbar()}
      </>
    )
  }
}

export default withRouter(NavBar)
