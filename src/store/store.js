import { combineReducers, createStore } from "redux";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
};

const initialStateCustomer = {
    fullName: '',
    nationalId: '',
    createdAt: '',
}


function accountReducer(state = initialStateAccount, action){
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


function customerReducer(state = initialStateCustomer, action) {
    switch(action.type){
        case 'customer/createCustomer':
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalId: action.payload.nationalId,
                createdAt: action.payload.createdAt,
            }
        case 'customer/updateName':
            return {
                ...state,
                fullName: action.payload,
            }
        default: return state;
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

// ============ create store ============
const store = createStore(rootReducer);

// ============ action creators ============

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

function createCustomer(fullName, nationalId){
    return {type: 'customer/createCustomer', payload: {fullName, nationalId, createdAt: new Date().toISOString()}}
}
store.dispatch(createCustomer('Jay Park', '27232723'));
console.log(store.getState());

function updateName(fullName){
    return {type: 'customer/updateName', payload: fullName}
}
store.dispatch(updateName('Jake Park'));
console.log(store.getState());