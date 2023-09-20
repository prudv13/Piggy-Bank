import { createStore } from "redux";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
};

function reducer(state = initialState, action){
    switch(action.type){
        case 'account/deposit':
            return {
                ...state,
                balance: state.balance + action.payload,
            };
        case 'account/withdraw':
            return {
                ...state,
                balance: state.balance - action.payload,
            };
        case 'account/requestLoan':
            if(state.loan > 0) return state;
            return {
                ...state,
                balance: state.balance + action.payload.amount,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
            };
        case 'account/payLoan':
            return {
                ...state,
                balance: state.balance - state.loan,
                loan: 0,
                loanPurpose: ''
            };
        default: return state;
    }
}

const store = createStore(reducer);

function deposit(amount){
    return {type: 'account/deposit', payload: amount}
}
store.dispatch(deposit(500))
console.log(store.getState());


function withdraw(amount){
    return {type: 'account/withdraw', payload: amount}
}
store.dispatch(withdraw(200))
console.log(store.getState());


function requestLoan(amount, purpose){
    return {type: 'account/requestLoan', payload: {amount: amount, purpose: purpose}}
}
store.dispatch(requestLoan(1000, 'buy a car'))
console.log(store.getState());


function payLoan(){
    return {type: 'account/payLoan'}
}
store.dispatch(payLoan())
console.log(store.getState());