"use client";

import React from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";

const Message = ({
  message,
}: {
  message: {
    uid: string;
    text: string;
    name: string;
    avatar: string;
  };
}) => {
  const { data: session } = useSession();

  return session && session.user ? (
    <div
      className={clsx(
        "flex w-fit flex-row gap-4",
        session.user.email === message.uid ? "ml-auto" : "mr-auto"
      )}
    >
      <div className="bg-zinc-800 rounded-md py-3 max-w-sm px-4">
        <p className="text-right font-semibold text-[15px]">{message.name}</p>
        <p className="user-messag">{message.text}</p>
      </div>
      <img
        className="rounded-full w-10 h-10"
        src={message.avatar}
        alt="user avatar"
      />
    </div>
  ) : null;
};

export default Message;
