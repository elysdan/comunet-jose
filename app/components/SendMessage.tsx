"use client";

import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = ({ roomId }: { roomId: string }) => {
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!session || !session.user) return;
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    await addDoc(collection(db, "messages"), {
      text: message,
      name: session.user.name,
      avatar: session.user.image,
      createdAt: serverTimestamp(),
      roomId: roomId,
      uid: session.user.email,
    });

    setMessage("");
    // scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form
      onSubmit={(event) => sendMessage(event)}
      className="flex flex-row gap-4"
    >
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="border border-zinc-700 rounded-full w-full px-4 py-2 bg-zinc-900"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-red-600 rounded-full min-w-[3rem] min-h-[3rem]"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default SendMessage;
