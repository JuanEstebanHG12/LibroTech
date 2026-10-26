function AuthField({ id, label, type = 'text', ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[11px] leading-[13px] text-muted">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="h-[39px] w-full rounded-[3px] border border-field-border bg-field px-[11px] text-[11px] text-navy-800 outline-none placeholder:text-placeholder focus:border-navy-800"
        {...props}
      />
    </div>
  )
}

export default AuthField
