import './index.css'

const BadPath = props => {
  const goToHomePage = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="page-not-found-container">
      <img
        src="https://res.cloudinary.com/dbq6ql3ik/image/upload/v1646499337/erroring_1_ogqdxt.png"
        alt="page not found"
        className="page-not-found-image"
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="page-not-found-description">
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <button
        type="button"
        className="page-not-found-button"
        onClick={goToHomePage}
      >
        Home Page
      </button>
    </div>
  )
}

export default BadPath
