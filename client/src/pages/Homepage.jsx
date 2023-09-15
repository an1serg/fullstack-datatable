// @mui material components
import Grid from '@mui/material/Grid';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';

import PersonTable from './PersonTable';
import BookTable from './BookTable';

const Homepage = () => {
  return (
    <MDBox py={3}>
      <Grid
        container
        direction='column'
        justifyContent='space-between'
        alignItems='center'
      >
        <Grid item>
          <MDBox mb={1.5}>
            <PersonTable />
          </MDBox>
        </Grid>
        <Grid item>
          <MDBox mb={1.5}>
            <BookTable />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Homepage;
