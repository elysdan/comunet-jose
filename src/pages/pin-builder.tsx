import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod' ;
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import * as z from 'zod';

const createPinValidator = z.object({
  description: z.string(),
  link: z.string(),
  file: z.any(),
  title: z.string()
})

function PinBuilder() {

  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [link, setLink] = useState();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const postId = Date.now().toString();
  const onSave = () => {
    setLoading(true);
    uploadFile();
  };

  const supabase = createClientComponentClient();

  const uploadFile = async (file): string => {
    const bucket = "pins";
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(file.name, file);

    if(error) {
      alert('Error uploading file.');
      return '';
    }

    return data.path;
  };

  return (
    <div className='bg-zinc-950 min-h-screen p-8 
    px-[10px] md:px-[160px]'>
    <div className=" bg-zinc-950 p-16 rounded-2xl ">
      <div className="flex justify-end mb-6 gap-4">
         <UserTag user={session?.user} />
        <button
          onClick={() => onSave()}
          className="bg-red-500 p-2
            text-white font-semibold px-3 
            rounded-lg"
        >
          {loading ? (
            <Image
              src="/loading-indicator.png"
              width={30}
              height={30}
              alt="loading"
              className="animate-spin"
            />
          ) : (
            <span>Publicar</span>
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        <UploadImage setFile={(file) => setFile(file)} />

        <div className="col-span-2">
          <div className="w-[100%]">
            <input
              type="text"
              placeholder="Agrega un titulo"
              onChange={(e) => setTitle(e.target.value)}
              className="text-[35px] bg-transparent outline-none font-bold w-full
        border-b-[2px] border-gray-400 placeholder-gray-400"
            />
            <h2 className="text-[12px] mb-8 w-full  text-gray-400">
              Los primeros 40 caracteres normalmente es lo primero en mostrarse
            </h2>
          
            <textarea
              type="text"
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Dile a todos de que trata tu Pin"
              className=" outline-none bg-transparent  w-full mt-8 pb-4 text-[14px] border-b-[2px] border-gray-400 placeholder-gray-400"
            />
            <input
              type="text"
              onChange={(e) => setLink(e.target.value)}
              placeholder="Agrega un enlace destino"
              className=" outline-none bg-transparent w-full  pb-4 mt-[90px] border-b-[2px] border-gray-400 placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default PinBuilder