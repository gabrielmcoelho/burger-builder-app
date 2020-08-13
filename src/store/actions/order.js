import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (orderData, orderId) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS, 
        payload: {
            orderData: orderData,
            orderId: orderId
        }
    };
}

const purchaseBurgerFail = () => {
    return {type: actionTypes.PURCHASE_BURGER_FAIL};
}

const purchaseBurgerStart = () => {
    return {type: actionTypes.PURCHASE_BURGER_START};
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(orderData, response.data.name));
                // this.props.history.push('/');
            })
            .catch(error => {
                dispatch(purchaseBurgerFail());
            })
    }
}