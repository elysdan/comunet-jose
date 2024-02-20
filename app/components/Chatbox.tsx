"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
  limit,
  or,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useSession } from "next-auth/react";
import Message from "./Message";
import SendMessage from "./SendMessage";

type messageType = {
  id: string;
  uid: string;
  text: string;
  name: string;
  avatar: string;
  createdAt: any;
};

const ChatBox = ({ roomId }: { roomId: string }) => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const scroll = useRef();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.user) return;

    const q = query(
      collection(db, "messages"),
      where("roomId", "==", roomId),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: messageType[] = [];

      QuerySnapshot.forEach((doc) => {
        const message = doc.data() as unknown as messageType;
        fetchedMessages.push({
          id: doc.id,
          uid: message.uid,
          text: message.text,
          name: message.name,
          avatar: message.avatar,
          createdAt: message.createdAt,
        });
        const sortedMessages = fetchedMessages.sort(
          (a, b) => a.createdAt - b.createdAt
        );
        setMessages(sortedMessages);
      });
    });

    return () => {
      unsubscribe();
    };
  }, [roomId, session]);

  return (
    <div className="w-full flex h-full flex-col justify-between rounded-3xl">
      <div className="w-full p-4 flex overflow-y-scroll flex-col gap-2">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {/* <span ref={scroll}></span> */}
      </div>
      <div className="p-4">
        <SendMessage
          // scroll={scroll}
          roomId={roomId}
        />
      </div>
    </div>
  );
};

export default ChatBox;
