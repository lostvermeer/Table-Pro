import React, { useEffect, useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { TableRecord, NewTableRecord } from '../../Types/types';
import { useAppDispatch, useAppSelector } from "../../ReduxStore/hooks";
import { createTableRecord, updateTableRecord } from './actionCreator';


interface ModalProps {
  isOpen: boolean;
  handleModal: () => void;
  createOrEdit: "create" | "edit" | null;
}

const FormModal: React.FC<ModalProps> = ({ isOpen, handleModal, createOrEdit }) => {

  const dispatch = useAppDispatch();
  const selectedRecord = useAppSelector(state => state.table.selectedRecord);

  const [employeeDate, setEmployeeDate] = useState<Dayjs | null>(dayjs(Date()));
  const [companyDate, setCompanyDate] = useState<Dayjs | null>(dayjs(Date()));
  const [form, setForm] = useState<TableRecord | NewTableRecord>({
    companySigDate: '',
    companySignatureName: '',
    documentName: '',
    documentStatus: '',
    documentType: '',
    employeeNumber: '',
    employeeSigDate: '',
    employeeSignatureName: '',
  });


  useEffect(() => {

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

  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (createOrEdit === "edit") {
      dispatch(updateTableRecord(form));
    }
    else if (createOrEdit === "create") {
      dispatch(createTableRecord(form));
    }

    handleModal();

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
    handleModal()
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
          <Stack spacing={2} margin={1}>

            <TextField
              required
              value={form.employeeNumber}
              // error={form.employeeNumber.length == 0}
              id="employeeNumber"
              name="employeeNumber"
              label="Employee Number"
              type="number"
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              required
              value={form.documentName}
              id="documentName"
              name="documentName"
              label="Document Name"
              type="text"
              variant="standard"
              onChange={handleChange}
            />

            <TextField
              required
              id="documentType"
              name="documentType"
              value={form.documentType}
              onChange={handleChange}
              label="Document Type"
              type="text"
              variant="standard"
            />

            <TextField
              required
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




// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });
//
//
{/* <Dialog
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
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button type="submit">Submit</Button>
    </DialogActions>
  </form> 
</Dialog> */}
