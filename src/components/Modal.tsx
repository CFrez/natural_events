import { Close as CloseIcon } from '@mui/icons-material'
import {
    Box,
    IconButton,
    Modal as MuiModal,
    type ModalProps as MuiModalProps,
} from '@mui/material'

interface ModalProps extends MuiModalProps {
    onClose: () => void
    open: boolean
}
const modalStyle = {
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    left: '50%',
    overflow: 'auto',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'clamp(400px, 50%, 800px)',
}

export const Modal = ({ children, onClose, open, ...props }: ModalProps) => {
    return (
        <MuiModal onClose={onClose} open={open} {...props}>
            <Box sx={modalStyle}>
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 10, top: 10, zIndex: 1 }}
                >
                    <CloseIcon />
                </IconButton>
                {children}
            </Box>
        </MuiModal>
    )
}
