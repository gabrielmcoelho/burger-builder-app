import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const registerNewOrder = (state, payload) => {
    const newOrder = {
        data: payload.orderData,
        id: payload.orderId
    }
    return updateObject(state, {
        orders: state.orders.concat(newOrder),
        purchased: true
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, {purchased: false});
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return registerNewOrder(state, action.payload);
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, {});
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, {loading: true});
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, {orders: action.orders, loading: false});
            case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, {loading: false});
        default: return state;
    }
};

export default reducer;