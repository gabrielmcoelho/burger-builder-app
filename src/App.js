import React, { Component } from 'react';

import { Route, BrowserRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <Layout>
                <Route path="/" exact component={BurgerBuilder}/>
                <Route path="/checkout" exact component={Checkout}/>
            </Layout>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
