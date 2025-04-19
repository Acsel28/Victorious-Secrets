interface StepIndicatorProps {
  number: number
  label: string
  isActive: boolean
  isCompleted: boolean
  isLast: boolean
}

export default function StepIndicator({ number, label, isActive, isCompleted, isLast }: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${
            isActive
              ? "bg-gradient-to-r from-indigo-600 to-violet-500 text-white shadow-md"
              : isCompleted
                ? "bg-indigo-100 text-indigo-700"
                : "bg-slate-100 text-slate-500"
          }`}
        >
          {number}
        </div>
        {!isLast && (
          <div className="mx-2 h-[2px] w-16 md:w-24 lg:w-32">
            <div className={`h-full ${isCompleted ? "bg-indigo-500" : "bg-slate-200"}`}></div>
          </div>
        )}
      </div>
      <span className={`mt-2 text-center text-xs font-medium ${isActive ? "text-indigo-700" : "text-slate-500"}`}>
        {label}
      </span>
    </div>
  )
}
