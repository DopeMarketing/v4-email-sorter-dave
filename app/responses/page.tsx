import { Suspense } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

type Response = {
  id: string
  email_subject: string
  recipient: string
  content_preview: string
  status: 'draft' | 'pending_approval' | 'approved' | 'sent' | 'rejected'
  created_at: string
  email_id: string
}

async function ResponseList() {
  // TODO: Fetch responses with email context from responses table
  const responses: Response[] = [
    {
      id: '1',
      email_subject: 'Product Update Required',
      recipient: 'customer@example.com',
      content_preview: 'Thank you for reaching out about the product update. I\'ll be happy to...',
      status: 'pending_approval',
      created_at: '2024-01-15T11:00:00Z',
      email_id: '1'
    },
    {
      id: '2',
      email_subject: 'Follow-up inquiry',
      recipient: 'client@company.com',
      content_preview: 'I appreciate your follow-up questions. Let me address each one...',
      status: 'draft',
      created_at: '2024-01-15T10:45:00Z',
      email_id: '2'
    }
  ]

  return (
    <div className="space-y-4">
      {responses.map((response) => (
        <div key={response.id} className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                response.status === 'pending_approval' ? 'bg-yellow-100 text-yellow-800' :
                response.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                response.status === 'approved' ? 'bg-green-100 text-green-800' :
                response.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {response.status.replace('_', ' ')}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(response.created_at).toLocaleDateString()}
            </span>
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-2">Re: {response.email_subject}</h3>
          <p className="text-sm text-gray-600 mb-2">To: {response.recipient}</p>
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">{response.content_preview}</p>
          
          <div className="flex gap-2">
            <Link 
              href={`/responses/${response.id}`}
              className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
            >
              Edit
            </Link>
            <Link 
              href={`/emails/${response.email_id}`}
              className="bg-gray-500 text-white px-3 py-1 text-sm rounded hover:bg-gray-600"
            >
              View Email
            </Link>
            {response.status === 'pending_approval' && (
              <>
                <button className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600">
                  Approve
                </button>
                <button className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600">
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function ResponseFilters() {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-wrap gap-3">
        <select className="px-3 py-2 border rounded-md">
          <option>All Status</option>
          <option>Draft</option>
          <option>Pending Approval</option>
          <option>Approved</option>
          <option>Sent</option>
          <option>Rejected</option>
        </select>
        <input 
          type="search" 
          placeholder="Search responses..." 
          className="px-3 py-2 border rounded-md flex-1 min-w-[200px]"
        />
        <Link 
          href="/templates"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Templates
        </Link>
      </div>
    </div>
  )
}

export default function ResponseManagement() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Response Management</h1>
        <p className="text-gray-600">Manage draft responses and approval queue</p>
      </div>
      
      {/* Response Filters */}
      <ResponseFilters />
      
      {/* Response List */}
      <Suspense fallback={<div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-lg" />)}</div>}>
        <ResponseList />
      </Suspense>
    </div>
  )
}