import React, { useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, OutlinedInput, Radio, Checkbox, RadioGroup, Select, Stack, TextField, Box, Grid } from "@mui/material";
import { LocalizationProvider, DateTimePicker, PickerChangeHandlerContext, DateTimeValidationError} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';


interface ModalProps {
    isOpen: boolean;
    handleModal: (shouldDelete: boolean) => void;
}

interface FormProps {
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName : string;
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

const FormModal: React.FC<ModalProps> = ({ isOpen, handleModal }) => {

  const [employeeDate, setEmployeeDate] = useState<Dayjs | null>(dayjs(Date()));
  const [companyDate, setCompanyDate] = useState<Dayjs | null>(dayjs(Date()));
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
      companySigDate: '',
      companySignatureName: '',
      documentName: '',
      documentStatus: '',
      documentType: '',
      employeeNumber: '',
      employeeSigDate: '',
      employeeSignatureName: '',
    }); 

    // const controlProps = (name: string, label: string, type: string, variant: string ) => ({
    //   value: form[name as keyof typeof form],
    //   id: name,
    //   name: name,
    //   label: label,
    //   type: type,
    //   variant: variant,
    //   onChange: handleChange,
    // });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (data: object) => {
        handleModal(false)
        setOpen(false);
    };

    const handleChange = (event: { target: any; preventDefault: () => void; }) => {
      event.preventDefault();
      console.log('=================> ', event.target.value);
      // const value = event.target.value.toString(); // Check if http request successful with this
      let value: string;
      if (event.target.name == 'employeeSigDate' || event.target.name == 'companySigDate') {
        value = new Date(event.target.value.toString()).toISOString();
        console.log("hlooooooooooooooooooooooo");
        
      } else {
        value = event.target.value.toString();
        console.log("gggggggggggggggggggggggg");
        
      }

      // console.log('===> ', typeof [event.target.value]);
      // console.log('===> ', [event.target.value]);
      console.log('===> ', value);
      console.log('===> ', typeof value);
    
      setForm({
        ...form,
        [event.target.name]: value
      });

      console.log("form: ",form);
      
  };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
        // const employeeSigDate = new Date(data.employeeSigDate);
        //     data.employeeSigDate = employeeSigDate.toISOString();
        //     const companySigDate = new Date(data.companySigDate);
        //     data.companySigDate = companySigDate.toISOString();
        // console.log("formJson: ", data.documentStatus);/
        // console.log("formJson: ", data);

        console.log("companyDate: ", companyDate?.toISOString());
        const temp = companyDate?.toISOString();
        temp?.toString()
        console.log("companyDate: ", typeof temp);
        console.log("companyDate2: ", temp);
        
        console.log("formJson: ", form);
    };




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
          {/* <Box sx={{ width: 400 }}> */}
          <Stack spacing={2} margin={1}>
          {/* <Stack
            spacing={{ xs: 5, sm: 7 }}
            // direction="row"
            sx={{
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
            // sx={{ flexWrap: 'wrap' }}
          > */}

                        {/* <TextField
                          // required
                          {...controlProps('employeeNumber', 'Employee Number', 'number', 'standard')}
                        /> */}

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

            <FormControl variant="standard" sx={{ m: 1, minWidth: 30 }}>
              <InputLabel id="docTypeFormLabel">Document Type</InputLabel>
              <Select
                labelId="docTypeFormLabel"
                id="documentType"
                name="documentType"
                value={form.documentType}
                onChange={handleChange}
                label="Document Type"
              >
              <MenuItem value='Labor Contaract'>Labor Contaract</MenuItem>
              <MenuItem value='Student Contract'>Student Contract</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel id="docStatusFormLabel">Document Status</FormLabel>
              <RadioGroup value={form.documentStatus} onChange={handleChange} row>
                <FormControlLabel name="documentStatus" value='Signed' label ='Signed' control={<Radio />} />
                <FormControlLabel name="documentStatus" value='Unsigned' label ='Unsigned' control={<Radio />} />
              </RadioGroup>
            </FormControl>

            {/* <TextField
              // required
              value={form.employeeSignatureName}
              id="employeeSignatureName"
              name="employeeSignatureName"
              label="Employee Signature Name"
              type="file"
              variant="standard"
              onChange={handleChange}
              slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
              }}
            />
            <TextField
              // required
              value={form.companySignatureName}
              id="companySignatureName"
              name="companySignatureName"
              label="Company Signature Name"
              type="file"
              variant="standard"
              onChange={handleChange}
              slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
              }}
            /> */}
            
            {/* <Box sx={{ flexGrow: 1, width: 270 }} rowGap={2}> */}
              
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker1', 'DateTimePicker2']} >
                    <DateTimePicker
                      label="Company Signing Date"
                      value={companyDate}
                      onChange={(newValue)=>setCompanyDate(newValue)}
                    />
                    <DateTimePicker
                      label="Employee Signing Date"
                      value={employeeDate}
                      onChange={(newValue)=>setEmployeeDate(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              
            {/* </Box> */}

            {/* <Box sx={{ flexGrow: 1, width: 270 }} rowGap={2}> */}
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Employee Signature Name
                <VisuallyHiddenInput
                  id="employeeSignatureName"
                  name="employeeSignatureName"
                  type="file"
                  value={form.employeeSignatureName}
                  onChange={handleChange}
                  // multiple
                />
              </Button>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                
                startIcon={<CloudUploadIcon />}
              >
                Company Signature Name
                <VisuallyHiddenInput
                  id="companySignatureName"
                  name="companySignatureName"
                  type="file"
                  value={form.companySignatureName}
                  onChange={handleChange}
                  // multiple
                />
              </Button>
            {/* </Box>   */}

          </Stack>
          {/* </Box> */}
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
