import { MAKE_REQ, GETALLRECORDS_SUCCESS, REQ_FAILED, CREATE_RECORD_SUCCESS, DELETE_RECORD_SUCCESS, SELECT_RECORD, NEW_RECORD, UPDATE_RECORD } from "./actionTypes";

export const makeRequest = () => {
    return {
        type: MAKE_REQ
    }
}

export const getAllRecSuccess = (data: any) => {
  return {
      type: GETALLRECORDS_SUCCESS,
      payload: data
  }
}

export const requestFailed = (data: any) => {
  return {
      type: REQ_FAILED,
      payload: data
  }
}

export const createRecord = (data: any) => {
  return {
      type: CREATE_RECORD_SUCCESS,
      payload: data
  }
}

export const deleteRecord = (data: string) => {
  return {
      type: DELETE_RECORD_SUCCESS,
      payload: data
  }
}

export const selectRecord = (data: any) => {
  return {
      type: SELECT_RECORD,
      payload: data
  }
}

export const newRecord = (data: any) => {
  return {
      type: NEW_RECORD,
      payload: data
  }
}

export const updateRecord = (data: any) => {
  return {
      type: UPDATE_RECORD,
      payload: data
  }
}