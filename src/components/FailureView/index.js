import './index.css'

const FailureView = props => {
  const {tryAgainFetch} = props
  return (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dbq6ql3ik/image/upload/v1646452229/Group_7522something_went_worng_qvk5vj.jpg"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">
        Something went wrong. Please try again
      </h1>
      <button
        type="button"
        onClick={tryAgainFetch}
        className="failure-view-button"
      >
        Try again
      </button>
    </div>
  )
}

export default FailureView
