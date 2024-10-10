import { 
    getAllTableRecords, 
    createNewRecord, 
    deleteRecordById, 
    updateRecordById 
} from "../../ApiService/apiService";
import { 
    makeRequest, 
    getAllRecSuccess, 
    requestFailed, 
    createRecord, 
    deleteRecord, 
    selectRecord, 
    updateRecord 
} from '../../ReduxStore/action'
import { ToastParams } from "../../Types/types";
import { toast } from "react-toastify";

export const toastParams: ToastParams = {
    render: "",
    type: "default",
    isLoading: false,
    closeButton: true,
    autoClose: 1500,
    draggable: true,
}

export const selectRecordId = (id: any) => {
    return (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
        dispatch(selectRecord(id))
    }
}

export const getAllRecords = () => {
    return async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
        dispatch(makeRequest())
        try {
            const responce = await getAllTableRecords();
            dispatch(getAllRecSuccess(responce.data.data));
        }
        catch (error: any) {
            dispatch(requestFailed(error.message || 'Failed to fetch data!'));
        }
    }
}

export const updateTableRecord = (item: any) => {
    return async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
        const toastNotify = toast.loading("Please wait...");

        try {
            const responce = await updateRecordById(item);      
            toast.update(toastNotify, { ...toastParams, render: "Record was updated!", type: "success" });
            dispatch(updateRecord(responce.data.data));
        }
        catch (error: any) {            
            toast.update(toastNotify, { ...toastParams, render: `Failed to create record: ${error.message}`|| 'Failed to create record!', type: "error" });
            dispatch(requestFailed(error.message || 'Failed to create record!'));
        }
    }
}

export const createTableRecord = (item: any) => {
    return async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
        const toastNotify = toast.loading("Please wait...");

        try {
            const responce = await createNewRecord(item);         
            toast.update(toastNotify, { ...toastParams, render: "Record was created!", type: "success" });
            dispatch(createRecord(responce.data.data));
        }
        catch (error: any) {            
            toast.update(toastNotify, { ...toastParams, render: `Failed to create record: ${error.message}`|| 'Failed to create record!', type: "error" });
            dispatch(requestFailed(error.message || 'Failed to create record!'));
        }
    }
}

export const deleteTableRecord = (id: string) => {
    return async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
        const toastNotify = toast.loading("Please wait...");

        try {
            const responce = await deleteRecordById(id)         
            dispatch(deleteRecord(id));
            toast.update(toastNotify, { ...toastParams, render: "Record was deleted!", type: "success" });
        }
        catch (error: any) { 
            toast.update(toastNotify, { ...toastParams, render: `Failed to delete record: ${error.message}`|| 'Failed to delete record!', type: "error" });
            dispatch(requestFailed(`Failed to delete record ${error.message}` || 'Failed to delete record!'));
        }
    }
}



// export const deleteTableRecord = (id: string) => {
    
//     return (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
//         const toastNotify = toast.loading("Please wait...")
//         deleteRecordById(id)
//             .then((response) => {
//                 console.log("actionCreator+++>: ", response);
                
//                 dispatch(deleteRecord(id)); // Assuming you have a deleteRecord action
//                 toast.update(toastNotify, { render: "All is good", type: "success", isLoading: false, closeButton: true, autoClose: 2000, draggable: true });
//             })
//             .catch((error) => {
//                 dispatch(requestFailed(error.message || 'Failed to fetch data'));
//                 toast.update(toastNotify, { render: "All is good", type: "error", isLoading: false, closeButton: true })
//             });
//     }
// }