function AuthButton({ children, ...props }) {
  return (
    <button
      type="submit"
      className="flex h-[45px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-[3px] bg-navy-800 text-white transition-colors hover:bg-navy-900"
      {...props}
    >
      <span className="text-[11px] font-bold">{children}</span>
      <span className="text-[17px] leading-[18px]" aria-hidden="true">→</span>
    </button>
  )
}

export default AuthButton
