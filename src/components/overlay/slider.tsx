import { Shield } from '@solar-icons/react';

function Slider({slides, activeSlider}: {slides: {title: string, text: string}[], activeSlider: number}) {
  return (
    <div>
        {slides.map((slide, idx) => (
        <div
            key={idx}
            className="absolute left-0 right-0 flex-shrink-0 w-full flex flex-col gap-2 transition duration-[1000ms] ease-in-out bg-white/[0.1] backdrop-blur-sm p-4 rounded-[10px]"
            style={{ 
            width: "100%", 
            transform: activeSlider === idx ? "translateX(0%)" : activeSlider === 2 && idx === 0 ? "translateX(110%)" : activeSlider === 0 && idx === slides.length -1 ? "translateX(-110%)" : activeSlider > idx ? "translateX(-110%)" : `translateX(110%)`,
            opacity: activeSlider === idx ? 1 : 0,
            }}
        >
            <h2 className=" flex items-center gap-2 text-[14px] font-bold">
                <span className='text-secondary'><Shield size={16} weight="Outline" mirrored /></span> 
                <span>{slide.title}</span>
            </h2>
            <p className="text-[12px]">{slide.text}</p>
            
        </div>
        ))}
    </div>
  )
}

export default Slider
