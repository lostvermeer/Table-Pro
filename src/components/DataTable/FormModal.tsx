import React, { useEffect, useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, OutlinedInput, Radio, Checkbox, RadioGroup, Select, Stack, TextField, Box, Grid } from "@mui/material";
import { LocalizationProvider, DateTimePicker, PickerChangeHandlerContext, DateTimeValidationError} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Item, NewItem } from '../../Types/types';

import { useAppDispatch, useAppSelector } from "../../ReduxStore/hooks";
import { getAllRecords, createTableRecord, deleteTableRecord, selectRecordId, setNewRecord, updateTableRecord} from './actionCreator';


interface ModalProps {
  isOpen: boolean;
  handleModal: (isSubmited: boolean) => void;
  createOrEdit: "create" | "edit" | null;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FormModal: React.FC<ModalProps> = ({ isOpen, handleModal, createOrEdit }) => {

  const dispatch = useAppDispatch();
  const selectedRecord = useAppSelector(state => state.table.selectedRecord);
  const newRecord = useAppSelector(state => state.table.newRecord);

  const [employeeDate, setEmployeeDate] = useState<Dayjs | null>(dayjs(Date()));
  const [companyDate, setCompanyDate] = useState<Dayjs | null>(dayjs(Date()));
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Item | NewItem>({
    companySigDate: '',
    companySignatureName: '',
    documentName: '',
    documentStatus: '',
    documentType: '',
    employeeNumber: '',
    employeeSigDate: '',
    employeeSignatureName: '',
  }); 


    useEffect(()=>{

      if (createOrEdit === "edit" && selectedRecord) {
        
        setForm({ ...selectedRecord });
        setEmployeeDate(dayjs(selectedRecord.employeeSigDate));
        setCompanyDate(dayjs(selectedRecord.companySigDate));

      } else if (createOrEdit === "create") {
        setForm({
          companySigDate: "",
          companySignatureName: "",
          documentName: "",
          documentStatus: "",
          documentType: "",
          employeeNumber: "",
          employeeSigDate: "",
          employeeSignatureName: "",
        });
        setEmployeeDate(dayjs());
        setCompanyDate(dayjs());
      }
      
    }, [createOrEdit, selectedRecord]);



    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setForm({ ...form, [name]: value });
    };

    const handleDateChange = (name: string, newValue: Dayjs | null) => {
      if (newValue) {
        const formattedDate = newValue.toISOString();
        setForm({ ...form, [name]: formattedDate });
      }
      console.log("typeof: emp: ", typeof form.employeeSigDate);
      console.log("typeof: comp: ", typeof form.companySigDate);
      console.log("emp: ",form.employeeSigDate);
      console.log("comp: ",form.companySigDate);
      
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      if (createOrEdit === "edit") {

        dispatch(updateTableRecord(form));

      } 
      else if (createOrEdit === "create") {

        dispatch(createTableRecord(form));
        // dispatch(setNewRecord(null));

      }
  
      handleModal(true);
  
      setForm({
        companySigDate: "",
        companySignatureName: "",
        documentName: "",
        documentStatus: "",
        documentType: "",
        employeeNumber: "",
        employeeSigDate: "",
        employeeSignatureName: "",
      });
    };


    const handleClose = () => {
        handleModal(null)
    };

    // const handleChange = (event: { target: any; preventDefault: () => void; }) => {
    //   event.preventDefault();
    //   console.log('=================> ', event.target.value);
    //   // const value = event.target.value.toString(); // Check if http request successful with this
    //   let value = "";
    //   if (event.target.name == 'employeeSigDate' || event.target.name == 'companySigDate') {
    //     value = new Date(event.target.value.toString()).toISOString();
    //     console.log("hlooooooooooooooooooooooo");
        
    //   } else {
    //     value = event.target.value.toString();
    //     console.log("gggggggggggggggggggggggg: ", typeof value);
        
    //   }

