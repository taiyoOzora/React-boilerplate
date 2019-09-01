//Modules
import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux'


import { auth } from 'firebase';
import { accounts } from 'actions'
import { authenticatedRoute, unAuthenticatedRoute } from 'app/router/authenticationRoutes'

//Components
// import Error404 from 'app/components/Errors/Error404';
import Fallback from 'app/components/Fallback';
const MainPage = lazy(() => import(/* webpackChunkName: "cpo_MainPage" */ 'MainPage'));
const ZWrapper = lazy(() => import(/* webpackChunkName: "cpo_ZWrapper" */ 'ZWrapper'));

// Public - Route
// Not Logged In - NoAuthRoute
// Need Logged In - AuthRoute

const NoAuthRoute = ({ component: Component, ...rest }) => {
  const query = queryString.parse(rest.location.search)
  const redirect = !query.from ? "/" : query.from

  const ProtectedRoute = unAuthenticatedRoute(redirect)(Component)
  return (
    <Route {...rest} render={(props) => (<ProtectedRoute me={rest.me} {...props} />)} />
  )
}
const AuthRoute = ({ component: Component, ...rest }) => {
  var redirect = rest.location.pathname
  if (redirect == "/logout") {
    redirect = ""
  }
  const ProtectedRoute = authenticatedRoute(`/login${(redirect != "" ? `?from=${redirect}` : "")}`)(Component)
  return (
    <Route {...rest} render={(props) => (<ProtectedRoute me={rest.me} {...props} />)} />
  )
}

class ReactRouter extends Component {
  constructor() {
    super()
    this.state = {
      me: auth.currentUser
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      this.setState({ me: user })
      const { login, logout } = accounts
      if (user) {
        this.props.dispatch(login({
          name: user.displayName,
          profilePic: user.photoURL,
          verified: user.emailVerified
        }));
      } else {
        this.props.dispatch(logout())
      }
    })
  }

  render() {
    const { me } = this.state

    return (
      <Router>
        <Suspense fallback={<Fallback />}>
          <ZWrapper>
            <Switch>
              <Route exact path='/' component={MainPage} />

              {/* <NoAuthRoute exact path='/login' component={AccLogin} me={me} />
              <NoAuthRoute exact path='/signup' component={AccSignUp} me={me} />
              <AuthRoute exact path='/logout' component={AccLogout} me={me} /> */}

              {/* <Route component={Error404} /> */}
            </Switch>
          </ZWrapper>
        </Suspense>
      </Router>
    )
  }
}

export default connect()(ReactRouter)