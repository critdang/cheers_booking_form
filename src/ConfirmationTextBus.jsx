import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Container,
  Grid,
  MenuItem,
  FormControlLabel,
  Radio,
  Select,
  RadioGroup,
  FormControl,
  InputLabel,
} from '@mui/material';
import moment from 'moment';

const ConfirmationForm = () => {
  const [formData, setFormData] = useState({
    busStation: '',
    busTime: '',
    name: '',
    pax: '1',
    phoneNumber: '0945246026',
    busPickupDate: '',

    selectedPickupLocation: '5 Ấu Triệu', // Default to the first popular location
    customPickupLocation: '',
    selectedDropoffLocation: 'Báo sau', // Default to the first popular location
    customDropoffLocation: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log('here');

  const generateConfirmationText = () => {
    const busPickUpDateFormat = moment(formData.busPickupDate).format(
      'DD/MM/YYYY'
    );

    let confirmationText;
    let parts = formData.busTime.split(' ');

    // Find and remove "PM" if it's present in the time
    const timeIndex = parts.indexOf('PM');
    if (timeIndex !== -1) {
      parts.splice(timeIndex, 1);
    }

    const time = parts.join(' '); // Reconstruct the time without "PM"

    console.log('🚀 ~ generateConfirmationText ~ time:', time);
    if (formData.busStation === 'QN') {
      confirmationText = `❤️❤️ EPIC đặt xe chuyến ${formData.busTime}
      + Tên khách: ${formData.name}
      + Số lượng vé: ${formData.pax}
      + SĐT liên lạc: ${formData.phoneNumber}
      ---------------------------------
      + Ngày đón: ${busPickUpDateFormat}
      + Điểm đón:${
        formData.selectedPickupLocation === 'other'
          ? formData.customPickupLocation
          : formData.selectedPickupLocation
      }
      + Điểm trả: ${
        formData.selectedDropoffLocation === 'None'
          ? formData.customDropoffLocation
          : formData.selectedDropoffLocation
      }
      -----------------------------
      Thanh toán: CÔNG NỢ`;
    } else if (formData.busStation === 'BP') {
      confirmationText = `Xác nhận giúp em dịch vụ xe HÀ NỘI  - HÀ GIANG LIMOUSINE CHUYẾN 16:00 PM với thông tin như sau:
      + Tên:  ${formData.name}
      + Số lượng vé: ${formData.pax}
      + SĐT liên lạc: ${formData.phoneNumber}
      + Ngày đón:  ${busPickUpDateFormat}
      + Điểm đón: ${
        formData.selectedPickupLocation === 'other'
          ? formData.customPickupLocation
          : formData.selectedPickupLocation
      } 
      + Điểm trả: ${
        formData.selectedDropoffLocation === 'None'
          ? formData.customDropoffLocation
          : formData.selectedDropoffLocation
      }
      _____________________________
      Thanh toán: CÔNG NỢ`;
    }

    return confirmationText;
  };

  const busTimes = {
    QN: ['19H SP-HG', '4:00PM SP-HG'],
    ĐQ: ['time2-1', 'time2-2'],
    CatBaExpress: ['2:00PM HN - Cát Bà', '10:45PM HN - Cát Bà'],
    BP: [
      '16:00PM HN - Hà Giang',
      '19:30PM HN - Hà Giang',
      '19:00 Ninh Bình - Hà Giang',
      '19:30PM Hà Giang - Ninh Bình',
      '4:00PM Hà Giang - HN',
    ],
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
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  select
                  name="busStation"
                  fullWidth
                  label="Bus Station"
                  value={formData.busStation}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="QN">QN</MenuItem>
                  <MenuItem value="ĐQ">ĐQ</MenuItem>
                  <MenuItem value="BP">BP</MenuItem>
                  <MenuItem value="CatBaExpress">CatBaExpress</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  name="busTime"
                  fullWidth
                  label="Bus Time"
                  value={formData.busTime}
                  onChange={handleInputChange}
                  required
                >
                  {busTimes[formData.busStation] &&
                    busTimes[formData.busStation].map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
            </Grid>
            <div style={{ marginBottom: 16 }}>
              <label>Tên khách</label>
              <TextField
                name="name"
                fullWidth
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Số lượng vé</label>
              <TextField
                required
                name="pax"
                fullWidth
                value={formData.pax}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>SĐT</label>
              <TextField
                required
                name="phoneNumber"
                fullWidth
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Ngày đón</label>
              <TextField
                required
                name="busPickupDate"
                type="date"
                fullWidth
                value={formData.busPickupDate}
                onChange={handleInputChange}
              />
            </div>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <label>Điểm đón</label>
              </Grid>
              <Grid item xs={6}>
                <RadioGroup
                  name="selectedPickupLocation"
                  value={formData.selectedPickupLocation}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="5 Ấu Triệu"
                    control={<Radio />}
                    label="5 Ấu Triệu"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>

                {formData.selectedPickupLocation === 'other' && (
                  <TextField
                    name="customPickupLocation"
                    fullWidth
                    label="Custom Pickup Location"
                    value={formData.customPickupLocation}
                    onChange={handleInputChange}
                  />
                )}
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <label>Điểm trả</label>
              </Grid>

              <Grid item xs={6}>
                <RadioGroup
                  aria-label="dropoffLocation"
                  name="selectedDropoffLocation"
                  value={formData.selectedDropoffLocation}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="Báo sau"
                    control={<Radio />}
                    label="Báo sau"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>

                {formData.selectedDropoffLocation === 'other' && (
                  <TextField
                    name="customDropoffLocation"
                    fullWidth
                    label="Custom Dropoff Location"
                    value={formData.customDropoffLocation}
                    onChange={handleInputChange}
                  />
                )}
              </Grid>
            </Grid>
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
