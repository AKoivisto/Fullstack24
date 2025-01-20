import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
      const filterText = event.target.value
      dispatch(filterChange(filterText))
      console.log(filterText)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        Filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter