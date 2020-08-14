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

export const purchaseBurgerStart = () => {
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

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(res => {
                const orders = [];
                for(let key in res.data) {
                    orders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(orders))
            })
            .catch(error => {
                dispatch(fetchOrdersSuccess(error))
            })
    }
}
