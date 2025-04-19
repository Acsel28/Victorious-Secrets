"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, File, X } from "lucide-react"

interface FileUploadProps {
  files: File[]
  setFiles: (files: File[]) => void
}

export default function FileUpload({ files, setFiles }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles)
    },
    [setFiles],
  )

  const removeFile = () => {
    setFiles([])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors duration-200 ${
          isDragActive
            ? "border-indigo-400 bg-indigo-50"
            : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className={`mb-4 h-12 w-12 ${isDragActive ? "text-indigo-500" : "text-slate-400"}`} />
          <p className="mb-2 text-sm font-medium text-slate-700">
            {isDragActive ? "Drop your resume here" : "Drag and drop your resume or click to upload"}
          </p>
          <p className="text-xs text-slate-500">(.pdf, .docx)</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-indigo-100 p-2">
                <File className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">{files[0].name}</p>
                <p className="text-xs text-slate-500">{(files[0].size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
