import React from 'react'
import axios from "axios";
const baseURL= import.meta.env.VITE_BASEURL;
export const getAllData = async ()=>{
  try{
    const res=await axios.get(`${baseURL}/api/contact`);
    return res.data.allContacts;
  } catch(err){
    console.log(err);
  }
}
