"use client"

import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { useEffect, useState } from 'react';
import PinList from './components/Pins/PinList';

export default function Home() {

  const [listOfPins,setListOfPins]=useState([]);
  
  useEffect(()=>{
    getAllPins();
  },[])

  const getAllPins=async()=>{
    setListOfPins([])
    const result = []
      const q=query(collection(db,
        'comunet-post')
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      result.push(doc.data())       
    });
    setListOfPins(result);
  }

  return (
    <>
    <div className='p-3'>
      <PinList listOfPins={listOfPins} />
      </div>
    </>
  )
}
