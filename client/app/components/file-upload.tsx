'use client'
import * as React from "react"
import { Upload } from "lucide-react"




export const FileUpload:React.FC= () => {

       
const handleFileSubmit = () => {
  const el = document.createElement('input')
  el.type = 'file'
  el.accept = 'application/pdf'

  el.onchange = async () => {
    if (el.files && el.files.length > 0) {
      const file = el.files[0]

      const formData = new FormData()
      formData.append("pdf", file)

      const res = await fetch("http://localhost:8000/upload/pdf", {
        method: "POST",
        body: formData
      })

      const data = await res.json()
      console.log(data)
    }
  }

  el.click()
}
    return(
 <div className="bg-slate-900 text-white shadow-2xl justify-center items-center p-4 rounded-lg border-white border-2">
 <div onClick={handleFileSubmit} className="flex flex-col justify-center items-center">
    <h3>Upload PDF File</h3>
    <Upload/>
</div>    
</div>
)
}