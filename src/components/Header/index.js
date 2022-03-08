import {Component} from 'react'
import {FaSearch, FaBars} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'
import {RiLogoutBoxFill} from 'react-icons/ri'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

/*
you can import styledComponent (optional)

import {
  NavContainer,
  ContentContainer,
  WebsiteLogoLinkItem,
  WebsiteLogo,
  Heading,
  LgNavMenu,
  SearchContainer,
  InputEl,
  SearchIconButton,
  LinkItem,
  CustomButton,
  BarIcon,
  SmNavMenu,
  SmNavItems,
  ButtonEl,
  VerySmNavMenu,
} from './styledComponents'
*/

const selectedTabConstance = [
  {
    tabId: 'HOME',
    link: '',
    displayedText: 'Home',
  },
  {
    tabId: 'PROFILE',
    link: 'my-profile',
    displayedText: 'Profile',
  },
]

class Header extends Component {
  state = {
    searchInput: '',
    showSmNavMenu: false,
    selectedTab: selectedTabConstance[0].tabId,
    showSearchContainer: false,
  }

  componentDidMount() {
    const showSmNavMenu = JSON.parse(localStorage.getItem('showSmNavMenu'))
    this.setState({showSmNavMenu})
  }

  componentWillUnmount() {
    const {showSmNavMenu} = this.state
    localStorage.setItem('showSmNavMenu', JSON.stringify(showSmNavMenu))
  }

  logoutAccount = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  changeInput = event => this.setState({searchInput: event.target.value})

  onToggleNavMenu = () => {
    this.setState(prevState => ({showSmNavMenu: !prevState.showSmNavMenu}))
    this.setState({showSearchContainer: false})
  }

  onChangeSelectedTab = tabId => {
    this.setState({selectedTab: tabId})
    localStorage.setItem('selectedTab', JSON.stringify(tabId))
  }

  onEnterPostCaption = event => {
    const {searchInput} = this.state
    const {searchPostCaption} = this.props
    if (event.key === 'Enter') {
      searchPostCaption(searchInput)
    }
  }

  onSearchPostCaption = () => {
    const {searchInput} = this.state
    const {searchPostCaption} = this.props
    searchPostCaption(searchInput)
  }

  showSearchContainer = () => {
    this.onChangeSelectedTab('SEARCH')
    this.onToggleNavMenu()
    this.setState({showSearchContainer: true})
  }

  renderMenu = () => {
    let {selectedTab} = this.state
    selectedTab = JSON.parse(localStorage.getItem('selectedTab'))
    return (
      <div className="sm-nav-items">
        <RiLogoutBoxFill
          size="25"
          onClick={this.logoutAccount}
          cursor="pointer"
        />
        <Link
          className={`header-link-item ${
            selectedTab === 'HOME' && 'selected-header-nav-link-item'
          }`}
          to="/"
          onClick={() => this.onChangeSelectedTab('HOME')}
        >
          Home
        </Link>
        <button
          className="header-button-el"
          type="button"
          onClick={this.showSearchContainer}
        >
          <p
            className={`header-link-item ${
              selectedTab === 'SEARCH' && 'selected-header-nav-link-item'
            }`}
          >
            Search
          </p>
        </button>
        <Link
          to="/my-profile"
          className={`header-link-item ${
            selectedTab === 'PROFILE' && 'selected-header-nav-link-item'
          }`}
          onClick={() => this.onChangeSelectedTab('PROFILE')}
        >
          Profile
        </Link>
        <AiFillCloseCircle
          size="20"
          cursor="pointer"
          onClick={this.onToggleNavMenu}
        />
      </div>
    )
  }

  renderSearchContainer = () => {
    const {searchInput} = this.state
    return (
      <div className="header-search-container">
        <input
          className="header-input-el"
          type="search"
          placeholder="Search Caption"
          value={searchInput}
          onKeyDown={this.onEnterPostCaption}
          onChange={this.changeInput}
        />
        <button
          className="header-search-icon-button"
          type="button"
          testid="searchIcon"
        >
          <FaSearch height="10" width="10" onClick={this.onSearchPostCaption} />
        </button>
      </div>
    )
  }

  render() {
    const {showSmNavMenu, showSearchContainer} = this.state
    const selectedTab = JSON.parse(localStorage.getItem('selectedTab'))
    return (
      <div className="header-nav-container">
        <div className="header-content-container">
          <Link
            className="header-website-logo-link-item"
            to="/"
            onClick={() => this.onChangeSelectedTab('HOME')}
          >
            <img
              className="header-website-logo"
              src="https://res.cloudinary.com/dbq6ql3ik/image/upload/v1646127088/Standard_Collection_8_mvnxfo.svg"
              alt="website logo"
            />
            <h1 className="header-heading">Insta Share</h1>
          </Link>
          <div className="lg-nav-menu">
            {this.renderSearchContainer()}
            {selectedTabConstance.map(each => (
              <Link
                className={`header-link-item ${
                  selectedTab === each.tabId && 'selected-header-nav-link-item'
                }`}
                to={`/${each.link}`}
                key={each.tabId}
                onClick={() => this.onChangeSelectedTab(each.tabId)}
              >
                {each.displayedText}
              </Link>
            ))}
            <button
              className="header-custom-button"
              type="button"
              onClick={this.logoutAccount}
            >
              Logout
            </button>
          </div>
          {showSearchContainer && (
            <div className="sm-nav-menu">{this.renderSearchContainer()}</div>
          )}
          {showSmNavMenu ? (
            <div className="sm-nav-menu">{this.renderMenu()}</div>
          ) : (
            <FaBars onClick={this.onToggleNavMenu} className="bar-icon" />
          )}
        </div>
        {showSmNavMenu && (
          <div className="very-sm-nav-menu">{this.renderMenu()}</div>
        )}
        {showSearchContainer && (
          <div className="very-sm-nav-menu">{this.renderSearchContainer()}</div>
        )}
      </div>
    )
  }
}

export default withRouter(Header)
