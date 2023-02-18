import React from 'react'
import { useReducer } from 'react'
import "./style.css"
import DgitButton from './DigitButton'
import OperationButton from './OpertionButton'


export const ACTIONS = {
  ADD_DIGIT: 'add-digir',
  CHOOSE_OPERTION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DEGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,currentOperand:payload.digit,
          overwrite:false
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes(". ")) {
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERTION:
      if (state.currentOperand == null && state.previouOperand == null) {
        return state
      }
      if(state.currentOperand==null){
        return{
          ...state,
          operation:payload.operation
        }
      }
      if(state.previouOperand==null){
        return {
          ...state,
          operation:payload.operation,
          previouOperand:state.currentOperand,
          currentOperand:null
        }

      }

      return{
        ...state,
       previouOperand:evaluate(state),
       operation:payload.operation,
       currentOperand:null
      }

    case ACTIONS.CLEAR:
      return {}
      case ACTIONS.DELETE_DEGIT:
        if(state.overwrite){
          return{
            ...state,overwrite:false,currentOperand:null
          }
        }
        return{
          ...state,
          currentOperand:state.currentOperand.slice(0,-1)
        }
        if(state.currentOperand==null) return state
        if(state.currentOperand.length==1){
          return{ ...state,currentOperand:null}
        }

      case ACTIONS.EVALUATE:
        if(state.operation==null|| state.currentOperand==null||state.previouOperand==null){
          return state
        }
        return{
          ...state,
          overwrite:true,
          previouOperand:null,
          operation:null,
          currentOperand:evaluate(state)
        }
  }

}

function evaluate({ currentOperand, previouOperand, operation}) {

  const prev = parseFloat(previouOperand)
   const current= parseFloat(currentOperand)
  
  if (isNaN(prev) || isNaN(current)) return ""
  
  let computation =""
  
  switch (operation) {
  
  case "+":
  
  computation =prev + current
  
  break
  
  case "-": 
  computation =prev - current
  break
  case "*": 
  computation =prev * current
  break
  case "÷": 
  computation =prev / current
  break

  }
  return computation.toString()
}

const INTEGER_FORMATER=new Intl.NumberFormat("en-us",{
  maximumFractionDigits:0
})
function formatOperand(operand){
  if(operand==null)return
  const[integer,decimal]=operand.split('.')
  if(decimal==null)return INTEGER_FORMATER.format(integer)
  return `${INTEGER_FORMATER.format(integer)}.${decimal}`
}







function App() {





  const [{ currentOperand, previouOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  )

  // dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit:1}})

  return (



    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>{formatOperand(previouOperand)}{operation}</div>
        <div className='current-operand'>{formatOperand(currentOperand)}</div>


      </div>

      <button className='span-two' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DEGIT })}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DgitButton digit="7" dispatch={dispatch} />
      <DgitButton digit="8" dispatch={dispatch} />
      <DgitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DgitButton digit="4" dispatch={dispatch} />
      <DgitButton digit="5" dispatch={dispatch} />
      <DgitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DgitButton digit="1" dispatch={dispatch} />
      <DgitButton digit="2" dispatch={dispatch} />
      <DgitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DgitButton digit="." dispatch={dispatch} />
      <DgitButton digit="0" dispatch={dispatch} />
      <button className='span-two' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>






    </div>
  )
}

export default App