import { useState } from "react";
import { List, Shield } from "@solar-icons/react";
import { ClockIcon, OrangeIcon } from "@phosphor-icons/react";
import Topbar from "../../../components/topbar/topbar";
import PredictorForm from "../../../components/predictorForm/predictorForm";

export default function Predict() {
    const [flow, setFlow] = useState(0)

    const data = [
        { title: "Crop profile", text: "What are you preserving today?", icon: <OrangeIcon /> },
        { title: "Quality control", text: "Current environment of your crop", icon: <Shield /> },
        { title: "Traditional preservatives", text: "Select the preservations you use?", icon: <ClockIcon /> },
        { title: "Get recommendations", text: "Predict spoilage and optimal selling time", icon: <List /> },
    ]
    

    return (
        <div className="">
                
                <Topbar heading="Crop analyzer" subText="Discover your crop condition and how to preserve"/>
                <div className="border border-gray-500/[0.2] rounded-[10px] overflow-hidden">
                    <div className="flex-1 px-2 dark:bg-[#151815] bg-gray-200/[0.09] border-b border-gray-500/[0.1]">
                        <div className="grid grid-cols-4 md:items-start md:justify-center justify-between h-full w-full md:p-[3%] p-4 md:gap-4 gap-4 rounded-[10px] text-white">
                            {
                                data.map((item, i )=> (
                                    <div key={item.title} className={`flex w-full gap-2 items-start justify-start ${flow >= i ? "text-[#13c962]" : "text-gray-500"}`}>
                                        <div className={`flex items-center justify-center rounded-full min-w-[40px] h-[40px] w-[40px] ${flow >= i ? "bg-[#13c962] dark:text-dark text-white" : " bg-gray-200/[0.12] border border-gray-500/[0.1]"}`}>{item.icon}</div>
                                        <div className={`flex-col gap-1 md:w-auto ${flow === i ? "flex justify-center" : "md:flex hidden"}`}>
                                            <p className={`text-[10px] md:hidden`}>{flow + 1}/{data.length}</p>
                                            <h1 className="font-semibold md:text-[12px] text-[10px]">{item.title}</h1>
                                            <p className={`text-[10px] md:block hidden`}>{item.text}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="sm:w-[550px] mx-auto w-full p-6 py-[7%]">
                            
                            <div className="flex flex-col justify-center gap-6 md:px-[5%]">
                                <div className="">
                                    <div className="">
                                        <h1 className="text-lg font-bold dark:text-white mb-1">{data[flow].title}</h1>
                                        <p className="text-sm text-gray-600">{data[flow].text}</p>
                                    </div>
                                </div>

                                <PredictorForm flow={flow} setFlow={setFlow} />

                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
