import { Suspense } from 'react'
import { createClient } from '@/lib/supabase'

async function EmailMetrics() {
  // TODO: Fetch email metrics from emails and classifications tables
  const metrics = {
    totalProcessed: 1247,
    avgResponseTime: '2.3 hours',
    classificationAccuracy: '94%',
    urgentEmailsToday: 12
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Total Processed</h3>
        <p className="text-3xl font-bold text-gray-900">{metrics.totalProcessed}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Avg Response Time</h3>
        <p className="text-3xl font-bold text-gray-900">{metrics.avgResponseTime}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Classification Accuracy</h3>
        <p className="text-3xl font-bold text-gray-900">{metrics.classificationAccuracy}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Urgent Today</h3>
        <p className="text-3xl font-bold text-red-600">{metrics.urgentEmailsToday}</p>
      </div>
    </div>
  )
}

async function ResponseTimeChart() {
  // TODO: Fetch response time data from responses table grouped by date
  const chartData = [
    { day: 'Mon', avgTime: 2.1 },
    { day: 'Tue', avgTime: 1.8 },
    { day: 'Wed', avgTime: 2.5 },
    { day: 'Thu', avgTime: 2.0 },
    { day: 'Fri', avgTime: 3.2 },
    { day: 'Sat', avgTime: 1.5 },
    { day: 'Sun', avgTime: 1.2 }
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Average Response Time (Hours)</h2>
      <div className="space-y-4">
        {chartData.map((data) => (
          <div key={data.day} className="flex items-center">
            <div className="w-12 text-sm text-gray-600">{data.day}</div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-500 h-4 rounded-full" 
                  style={{ width: `${(data.avgTime / 4) * 100}%` }}
                />
              </div>
            </div>
            <div className="w-16 text-sm text-right">{data.avgTime}h</div>
          </div>
        ))}
      </div>
    </div>
  )
}

async function ClassificationBreakdown() {
  // TODO: Fetch classification distribution from classifications table
  const breakdown = [
    { priority: 'Urgent', count: 45, percentage: 15 },
    { priority: 'High', count: 89, percentage: 30 },
    { priority: 'Medium', count: 134, percentage: 45 },
    { priority: 'Low', count: 30, percentage: 10 }
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Priority Classification</h2>
      <div className="space-y-3">
        {breakdown.map((item) => (
          <div key={item.priority} className="flex items-center justify-between">
            <span className="text-sm font-medium">{item.priority}</span>
            <div className="flex items-center gap-3">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">{item.count} ({item.percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AnalyticsDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive insights into email processing and response performance</p>
      </div>
      
      {/* Email Metrics */}
      <Suspense fallback={<div className="grid grid-cols-4 gap-4 mb-8">{[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-lg" />)}</div>}>
        <EmailMetrics />
      </Suspense>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Response Time Chart */}
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
          <ResponseTimeChart />
        </Suspense>
        
        {/* Classification Breakdown */}
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
          <ClassificationBreakdown />
        </Suspense>
      </div>
    </div>
  )
}