    //   console.log('===> ', typeof [event.target.value]);
    //   console.log('===> ', [event.target.value]);
    //   console.log('===> ', value);
    //   console.log('===> ', typeof value);
    
    //   setForm({
    //     ...form,
    //     [event.target.name]: value
    //   });

    //   console.log("form: ",form);
      
    // };

    // const handleSubmit = (event: { preventDefault: () => void; }) => {
    //   event.preventDefault();
    //     // const employeeSigDate = new Date(data.employeeSigDate);
    //     //     data.employeeSigDate = employeeSigDate.toISOString();
    //     //     const companySigDate = new Date(data.companySigDate);
    //     //     data.companySigDate = companySigDate.toISOString();
    //     // console.log("formJson: ", data.documentStatus);/
    //     // console.log("formJson: ", data);

    //     handleModal(true);

    //     setForm({
    //       companySigDate: '',
    //       companySignatureName: '',
    //       documentName: '',
    //       documentStatus: '',
    //       documentType: '',
    //       employeeNumber: '',
    //       employeeSigDate: '',
    //       employeeSignatureName: '',
    //     });
    // };



    

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Labor Contract</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you want to create new contract, please fill in all the information below.
          </DialogContentText>
          <Stack spacing={2} margin={1}>

            <TextField
              // required
              value={form.employeeNumber}
              id="employeeNumber"
              name="employeeNumber"
              label="Employee Number"
              type="number"
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              // required
              value={form.documentName}
              id="documentName"
              name="documentName"
              label="Document Name"
              type="text"
              variant="standard"
              onChange={handleChange}
            />

            <TextField
              // required
              id="documentType"
              name="documentType"
              value={form.documentType}
              onChange={handleChange}
              label="Document Type"
              type="text"
              variant="standard"
            />

            <TextField
              // required
              value={form.documentStatus}
              id="documentStatus"
              name="documentStatus"
              label="Document Status"
              type="text"
              variant="standard"
              onChange={handleChange}
            />

            <TextField
              // required
              id="employeeSignatureName"
              name="employeeSignatureName"
              value={form.employeeSignatureName}
              label="Employee Signature Name"
              type="text"
              variant="standard"
              onChange={handleChange}
            />

            <TextField
              // required
              id="companySignatureName"
              name="companySignatureName"
              value={form.companySignatureName}
              label="Company Signature Name"
              type="text"
              variant="standard"
              onChange={handleChange}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Company Signing Date"
                value={companyDate}
                onChange={(newValue) => handleDateChange("companySigDate", newValue)}
              />
              <DateTimePicker
                label="Employee Signing Date"
                value={employeeDate}
                onChange={(newValue) => handleDateChange("employeeSigDate", newValue)}
              />
            </LocalizationProvider>



          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form> 
    </Dialog>
  )
};

export default FormModal;



// <Dialog
//       open={isOpen}
//       onClose={handleClose}
//       fullWidth
//     >
//       <form onSubmit={handleSubmit}>
//         <DialogTitle>Labor Contract</DialogTitle>
//         <DialogContent>
        
//           <DialogContentText>
//             If you want to create new contract, please fill in all the information below.
//           </DialogContentText>
//           {/* <Box sx={{ width: 400 }}> */}
//           <Stack spacing={2} margin={1}>
//           {/* <Stack
//             spacing={{ xs: 5, sm: 7 }}
//             // direction="row"
//             sx={{
//               justifyContent: "space-evenly",
//               alignItems: "center",
//             }}
//             // sx={{ flexWrap: 'wrap' }}
//           > */}

//                         {/* <TextField
//                           // required
//                           {...controlProps('employeeNumber', 'Employee Number', 'number', 'standard')}
//                         /> */}

