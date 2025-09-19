import { Formik } from "formik";
import { useState } from "react";
import Button from "../../../components/button/button";
import { ArrowRight, ClockCircle, List, Shield, Thermometer, Waterdrops } from "@solar-icons/react";
import { ClockIcon, OrangeIcon, SpinnerIcon } from "@phosphor-icons/react";
import Input from "../../../components/input/input";
import Topbar from "../../../components/topbar/topbar";
import Dropdown from "../../../components/dropdown/dropdown";
import LogoIcon from "../../../assets/icons/logo";
import Checkbox from "../../../components/checkbox/checkbox";
import PreservativeSelector from "../../../helpers/preservativeSelector";
import type { PredictionResult } from "../../../interface/auth";
import { EnhancedSpoilagePredictor } from "../../../helpers/storagePredictor";

export default function Predict() {
    const [flow, setFlow] = useState(0)
      const [predictor] = useState(() => new EnhancedSpoilagePredictor());
      const [prediction, setPrediction] = useState<PredictionResult | null>(null);
      const [selectedPreservatives, setSelectedPreservatives] = useState<string[]>([])
      const [isLoading, setIsLoading] = useState(false);

    const data = [
        { title: "Crop Profile", text: "What's growing in your fields today?", icon: <OrangeIcon /> },
        { title: "Quality Control", text: "Current environment of your crops", icon: <Shield /> },
        { title: "Traditional Preservatives", text: "Select any traditional preservation methods you're using?", icon: <ClockIcon /> },
        { title: "Protection Plan", text: "Select preservatives to extend shelf life", icon: <List /> },
    ]


    
      const getAlertColor = (level: string) => {
        switch (level) {
          case 'high': return 'bg-red-100/[0.1] border-red-500/[0.4] text-red-700';
          case 'medium': return 'bg-yellow-100/[0.1] border-yellow-500/[0.4] text-yellow-700';
          case 'low': return 'bg-green-100/[0.1] border-green-500/[0.4] text-green-700';
          default: return 'bg-blue-100/[0.1] border-blue-500/[0.4] text-blue-700';
        }
      };
    

    return (
        <div className="md:min-h-[400px] md:flex sm:items-stretch justify-between">
            <div className="flex-1 md:p-[20px] p-2 md:h-[100vh] sticky top-[0px]">
                <div className="md:flex md:flex-col hidden md:items-start md:justify-center justify-between h-full w-full md:p-[20%] p-4 md:gap-12 gap-8 rounded-[10px] dark:bg-[#151515] bg-gray-200/[0.09] text-white rounded  border border-gray-500/[0.2]">
                    <div className="md:block hidden dark:text-white text-primary">
                        <LogoIcon className="" />
                    </div>
                    
                    {
                        data.map((item, i )=> (
                            <div key={item.title} className={`flex w-full gap-2 items-start justify-start ${flow >= i ? "dark:text-secondary text-primary" : "text-gray-500"}`}>
                                <div className={`flex items-center justify-center rounded-full h-[40px] w-[40px] ${flow >= i ? "bg-secondary/[0.12] border border-secondary" : " bg-gray-200/[0.12]"}`}>{item.icon}</div>
                                <div className={`flex-col gap-1 md:w-auto ${flow === i ? "flex justify-center" : "md:flex hidden"}`}>
                                    <p className={`text-[10px] md:hidden`}>step {flow + 1}/{data.length}</p>
                                    <h1 className="font-semibold md:text-[12px] text-[10px]">{item.title}</h1>
                                    <p className={`text-[10px] md:block hidden`}>{item.text}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="md:w-[60%] w-full">
                <Topbar heading="Crop analyzer" subText="Discover your crop condition and how to preserve"/>
                <div className="sm:w-[550px] mx-auto w-full p-6">
                    
                    <div className="flex flex-col justify-center gap-6 md:px-[5%]">
                        <div className="">
                            <div className="border border-primary/[0.2] rounded-[10px] p-4 bg-gray-200/[0.09] dark:bg-[#151515]">
                                <h1 className="text-lg font-semibold dark:text-white mb-1">{data[flow].title}</h1>
                                <p className="text-sm text-gray-600">{data[flow].text}</p>
                            </div>
                        </div>

                        <Formik
                            initialValues={{ cropType: '', storageType: '', temperature: 0, humidity: 0, storageDuration: 0, pestPresence: false}}
                            onSubmit={( values, { setSubmitting }) => {
                                if(flow === 2) {
                                    setIsLoading(true);
                                    
                                    // Simulate API call delay
                                    setTimeout(() => {
                                        const result = predictor.predict({...values, traditionalPreservatives: selectedPreservatives});
                                        setPrediction(result);
                                        setIsLoading(false);
                                        setFlow(3)
                                    }, 500);
                                }
                                else {
                                    if(values.cropType !== ""){
                                        setFlow(flow+1)
                                    }
                                }
                                setSubmitting(false);
                            }}
                            >
                            {({
                                errors,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                                setFieldValue,
                                touched,
                                values
                            }) => (

                                <form onSubmit={handleSubmit} className="flex flex-col w-full overflow-x-hidden gap-6 ">
                                    <div className={`flex w-[480%] gap-[5.5%] overflow-hidden`}>
                                        <div className={`w-[80%] flex flex-col gap-5 py-2 transition-all duration-500 ${flow === 0 ? "translate-x-[0]" : "translate-x-[-480%]"}`}>
                                            <div className="flex flex-col gap-1">
                                                <label className="font-bold text-[12px]">
                                                    What crop are you storing?
                                                </label>
                                                <Dropdown
                                                    name="cropType"
                                                    value={values.cropType}
                                                    onChange={(value) => setFieldValue("cropType", value)}
                                                    lefticon={<OrangeIcon weight="bold" size={18} />}
                                                    error={touched.cropType ? errors.cropType : ""}
                                                    options={[ "--select--", "maize", "rice", "fish", "cassava", "wheat", "meat", "beans", "other" ]}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label className="font-bold text-[12px]">
                                                    How are you storing your crop?
                                                </label>
                                                <Dropdown
                                                    name="storageType"
                                                    value={values.storageType}
                                                    onChange={(value) => setFieldValue("storageType", value)}
                                                    lefticon={<OrangeIcon weight="bold" size={18} />}
                                                    error={touched.storageType ? errors.storageType : ""}
                                                    options={[ "--select--", "Silo", "Warehouse", "Bag Storage", "Open Air" ]}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <label className="font-bold text-[12px]">
                                                    How long have you stored it?
                                                </label>
                                                <Input 
                                                    name="storageDuration"
                                                    value={values.storageDuration}
                                                    onChange={handleChange}
                                                    label="storageDuration (days)"
                                                    type="number"
                                                    lefticon={<ClockCircle weight="BoldDuotone" size={18} />}
                                                    error={touched.storageDuration ? errors.storageDuration : ""}
                                                />
                                            </div>
                                        </div>
                                        <div className={`w-[80%] flex flex-col gap-5 transition-all duration-500 ${flow === 1 ? "translate-x-[-126.25%]" : flow < 1 ? "translate-x-[120%]" : "translate-x-[-360%]"}`}>
                                            <div className="flex flex-col gap-3">
                                                <label className="font-bold text-[12px]">
                                                    What is the temperature?
                                                </label>
                                                <Input 
                                                    name="temperature"
                                                    value={values.temperature}
                                                    onChange={handleChange}
                                                    label="temperature"
                                                    type="number"
                                                    lefticon={<Thermometer weight="BoldDuotone" size={18} />}
                                                    error={touched.temperature ? errors.temperature : ""}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <label className="font-bold text-[12px]">
                                                    What is your current humidity?
                                                </label>
                                                <Input 
                                                    name="humidity"
                                                    value={values.humidity}
                                                    onChange={handleChange}
                                                    label="humidity"
                                                    type="number"
                                                    lefticon={<Waterdrops weight="BoldDuotone" size={18} />}
                                                    error={touched.humidity ? errors.humidity : ""}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <label className="font-bold text-[12px]" htmlFor="pestPresence">
                                                    Did you discover any pest?
                                                </label>
                                                <Checkbox 
                                                    name="pestPresence"
                                                    id="pestPresence"
                                                    check={values.pestPresence}
                                                    onCheck={(value) => setFieldValue("pestPresence", value)}
                                                    label="Pest presence"
                                                    error={touched.humidity ? errors.pestPresence : ""}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className={`w-[80%] flex flex-col gap-5 transition-all duration-500 ${flow === 2 ? "translate-x-[-252.75%]" : flow < 2 ? "translate-x-[120%]" : "translate-x-[-360%]"}`}>
                                            <PreservativeSelector selectedPreservatives={selectedPreservatives} onPreservativeChange={setSelectedPreservatives} cropType={values.cropType} />
                                        </div>

                                        <div className={`w-[80%] flex flex-col gap-5 transition-all duration-500 ${flow === 3 ? "translate-x-[-378.75%]" : flow < 3 ? "translate-x-[120%]" : "translate-x-[-120%]"}`}>
                                            <div className="bg-gray-500/[0.09] rounded-xl shadow-lg p-6 ">                                                
                                                {prediction ? (
                                                <div className="space-y-2 overflow-y-auto">
                                                    <div className={`border rounded p-2 ${getAlertColor(prediction.alertLevel)}`}>
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="text-[12px] font-semibold">Spoilage Risk</h3>
                                                        <span className="text-lg font-bold">
                                                        {(prediction.spoilageProbability * 100).toFixed(1)}%
                                                        </span>
                                                    </div>
                                                    <p className="mt-1 text-[10px]">
                                                        Alert Level: <span className="font-semibold capitalize">{prediction.alertLevel}</span>
                                                    </p>
                                                    </div>

                                                    <div className="bg-blue-50/[0.09] border border-blue-200/[0.2] rounded-lg p-2">
                                                    <h3 className="font-semibold text-blue-800 mb-2">Time to Spoilage</h3>
                                                    <p className="text-lg font-bold text-blue-600">
                                                        {prediction.timeToSpoilage} days
                                                    </p>
                                                    <p className="text-[10px] text-blue-700 mt-1">
                                                        Estimated time before significant spoilage occurs
                                                    </p>
                                                    </div>

                                                    <div>
                                                    <h3 className="font-semibold  mb-3">Recommendations</h3>
                                                    <ul className="space-y-1">
                                                        {[...prediction.recommendations, ...prediction.preservativeRecommendations].map((rec, index) => (
                                                        <li key={index} className="text-[12px] flex items-start">
                                                            <span className="text-green-500 mr-2">✓</span>
                                                            <span className="">{rec}</span>
                                                        </li>
                                                        ))}
                                                    </ul>
                                                    </div>

                                                    <div className="bg-gray-50/[0.09] rounded-lg p-4">
                                                    <h3 className="font-semibold  mb-2">Optimal Selling Time</h3>
                                                    <p className="">
                                                        {prediction.timeToSpoilage > 14 
                                                        ? `Sell within the next ${Math.min(prediction.timeToSpoilage, 30)} days for best price` 
                                                        : 'Sell immediately to avoid losses'}
                                                    </p>
                                                    </div>
                                                </div>
                                                ) : (
                                                <div className="text-center py-12">
                                                    <div className="text-gray-400 mb-4">
                                                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                    </svg>
                                                    </div>
                                                    <p className="text-gray-500">
                                                    Enter storage conditions to get AI-powered predictions
                                                    </p>
                                                </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex justify-end gap-8">
                                        {
                                            flow > 0 ?
                                            <button tabIndex={1} onClick={(e) => {setFlow(flow -1); e.preventDefault()}} className="px-6 py-2 border border-gray-300 cursor-pointer rounded-[8px]">
                                                { isSubmitting ? <SpinnerIcon size={16} className="animate-spin" /> : "Back"}
                                            </button>
                                            :
                                            <span></span>
                                        }
                                        {
                                            flow < 3 ?
                                            <Button type="submit">
                                                { isSubmitting || isLoading ? <SpinnerIcon size={16} className="animate-spin" /> : flow === 3 ? "Finish" : "Next"}
                                                <ArrowRight />
                                            </Button>
                                            :
                                            ""
                                        }
                                    </div>

                                </form>
                            )}
                        </Formik>

                    </div>
                </div>
            </div>

        </div>
    )
}
