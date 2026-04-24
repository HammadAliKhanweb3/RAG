'use client'
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


interface Doc {
  pageContent?: string;
  metdata?: {
    loc?: {
      pageNumber?: number;
    };
    source?: string;
  };
}


interface IMessage {
    role:"user" | "assistant",
    content?:string,
    documets?:Doc[]
}

export const Chat:React.FC = () => {   

const [message,setMessage] = React.useState("")
const [messages,setMessages] = React.useState<IMessage[]>([]);


// const handlSendChat = async () => {
  
//     setMessages((prev)=>[...prev,{role:"user",content:message}])
//     const res =  await fetch("http://localhost:8000/chat?message=" + message)
//     const data = await res.json();
    
//     setMessages((prev)=>[...prev,{role:"assistant",content:data.message,documets:data.docs}])
// }
const handlSendChat = async () => {
  setMessages((prev) => [...prev, { role: "user", content: message }]);
  setMessage("");

  try {
    const res = await fetch(
      "http://localhost:8000/chat?message=" + encodeURIComponent(message)
    );

    // ✅ Check if response is actually JSON before parsing
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error(`Server returned non-JSON: ${text}`);
    }

    const data = await res.json();
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.message, documents: data.docs },
    ]);
  } catch (err) {
    console.error("Chat error:", err);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: `Error: ${err.message}` },
    ]);
  }
};

return(
    <>
    <div className="p-4">
        
        <div>
            {messages.map((msg,index)=>(
                <pre key={index}>{JSON.stringify(msg,null,2)}</pre>
            ))}
        </div>
      <div className="fixed bottom-4 w-100 flex gap-3">
        <Input
         value={message}
         onChange={(e) => setMessage(e.target.value)}
         placeholder="Type your message here"></Input>
        <Button onClick={handlSendChat} disabled={!message.trim()}>Send</Button>
      </div>
    </div>
    </>
)

}