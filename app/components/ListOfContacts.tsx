"use client";

import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  query,
  collection,
  onSnapshot,
  where,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useSession } from "next-auth/react";
import { getDocs } from "firebase/firestore";

type contactType = {
  id: string;
  email: string;
  userImage: string;
  userName: string;
};

const ListOfContacts = () => {
  const [contacts, setContacts] = useState<contactType[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.user) return;

    const q = query(
      collection(db, "user"),
      where("email", "!=", session.user.email)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedContacs: contactType[] = [];
      QuerySnapshot.forEach((doc) => {
        const contact = doc.data() as unknown as contactType;

        fetchedContacs.push({
          id: doc.id,
          userName: contact.userName,
          userImage: contact.userImage,
          email: contact.email,
        });
      });

      setContacts(fetchedContacs);
    });
    return () => {
      unsubscribe();
    };
  }, [session]);

  const handleCreateRoom = async (receiver: string) => {
    
    const q = query(
      collection(db, "rooms"),
      where("members", "array-contains", session?.user?.email),
    );

    const querySnapshot = await getDocs(q);

    if(querySnapshot){
      let grouptMembers;
      let isFound = false;
      querySnapshot.forEach(val => {
        grouptMembers = val.data().members;

        if(grouptMembers.includes(receiver)){
          isFound = true;
          return;
        }
      })
      if(isFound) return;
    }
    await addDoc(collection(db, "rooms"), {
      id: uuidv4(),
      members: [session?.user?.email, receiver],
    });
  };

  return (
    <>
      <h2 className="px-4 py-2 font-bold text-lg">Contactos</h2>
      <div className="flex px-4 py-2 flex-col gap-3">
        {contacts.map((contact) => (
          <button
            key={contact.email}
            onClick={() => handleCreateRoom(contact.email)}
            className="flex p-2 hover:bg-zinc-900/80 transition rounded-md cursor-pointer flex-row gap-4"
          >
            <img
              className="rounded-full w-10 h-10"
              src={contact.userImage}
              alt="user avatar"
            />
            {contact.userName}
          </button>
        ))}
      </div>
    </>
  );
};

export default ListOfContacts;
