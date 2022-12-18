const redux = require('redux')
const reduxThunk = require('redux-thunk').default
const axios = require('axios')


const initialState = {
    loading:false,
    users:[],
    error:''
}

const FETCHING = 'FETCHING'
const FETCHED = 'FETCHED'
const FAILED = 'FAILED' 

//ACTION CREATORS

const callingAPI = ()=>{
    return {
        type:FETCHING
    }
}

const gettingData = (users)=>{
    return {
        type:FETCHED,
        payload:users
    }
}

const raiseError = (error)=>{
    return {
        type:FAILED,
        payload:error
    }
}

const reducer = (prevState=initialState, action)=>{
    switch (action.type) {
        case FETCHING:
            return{
                ...prevState,
                loading:true
            }
        case FETCHED:
            return{
                ...prevState,
                loading:false,
                users:action.payload,
                error:''
            }
        case FAILED:
            return{
                ...prevState,
                loading:false,
                users:[],
                error:action.payload
            }
        default:
            break;
    }
}

// now we will create async action creator, is function that returns an action function
// Note- normal function creators return a object containing type and payload,
// but in this case its returning a function, this is possible just because of the redux-thunk
const fetchUserData = ()=>{
    return (dispatch)=>{
        dispatch(callingAPI())
        axios.get('https://dummyjson.com/users').then(res=>{
            const userids = res.data.users.map((user)=>user.id)
            dispatch(gettingData(userids))
        }).catch(error=>{
            dispatch(raiseError(error.message))
        })
    }
}

const store = redux.legacy_createStore(reducer, redux.applyMiddleware(reduxThunk))
console.log('Initial state', store.getState())

const unsubscribe = store.subscribe(()=>console.log('updated State',store.getState()))
store.dispatch(fetchUserData())