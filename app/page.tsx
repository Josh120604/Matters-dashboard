'use client'

import { useState, useEffect } from "react"
import mattersData from "../data/matters"
import MatterCard from "./components/MatterCard"
import SkeletonCard from "./components/SkeletonCard"

export default function Home() {

  // --- State ---
  const [matters, setMatters] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [sortBy, setSortBy] = useState('None')

  // --- Load data (simulates an API call with a short delay) ---
  useEffect(() => {
    setTimeout(() => {
      setMatters(mattersData)
      setLoading(false)
    }, 800)
  }, [])

  // --- Debounce search (only filter after user stops typing for 300ms) ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // --- Priority sort order (High = 1, Medium = 2, Low = 3) ---
  const priorityOrder = {
    'High': 1,
    'Medium': 2,
    'Low': 3,
  }

  // --- Filter and sort matters based on current state ---
  const filtered = matters
    .filter((matter) => {
      const matchesSearch =
        matter.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        matter.assignedTo.toLowerCase().includes(debouncedSearch.toLowerCase())

      const matchesStatus =
        statusFilter === 'All' || matter.status === statusFilter

      const matchesPriority =
        priorityFilter === 'All' || matter.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
    .sort((a, b) => {
      if (sortBy === 'Due Date') {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      if (sortBy === 'Priority') {
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      return 0
    })

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* --- Header --- */}
        <div className="mb-8">
          <h1 className="text-4xl font-meduim font-serifgit  text-gray-900">Matters Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            {matters.length} total matters
          </p>
        </div>

        {/* --- Search, Filter and Sort Controls --- */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by title or person..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm flex-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-gray-500 cursor-text caret-gray-500 text-gray-800"
          />

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
          >
            <option>All</option>
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
          >
            <option>None</option>
            <option>Due Date</option>
            <option>Priority</option>
          </select>
        </div>

        {/* --- Loading, Empty and Matters States --- */}
        {loading ? (
          // Loading state — show skeleton placeholders
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          // Empty state — nothing matched the search or filters
          <div className="flex flex-col items-center mt-20 text-center">
            <p className="text-gray-400 text-sm">No matters found.</p>
            <p className="text-gray-300 text-xs mt-1">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          // Matters grid — display filtered and sorted results
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((matter) => (
              <MatterCard key={matter.id} matter={matter} />
            ))}
          </div>
        )}

      </div>
    </main>
  )
}