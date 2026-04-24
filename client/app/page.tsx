import { Input } from "@/components/ui/input";
import { FileUpload } from "./components/file-upload";
import { Chat } from "./components/chat";

export default function Home() {
  return (
    <div className="flex h-screen w-screen bg-[#05070c]">

    
      <div className="w-[320px] border-r border-white/10 p-4 flex flex-col gap-4 flex justify-center items-center">
        <div className="text-xs text-white/40 px-2">
          DOCUMENTS
        </div>

        <FileUpload />
      </div>

      {/* Right panel - Chat */}
      <div className="flex-1">
        <Chat />
      </div>

    </div>
  )
}