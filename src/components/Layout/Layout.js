import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    };

    hamburgerClickedHandler = () => {
        this.setState((prevState) => {
            this.setState({showSideDrawer: !prevState.showSideDrawer});
        })
    };

    render () {
        return (
            <Aux>
                <Toolbar openSideDrawer={this.hamburgerClickedHandler}/>
                <SideDrawer open={this.state.showSideDrawer} backdropClicked={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default Layout;