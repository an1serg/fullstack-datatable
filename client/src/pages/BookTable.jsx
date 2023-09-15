import { useState, useEffect } from 'react';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

import { AgGridReact } from 'ag-grid-react';
import { Grid } from '@mui/material';
import MDButton from 'components/MDButton';
import deleteBook from 'actions/deleteBook';
import useChangeRowModal from 'hooks/useChangeRowModal';
import toast from 'react-hot-toast';
import useAddRowModal from 'hooks/useAddRowModal';
import getPaginatedBooks from 'actions/getPaginatedBooks';

const BookTable = () => {
  const [gridApi, setGridApi] = useState(null);
  const changeRowModal = useChangeRowModal();
  const addRowModal = useAddRowModal();

  const columnDefs = [
    { headerName: 'id', field: 'id' },
    { headerName: 'Название', field: 'title' },
    { headerName: 'Цена', field: 'price' },
    { headerName: 'Количество', field: 'amount' },
    { headerName: 'Дата', field: 'createdat' },
    { headerName: 'user_id', field: 'user_id' },
  ];

  const datasource = {
    rowCount: undefined,
    async getRows(params) {
      const { startRow, endRow } = params;
      try {
        const books = await getPaginatedBooks(startRow, endRow);
        const rowsThisPage = books.data.rows;
        const lastRow = books.data.count;
        params.successCallback(rowsThisPage, lastRow);
      } catch (e) {
        console.log(e);
      }
    },
  };

  const gridOptions = {
    columnDefs: columnDefs,
    rowModelType: 'infinite',
    datasource: datasource,
    pagination: true,
    paginationAutoPageSize: true,
    maxBlocksInCache: 2,
    cacheBlockSize: 10,
    rowSelection: 'single',
    onGridReady: (params) => {
      setGridApi(params.api);
      params.api.setDatasource(datasource);
    },
  };

  const handleDelete = async () => {
    const selectedRow = gridApi.getSelectedNodes();
    if (!selectedRow[0]) {
      toast.error('Необходимо выбрать строку');
      return;
    }
    await deleteBook(selectedRow[0].data.id);
    gridApi.refreshInfiniteCache();
  };

  const handleChange = async () => {
    const editingRow = gridApi.getSelectedNodes();
    if (!editingRow[0]) {
      toast.error('Необходимо выбрать строку');
      return;
    }
    changeRowModal.rowData = editingRow[0].data;
    changeRowModal.onOpen();
  };

  const handleAdd = () => {
    addRowModal.onOpen();
  };

  useEffect(() => {
    if (!changeRowModal.isOpen && !addRowModal.isOpen && gridApi) {
      (async () => {
        try {
          gridApi.refreshInfiniteCache();
          console.log('Данные обновились');
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [changeRowModal.isOpen, addRowModal.isOpen, gridApi]);

  return (
    <MDBox py={3} px={3}>
      <Grid container direction='column'>
        <Grid item alignSelf='center'>
          <MDTypography mb={2}>Книги</MDTypography>
        </Grid>
        <Grid container item direction='row' mb={2} justifyContent='center'>
          <MDButton onClick={handleAdd}>Добавить</MDButton>
          <MDButton onClick={handleChange}>Изменить</MDButton>
          <MDButton onClick={handleDelete}>Удалить</MDButton>
        </Grid>
      </Grid>
      <MDBox className='ag-theme-alpine' style={{ width: 1250, height: 550 }}>
        <AgGridReact gridOptions={gridOptions} />
      </MDBox>
    </MDBox>
  );
};

export default BookTable;
