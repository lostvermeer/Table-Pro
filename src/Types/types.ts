export interface TableRecord {
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

export interface NewTableRecord {
    employeeSignatureName: string;
    employeeSigDate: string;
    employeeNumber: string;
    documentType: string;
    documentStatus: string;
    documentName: string;
    companySignatureName: string;
    companySigDate: string;
  
  }

  export interface ToastParams {
    render: string;
    type: 'success' | 'error' | 'default';
    isLoading: boolean;
    closeButton: boolean;
    autoClose: number;
    draggable: boolean;
}

export interface TableState {
  records: Array<TableRecord>;
  isFetching: boolean;
  selectedRecord: TableRecord | null;
  error: string | null;
}