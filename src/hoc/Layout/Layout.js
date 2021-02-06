import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliar/Auxiliar';
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
                <Toolbar openSideDrawer={this.hamburgerClickedHandler} isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer open={this.state.showSideDrawer} backdropClicked={this.sideDrawerClosedHandler} isAuthenticated={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);