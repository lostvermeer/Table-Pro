import React from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';

interface ModalProps {
  isOpen: boolean;
  handleModal: (shouldDelete: boolean) => void;
}


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


const AlertModal: React.FC<ModalProps>  = ({isOpen, handleModal}) => {

  const handleClose = (isRemoved: boolean) => {
      handleModal(isRemoved);
  }

  return (
    <>
    <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you want to delete this record?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If you delete this record, you will never get it back.<br/>
            All the records are deleted permanently.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(true)}>Delete</Button>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default AlertModal;
