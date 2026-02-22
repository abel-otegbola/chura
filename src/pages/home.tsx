import LogoIcon from "../assets/icons/logo"
import Button from "../components/button/button"

function Home() {
  return (
    <main className="p-4">
      <header className="mb-4 min-h-[95vh] md:rounded-[20px] flex flex-col rounded-[12px] bg-[url('/hero-bg.png')] bg-cover bg-center md:p-8 p-4">
        <nav className="flex justify-between items-center p-2 md:w-[75%] w-full mx-auto rounded-[12px] shadow-md bg-white">
          <div className="ml-2">
            <LogoIcon width={80} />
          </div>
          <ul className="text-[15px] font-medium">
            <li className="inline-block mx-4 text-gray-700 hover:text-gray-900 cursor-pointer">Home</li>
            <li className="inline-block mx-4 text-gray-700 hover:text-gray-900 cursor-pointer">Features</li>
            <li className="inline-block mx-4 text-gray-700 hover:text-gray-900 cursor-pointer">Pricing</li>
            <li className="inline-block mx-4 text-gray-700 hover:text-gray-900 cursor-pointer">Contact</li>
          </ul>
          <Button variant="primary" className="bg-black">Login</Button>
        </nav>
        <div className="flex flex-col flex-1 items-center justify-center gap-4 text-center md:w-[65%] w-[90%] mx-auto text-white">
          <h1 className="xl:text-[72px] md:text-[58px] sm:text-[40px] text-[28px] leading-[100%] -mt-8">Smart post-harvest infrastructure</h1>
          <p className="md:w-[65%] w-full">Data-driven systems for predicting, preserving, and managing agricultural stock.</p>
          <Button variant="secondary" className="bg-white text-black font-semibold md:px-[32px] px-[24px] py-[10px] text-[15px] hover:bg-slate-100">Get Started</Button>
        </div>
      </header>
    </main>
  )
}

export default Home
