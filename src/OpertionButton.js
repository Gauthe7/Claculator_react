import { ACTIONS } from './App';



function OperationButton({dispatch,operation}){
    return(
<button onClick={()=>dispatch({type: ACTIONS.CHOOSE_OPERTION,payload:{operation}})}> {operation}</button>




    )
}

export default OperationButton