import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from './DataTable'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { getAllData } from '../fetchContact/FetchContact';
import { useQuery } from 'react-query';
import axios from 'axios';

const Contacts = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery("contact", getAllData);

  const handleDownload = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contact/export', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'contacts.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error downloading contacts:', err);
    }
  };

  return (
    <div className='contact'>
      <div className="importbtn">
        {/* <Button onClick={() => navigate("/add")} variant="outlined" className='import-btn' startIcon={<AddIcon />}>
          Import Contact
        </Button> */}
        <Button variant="outlined" color="success" className='dwn-btn' startIcon={<DownloadForOfflineIcon />} onClick={handleDownload}>
          Download
        </Button>
      </div>
      <div>
        
      </div>
      <div className="table">
        <DataTable data={data} />
      </div>
    </div>
  )
}

export default Contacts