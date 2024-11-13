export default function Button({
  outline = false,
  icon = null,
  onClick,
  children,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 rounded-lg border-2 border-brand px-4 py-3 font-semibold hover:shadow-lg hover:shadow-brand/20 ${outline ? 'border-brand-light bg-transparent text-brand-light' : 'bg-brand text-white hover:bg-brand-dark'}`}
    >
      {icon}
      {children}
    </button>
  )
}
