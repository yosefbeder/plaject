import React from 'react';

import { MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';

export default function RandomPage() {
  return (
    <div>
      <FormControl>
        <InputLabel>Age</InputLabel>
        <Select>
          <MenuItem>Hi</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
