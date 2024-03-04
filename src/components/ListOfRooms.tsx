'use client'

import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useSession} from "next-auth/react"
import Message from "./Message";
import SendMessage from "./SendMessage";
import { doc, deleteDoc } from "firebase/firestore";


type roomType = {
    id: string,
    members: string[],
    receiver: string,
    sender: string,
}

const ListOfContacts = ({
  onSelect
}:{
  onSelect: (roomId: string) => void
}) => {

  const [rooms, setRooms] = useState<any[]>([]);
  const {data: session } = useSession();

  useEffect(() => {
    if(!session || !session.user) return;

    const q = query(
      collection(db, "rooms"),
      where("members", 'array-contains', session.user.email)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedRooms: roomType[] = [];
      QuerySnapshot.forEach((doc) => {
        const room = doc.data() as unknown as roomType;
        fetchedRooms.push({ 
            id: doc.id,
            members: room.members,
            receiver: room.members.filter( member => member !== session.user?.email)[0],
            sender: room.members.filter( member => member === session.user?.email)[0],
        });
      });
      
      setRooms(fetchedRooms);
    });
    return () => {
        unsubscribe()
    };
  },[session])

  const handleDelete = async (id:string) => {
    await deleteDoc(doc(db, "rooms", id));
  }

  return (
    <>
      <h2 className="px-4 py-2 font-bold text-lg">
        Chats
      </h2>
      <div className="flex px-4 py-2 flex-col gap-3">
        {rooms.map(room => (
          <div key={room.id}  className="w-full flex flex-row items-center">
            <button
              onClick={() => onSelect(room.id)}
              className="flex w-full p-2 hover:bg-zinc-900/80 transition rounded-md cursor-pointer flex-row gap-4">
              {room.receiver}
            </button>
            <button onClick={() => handleDelete(room.id)}>
              borrar
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListOfContacts;
