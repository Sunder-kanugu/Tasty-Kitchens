import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-route">
    <div className="not-found-body">
      <img
        src="https://res.cloudinary.com/dndtpnlzv/image/upload/v1678708909/Tasty%20Kitchen/Groupnot-found-img_nr8khe.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <Link to="/">
        <button type="button" className="home-page-btn">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
