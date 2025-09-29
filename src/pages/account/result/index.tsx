import { useSearchParams } from "react-router-dom";
import PreservativeRecommendation from "../../../components/preservativeRecommendation/preservativeRecommendation";
import Topbar from "../../../components/topbar/topbar";

function StorageResult() {
    const [URLSearchParams] = useSearchParams()
    const cropType = URLSearchParams.get("croptype")?.toUpperCase() || ""
    const temperature = URLSearchParams.get("temperature")?.toUpperCase() || ""
    const humidity = URLSearchParams.get("humidity")?.toUpperCase() || ""

    return (
        <div className="flex flex-col w-full h-full">
            <Topbar heading="Preservation" subText="Discover best preservatives for your product"/>

            <div className="flex-1 md:flex dark:bg-[#151515] bg-gray-500/[0.04] mb-4 md:mr-4 rounded-[10px] overflow-hidden">
            
            <div className="w-full flex items-center">
                <div className="mx-auto w-full md:p-6 p-4 py-[10%]">
                    
                    <div className="flex flex-col justify-center gap-6">
                        <div className="">
                            <div className="">
                                <h1 className="text-lg font-bold dark:text-white mb-1">Preservatives</h1>
                                <p className="text-sm text-gray-600">Recommended preservatives</p>
                            </div>
                        </div>

                        <div className={`w-[100%] flex flex-col gap-5 transition-all duration-500`}>
                            <div className="dark:bg-gray-500/[0.09] border border-gray-500/[0.2] rounded-xl p-6 "> 
                                <PreservativeRecommendation cropType={cropType} temperature={temperature} humidity={humidity} /> 
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default StorageResult