import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Histories from './pages/Histories'
import Login from './pages/Login'
import HeaderComponent from './components/HeaderComponent'
import Register from './pages/Register'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <HeaderComponent />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/cart" exact>
              <Cart />
            </Route>
            <Route path="/histories" exact>
              <Histories />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
