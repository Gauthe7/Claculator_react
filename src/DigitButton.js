import { ACTIONS } from './App';



function DgitButton({dispatch,digit}){
    return(
<button onClick={()=>dispatch({type: ACTIONS.ADD_DIGIT,payload:{digit}})}> {digit}</button>




    )
}

export default DgitButton