//             <TextField
//               // required
//               value={form.employeeNumber}
//               id="employeeNumber"
//               name="employeeNumber"
//               label="Employee Number"
//               type="number"
//               variant="standard"
//               onChange={handleChange}
//             />
//             <TextField
//               // required
//               value={form.documentName}
//               id="documentName"
//               name="documentName"
//               label="Document Name"
//               type="text"
//               variant="standard"
//               onChange={handleChange}
//             />

//             <FormControl variant="standard" sx={{ m: 1, minWidth: 30 }}>
//               <InputLabel id="docTypeFormLabel">Document Type</InputLabel>
//               <Select
//                 labelId="docTypeFormLabel"
//                 id="documentType"
//                 name="documentType"
//                 value={form.documentType}
//                 onChange={handleChange}
//                 label="Document Type"
//               >
//               <MenuItem value='Labor Contaract'>Labor Contaract</MenuItem>
//               <MenuItem value='Student Contract'>Student Contract</MenuItem>
//               </Select>
//             </FormControl>

//             <FormControl>
//               <FormLabel id="docStatusFormLabel">Document Status</FormLabel>
//               <RadioGroup value={form.documentStatus} onChange={handleChange} row>
//                 <FormControlLabel name="documentStatus" value='Signed' label ='Signed' control={<Radio />} />
//                 <FormControlLabel name="documentStatus" value='Unsigned' label ='Unsigned' control={<Radio />} />
//               </RadioGroup>
//             </FormControl>

//             {/* <TextField
//               // required
//               value={form.employeeSignatureName}
//               id="employeeSignatureName"
//               name="employeeSignatureName"
//               label="Employee Signature Name"
//               type="file"
//               variant="standard"
//               onChange={handleChange}
//               slotProps={{
//                   inputLabel: {
//                     shrink: true,
//                   },
//               }}
//             />
//             <TextField
//               // required
//               value={form.companySignatureName}
//               id="companySignatureName"
//               name="companySignatureName"
//               label="Company Signature Name"
//               type="file"
//               variant="standard"
//               onChange={handleChange}
//               slotProps={{
//                   inputLabel: {
//                     shrink: true,
//                   },
//               }}
//             /> */}
            
//             {/* <Box sx={{ flexGrow: 1, width: 270 }} rowGap={2}> */}
              
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DemoContainer components={['DateTimePicker1', 'DateTimePicker2']} >
//                     <DateTimePicker
//                       label="Company Signing Date"
//                       value={companyDate}
//                       onChange={(newValue)=>setCompanyDate(newValue)}
//                     />
//                     <DateTimePicker
//                       label="Employee Signing Date"
//                       value={employeeDate}
//                       onChange={(newValue)=>setEmployeeDate(newValue)}
//                     />
//                   </DemoContainer>
//                 </LocalizationProvider>
              
//             {/* </Box> */}

//             {/* <Box sx={{ flexGrow: 1, width: 270 }} rowGap={2}> */}
//             <Button
//                 component="label"
//                 role={undefined}
//                 variant="contained"
//                 tabIndex={-1}
//                 startIcon={<CloudUploadIcon />}
//               >
//                 Employee Signature Name
//                 <VisuallyHiddenInput
//                   id="employeeSignatureName"
//                   name="employeeSignatureName"
//                   type="file"
//                   value={form.employeeSignatureName}
//                   onChange={handleChange}
//                   // multiple
//                 />
//               </Button>
//               <Button
//                 component="label"
//                 role={undefined}
//                 variant="contained"
//                 tabIndex={-1}
                
//                 startIcon={<CloudUploadIcon />}
//               >
//                 Company Signature Name
//                 <VisuallyHiddenInput
//                   id="companySignatureName"
//                   name="companySignatureName"
//                   type="file"
//                   value={form.companySignatureName}
//                   onChange={handleChange}
//                   // multiple
//                 />
//               </Button>
//             {/* </Box>   */}

//           </Stack>
//           {/* </Box> */}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button type="submit">Submit</Button>
//         </DialogActions>
//       </form> 
//     </Dialog>
