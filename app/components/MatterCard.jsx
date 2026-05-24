export default function MatterCard({ matter }) {
  const statusStyles = {
    "In Progress": "bg-blue-100 text-blue-800",
    "Done": "bg-green-100 text-green-800",
    "Not Started": "bg-gray-100 text-gray-600",
  }

  const priorityStyles = {
    "High": "bg-red-100 text-red-800",
    "Medium": "bg-amber-100 text-amber-800",
    "Low": "bg-gray-100 text-gray-600",
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <h2 className="text-base font-medium text-gray-900 mb-3">
        {matter.title}
      </h2>

      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs text-gray-400">Assigned to</span>
        <span className="text-xs font-medium text-gray-700">
          {matter.assignedTo}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-gray-400">Due</span>
        <span className="text-xs font-medium text-gray-700">
          {matter.dueDate}
        </span>
      </div>

      <div className="flex gap-2">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[matter.status]}`}>
          {matter.status}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityStyles[matter.priority]}`}>
          {matter.priority}
        </span>
      </div>
    </div>
  )
}