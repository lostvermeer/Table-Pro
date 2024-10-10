import { 
  MAKE_REQ, 
  GETALLRECORDS_SUCCESS, 
  REQ_FAILED, 
  CREATE_RECORD_SUCCESS, 
  DELETE_RECORD_SUCCESS, 
  SELECT_RECORD, 
  UPDATE_RECORD 
} from '../Types/actionTypes'
import { TableState } from '../Types/types';

const initialState: TableState = {
  records: [],
  isFetching: true,
  selectedRecord: null,
  error: null,
}


const tableReducer = (state = initialState, action: any) => {

  switch(action.type){
    case MAKE_REQ:
      return {
        ...state,
        isFetching: true
      };
    case GETALLRECORDS_SUCCESS:
      return{
        ...state,
        isFetching: false,
        records: action.payload
      };
    case REQ_FAILED:
      return{
        ...state,
        isFetching: false,
        error: action.payload
      };
    case CREATE_RECORD_SUCCESS:
      return{
        ...state,
        records: [...state.records, {...action.payload}]
      };
    case DELETE_RECORD_SUCCESS:
      const filterRecord = state.records.filter(record => record.id !== action.payload)
      return{
        ...state,
        records: filterRecord
      };
    case SELECT_RECORD:
      const findRecord = state.records.find(record => record.id == action.payload)
      return{
        ...state,
        selectedRecord: findRecord
      };
    case UPDATE_RECORD:
      const newItem = action.payload
      const updatedRecords = state.records.map(record => record.id === newItem.id ? newItem : record)
      return{
        ...state,
        records: updatedRecords
      };

    default:
      return state;
  }
}
 

export default tableReducer;
