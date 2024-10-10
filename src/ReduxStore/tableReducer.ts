// import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { MAKE_REQ, GETALLRECORDS_SUCCESS, REQ_FAILED, CREATE_RECORD_SUCCESS, DELETE_RECORD_SUCCESS, SELECT_RECORD, NEW_RECORD } from './actionTypes'
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

interface NewRecord {
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
  selectedRecord: string | null;
  newRecord: NewRecord | null;
  error: string | null;
}

const initialState: TableState = {
  records: [],
  isFetching: true,
  selectedRecord: null,
  newRecord: null,
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
      return{
        ...state,
        selectedRecord: action.payload
      };
    case NEW_RECORD:
      return{
        ...state,
        newRecord: action.payload
      };

    default:
      return state;
  }
}
 

export default tableReducer;
export const selectTableRecords = (state: RootState) => state.table.records;
export const selectIsFetching = (state: RootState) => state.table.isFetching;
export const selectSelectedRecord = (state: RootState) => state.table.selectedRecord;
export const selectNewRecord = (state: RootState) => state.table.newRecord;
export const selectError = (state: RootState) => state.table.error;
