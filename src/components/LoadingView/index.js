import Loader from 'react-loader-spinner'

/*
you can import styledComponent (optional)

import {LoaderContainer} from './styledComponents'
*/

import './index.css'

const LoadingView = () => (
  <div className="page-loader-container" testid="loader">
    <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
  </div>
)

export default LoadingView
