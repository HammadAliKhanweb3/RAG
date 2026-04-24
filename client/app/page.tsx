import { Input } from "@/components/ui/input";
import { FileUpload } from "./components/file-upload";
import { Chat } from "./components/chat";

export default function Home() {
  
  return (
    <div>
      <div className="min-w-screen h-screen flex">
        <div className="w-[30vw] min-h-screen p-4 flex justify-center items-center">
          <FileUpload/>
          </div>
        <div className="w-[70vw] min-h-screen border-l-2">
          <div>
             <Chat/>
          </div>
        </div>
      </div>

    </div>
  );
}
