import ResumeBuilder from "@/components/resume-builder"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">Resume Builder</h1>
        <p className="mb-8 text-slate-600">
          Create a professional resume in minutes. Follow the steps below to get started.
        </p>
        <ResumeBuilder />
      </div>
    </main>
  )
}
