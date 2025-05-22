import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@mui/material';

export const RoomDialog = ({
    open,
    handleClose,
    handleSave,
    editingRoom,
    children
}) => {
    const isEditing = editingRoom?.identificador &&
        editingRoom.identificador !== '' &&
        !editingRoom.identificador.includes('tmp-');

    const isFormValid = () => {
        return editingRoom?.nombre?.trim() && 
         editingRoom?.precio > 0;
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>
                {isEditing ? 'Editar Habitación' : 'Nueva Habitación'}
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    disabled={!isFormValid()}
                >
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};