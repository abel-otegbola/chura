import { useEffect, useState } from "react";
import LogoIcon from "../../assets/icons/logo";
import Slider from "./slider";

const slides = [
  {
    title: "Building the Future...",
    text: "Protect your crops, increase your profits, reduce food waste with AI-powered post-harvest loss prevention.",
  },
  {
    title: "Empowering Innovation",
    text: "Protect your crops, increase your profits, reduce food waste with AI-powered post-harvest loss prevention.",
  },
  {
    title: "Join Our Community",
    text: "Protect your crops, increase your profits, reduce food waste with AI-powered post-harvest loss prevention.",
  },
];

function AuthOverlay() {
  const [activeSlider, setActiveSlider] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSlider((prev) => (prev === slides.length -1 ? 0 : prev + 1));
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeSlider]);

  return (
    <div className="h-[100vh] sticky top-0 2xl:w-[58%] xl:w-[52%] md:w-[50%] md:block hidden p-6">
      <div
        style={{ backgroundImage: "url('/bg.png')" }}
        className="flex items-center px-[20%] py-[10%] bg-cover lg:bg-center bg-bottom h-full w-full rounded-[25px]"
      >
        <div className="flex flex-col gap-6 justify-between text-white w-full h-full">
          <div className="flex flex-col gap-1 text-white">
            <LogoIcon className="text-white" />
            <p>Preserving the future of agriculture by combining traditional and modern methodologies, leveraging AI Solutions</p>
          </div>

          <div className="flex flex-col gap-2">
            {/* Slides */}
            <div className="relative h-[100px] overflow-hidden">
              <div
                className="flex relative"
              >
                <Slider slides={slides} activeSlider={activeSlider} />
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-3">
              {slides.map((_, i) => (
                <button onClick={() => setActiveSlider(i)}
                  key={i}
                  className={`cursor-pointer bg-white duration-500 ${activeSlider === i ? "w-6 h-[4px]" : "w-2 h-[2px]"}`}
                  style={{ borderRadius: 2 }}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthOverlay;
