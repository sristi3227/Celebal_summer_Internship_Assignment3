import { useState, useEffect } from 'react';
import {
  Box, Paper, TextField, InputAdornment, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, Grid, MenuItem
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { saveToStorage, getFromStorage } from '../utils/localStorage';

const STORAGE_KEY = 'userTableData';

const Tables = () => {
  const [rows, setRows] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    status: 'Active',
    joinDate: '',
  });

  // Load from storage
  useEffect(() => {
    const stored = getFromStorage(STORAGE_KEY, []);
    setAllRows(stored);
    setRows(stored);
  }, []);

  const handleSearchChange = (e) => {
    const search = e.target.value.toLowerCase();
    setSearchText(search);

    if (!search) {
      setRows(allRows);
      return;
    }

    const filtered = allRows.filter((row) =>
      Object.values(row).some((val) =>
        val?.toString().toLowerCase().includes(search)
      )
    );
    setRows(filtered);
  };

  const handleAddOrEdit = () => {
    if (!formData.firstName || !formData.email) return;

    let updated;

    if (editMode) {
      updated = allRows.map((row) =>
        row.id === formData.id ? formData : row
      );
    } else {
      const newUser = { ...formData, id: Date.now().toString() };
      updated = [...allRows, newUser];
    }

    setAllRows(updated);
    setRows(updated);
    saveToStorage(STORAGE_KEY, updated); // Immediate sync

    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      status: 'Active',
      joinDate: '',
    });
    setEditMode(false);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updated = allRows.filter((row) => row.id !== id);
      setAllRows(updated);
      setRows(updated);
      saveToStorage(STORAGE_KEY, updated); 
    }
  };

  const handleEditUser = (row) => {
    setFormData(row);
    setEditMode(true);
    setOpenDialog(true);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Button
        variant="contained"
        onClick={() => {
          resetForm();
          setOpenDialog(true);
        }}
        sx={{ mb: 2 }}
      >
        Add User
      </Button>

      <DataGrid
        rows={rows}
        getRowId={(row) => row.id}
        columns={[
          { field: 'firstName', headerName: 'First Name', width: 130 },
          { field: 'lastName', headerName: 'Last Name', width: 130 },
          { field: 'email', headerName: 'Email', width: 200 },
          { field: 'status', headerName: 'Status', width: 130 },
          { field: 'joinDate', headerName: 'Join Date', width: 150 },
          {
            field: 'actions',
            headerName: 'Actions',
            width: 160,
            renderCell: (params) => (
              <>
                <Button
                  size="small"
                  onClick={() => handleEditUser(params.row)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDeleteUser(params.id)}
                >
                  Delete
                </Button>
              </>
            ),
          },
        ]}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
        autoHeight
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>{editMode ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                fullWidth
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                fullWidth
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Status"
                select
                fullWidth
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                {['Active', 'Inactive', 'Pending'].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Join Date"
                type="date"
                fullWidth
                value={formData.joinDate}
                onChange={(e) =>
                  setFormData({ ...formData, joinDate: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddOrEdit}>
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tables;
