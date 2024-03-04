"use client";
import React, { useState } from "react";
import UploadImage from "./UploadImage";
import { useSession } from "next-auth/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import UserTag from "./UserTag";
import { db, storage } from "../firebaseConfig";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { setDoc, doc } from "firebase/firestore";

function Form() {
  
}

export default Form;
