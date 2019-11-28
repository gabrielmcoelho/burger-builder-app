import React, { Component } from 'react';
import PropTypes from "prop-types";

import classes from './Modal.css'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return(
            <Aux>
                <Backdrop show={this.props.show} hideModal={this.props.hideModal}/>
                <div className={classes.Modal}
                     style={{
                         transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                         opacity: this.props.show ? '1': '0'
                     }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }

}

Modal.propTypes = {
    show: PropTypes.bool,
    hideModal: PropTypes.func
};

export default Modal;