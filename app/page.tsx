import { Suspense } from 'react'
import { createClient } from '@/lib/supabase'

async function EmailStatsWidget() {
  // TODO: Fetch email statistics from emails table
  const stats = {
    total: 145,
    unread: 23,
    prioritized: 8,
    responded: 89
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Emails</h3>
        <p className="text-2xl font-bold">{stats.total}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Unread</h3>
        <p className="text-2xl font-bold">{stats.unread}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">High Priority</h3>
        <p className="text-2xl font-bold">{stats.prioritized}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Responded</h3>
        <p className="text-2xl font-bold">{stats.responded}</p>
      </div>
    </div>
  )
}

async function RecentActivityFeed() {
  // TODO: Fetch recent activity from emails, responses, and notifications tables
  const activities = [
    { id: 1, type: 'email', description: 'New email from customer@example.com', time: '2 min ago' },
    { id: 2, type: 'response', description: 'Response approved via SMS', time: '5 min ago' },
    { id: 3, type: 'classification', description: 'Email classified as urgent', time: '10 min ago' }
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
            <div>
              <p className="text-sm font-medium">{activity.description}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Overview of your email management system</p>
      </div>
      
      <div className="space-y-8">
        {/* Email Statistics */}
        <Suspense fallback={<div className="h-24 bg-gray-100 animate-pulse rounded-lg" />}>
          <EmailStatsWidget />
        </Suspense>
        
        {/* Recent Activity */}
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
          <RecentActivityFeed />
        </Suspense>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <a href="/emails" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Emails</a>
            <a href="/responses" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Manage Responses</a>
            <a href="/analytics" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">View Analytics</a>
          </div>
        </div>
      </div>
    </div>
  )
}