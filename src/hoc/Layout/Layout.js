import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    };

    hamburgerClickedHandler = () => {
        this.setState(prevState => ({showSideDrawer: !prevState.showSideDrawer}));
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