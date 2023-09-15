import { useState, useEffect } from 'react';
import getPersons from 'actions/getPersons';
import MDBox from 'components/MDBox';

import { AgGridReact } from 'ag-grid-react';
import MDTypography from 'components/MDTypography';
import { Grid } from '@mui/material';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const PersonTable = () => {
  const [rowData, setRowData] = useState();

  const columnDefs = [
    { headerName: 'id', field: 'id' },
    { headerName: 'Фамилия', field: 'surname' },
    { headerName: 'Зарплата', field: 'salary' },
    { headerName: 'Дней отпуска', field: 'vacationdays' },
    { headerName: 'Дата', field: 'createdat' },
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await getPersons();
        setRowData(res.data.rows);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <MDBox py={3} px={3}>
      <Grid container justifyContent='center' alignItems='center'>
        <MDTypography mb={2}>Писатели</MDTypography>
      </Grid>
      <MDBox className='ag-theme-alpine' style={{ width: 1050, height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      </MDBox>
    </MDBox>
  );
};

export default PersonTable;
