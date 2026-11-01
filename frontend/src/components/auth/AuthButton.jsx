import { ArrowRight, Loader2 } from 'lucide-react'

function AuthButton({ children, loading = false, ...props }) {
  return (
    <button
      type="submit"
      disabled={loading}
      aria-busy={loading}
      className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-6 text-base leading-6 font-semibold text-primary-fg transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-70"
      {...props}
    >
      {children}
      {loading ? (
        <Loader2 className="size-5 animate-spin" aria-hidden="true" />
      ) : (
        <ArrowRight className="size-5" aria-hidden="true" />
      )}
    </button>
  )
}

export default AuthButton
