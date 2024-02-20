"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import PinList from "../components/Pins/PinList";
import Chatbox from "../components/Chatbox";
import ListOfContacts from "../components/ListOfContacts";
import ListOfRooms from "../components/ListOfRooms";
import { Tab } from "@headlessui/react";

export default function Home() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const { data: session } = useSession();

  const handleOnSelectRoom = (roomId: string) => {
    setRoomId(roomId);
  };

  return (
    <>
      <main className="px-4 gap-4 flex h-[calc(100vh_-_130px)] flex-row">
        <Tab.Group className="max-w-[350px] rounded-3xl w-full bg-zinc-900/70" as='div'>
          <Tab.List className="grid grid-cols-2">
            <Tab className="w-full p-4">Chats</Tab>
            <Tab className="w-full p-4">Contactos</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="overflow-y-scroll">
              <ListOfRooms onSelect={handleOnSelectRoom} />
            </Tab.Panel>
            <Tab.Panel className="overflow-y-scroll">
              <ListOfContacts />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <div className="w-full flex flex-col justify-between rounded-3xl bg-zinc-900/70">
          {roomId && session ? <Chatbox roomId={roomId} /> : null}
        </div>
      </main>
    </>
  );
}
