interface HeaderProps {
  title: string
  actions?: React.ReactNode
}

export default function Header({ title, actions }: HeaderProps) {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  )
}