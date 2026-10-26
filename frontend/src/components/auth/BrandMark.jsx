import libro from '../../assets/icons/libro.svg'

function BrandMark() {
  return (
    <div className="flex h-[27px] items-center gap-2.5">
      <img src={libro} alt="" className="size-5" />
      <p className="font-brand text-[22px] leading-[27px] font-bold text-navy-800">
        Libro Tech
      </p>
    </div>
  )
}

export default BrandMark
