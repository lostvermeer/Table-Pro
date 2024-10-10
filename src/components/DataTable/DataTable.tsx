import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import DeleteIcon  from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/AddCircle';
import { Box, Button, CircularProgress, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from "@mui/material";
import AlertModal from './AlertModal'
import FormModal from './FormModal'
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from "../../ReduxStore/hooks";
import { getAllRecords, deleteTableRecord, selectRecordId } from './actionCreator';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
  { id: 'employeeNumber', name: 'Employee Number'},
  { id: 'employeeSignatureName', name: 'Employee Signature Name'},
  { id: 'employeeSigDate', name: 'Employee Signing Date'},
  { id: 'documentType', name: 'Document Type'},
  { id: 'documentStatus', name: 'Document Satatus'},
  { id: 'documentName', name: 'Document Name'},
  { id: 'companySignatureName', name: 'Company Signature Name'},
  { id: 'companySigDate', name: 'Company Signing Date'},
  { id: 'action', name: 'Action Center'}
];


const DataTable = () => {

  
  const navigate = useNavigate();
  
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.table.records);
  const isFetching = useAppSelector(state => state.table.isFetching);
  const selectedRecord = useAppSelector(state => state.table.selectedRecord);
  const error = useAppSelector(state => state.table.error);

  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [createOrEdit, setCreateOrEdit] = useState<"create" | "edit" | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    } else {
      dispatch(getAllRecords()); 
    }

  }, [dispatch])


  // Handle Alert Modal for deleting record
  const handleDelete = (id: string) => {
    dispatch(selectRecordId(id));
    setOpenAlertModal(true);
  }

  const handleAlertModal = (shouldDelete: boolean) => {
    setOpenAlertModal(false);

    if (shouldDelete && selectedRecord.id){
      dispatch(deleteTableRecord(selectedRecord.id));
      dispatch(selectRecordId(null));
    } 
  } 

  // Handle edit and create record for Form Modal
  const handleEdit = (id: string) => {
    dispatch(selectRecordId(id));
    setCreateOrEdit('edit');
    setOpenFormModal(true);
  }

  const handleCreate = () => {
    setCreateOrEdit('create');
    setOpenFormModal(true);
  }

  const handleFormModal = () => {
    setOpenFormModal(false);
    setCreateOrEdit(null);
    dispatch(selectRecordId(null));
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
        <Paper elevation={6} 
          sx={{
            maxWidth: '1500px', 
            // maxHeight: '500px', 
            margin: '20px auto', 
          }}>
          <Box sx= {{marginTop: '1%', textAlign: 'right', paddingTop : 2, paddingRight: 3}}>
            <Button variant="contained" color='success' startIcon={<AddIcon />} onClick={handleCreate}>
              NEW
            </Button>
          </Box>
          
          <div>
          {/* <TableContainer sx={{overflow: 'initial'}}>
            <Table stickyHeader> */}
          <TableContainer>
            <Table >
              <TableHead >
                <TableRow key="head-row">
                  {columns.map(column=>
                    <TableCell sx={{ fontWeight: 'bold' }} align="center" key={column.id}>{column.name}</TableCell> 
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {(items || []).length > 0 ? (
                  items.map((item: any) =>
                    <TableRow key={item.id}>
                      <TableCell variant="body" align="center">{item.employeeNumber}</TableCell>
                      <TableCell variant="body" align="center">{item.employeeSignatureName}</TableCell>
                      <TableCell variant="body" align="center">{format(new Date(item.employeeSigDate), 'MMMM dd, yyyy')}</TableCell>
                      <TableCell variant="body" align="center">{item.documentType}</TableCell>
                      <TableCell variant="body" align="center">{item.documentStatus}</TableCell>
                      <TableCell variant="body" align="center">{item.documentName}</TableCell>
                      <TableCell variant="body" align="center">{item.companySignatureName}</TableCell>
                      <TableCell variant="body" align="center">{format(new Date(item.companySigDate), 'MMMM dd, yyyy')}</TableCell>
                      <TableCell variant="body" align="left">
                        <Stack direction={{ xs: 'column', sm: 'row' }} >
                          <IconButton aria-label="edit" color="primary" onClick={() => {handleEdit(item.id)}} >
                            <EditIcon  fontSize="medium"/>
                          </IconButton>
                          <IconButton aria-label="delete" color="error" onClick={() => {handleDelete(item.id)}} >
                            <DeleteIcon  fontSize="medium" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      No records found.
                    </TableCell>
                  </TableRow>
                )}        

              </TableBody>
            </Table>
          </TableContainer>
          </div>
        </Paper>

        <AlertModal isOpen={openAlertModal} handleModal={handleAlertModal} />
        <FormModal isOpen={openFormModal} handleModal={handleFormModal} createOrEdit={createOrEdit}/>
        <ToastContainer />

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




// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import CardActionArea from '@mui/material/CardActionArea';
// error ? (
//
//   <Box
//     sx={{
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       width: '100vw', 
//       height: '90vh'
//     }}
//   >
//     <Card sx={{ maxWidth: 345, transform: 'scale(3)', transformOrigin: 'center' }}>
//       <CardActionArea>
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             {error}
//           </Typography>
//           <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//             Please refresh the page
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   </Box>

// ) : (