'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
}

interface SidebarProps {
  navItems: NavItem[]
  projectName?: string
}

export default function Sidebar({ navItems, projectName = 'V4 Email Sorter Dave' }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-60 min-h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <span className="font-semibold text-gray-900">{projectName}</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === item.href
                ? 'bg-[var(--color-primary)] text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}