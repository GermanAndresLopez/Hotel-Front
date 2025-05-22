import { Box, Container, Typography, Alert, LinearProgress} from '@mui/material';
import { useDashboard } from '../../hooks/useDashboard';
import { RoomTable } from './components/RoomTable';
import { RoomDialog } from './components/RoomDialog';
import { RoomForm } from './components/RoomForm';

const Dashboard = () => {
  const {
    editingRoom,
    handleClose,
    handleDelete,
    handleEditingRoom,
    handleOpen,
    handleSave,
    open,
    rooms,
    loading,
    error,
    setError,
  } = useDashboard();
  
  const handleAddImage = (imageUrl) => {
    if (imageUrl &&
      !editingRoom.imagen.some(img => img === imageUrl || img.preview === imageUrl) &&
      (imageUrl.startsWith('http') || imageUrl.startsWith('data:image'))
    ) {
      handleEditingRoom({
        ...editingRoom,
        imagen: [...editingRoom.imagen, imageUrl]
      });
    } else if (imageUrl) {
      console.error('La URL de la imagen no es válida');
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...editingRoom.imagen];
    if (newImages[index]?.preview) {
      URL.revokeObjectURL(newImages[index].preview);
    }
    newImages.splice(index, 1);
    handleEditingRoom({ ...editingRoom, imagen: newImages });
  };

  const handleAddFeature = (feature) => {
    if (feature && !editingRoom.caracteristicas.includes(feature)) {
      handleEditingRoom({
        ...editingRoom,
        caracteristicas: [...editingRoom.caracteristicas, feature]
      });
    }
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = [...editingRoom.caracteristicas];
    newFeatures.splice(index, 1);
    handleEditingRoom({ ...editingRoom, caracteristicas: newFeatures });
  };

  return (
    <Box sx={{ marginTop: 12, marginBottom: 5 }}>
      <Typography
        variant="h1"
        color="secondary"
        component="div"
        sx={{
          textAlign: 'center',
          fontSize: 50,
          fontFamily: 'monospace',
          fontWeight: 700,
          textDecoration: 'none',
          marginBottom: 10,
        }}
      >
        Panel de administración
      </Typography>

      <Container sx={{ mt: 4 }}>
        <RoomTable
          rooms={rooms}
          handleOpen={handleOpen}
          handleDelete={handleDelete}
        />

        <RoomDialog
          open={open}
          handleClose={handleClose}
          handleSave={handleSave}
          editingRoom={editingRoom}
        >
          <RoomForm
            editingRoom={editingRoom}
            handleEditingRoom={handleEditingRoom}
            handleAddImage={handleAddImage}
            handleRemoveImage={handleRemoveImage}
            handleAddFeature={handleAddFeature}
            handleRemoveFeature={handleRemoveFeature}
          />
        </RoomDialog>
      </Container>
      {error && (
        <Container sx={{ mt: 2 }}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Container>
      )}

      {loading && (
        <Container sx={{ mt: 2 }}>
          <LinearProgress />
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 1 }}>
            Procesando...
          </Typography>
        </Container>
      )}
    </Box>
  );
};

export default Dashboard;
