import React, { useEffect, useState } from "react"
import DeleteIcon  from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/AddCircle';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, CircularProgress, Container, Grid2, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from "@mui/material";
import AlertModal from './AlertModal'
import FormModal from './FormModal'
import { format } from 'date-fns';

import { Item, NewItem } from '../../Types/types';

import { useAppDispatch, useAppSelector } from "../../ReduxStore/hooks";
import { getAllRecords, createTableRecord, deleteTableRecord } from './actionCreator';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID'},
//   { field: 'employeeNumber', headerName: 'Employee Number', width: 135},
//   { field: 'employeeSignatureName', headerName: 'Employee Signature Name', width: 186},
//   { field: 'employeeSigDate', headerName: 'Employee Signing Date', width: 186},
//   { field: 'documentType', headerName: 'Document Type', width: 120},
//   { field: 'documentStatus', headerName: 'Document Satatus', width: 137},
//   { field: 'documentName', headerName: 'Document Name', width: 125},
//   { field: 'companySignatureName', headerName: 'Company Signature Name', width: 185},
//   { field: 'companySigDate', headerName: 'Company Signing Date', width: 170},
// ];

// interface Column {
//   id: 'employeeNumber' | 'employeeSignatureName' | 'employeeSigDate' | 'documentType' | 'documentStatus' | 'documentName' | 'companySignatureName' | 'companySigDate';
//   name: string;
// }

const columns = [
  // { id: 'id', name: 'ID'},
  { id: 'employeeNumber', name: 'Employee Number'},
  { id: 'employeeSignatureName', name: 'Employee Signature Name'},
  { id: 'employeeSigDate', name: 'Employee Signing Date'},
  { id: 'documentType', name: 'Document Type'},
  { id: 'documentStatus', name: 'Document Satatus'},
  { id: 'documentName', name: 'Document Name'},
  { id: 'companySignatureName', name: 'Company Signature Name'},
  { id: 'companySigDate', name: 'Company Signing Date'},
  { id: 'action', name: 'Action'}
];



const DataTable = () => {
  


  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.table.records);
  const isFetching = useAppSelector(state => state.table.isFetching);
  const error = useAppSelector(state => state.table.error);


  // const [data, setData] = useState<Array<Item>>([]);
  // const [loading, setLoading] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [editRecord, setEditRecord] = useState<Item | null>(null);

  useEffect(() => {

    const item = {
      
      "documentStatus": "Подписан",
      "employeeNumber": "1234",
      "documentType": "Трудовой договор",
      "documentName": "Договор.pdf",
      "companySignatureName": "Договор.sig",
      "employeeSignatureName": "Договор.sig",
      "employeeSigDate": "2022-12-23T11:19:27.017Z",
      "companySigDate": "2022-12-23T11:19:27.017Z"
  };
    dispatch(getAllRecords());
    // dispatch(createTableRecord(item));
    setTimeout(() => {
      // dispatch(deleteTableRecord("54737a31-955d-4792-a7cb-fc630f8f8c6b"));
      // dispatch(createTableRecord(item));
    }, 3000);

  }, [dispatch])


  // Handle Alert Modal for deleting record
  const handleDelete = (id: string) => {
    setSelectedRecordId(id);
    setOpenAlertModal(true);
  }

  const handleAlertModal = (shouldDelete: boolean) => {
    setOpenAlertModal(false);

    if (shouldDelete){
      dispatch(deleteTableRecord(selectedRecordId));
      setSelectedRecordId(null);
      // console.log("selectedRecordId: ", selectedRecordId);
    } 
  } 

  // Handle Form Modal for editing record
  const handleEdit = (item: Item) => {
    setEditRecord(item); 
    setOpenFormModal(true);
  }

  const setEdit = (item: Item | null) => {
    setOpenFormModal(false);

    // dispatch() //edit item  
  }

  // Handle Form Modal for creating record
  const handleCreate = () => {
    setOpenFormModal(true);
  }

  const handleFormModal = (item: Item | NewItem | null) => {
    setOpenFormModal(false);
    setEditRecord(null);

    if (item){
      console.log("HANDLE FROM MODAL IIIFFF: ", item);

      dispatch(createTableRecord(item));

      // if (typeof item === "NewItem") {
      //   // dispatch(createTableRecord(item));
      //   // return;
      // }
      
    }   
  }


  return (
    <>
    {isFetching ? (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh', 
        }}
      >
        <CircularProgress size={100} />
      </Box>
    ):(

    <div>
      <div style={{marginTop: '1%', textAlign: 'right', paddingTop : 10, paddingRight: 30}}>
        <Button variant="contained" color='success' startIcon={<AddIcon />} onClick={handleCreate}>
          NEW
        </Button>
      </div>
      <Paper elevation={6} sx={{marginLeft: 3, marginRight: 3, marginTop: 1}}>
        
        <div>
        {/* <TableContainer sx={{overflow: 'initial'}}>
          <Table stickyHeader> */}
        <TableContainer>
          <Table >
            <TableHead >
              <TableRow key="head-row">
                {columns.map(column=>
                  <TableCell variant='head' align="center" key={column.id}>{column.name}</TableCell> 
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item: any) =>
                <TableRow key={item.id}>
                  {/* <TableCell variant="body" align="left">{item.id}</TableCell> */}
                  <TableCell variant="body" align="center">{item.employeeNumber}</TableCell>
                  <TableCell variant="body" align="center">{item.employeeSignatureName}</TableCell>
                  <TableCell variant="body" align="center">{format(new Date(item.employeeSigDate), 'MMMM dd, yyyy')}</TableCell>
                  <TableCell variant="body" align="center">{item.documentType}</TableCell>
                  <TableCell variant="body" align="center">{item.documentStatus}</TableCell>
                  <TableCell variant="body" align="center">{item.documentName}</TableCell>
                  <TableCell variant="body" align="center">{item.companySignatureName}</TableCell>
                  <TableCell variant="body" align="center">{format(new Date(item.companySigDate), 'MMMM dd, yyyy')}</TableCell>
                  <TableCell variant="body" align="center">
                    <Stack direction={{ xs: 'column', sm: 'row' }} >
                      <IconButton aria-label="edit" color="primary" onClick={() => {handleEdit(item)}} >
                        <EditIcon  fontSize="medium"/>
                      </IconButton>
                      <IconButton aria-label="delete" color="error" onClick={() => {handleDelete(item.id)}} >
                        <DeleteIcon  fontSize="medium" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}             
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </Paper>

      <AlertModal isOpen={openAlertModal} handleModal={handleAlertModal} />
      <FormModal isOpen={openFormModal} handleModal={handleFormModal} isEdit={editRecord}/>

      <ToastContainer />
      
      <div>{error}</div>
    </div>











    //   <Container 
    //   maxWidth= "xl"
    //   sx={{
    //         m: '0 auto',
    //         mt: 3,
    //         textAlign: 'center',
            
            
            
    //       }}
    // >
    //   <Paper elevation={5} sx={{ height: 400, width: '100%', p: 1 }} >
    //     <DataGrid
    //       rows={data}
    //       columns={columns}
    //       // initialState={{ pagination: { paginationModel } }}
    //       // pageSizeOptions={[5, 10]}
    //       // checkboxSelection
    //       sx={{ border: 0 }}
    //     />
    //   </Paper>
    // </Container>
    )}  
      
    </>  
  )
};

export default DataTable;
