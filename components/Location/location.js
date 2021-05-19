/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={top100Films}
      getOptionLabel={(option) => option.title}
      style={{ marginLeft:15 }}
      renderInput={(params) => <TextField {...params} label="Add a Location" variant="outlined" />}
      fullWidth
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { title: 'Sheraton Hotel'},
  { title: 'Ebony Life place' },
  { title: 'Eko Hotels & Suites' },
  { title: 'Lagos Airport Ikeja' },
  { title: 'WaterCress Hotel'},
  { title: 'Lagos Oriental Hotel'},
  { title: 'WheatBaker Hotel' },
  { title: 'Lagoon Front Maquee' },
  { title: 'The Blow Fish Hotel' },
  { title: 'Landmark Center' },
  { title: 'Dpodium Event Center' },
  { title: 'Radissons Blue Hotel' },
  { title: 'FourPoints By Sheraton'},
 
];
