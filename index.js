// We are going to learn Redux

/**
 * Principle
 * 1> The state of your application is stored in a object tree within a single store
 * 
 * 2> The only way to change the state in to emit an action, an object describing what happened
 *      ->An Action is object containing type and payload.
 * 
 * 3> To specify how state tree is transformed by action, we write pure reducers
 *      ->reducer is a function that take two parameters (prevState, action) and returns =>new state
 */

/**
 * Data Flow
 *  App-->subscribed to the store, no direct state changes is allowed
 * 
 *  App--->dispatch Actions--->Actions Reaches to Reducer--->Reducers returns new state
 */

// Import redux as simple node js app
const redux = require('redux')
//Importing a Middleware in redux, we use applyMiddlware method to add, while creating store
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()


// Actions
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

// Better to write action creaters-->Action Creaters are functions which returns an action
//Action Creators
function buyCake(nos){
    return {
        type:BUY_CAKE,
        payload:nos
    }
}

function buyICecream(nos){
    return{
        type:BUY_ICECREAM,
        payload:nos
    }
}


// Initial State
const InitialState = {
    numofCake : 10,
    numofIcecream : 20
}

/**
 * When our app grows, single reducer become complex and unmanageable
 * So we Split as per our requirement
 * to split reducers we also split our initial state,
 * after spliting we combine the reducers, using combineReducers()
 * it accepts an object containing key value pairs of the reducers
 */

const initialCakeState = {
    numofCake : 10,
}

const initialIcecreamState = {
    numofIcecream : 20
}

//reducers
const reducer = (prevState=InitialState,action)=>{
    switch(action.type){

        case BUY_CAKE:
            return {
                ...prevState,
                numofCake:prevState.numofCake-action.payload
            }

        case BUY_ICECREAM:
            return {
                ...prevState,
                numofIcecream:prevState.numofIcecream-action.payload
            }

        default:
            return prevState
    }
}

const cakeReducer = (prevState=initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE:
            return {
                ...prevState,
                numofCake:prevState.numofCake-action.payload
            }

        default:
            return prevState
    }
}

const icecreamReducer = (prevState=initialIcecreamState,action)=>{
    switch(action.type){
        case BUY_ICECREAM:
            return {
                ...prevState,
                numofIcecream:prevState.numofIcecream-action.payload
            }

        default:
            return prevState
    }
}

/**
 * Even they are in split, still recieves the all dispatched action
 * difference here is the switch case, onc acts and one doesn't
 * let combine the reducers
 */
const rootReducer = redux.combineReducers({
    cake:cakeReducer,
    icecream:icecreamReducer
})


// Now lets create a store
// const store = redux.legacy_createStore(reducer)
const store = redux.legacy_createStore(rootReducer,redux.applyMiddleware(logger))

console.log('Initial state', store.getState())

const unsubscribe = store.subscribe(()=>console.log('updated state',store.getState()))

store.dispatch(buyCake(2))
store.dispatch(buyICecream(10))
store.dispatch(buyCake(3))
store.dispatch(buyICecream(4))

unsubscribe()

/**
 * Some Advance concepts of Redux
 * 
 * MIDDLEWARE--
 * is the suggested way to extend Redux with custome functionality
 * Provides a third Party extention point b/w dispacthing an action
 * and the moment it raches to the reducer
 * USES--> Middleware for logging, crash reporting, performing asynchronous tasks etc.
 * Ex--
 * redux-logger, redux-thunk
 */