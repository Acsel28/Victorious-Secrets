"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import {
  Upload,
  X,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Edit,
  Download,
  ThumbsUp,
  ThumbsDown,
  Briefcase,
  GraduationCap,
  Award,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Layout,
  CheckCircle2,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// Resume template thumbnails (in a real app, these would be actual images)
const TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with a focus on skills and experience",
    color: "bg-indigo-500",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional layout ideal for corporate and executive positions",
    color: "bg-emerald-500",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for creative industries with emphasis on portfolio",
    color: "bg-rose-500",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design that focuses on content",
    color: "bg-amber-500",
  },
]

// Sample recommendations based on resume content
const SAMPLE_RECOMMENDATIONS = [
  {
    type: "career",
    title: "Senior Frontend Developer",
    description: "Based on your React skills, you might be a good fit for senior frontend roles.",
    color: "bg-indigo-100 border-indigo-300",
    icon: <Briefcase className="h-5 w-5 text-indigo-500" />,
  },
  {
    type: "skill",
    title: "Learn TypeScript",
    description: "Adding TypeScript to your JavaScript skills would make you more competitive.",
    color: "bg-emerald-100 border-emerald-300",
    icon: <GraduationCap className="h-5 w-5 text-emerald-500" />,
  },
  {
    type: "certification",
    title: "AWS Certification",
    description: "Cloud skills are in demand. Consider getting AWS certified.",
    color: "bg-amber-100 border-amber-300",
    icon: <Award className="h-5 w-5 text-amber-500" />,
  },
]

// Sample resume data structure
const INITIAL_RESUME_DATA = {
  personal: {
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  },
  experience: [
    {
      id: "exp1",
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      isValid: false,
    },
  ],
  education: [
    {
      id: "edu1",
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      isValid: false,
    },
  ],
  skills: [""],
}

