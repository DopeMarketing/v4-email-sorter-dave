import { Suspense } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

type Email = {
  id: string
  subject: string
  sender: string
  preview: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'unread' | 'read' | 'responded'
  received_at: string
}

async function EmailList() {
  // TODO: Fetch emails with classifications from emails table
  const emails: Email[] = [
    {
      id: '1',
      subject: 'Important: Product Update Required',
      sender: 'customer@example.com',
      preview: 'Hi, we need urgent assistance with our product configuration...',
      priority: 'urgent',
      status: 'unread',
      received_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      subject: 'Follow-up on previous inquiry',
      sender: 'client@company.com',
      preview: 'Thank you for your response. I have a few additional questions...',
      priority: 'medium',
      status: 'read',
      received_at: '2024-01-15T09:15:00Z'
    }
  ]

  return (
    <div className="space-y-2">
      {emails.map((email) => (
        <Link key={email.id} href={`/emails/${email.id}`}>
          <div className="bg-white border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  email.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                  email.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                  email.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {email.priority}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  email.status === 'unread' ? 'bg-blue-100 text-blue-800' :
                  email.status === 'read' ? 'bg-gray-100 text-gray-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {email.status}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(email.received_at).toLocaleDateString()}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{email.subject}</h3>
            <p className="text-sm text-gray-600 mb-1">From: {email.sender}</p>
            <p className="text-sm text-gray-500 line-clamp-2">{email.preview}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

function FilterBar() {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-wrap gap-3">
        <select className="px-3 py-2 border rounded-md">
          <option>All Priorities</option>
          <option>Urgent</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select className="px-3 py-2 border rounded-md">
          <option>All Status</option>
          <option>Unread</option>
          <option>Read</option>
          <option>Responded</option>
        </select>
        <input 
          type="search" 
          placeholder="Search emails..." 
          className="px-3 py-2 border rounded-md flex-1 min-w-[200px]"
        />
      </div>
    </div>
  )
}

export default function EmailManagement() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Email Management</h1>
        <p className="text-gray-600">Manage and classify your incoming emails</p>
      </div>
      
      {/* Filter Bar */}
      <FilterBar />
      
      {/* Email List */}
      <Suspense fallback={<div className="space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg" />)}</div>}>
        <EmailList />
      </Suspense>
    </div>
  )
}