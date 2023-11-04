import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Container,
  TextareaAutosize,
  Grid,
  MenuItem,
} from '@mui/material';
import moment from 'moment';

const ConfirmationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    pax: '',
    whatsapp: '',
    email: '',
    busDepartDate: '',
    busDepart: 'DQ',
    busReturnDate: '',
    busReturn: 'A Toan',
    onTourDate: '',
    note: '',
  });
  console.log(formData);
  const generateConfirmationText = () => {
    const busDepartDateFormat = moment(formData.busDepartDate).format(
      'DD/MM/YYYY'
    );
    const busReturnDateFormat = moment(formData.busReturnDate).format(
      'DD/MM/YY'
    );

    const confirmationText = `❤️❤️ Xác nhận Epic Tour 3D3N
Tên khách: ${formData.name}
Số lượng: ${formData.pax} pax
Whatsapp: ${formData.whatsapp}
Email: ${formData.email}
---------------------------------
Bus lên: ${busDepartDateFormat} + ${formData.busDepart}
On tour: ${formData.onTourDate}
Bus về: ${busReturnDateFormat} + ${formData.busReturn}
-----------------------------
🌸Note: ${formData.note}`;

    return confirmationText;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === 'busDepartDate') {
      // If busDepartDate changes, calculate the next and end days of the tour
      const busDepartDate = new Date(value);
      if (!isNaN(busDepartDate)) {
        const nextDay = new Date(busDepartDate);
        const endDay = new Date(busDepartDate);

        nextDay.setDate(busDepartDate.getDate() + 1);
        endDay.setDate(busDepartDate.getDate() + 3);

        updatedFormData = {
          ...updatedFormData,
          onTourDate: `${moment(nextDay.toLocaleDateString()).format(
            'DD/MM/YY'
          )} - ${moment(endDay.toLocaleDateString()).format('DD/MM/YY')}`,
          busReturnDate: endDay.toLocaleDateString(),
        };
      }
    }

    setFormData(updatedFormData);
  };

  const confirmationText = generateConfirmationText();

  return (
    <Container>
      <Typography variant="h5" align="center">
        Epic Tour Confirmation Form
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <form>
            <div style={{ marginBottom: 16 }}>
              <label>Tên khách</label>
              <TextField
                name="name"
                fullWidth
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Số lượng (pax)</label>
              <TextField
                name="pax"
                fullWidth
                value={formData.pax}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Whatsapp</label>
              <TextField
                name="whatsapp"
                fullWidth
                value={formData.whatsapp}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Email</label>
              <TextField
                name="email"
                fullWidth
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <div style={{ marginBottom: 16 }}>
                  <label>Bus</label>
                  <TextField
                    select
                    name="busDepart"
                    fullWidth
                    defaultValue="DQ"
                    value={formData.busDepart}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="DQ">
                      Hanoi,DQ 20:00 Sleeper Bus, Cheers Hostel *(20:00 - 3:30)
                    </MenuItem>
                    <MenuItem value="A Toan 6AM">
                      Hanoi, A.Toàn 6:00 Limousine, Cheers Hostel(6:00 - 12:30)
                    </MenuItem>
                    <MenuItem value="DQ Airport 22PM">
                      Hanoi, Airport - DQ 22:00 Sleeping Bus(22:00 - 3:30)
                    </MenuItem>
                  </TextField>
                </div>
              </Grid>

              <Grid item xs={4}>
                <div style={{ marginBottom: 16 }}>
                  <label>Bus Departure Date</label>
                  <TextField
                    name="busDepartDate"
                    type="date"
                    fullWidth
                    value={formData.busDepartDate}
                    onChange={handleInputChange}
                  />
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={8}>
                <div style={{ marginBottom: 16 }}>
                  <label>Bus</label>
                  <TextField
                    select
                    name="busReturn"
                    fullWidth
                    value={formData.busReturn || 'A Toan'}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="A Toan">
                      Hanoi,A. Toàn 16:00 Limousine 11 seats, Cheers Hostel
                      *(16:00-23:00)
                    </MenuItem>
                    <MenuItem value="BP 16PM">
                      Hanoi,BP 16:00 Limousine, Cheers Hostel **(16:00 - 22:30)
                    </MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                  </TextField>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div style={{ marginBottom: 16 }}>
                  <label>Bus Return Date</label>
                  <TextField
                    name="busReturnDate"
                    fullWidth
                    value={formData.busReturnDate}
                    onChange={handleInputChange}
                  />
                </div>
              </Grid>
            </Grid>
            <div style={{ marginBottom: 16 }}>
              <label>On Tour Date</label>
              <TextField
                name="onTourDate"
                fullWidth
                value={formData.onTourDate}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Note</label>
              <TextareaAutosize
                minRows={3}
                maxRows={5}
                placeholder="Note"
                name="note"
                fullWidth
                value={formData.note}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Grid>
        <Grid item xs={6}>
          {confirmationText && (
            <div>
              <Typography variant="h6">Generated Confirmation Text:</Typography>
              <pre>{confirmationText}</pre>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ConfirmationForm;
