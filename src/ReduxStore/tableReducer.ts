// import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { MAKE_REQ, GETALLRECORDS_SUCCESS, REQ_FAILED, CREATE_RECORD_SUCCESS, DELETE_RECORD_SUCCESS } from './actionTypes'
// import { getDataPage } from "../Components/DataTable/apiService";


interface TableRecord {
  id: string;
  employeeSignatureName: string;
  employeeSigDate: string;
  employeeNumber: string;
  documentType: string;
  documentStatus: string;
  documentName: string;
  companySignatureName: string;
  companySigDate: string;
}

export interface TableState {
  records: Array<TableRecord>;
  isFetching: boolean;
  error: string | null;
}

const initialState: TableState = {
  records: [],
  isFetching: false,
  error: null,
}


const tableReducer = (state = initialState, action: any) => {

  switch(action.type){
    case MAKE_REQ:
      return {
        ...state,
        isFetching: true
      }
    case GETALLRECORDS_SUCCESS:
      return{
        ...state,
        isFetching: false,
        records: action.payload
      }
    case REQ_FAILED:
      return{
        ...state,
        isFetching: false,
        error: action.payload
      }
    case CREATE_RECORD_SUCCESS:
      return{
        ...state,
        records: [...state.records, {...action.payload}]
      }
    case DELETE_RECORD_SUCCESS:
      const filterRecord = state.records.filter(record => record.id !== action.payload)
      return{
        ...state,
        records: filterRecord
      }

    default:
      return state;
  }
}
 

export default tableReducer;
export const selectTableRecords = (state: RootState) => state.table.records;
export const selectIsFetching = (state: RootState) => state.table.isFetching;
export const selectError = (state: RootState) => state.table.error;
