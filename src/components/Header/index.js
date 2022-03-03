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
    link: 'User-Profile',
    displayedText: 'Profile',
  },
]

localStorage.setItem(
  'selectedTab',
  JSON.stringify(selectedTabConstance[0].tabId),
)

class Header extends Component {
  state = {
    searchInput: '',
    showSmNavMenu: false,
    selectedTab: selectedTabConstance[0].tabId,
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
  }

  onChangeSelectedTab = tabId => {
    this.setState({selectedTab: tabId})
    localStorage.setItem('selectedTab', JSON.stringify(tabId))
  }

  renderMenu = () => {
    let {selectedTab} = this.state
    selectedTab = JSON.parse(localStorage.getItem('selectedTab'))
    return (
      <>
        <SmNavItems>
          <LinkItem
            to="/"
            selected={selectedTab === 'HOME'}
            onClick={() => this.onChangeSelectedTab('HOME')}
          >
            Home
          </LinkItem>
          <ButtonEl
            type="button"
            onClick={() => this.onChangeSelectedTab('SEARCH')}
          >
            <LinkItem as="p" selected={selectedTab === 'SEARCH'}>
              Search
            </LinkItem>
          </ButtonEl>
          <LinkItem
            to="/User-Profile"
            selected={selectedTab === 'PROFILE'}
            onClick={() => this.onChangeSelectedTab('PROFILE')}
          >
            Profile
          </LinkItem>
        </SmNavItems>
        <AiFillCloseCircle
          size="20"
          cursor="pointer"
          onClick={this.onToggleNavMenu}
        />
      </>
    )
  }

  render() {
    const {searchInput, showSmNavMenu} = this.state
    const selectedTab = JSON.parse(localStorage.getItem('selectedTab'))
    return (
      <NavContainer>
        <ContentContainer>
          <WebsiteLogoLinkItem to="/">
            <WebsiteLogo
              src="https://res.cloudinary.com/dbq6ql3ik/image/upload/v1646127088/Standard_Collection_8_mvnxfo.svg"
              alt="website logo"
            />
            <Heading>Insta Share</Heading>
          </WebsiteLogoLinkItem>
          <LgNavMenu>
            <SearchContainer>
              <InputEl
                type="search"
                placeholder="Search Caption"
                value={searchInput}
                onChange={this.changeInput}
              />
              <SearchIconButton type="button" testid="searchIcon">
                <FaSearch height="10" width="10" />
              </SearchIconButton>
            </SearchContainer>
            {selectedTabConstance.map(each => (
              <ButtonEl
                type="button"
                key={each.tabId}
                onClick={() => this.onChangeSelectedTab(each.tabId)}
              >
                <LinkItem
                  to={`/${each.link}`}
                  selected={each.tabId === selectedTab}
                >
                  {each.displayedText}
                </LinkItem>
              </ButtonEl>
            ))}
            <CustomButton type="button" onClick={this.logoutAccount}>
              Logout
            </CustomButton>
          </LgNavMenu>
          {showSmNavMenu ? (
            <SmNavMenu>{this.renderMenu()}</SmNavMenu>
          ) : (
            <BarIcon onClick={this.onToggleNavMenu} />
          )}
        </ContentContainer>
        {showSmNavMenu && <VerySmNavMenu>{this.renderMenu()}</VerySmNavMenu>}
      </NavContainer>
    )
  }
}

export default withRouter(Header)
