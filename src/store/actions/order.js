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

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(orderData, response.data.name));
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

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
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
