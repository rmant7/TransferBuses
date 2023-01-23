import Types from "./ActionTypes";

export function setLoading(state){
    return{
        type:Types.SetLoading,
        payload:{
            state
        }
    }
}