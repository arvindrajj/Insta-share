import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

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
      <SmNavItems>
        <LinkItem
          to="/"
          selected={selectedTab === 'HOME'}
          onClick={() => this.onChangeSelectedTab('HOME')}
        >
          Home
        </LinkItem>
        <ButtonEl type="button" onClick={this.showSearchContainer}>
          <LinkItem as="p" selected={selectedTab === 'SEARCH'}>
            Search
          </LinkItem>
        </ButtonEl>
        <LinkItem
          to="/my-profile"
          selected={selectedTab === 'PROFILE'}
          onClick={() => this.onChangeSelectedTab('PROFILE')}
        >
          Profile
        </LinkItem>
        <AiFillCloseCircle
          size="20"
          cursor="pointer"
          onClick={this.onToggleNavMenu}
        />
      </SmNavItems>
    )
  }

  renderSearchContainer = () => {
    const {searchInput} = this.state
    return (
      <SearchContainer>
        <InputEl
          type="search"
          placeholder="Search Caption"
          value={searchInput}
          onKeyDown={this.onEnterPostCaption}
          onChange={this.changeInput}
        />
        <SearchIconButton type="button" testid="searchIcon">
          <FaSearch height="10" width="10" onClick={this.onSearchPostCaption} />
        </SearchIconButton>
      </SearchContainer>
    )
  }

  render() {
    const {showSmNavMenu, showSearchContainer} = this.state
    const selectedTab = JSON.parse(localStorage.getItem('selectedTab'))
    return (
      <NavContainer>
        <ContentContainer>
          <WebsiteLogoLinkItem
            to="/"
            onClick={() => this.onChangeSelectedTab('HOME')}
          >
            <WebsiteLogo
              src="https://res.cloudinary.com/dbq6ql3ik/image/upload/v1646127088/Standard_Collection_8_mvnxfo.svg"
              alt="website logo"
            />
            <Heading>Insta Share</Heading>
          </WebsiteLogoLinkItem>
          <LgNavMenu>
            {this.renderSearchContainer()}
            {selectedTabConstance.map(each => (
              <LinkItem
                to={`/${each.link}`}
                key={each.tabId}
                selected={each.tabId === selectedTab}
                onClick={() => this.onChangeSelectedTab(each.tabId)}
              >
                {each.displayedText}
              </LinkItem>
            ))}
            <CustomButton type="button" onClick={this.logoutAccount}>
              Logout
            </CustomButton>
          </LgNavMenu>
          {showSearchContainer && (
            <SmNavMenu>{this.renderSearchContainer()}</SmNavMenu>
          )}
          {showSmNavMenu ? (
            <SmNavMenu>{this.renderMenu()}</SmNavMenu>
          ) : (
            <BarIcon onClick={this.onToggleNavMenu} />
          )}
        </ContentContainer>
        {showSmNavMenu && <VerySmNavMenu>{this.renderMenu()}</VerySmNavMenu>}
        {showSearchContainer && (
          <VerySmNavMenu>{this.renderSearchContainer()}</VerySmNavMenu>
        )}
      </NavContainer>
    )
  }
}

export default withRouter(Header)
