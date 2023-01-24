import Types from "./ActionTypes";

const init = {
    loading:false,
}
export default function appStateReducer(state=init,{type,payload}){
    switch(type){
        case Types.SetLoading:
            return{
                ...state,
                loading:payload.state
            }
        default: return state
    }
}