export default function ResumeBuilder() {
  // State management
  const [stage, setStage] = useState(1)
  const [files, setFiles] = useState<File[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [resumeData, setResumeData] = useState(INITIAL_RESUME_DATA)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [isSatisfied, setIsSatisfied] = useState<boolean | null>(null)
  const [recommendations, setRecommendations] = useState(SAMPLE_RECOMMENDATIONS)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Navigation functions
  const goToNextStage = () => {
    if (stage < 5) {
      setIsTransitioning(true)
      setTimeout(() => {
        setStage(stage + 1)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const goToPreviousStage = () => {
    if (stage > 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setStage(stage - 1)
        setIsTransitioning(false)
      }, 300)
    }
  }

  // Validate resume data
  const validateResumeData = useCallback(() => {
    const newErrors: Record<string, string[]> = {}

    // Validate personal info
    if (!resumeData.personal.name) {
      newErrors.personal = [...(newErrors.personal || []), "Name is required"]
    }
    if (!resumeData.personal.email) {
      newErrors.personal = [...(newErrors.personal || []), "Email is required"]
    } else if (!/^\S+@\S+\.\S+$/.test(resumeData.personal.email)) {
      newErrors.personal = [...(newErrors.personal || []), "Email format is invalid"]
    }

    // Validate experience
    resumeData.experience.forEach((exp, index) => {
      if (!exp.title || !exp.company) {
        newErrors[`experience_${index}`] = [
          ...(newErrors[`experience_${index}`] || []),
          "Job title and company are required",
        ]
      }
    })

    // Validate education
    resumeData.education.forEach((edu, index) => {
      if (!edu.degree || !edu.institution) {
        newErrors[`education_${index}`] = [
          ...(newErrors[`education_${index}`] || []),
          "Degree and institution are required",
        ]
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [resumeData])

  // Update resume data
  const updateResumeData = (section: string, field: string, value: string, index?: number) => {
    setResumeData((prev) => {
      const newData = { ...prev }

      if (section === "personal") {
        newData.personal = { ...newData.personal, [field]: value }
      } else if (section === "experience" && typeof index === "number") {
        newData.experience = [...newData.experience]
        newData.experience[index] = { ...newData.experience[index], [field]: value }
      } else if (section === "education" && typeof index === "number") {
        newData.education = [...newData.education]
        newData.education[index] = { ...newData.education[index], [field]: value }
      } else if (section === "skills" && typeof index === "number") {
        newData.skills = [...newData.skills]
        newData.skills[index] = value
      }

      return newData
    })
  }

  // Parse resume data from uploaded file (mock implementation)
  const parseResumeFromFile = useCallback(() => {
    // In a real app, this would extract data from the uploaded file
    // For this example, we'll just populate with sample data
    if (files.length > 0) {
      setResumeData({
        personal: {
          name: "Alex Johnson",
          email: "alex.johnson@example.com",
          phone: "(555) 123-4567",
          location: "San Francisco, CA",
          summary: "Experienced software developer with 5+ years of experience in web development.",
        },
        experience: [
          {
            id: "exp1",
            title: "Senior Frontend Developer",
            company: "Tech Solutions Inc.",
            location: "San Francisco, CA",
            startDate: "2020-01",
            endDate: "Present",
            description: "Led development of React-based applications and mentored junior developers.",
            isValid: true,
          },
          {
            id: "exp2",
            title: "Web Developer",
            company: "Digital Creations",
            location: "Oakland, CA",
            startDate: "2018-03",
            endDate: "2019-12",
            description: "Developed responsive websites and implemented UI/UX designs.",
            isValid: true,
          },
        ],
        education: [
          {
            id: "edu1",
            degree: "B.S. Computer Science",
            institution: "University of California",
            location: "Berkeley, CA",
            startDate: "2014-09",
            endDate: "2018-05",
            isValid: true,
          },
        ],
        skills: ["JavaScript", "React", "HTML/CSS", "Node.js", "Git"],
      })
    }
  }, [files])

  // Generate recommendations based on resume data
  const generateRecommendations = useCallback(() => {
    // In a real app, this would analyze the resume and generate personalized recommendations
    // For this example, we'll just use the sample recommendations
    setRecommendations(SAMPLE_RECOMMENDATIONS)
  }, [])

  // Effect to parse resume when file is uploaded
  useEffect(() => {
    if (files.length > 0) {
      parseResumeFromFile()
    }
  }, [files, parseResumeFromFile])

  // Effect to generate recommendations when user is satisfied
  useEffect(() => {
    if (isSatisfied === true) {
      generateRecommendations()
    }
  }, [isSatisfied, generateRecommendations])

  // Render the appropriate stage
  const renderStage = () => {
    switch (stage) {
      case 1:
        return <UploadResumeStage files={files} setFiles={setFiles} goToNext={goToNextStage} />
      case 2:
        return (
          <ChooseTemplateStage
            templates={TEMPLATES}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            goToNext={goToNextStage}
            goToPrevious={goToPreviousStage}
          />
        )
      case 3:
        return (
          <ResumeEditorStage
            resumeData={resumeData}
            updateResumeData={updateResumeData}
            errors={errors}
            validateResumeData={validateResumeData}
            selectedTemplate={selectedTemplate || "modern"}
            goToNext={goToNextStage}
            goToPrevious={goToPreviousStage}
          />
        )
      case 4:
        return (
          <SatisfactionCheckStage
            isSatisfied={isSatisfied}
            setIsSatisfied={setIsSatisfied}
            goToNext={goToNextStage}
            goToPrevious={goToPreviousStage}
          />
        )
      case 5:
        return (
          <RecommendationsStage
            recommendations={recommendations}
            resumeData={resumeData}
            selectedTemplate={selectedTemplate || "modern"}
            goToPrevious={goToPreviousStage}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      {/* Roadmap Navigation */}
      <div className="mb-10 overflow-x-auto">
        <div className="flex min-w-max items-center justify-between px-4">
          {[
            { number: 1, label: "Upload", icon: <FileText className="h-4 w-4" /> },
            { number: 2, label: "Template", icon: <Layout className="h-4 w-4" /> },
            { number: 3, label: "Edit", icon: <Edit className="h-4 w-4" /> },
            { number: 4, label: "Review", icon: <CheckCircle2 className="h-4 w-4" /> },
            { number: 5, label: "Recommendations", icon: <Star className="h-4 w-4" /> },
          ].map((step, index, array) => (
            <StepIndicator
              key={step.number}
              number={step.number}
              label={step.label}
              icon={step.icon}
              isActive={step.number === stage}
              isCompleted={step.number < stage}
              isLast={index === array.length - 1}
              onClick={() => {
                // Allow clicking on completed steps or the next available step
                if (step.number <= stage || step.number === stage + 1) {
                  setStage(step.number)
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Current Stage Content */}
      <div
        className={cn("min-h-[500px] transition-opacity duration-300", isTransitioning ? "opacity-0" : "opacity-100")}
      >
        {renderStage()}
      </div>
    </div>
  )
}

// Step Indicator Component
interface StepIndicatorProps {
  number: number
  label: string
  icon: React.ReactNode
  isActive: boolean
  isCompleted: boolean
  isLast: boolean
  onClick: () => void
}

function StepIndicator({ number, label, icon, isActive, isCompleted, isLast, onClick }: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center">
        <button
          onClick={onClick}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full text-sm font-medium transition-all duration-300",
            isActive
              ? "bg-gradient-to-r from-indigo-600 to-violet-500 text-white shadow-lg ring-4 ring-indigo-200"
              : isCompleted
                ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200",
          )}
        >
          {isCompleted ? <Check className="h-5 w-5" /> : icon}
        </button>
        {!isLast && (
          <div className="mx-2 h-[3px] w-16 md:w-24 lg:w-32">
            <div
              className={cn(
                "h-full transition-all duration-500",
                isCompleted ? "bg-gradient-to-r from-indigo-500 to-violet-400" : "bg-slate-200",
              )}
            ></div>
          </div>
        )}
      </div>
      <span
        className={cn(
          "mt-2 text-center text-xs font-medium transition-colors duration-300",
          isActive ? "text-indigo-700" : "text-slate-500",
        )}
      >
        {label}
      </span>
    </div>
  )
}

// Stage 1: Upload Resume
interface UploadResumeStageProps {
  files: File[]
  setFiles: (files: File[]) => void
  goToNext: () => void
}

function UploadResumeStage({ files, setFiles, goToNext }: UploadResumeStageProps) {
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
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">Upload Your Resume</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Upload your existing resume to get started. We'll help you improve it and make it stand out.
        </p>
      </div>

      <div
        {...getRootProps()}
        className={cn(
          "flex h-80 cursor-pointer flex-col items-center justify-center rounded-xl border-3 border-dashed p-8 transition-all duration-300",
          isDragActive
            ? "border-indigo-400 bg-indigo-50 scale-[1.02] shadow-lg"
            : "border-slate-300 bg-slate-50 hover:border-indigo-300 hover:bg-slate-100 hover:scale-[1.01] hover:shadow-md",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center">
          <div
            className={cn(
              "mb-6 rounded-full p-6 transition-all duration-300",
              isDragActive ? "bg-indigo-100 scale-110" : "bg-slate-100",
            )}
          >
            <Upload
              className={cn(
                "h-16 w-16 transition-colors duration-300",
                isDragActive ? "text-indigo-500" : "text-slate-400",
              )}
            />
          </div>
          <h3 className="mb-2 text-xl font-medium text-slate-700">
            {isDragActive ? "Drop your resume here" : "Drag and drop your resume"}
          </h3>
          <p className="mb-4 text-slate-500">or click to browse files</p>
          <p className="text-sm text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Supported formats: PDF, DOCX</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="rounded-lg bg-green-50 border border-green-100 p-5 shadow-sm animate-slideUp">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-base font-medium text-slate-800">{files[0].name}</p>
                <p className="text-sm text-slate-500">{(files[0].size / 1024).toFixed(2)} KB • Ready to process</p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-6">
        <Button
          onClick={goToNext}
          disabled={files.length === 0}
          className={cn(
            "inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-violet-500 px-8 py-3 text-base font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            files.length === 0 ? "opacity-50 cursor-not-allowed hover:scale-100" : "animate-pulse-subtle",
          )}
        >
          Continue to Templates <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

// Stage 2: Choose Template
interface ChooseTemplateStageProps {
  templates: typeof TEMPLATES
  selectedTemplate: string | null
  setSelectedTemplate: (template: string) => void
  goToNext: () => void
  goToPrevious: () => void
}

function ChooseTemplateStage({
  templates,
  selectedTemplate,
  setSelectedTemplate,
  goToNext,
  goToPrevious,
}: ChooseTemplateStageProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">Choose Your Template</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Select a template that best represents your professional style and career goals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={cn(
              "group cursor-pointer overflow-hidden rounded-xl border-3 transition-all duration-300",
              selectedTemplate === template.id
                ? "border-indigo-500 ring-4 ring-indigo-100 scale-[1.02] shadow-lg"
                : "border-slate-200 hover:border-slate-300 hover:shadow-md",
            )}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="relative aspect-[3/4] w-full">
              {/* Template preview - in a real app, this would be an actual image */}
              <div className={cn("absolute inset-0 flex flex-col", template.color)}>
                <div className="h-1/4 bg-white/20 p-3">
                  <div className="h-4 w-1/2 rounded-full bg-white/80 mb-2"></div>
                  <div className="h-3 w-3/4 rounded-full bg-white/60"></div>
                </div>
                <div className="flex-1 p-3">
                  <div className="h-2 w-full rounded-full bg-white/60 mb-2"></div>
                  <div className="h-2 w-5/6 rounded-full bg-white/60 mb-2"></div>
                  <div className="h-2 w-4/6 rounded-full bg-white/60 mb-4"></div>

                  <div className="h-2 w-full rounded-full bg-white/40 mb-2"></div>
                  <div className="h-2 w-5/6 rounded-full bg-white/40 mb-4"></div>

                  <div className="h-2 w-full rounded-full bg-white/40 mb-2"></div>
                  <div className="h-2 w-4/6 rounded-full bg-white/40"></div>
                </div>
              </div>

              {/* Selected overlay */}
              {selectedTemplate === template.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-indigo-500/20 animate-fadeIn">
                  <div className="rounded-full bg-white p-3 shadow-lg">
                    <Check className="h-8 w-8 text-indigo-600" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white">
              <h3 className="font-medium text-lg text-slate-800">{template.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{template.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <Button
          onClick={goToPrevious}
          variant="outline"
          className="inline-flex items-center justify-center px-6 py-3 text-base border-2 hover:bg-slate-50 transition-colors duration-200"
        >
          <ChevronLeft className="mr-2 h-5 w-5" /> Back to Upload
        </Button>

        <Button
          onClick={goToNext}
          disabled={!selectedTemplate}
          className={cn(
            "inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-violet-500 px-8 py-3 text-base font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
            !selectedTemplate ? "opacity-50 cursor-not-allowed hover:scale-100" : "animate-pulse-subtle",
          )}
        >
          Continue to Editor <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

// Stage 3: Resume Editor
interface ResumeEditorStageProps {
  resumeData: typeof INITIAL_RESUME_DATA
  updateResumeData: (section: string, field: string, value: string, index?: number) => void
  errors: Record<string, string[]>
  validateResumeData: () => boolean
  selectedTemplate: string
  goToNext: () => void
  goToPrevious: () => void
}

function ResumeEditorStage({
  resumeData,
  updateResumeData,
  errors,
  validateResumeData,
  selectedTemplate,
  goToNext,
  goToPrevious,
}: ResumeEditorStageProps) {
  const handleNext = () => {
    if (validateResumeData()) {
      goToNext()
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Edit Your Resume</h2>
        <div className="flex items-center space-x-2 text-sm bg-slate-100 px-3 py-1.5 rounded-full">
          <div
            className={cn(
              "h-3 w-3 rounded-full",
              selectedTemplate === "modern"
                ? "bg-indigo-500"
                : selectedTemplate === "professional"
                  ? "bg-emerald-500"
                  : selectedTemplate === "creative"
                    ? "bg-rose-500"
                    : "bg-amber-500",
            )}
          ></div>
          <span className="font-medium">{TEMPLATES.find((t) => t.id === selectedTemplate)?.name} Template</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Editor Form */}
        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: "600px" }}>
          {/* Personal Information */}
          <div className="space-y-4 rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-slate-800 flex items-center">
                <User className="mr-2 h-5 w-5 text-indigo-500" />
                Personal Information
              </h3>
              {errors.personal && (
                <div className="flex items-center text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                  <AlertCircle className="mr-1 h-4 w-4" />
                  <span>Required fields missing</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center text-sm font-medium text-slate-700">
                  Full Name <span className="ml-1 text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={resumeData.personal.name}
                  onChange={(e) => updateResumeData("personal", "name", e.target.value)}
                  className={cn(
                    "focus:ring-2 focus:ring-indigo-400 transition-all duration-200",
                    errors.personal?.includes("Name is required")
                      ? "border-red-300 focus:ring-red-200"
                      : "hover:border-indigo-300",
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center text-sm font-medium text-slate-700">
                  Email <span className="ml-1 text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={resumeData.personal.email}
                  onChange={(e) => updateResumeData("personal", "email", e.target.value)}
                  className={cn(
                    "focus:ring-2 focus:ring-indigo-400 transition-all duration-200",
                    errors.personal?.includes("Email is required") ||
                      errors.personal?.includes("Email format is invalid")
                      ? "border-red-300 focus:ring-red-200"
                      : "hover:border-indigo-300",
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center text-sm font-medium text-slate-700">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={resumeData.personal.phone}
                  onChange={(e) => updateResumeData("personal", "phone", e.target.value)}
                  className="focus:ring-2 focus:ring-indigo-400 hover:border-indigo-300 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center text-sm font-medium text-slate-700">
                  Location
                </Label>
                <Input
                  id="location"
                  value={resumeData.personal.location}
                  onChange={(e) => updateResumeData("personal", "location", e.target.value)}
                  className="focus:ring-2 focus:ring-indigo-400 hover:border-indigo-300 transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary" className="text-sm font-medium text-slate-700">
                Professional Summary
              </Label>
              <Textarea
                id="summary"
                value={resumeData.personal.summary}
                onChange={(e) => updateResumeData("personal", "summary", e.target.value)}
                className="min-h-[100px] resize-y focus:ring-2 focus:ring-indigo-400 hover:border-indigo-300 transition-all duration-200"
              />
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4 rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-medium text-slate-800 flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-indigo-500" />
              Work Experience
            </h3>

            {resumeData.experience.map((exp, index) => (
              <div
                key={exp.id}
                className="space-y-4 rounded-lg border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-slate-700">Position {index + 1}</h4>
                  {errors[`experience_${index}`] && (
                    <div className="flex items-center text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      <span>Required fields missing</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`job-title-${index}`} className="text-sm font-medium text-slate-700">
                      Job Title <span className="ml-1 text-red-500">*</span>
                    </Label>
                    <Input
                      id={`job-title-${index}`}
                      value={exp.title}
                      onChange={(e) => updateResumeData("experience", "title", e.target.value, index)}
                      className={cn(
                        "focus:ring-2 focus:ring-indigo-400 transition-all duration-200",
                        errors[`experience_${index}`] ? "border-red-300 focus:ring-red-200" : "hover:border-indigo-300",
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`company-${index}`} className="text-sm font-medium text-slate-700">
                      Company <span className="ml-1 text-red-500">*</span>
                    </Label>
                    <Input
                      id={`company-${index}`}
                      value={exp.company}
                      onChange={(e) => updateResumeData("experience", "company", e.target.value, index)}
                      className={cn(
                        "focus:ring-2 focus:ring-indigo-400 transition-all duration-200",
                        errors[`experience_${index}`] ? "border-red-300 focus:ring-red-200" : "hover:border-indigo-300",
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`exp-location-${index}`} className="text-sm font-medium text-slate-700">
                      Location
                    </Label>
                    <Input
                      id={`exp-location-${index}`}
                      value={exp.location}
                      onChange={(e) => updateResumeData("experience", "location", e.target.value, index)}
                      className="focus:ring-2 focus:ring-indigo-400 hover:border-indigo-300 transition-all duration-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor={`start-date-${index}`} className="text-sm font-medium text-slate-700">
                        Start Date
                      </Label>
                      <Input
                        id={`start-date-${index}`}
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateResumeData("experience", "startDate", e.target.value, index)}
                        className="focus:ring-2 focus:ring-indigo-400 hover:border-indigo-300 transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`end-date-${index}`} className="text-sm font-medium text-slate-700">
                        End Date
                      </Label>
                      <Input
                        id={`end-date-${index}`}
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateResumeData("experience", "endDate", e.target.value, index)}
                        className="focus:ring-2 focus:ring-indigo-400 hover:border-indigo-300 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`} className="text-sm font-medium text-slate-700">
                    Description
                  </Label>
                  <Textarea
                    id={`description-${index}`}
                    value={exp.description}
                    onChange={(e) => updateResumeData("experience", "description", e.target.value, index)}
                    className="min-h-[80px] resize-y focus:ring-2 focus:ring-indigo-400 hover:border-indigo-300 transition-all duration-200"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                setResumeData((prev) => ({
                  ...prev,
                  experience: [
                    ...prev.experience,
                    {
                      id: `exp${prev.experience.length + 1}`,
                      title: "",
                      company: "",
                      location: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                      isValid: false,
                    },
                  ],
                }))
              }}
              className="w-full rounded-md border-2 border-dashed border-slate-300 py-3 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors duration-200"
            >
              + Add Another Position
            </button>
          </div>

          {/* Education */}
          <div className="space-y-4 rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-medium text-slate-800 flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-indigo-500" />
              Education
            </h3>

            {resumeData.education.map((edu, index) => (
              <div
                key={edu.id}
                className="space-y-4 rounded-lg border border-slate-100 bg-slate-50 p-4 hover:bg-slate-100 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-slate-700">Education {index + 1}</h4>
                  {errors[`education_${index}`] && (
                    <div className="flex items-center text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                      <AlertCircle className="mr-1 h-4 w-4" />
                      <span>Required fields missing</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${index}`} className="text-sm font-medium text-slate-700">
                      Degree <span className="ml-1 text-red-500">*</span>
                    </Label>
                    <Input
                      id={`degree-${index}`}
                      value={edu.degree}
                      onChange={(e) => updateResumeData("education", "degree", e.target.value, index)}
                      className={cn(
                        "focus:ring-2 focus:ring-indigo-400 transition-all duration-200",
                        errors[`education_${index}`] ? "border-red-300 focus:ring-red-200" : "hover:border-indigo-300",
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`institution-${index}`} className="text-sm font-medium text-slate-700">
                      Institution <span className="ml-1 text-red-500">*</span>
                    </Label>
                    <Input
                      id={`institution-${index}`}
                      value={edu.institution}
                      onChange={(e) => updateResumeData("education", "institution", e.target.value, index)}
                      className={cn(
                        "focus:ring-2 focus:ring-indigo-400 transition-all duration-200",
                        errors[`education_${index}`] ? "border-red-300 focus:ring-red-200" : "hover:border-indigo-300",
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`edu-location-${index}`} className="text-sm font-medium text-slate-700">
                      Location
                    </Label>
                    <Input
                      id={`edu-location-${index}`}
                      value={edu.location}
                      onChange={(e) => updateResumeData("education", "location", e.target.value, index)}
                      className="focus:ring-2 focus:ring-indigo-400 hover:border-indigo-300 transition-all duration-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor={`edu-start-date-${index}`} className="text-sm font-medium text-slate-700">
                        Start Date
                      </Label>
                      <Input
                        id={`edu-start-date-${index}`}
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateResumeData("education", "startDate", e.target.value, index)}
                        className="focus:ring-2 focus:ring-indigo-400 hover:border-indigo-300 transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`edu-end-date-${index}`} className="text-sm font-medium text-slate-700">
                        End Date
                      </Label>
                      <Input
                        id={`edu-end-date-${index}`}
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateResumeData("education", "endDate", e.target.value, index)}
                        className="focus:ring-2 focus:ring-indigo-400 hover:border-indigo-300 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                setResumeData((prev) => ({
                  ...prev,
                  education: [
                    ...prev.education,
                    {
                      id: `edu${prev.education.length + 1}`,
                      degree: "",
                      institution: "",
                      location: "",
                      startDate: "",
                      endDate: "",
                      isValid: false,
                    },
                  ],
                }))
              }}
              className="w-full rounded-md border-2 border-dashed border-slate-300 py-3 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors duration-200"
            >
              + Add Another Education
            </button>
          </div>

          {/* Skills */}
          <div className="space-y-4 rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow duration-300">
            <h3 className="text-lg font-medium text-slate-800 flex items-center">
              <Award className="mr-2 h-5 w-5 text-indigo-500" />
              Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-full bg-slate-100 px-3 py-1.5 hover:bg-indigo-100 transition-colors duration-200"
                >
                  <Input
                    value={skill}
                    onChange={(e) => updateResumeData("skills", "", e.target.value, index)}
                    className="border-none bg-transparent p-0 text-sm focus:ring-0"
                    placeholder="Add skill"
                  />
                  <button
                    onClick={() => {
                      setResumeData((prev) => ({
                        ...prev,
                        skills: prev.skills.filter((_, i) => i !== index),
                      }))
                    }}
                    className="ml-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  setResumeData((prev) => ({
                    ...prev,
                    skills: [...prev.skills, ""],
                  }))
                }
                className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors duration-200"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-slate-800">Live Preview</h3>
            <div className="flex items-center space-x-2 bg-indigo-100 px-3 py-1 rounded-full">
              <Edit className="h-4 w-4 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-700">Updates in real-time</span>
            </div>
          </div>

          <div className="overflow-y-auto custom-scrollbar" style={{ maxHeight: "500px" }}>
            {/* Resume preview based on selected template */}
            <div
              className={cn(
                "rounded-lg border p-6 transition-all duration-300 hover:shadow-md",
                selectedTemplate === "modern"
                  ? "border-indigo-100"
                  : selectedTemplate === "professional"
                    ? "border-emerald-100"
                    : selectedTemplate === "creative"
                      ? "border-rose-100"
                      : "border-amber-100",
              )}
            >
              {/* Header */}
              <div
                className={cn(
                  "mb-4 border-b pb-4",
                  selectedTemplate === "modern"
                    ? "border-indigo-200"
                    : selectedTemplate === "professional"
                      ? "border-emerald-200"
                      : selectedTemplate === "creative"
                        ? "border-rose-200"
                        : "border-amber-200",
                )}
              >
                <h1 className="text-2xl font-bold text-slate-800">{resumeData.personal.name || "Your Name"}</h1>

                <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-600">
                  {resumeData.personal.email && (
                    <div className="flex items-center">
                      <Mail className="mr-1 h-3 w-3" />
                      <span>{resumeData.personal.email}</span>
                    </div>
                  )}

                  {resumeData.personal.phone && (
                    <div className="flex items-center">
                      <Phone className="mr-1 h-3 w-3" />
                      <span>{resumeData.personal.phone}</span>
                    </div>
                  )}

                  {resumeData.personal.location && (
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      <span>{resumeData.personal.location}</span>
                    </div>
                  )}
                </div>

                {resumeData.personal.summary && (
                  <p className="mt-3 text-sm text-slate-600">{resumeData.personal.summary}</p>
                )}
              </div>

              {/* Experience */}
              {resumeData.experience.some((exp) => exp.title || exp.company) && (
                <div className="mb-4">
                  <h2
                    className={cn(
                      "mb-2 text-lg font-medium",
                      selectedTemplate === "modern"
                        ? "text-indigo-600"
                        : selectedTemplate === "professional"
                          ? "text-emerald-600"
                          : selectedTemplate === "creative"
                            ? "text-rose-600"
                            : "text-amber-600",
                    )}
                  >
                    Experience
                  </h2>

                  <div className="space-y-3">
                    {resumeData.experience.map(
                      (exp, index) =>
                        (exp.title || exp.company) && (
                          <div key={index} className="border-l-2 pl-3">
                            <div className="flex flex-wrap items-baseline justify-between">
                              <h3 className="font-medium text-slate-800">{exp.title || "Position"}</h3>
                              <div className="text-xs text-slate-500">
                                {exp.startDate && `${exp.startDate}${exp.endDate ? ` - ${exp.endDate}` : " - Present"}`}
                              </div>
                            </div>

                            <div className="text-sm text-slate-600">
                              {exp.company}
                              {exp.location && `, ${exp.location}`}
                            </div>

                            {exp.description && <p className="mt-1 text-xs text-slate-600">{exp.description}</p>}
                          </div>
                        ),
                    )}
                  </div>
                </div>
              )}

              {/* Education */}
              {resumeData.education.some((edu) => edu.degree || edu.institution) && (
                <div className="mb-4">
                  <h2
                    className={cn(
                      "mb-2 text-lg font-medium",
                      selectedTemplate === "modern"
                        ? "text-indigo-600"
                        : selectedTemplate === "professional"
                          ? "text-emerald-600"
                          : selectedTemplate === "creative"
                            ? "text-rose-600"
                            : "text-amber-600",
                    )}
                  >
                    Education
                  </h2>

                  <div className="space-y-3">
                    {resumeData.education.map(
                      (edu, index) =>
                        (edu.degree || edu.institution) && (
                          <div key={index} className="border-l-2 pl-3">
                            <div className="flex flex-wrap items-baseline justify-between">
                              <h3 className="font-medium text-slate-800">{edu.degree || "Degree"}</h3>
                              <div className="text-xs text-slate-500">
                                {edu.startDate && `${edu.startDate}${edu.endDate ? ` - ${edu.endDate}` : " - Present"}`}
                              </div>
                            </div>

                            <div className="text-sm text-slate-600">
                              {edu.institution}
                              {edu.location && `, ${edu.location}`}
                            </div>
                          </div>
                        ),
                    )}
                  </div>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills.some((skill) => skill) && (
                <div>
                  <h2
                    className={cn(
                      "mb-2 text-lg font-medium",
                      selectedTemplate === "modern"
                        ? "text-indigo-600"
                        : selectedTemplate === "professional"
                          ? "text-emerald-600"
                          : selectedTemplate === "creative"
                            ? "text-rose-600"
                            : "text-amber-600",
                    )}
                  >
                    Skills
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.filter(Boolean).map((skill, index) => (
                      <span
                        key={index}
                        className={cn(
                          "rounded-full px-2 py-1 text-xs",
                          selectedTemplate === "modern"
                            ? "bg-indigo-100 text-indigo-700"
                            : selectedTemplate === "professional"
                              ? "bg-emerald-100 text-emerald-700"
                              : selectedTemplate === "creative"
                                ? "bg-rose-100 text-rose-700"
                                : "bg-amber-100 text-amber-700",
                        )}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          onClick={goToPrevious}
          variant="outline"
          className="inline-flex items-center justify-center px-6 py-3 text-base border-2 hover:bg-slate-50 transition-colors duration-200"
        >
          <ChevronLeft className="mr-2 h-5 w-5" /> Back to Templates
        </Button>

        <Button
          onClick={handleNext}
          className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-violet-500 px-8 py-3 text-base font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Continue to Review <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

// Stage 4: Satisfaction Check
interface SatisfactionCheckStageProps {
  isSatisfied: boolean | null
  setIsSatisfied: (value: boolean) => void
  goToNext: () => void
  goToPrevious: () => void
}

function SatisfactionCheckStage({ isSatisfied, setIsSatisfied, goToNext, goToPrevious }: SatisfactionCheckStageProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">How's Your Resume Looking?</h2>
        <p className="max-w-lg text-center text-slate-600 text-lg">
          If you're happy with your resume, we'll generate personalized recommendations for you. If not, you can go back
          and make more changes.
        </p>
      </div>

      <div className="flex gap-8 mt-8">
        <button
          onClick={() => {
            setIsSatisfied(true)
            goToNext()
          }}
          className={cn(
            "flex flex-col items-center space-y-4 rounded-xl border-3 p-8 transition-all duration-300",
            isSatisfied === true
              ? "border-green-500 bg-green-50 scale-105 shadow-lg"
              : "border-slate-200 hover:border-green-300 hover:bg-green-50 hover:scale-105 hover:shadow-md",
          )}
        >
          <div className="rounded-full bg-green-100 p-5">
            <ThumbsUp className="h-10 w-10 text-green-600" />
          </div>
          <span className="text-xl font-medium text-slate-800">Yes, I'm satisfied</span>
          <p className="text-sm text-slate-500 text-center">Show me personalized recommendations</p>
        </button>

        <button
          onClick={() => {
            setIsSatisfied(false)
            goToPrevious()
          }}
          className={cn(
            "flex flex-col items-center space-y-4 rounded-xl border-3 p-8 transition-all duration-300",
            isSatisfied === false
              ? "border-amber-500 bg-amber-50 scale-105 shadow-lg"
              : "border-slate-200 hover:border-amber-300 hover:bg-amber-50 hover:scale-105 hover:shadow-md",
          )}
        >
          <div className="rounded-full bg-amber-100 p-5">
            <ThumbsDown className="h-10 w-10 text-amber-600" />
          </div>
          <span className="text-xl font-medium text-slate-800">No, I need to edit more</span>
          <p className="text-sm text-slate-500 text-center">Take me back to the editor</p>
        </button>
      </div>

      <div className="flex justify-between w-full max-w-lg pt-8">
        <Button
          onClick={goToPrevious}
          variant="outline"
          className="inline-flex items-center justify-center px-6 py-3 text-base border-2 hover:bg-slate-50 transition-colors duration-200"
        >
          <ChevronLeft className="mr-2 h-5 w-5" /> Back to Editor
        </Button>
      </div>
    </div>
  )
}

// Stage 5: Recommendations
interface RecommendationsStageProps {
  recommendations: typeof SAMPLE_RECOMMENDATIONS
  resumeData: typeof INITIAL_RESUME_DATA
  selectedTemplate: string
  goToPrevious: () => void
}

function RecommendationsStage({
  recommendations,
  resumeData,
  selectedTemplate,
  goToPrevious,
}: RecommendationsStageProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">Your Personalized Recommendations</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Based on your resume, we've generated these recommendations to help advance your career.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className={`rounded-xl border p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${rec.color}`}
          >
            <div className="mb-3 flex items-center space-x-3">
              <div className="rounded-full bg-white p-2 shadow-sm">{rec.icon}</div>
              <h3 className="font-medium text-lg text-slate-800">{rec.title}</h3>
            </div>
            <p className="text-sm text-slate-600">{rec.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800">Your Completed Resume</h3>
          <Button
            variant="outline"
            className="inline-flex items-center justify-center bg-white hover:bg-slate-100 transition-colors duration-200"
          >
            <Download className="mr-2 h-5 w-5" /> Download PDF
          </Button>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800">{resumeData.personal.name}</h1>
          <div className="mt-2 text-sm text-slate-500 flex flex-wrap gap-3">
            {resumeData.personal.email && (
              <div className="flex items-center">
                <Mail className="mr-1 h-4 w-4" /> {resumeData.personal.email}
              </div>
            )}
            {resumeData.personal.phone && (
              <div className="flex items-center">
                <Phone className="mr-1 h-4 w-4" /> {resumeData.personal.phone}
              </div>
            )}
            {resumeData.personal.location && (
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" /> {resumeData.personal.location}
              </div>
            )}
          </div>

          {resumeData.personal.summary && (
            <p className="mt-4 text-sm text-slate-600 border-l-4 pl-3 italic bg-slate-50 py-2 rounded-r-md">
              {resumeData.personal.summary}
            </p>
          )}

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h2
                className={cn(
                  "mb-3 text-lg font-medium border-b-2 pb-1",
                  selectedTemplate === "modern"
                    ? "text-indigo-600 border-indigo-200"
                    : selectedTemplate === "professional"
                      ? "text-emerald-600 border-emerald-200"
                      : selectedTemplate === "creative"
                        ? "text-rose-600 border-rose-200"
                        : "text-amber-600 border-amber-200",
                )}
              >
                Experience
              </h2>

              <div className="space-y-4">
                {resumeData.experience.map(
                  (exp, index) =>
                    (exp.title || exp.company) && (
                      <div
                        key={index}
                        className="rounded-md bg-white p-3 hover:shadow-sm transition-shadow duration-200"
                      >
                        <div className="flex flex-wrap items-baseline justify-between">
                          <h3 className="font-medium text-slate-800">{exp.title || "Position"}</h3>
                          <div className="text-xs text-slate-500">
                            {exp.startDate && `${exp.startDate}${exp.endDate ? ` - ${exp.endDate}` : " - Present"}`}
                          </div>
                        </div>

                        <div className="text-sm text-slate-600">
                          {exp.company}
                          {exp.location && `, ${exp.location}`}
                        </div>

                        {exp.description && <p className="mt-1 text-xs text-slate-600">{exp.description}</p>}
                      </div>
                    ),
                )}
              </div>
            </div>

            <div>
              <h2
                className={cn(
                  "mb-3 text-lg font-medium border-b-2 pb-1",
                  selectedTemplate === "modern"
                    ? "text-indigo-600 border-indigo-200"
                    : selectedTemplate === "professional"
                      ? "text-emerald-600 border-emerald-200"
                      : selectedTemplate === "creative"
                        ? "text-rose-600 border-rose-200"
                        : "text-amber-600 border-amber-200",
                )}
              >
                Education
              </h2>

              <div className="space-y-4">
                {resumeData.education.map(
                  (edu, index) =>
                    (edu.degree || edu.institution) && (
                      <div
                        key={index}
                        className="rounded-md bg-white p-3 hover:shadow-sm transition-shadow duration-200"
                      >
                        <div className="flex flex-wrap items-baseline justify-between">
                          <h3 className="font-medium text-slate-800">{edu.degree || "Degree"}</h3>
                          <div className="text-xs text-slate-500">
                            {edu.startDate && `${edu.startDate}${edu.endDate ? ` - ${edu.endDate}` : " - Present"}`}
                          </div>
                        </div>

                        <div className="text-sm text-slate-600">
                          {edu.institution}
                          {edu.location && `, ${edu.location}`}
                        </div>
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>

          {resumeData.skills.some(Boolean) && (
            <div className="mt-6">
              <h2
                className={cn(
                  "mb-3 text-lg font-medium border-b-2 pb-1",
                  selectedTemplate === "modern"
                    ? "text-indigo-600 border-indigo-200"
                    : selectedTemplate === "professional"
                      ? "text-emerald-600 border-emerald-200"
                      : selectedTemplate === "creative"
                        ? "text-rose-600 border-rose-200"
                        : "text-amber-600 border-amber-200",
                )}
              >
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {resumeData.skills.filter(Boolean).map((skill, index) => (
                  <span
                    key={index}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-sm font-medium",
                      selectedTemplate === "modern"
                        ? "bg-indigo-100 text-indigo-700"
                        : selectedTemplate === "professional"
                          ? "bg-emerald-100 text-emerald-700"
                          : selectedTemplate === "creative"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700",
                    )}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          onClick={goToPrevious}
          variant="outline"
          className="inline-flex items-center justify-center px-6 py-3 text-base border-2 hover:bg-slate-50 transition-colors duration-200"
        >
          <ChevronLeft className="mr-2 h-5 w-5" /> Back to Review
        </Button>

        <Button className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-violet-500 px-8 py-3 text-base font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Finish <Check className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
