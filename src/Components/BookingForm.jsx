import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { Fragment, useContext } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { reservaContext } from "../Pages/Booking";

export default function BookingForm() {
  // Manejamos los estados de las reservas
  const { reservas, setReservas } = useContext(reservaContext);

  // Para capturar la informacion del usuario
  const handleOnChange = (evento) => {
    setReservas({ ...reservas, [evento.target.name]: evento.target.value });
  };

  return (
    <Fragment>
      <Container>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          Datos De Reserva
        </Typography>
        <Grid container spacing={3}>
          {/*- - Fecha de ingreso - -*/}
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "DatePicker",
                  "MobileDatePicker",
                  "DesktopDatePicker",
                  "StaticDatePicker",
                ]}
              >
                <DemoItem>
                  <DatePicker
                    label="Fecha De Vencimiento"
                    name="fechaVencimiento"
                    defaultValue={dayjs("2023-09-17")}
                    onChange={(newDate) =>
                      setReservas({
                        ...reservas,
                        fechaIngreso: newDate.toDate(),
                      })
                    }
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          {/*- - Fecha de salida - -*/}
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "DatePicker",
                  "MobileDatePicker",
                  "DesktopDatePicker",
                  "StaticDatePicker",
                ]}
              >
                <DemoItem>
                  <DatePicker
                    label="Fecha De Vencimiento"
                    name="fechaVencimiento"
                    defaultValue={dayjs("2023-09-17")}
                    onChange={(newDate) =>
                      setReservas({
                        ...reservas,
                        fechaSalida: newDate.toDate(),
                      })
                    }
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          {/*- - Habitacion - -*/}
          <Grid item xs={12} sm={4}>
            <TextField
              disabled
              fullWidth
              id="outlined-disabled"
              label="Habitacion"
              defaultValue={reservas.habitacion}
              sx={{ mt: 1 }}
            />
          </Grid>

          {/*- - Cantidad de adultos - -*/}
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              variant="standard"
              sx={{ m: 1, minWidth: 200 }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Adultos
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                name="adultos"
                value={reservas.adultos}
                fullWidth
                onChange={handleOnChange}
                label="Adultos"
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/*- - Cantidad de niños - -*/}
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              variant="standard"
              sx={{ m: 1, minWidth: 200 }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Niños
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                name="niños"
                fullWidth
                value={reservas.niños}
                onChange={handleOnChange}
                label="Niños"
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
