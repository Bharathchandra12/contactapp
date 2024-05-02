/* eslint-disable react/prop-types */
import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'name', headerName: 'Name',width:230},
  { field: 'phonenumber', headerName: 'Phone Number',width:230 },
  { field: 'email', headerName: 'Email',width:230},
  { field: 'tags', headerName: 'Tags',width:230},
];


// eslint-disable-next-line react/prop-types
export default function DataTable({data}) {
  const rows = Array.isArray(data) && data.length > 0
  ? data.map(item => ({
      id: item._id,
      name: item.name,
      phonenumber: item.phonenumber,
      email: item.email,
    }))
  : [];

  return (
    <div style={{ height:'70%', width: '80vw' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5,10,20,30,50]}
        checkboxSelection
      />
    </div>
  );
}