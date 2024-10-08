// import React from 'react';
// import { useAppDispatch, useAppSelector } from "../../Reduser/hooks";
// import { increment, decrement } from '../../Reduser/reducer';

// const DataTable = () => {
//   const dispatch = useAppDispatch();
//   const value = useAppSelector(state => state.value);

// const dispatch = useDispatch();
// const isFetching = useSelector(selectIsFetching);
// const error = useSelector(selectError);
// const items = useSelector(selectTableItems);

//   return (
//     <div>
//       <h1>Value1: {value}</h1>
//       <button type="button" onClick={() => dispatch(increment())}>Click</button>
//       <h1>Value2: {value}</h1>
//       <button type="button" onClick={() => dispatch(decrement())}>Click</button>

//     </div>
//   );
// };

// export default DataTable;

import React, { useEffect, useState } from "react"
import { getDataPage } from "./apiService";
import DeleteIcon  from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/AddCircle';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, CircularProgress, Container, Grid2, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from "@mui/material";
import { store } from './data'
import AlertModal from './AlertModal'
import FormModal from './FormModal'


import { useAppDispatch, useAppSelector } from "../../ReduxStore/hooks";
import { getAllItemsAsync } from '../../ReduxStore/tableSlice';


interface Item {
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
  const items = useAppSelector(state => state.table.items);
  const isFetching = useAppSelector(state => state.table.isFetching);
  const error = useAppSelector(state => state.table.error);


  const [data, setData] = useState<Array<Item>>([]);
  const [loading, setLoading] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  useEffect(() => {
   
    // const fetchData = async () => {
    //   setLoading(true);

    //   try {
    //     const responce = await getDataPage(); 
    //     setData(responce.data)
    //   }
    //   catch (error) {
    //     console.log("CATCH====> ",error);
    //   }
    //   finally {
    //     setLoading(false);
    //   }
    // }; 

    // fetchData();

    dispatch(getAllItemsAsync());

  }, [])
  
  console.log("data: ",data);

  // Handle Alert Modal for deleting record
  const handleDelete = (id: string) => {
    setSelectedRecordId(id);
    setOpenAlertModal(true);
  }

  const handleAlertModal = (shouldDelete: boolean) => {
    setOpenAlertModal(false);

    if (shouldDelete){

      console.log("selectedRecordId: ", selectedRecordId);
    } 
  } 

  // Handle Form Modal for editing record
  const handleEdit = (id: string) => {
    setSelectedRecordId(id);
    setOpenFormModal(true);
  }

  const handleFormModal = (shouldDelete: boolean) => {
    setOpenFormModal(false);

    if (shouldDelete){
      console.log("shouldDelete: ", shouldDelete);
      
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
      <Paper sx={{margin: '1%'}}>
        <div style={{margin: '1%', textAlign: 'right', paddingTop : 10}}>
          <Button variant="contained" color='success' startIcon={<AddIcon />}>
            NEW
          </Button>
        </div>
        <div>
        {/* <TableContainer sx={{overflow: 'initial'}}>
          <Table stickyHeader> */}
        <TableContainer>
          <Table>
            <TableHead >
              <TableRow style={{backgroundColor: 'midnightblue'}}>
                {columns.map(column=>
                  <TableCell variant="head" align="left" key={column.id}>{column.name}</TableCell> 
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item =>
                <TableRow key={item.id}>
                  <TableCell variant="body" align="left">{item.employeeNumber}</TableCell>
                  <TableCell variant="body" align="left">{item.employeeSignatureName}</TableCell>
                  <TableCell variant="body" align="left">{item.employeeSigDate}</TableCell>
                  <TableCell variant="body" align="left">{item.documentType}</TableCell>
                  <TableCell variant="body" align="left">{item.documentStatus}</TableCell>
                  <TableCell variant="body" align="left">{item.documentName}</TableCell>
                  <TableCell variant="body" align="left">{item.companySignatureName}</TableCell>
                  <TableCell variant="body" align="left">{item.companySigDate}</TableCell>
                  <TableCell >
                    <Stack direction={{ xs: 'column', sm: 'row' }} >
                      <IconButton aria-label="edit" color="primary" onClick={e => {handleEdit(item.id)}} >
                        <EditIcon  fontSize="medium"/>
                      </IconButton>
                      <IconButton aria-label="delete" color="error" onClick={e => {handleDelete(item.id)}} >
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
      <FormModal isOpen={openFormModal} handleModal={handleFormModal}/>

      <div>{items.map(item => <div>{item.documentName}</div>)}</div>
      <div>{isFetching}</div>
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
