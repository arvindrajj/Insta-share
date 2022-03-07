import Loader from 'react-loader-spinner'

import {LoaderContainer} from './styledComponents'

const LoadingView = () => (
  <LoaderContainer data-testid="loader">
    <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
  </LoaderContainer>
)

export default LoadingView
