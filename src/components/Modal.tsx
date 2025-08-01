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

/**
 * A controlled modal component without a trigger.
 *
 * __Required__
 * @param children - The content to display in the modal.
 * @param onClose - The function to call when the modal is closed.
 * @param open - Whether the modal is open.
 *
 * __Optional__
 * @param {MuiModalProps} props - The props to pass to the MuiModal component.
 *
 * @returns The modal component that will only be rendered when open is true.
 */
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
