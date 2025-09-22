import { Formik } from "formik";
import { ArrowRight } from "@solar-icons/react";
import { useState } from "react";
import type { PredictionResult } from "../../interface/auth";
import { EnhancedSpoilagePredictor } from "../../helpers/storagePredictor";
import Dropdown from "../dropdown/dropdown";
import { ClockIcon, DropSimpleIcon, HouseIcon, OrangeIcon, SpinnerIcon, ThermometerColdIcon } from "@phosphor-icons/react";
import Input from "../input/input";
import Checkbox from "../checkbox/checkbox";
import PreservativeSelector from "../../helpers/preservativeSelector";
import Button from "../button/button";

function PredictorForm({ flow, setFlow }: { flow: number, setFlow: (flow: number) => void }) {
    const [predictor] = useState(() => new EnhancedSpoilagePredictor());
    const [prediction, setPrediction] = useState<PredictionResult | null>(null);
    const [selectedPreservatives, setSelectedPreservatives] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false);

    const getAlertColor = (level: string) => {
        switch (level) {
          case 'high': return 'bg-gray-500/[0.05] border-red-500/[0.05] text-red-700';
          case 'medium': return 'bg-gray-500/[0.05] border-yellow-500/[0.05] text-yellow-700';
          case 'low': return 'bg-gray-500/[0.05] border-green-500/[0.05] text-green-500';
          default: return 'bg-gray-500/[0.05] border-blue-500/[0.05] text-blue-700';
        }
    };

  return (
    <Formik
        initialValues={{ cropType: '', storageType: '', temperature: "", humidity: "", storageDuration: "", pestPresence: false}}
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

            <form onSubmit={handleSubmit} className="flex flex-col w-full overflow-x-hidden gap-6">
                <div className={`flex w-[480%] gap-[5.55%] overflow-hidden`}>
                    <div className={`w-[80%] flex flex-col gap-5 py-2 transition-all duration-500 ${flow === 0 ? "opacity-[1] translate-x-[0]" : "opacity-0 translate-x-[-480%]"}`}>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold text-[12px]">
                                What agricultural commodity are you preserving?
                            </label>
                            <Dropdown
                                name="cropType"
                                value={values.cropType}
                                placeholder="Crop type"
                                onChange={(value) => setFieldValue("cropType", value)}
                                lefticon={<OrangeIcon size={18} />}
                                error={touched.cropType ? errors.cropType : ""}
                                options={[ "maize", "rice", "fish", "cassava", "wheat", "meat", "beans", "other" ]}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold text-[12px]">
                                How are you storing it?
                            </label>
                            <Dropdown
                                name="storageType"
                                placeholder="Storage type"
                                value={values.storageType}
                                onChange={(value) => setFieldValue("storageType", value)}
                                lefticon={<HouseIcon size={18} />}
                                error={touched.storageType ? errors.storageType : ""}
                                options={[ "Silo", "Warehouse", "Bag Storage", "Open Air" ]}
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
                                label="storage duration (days)"
                                type="number"
                                lefticon={<ClockIcon size={18} />}
                                error={touched.storageDuration ? errors.storageDuration : ""}
                            />
                        </div>
                    </div>
                    <div className={`w-[80%] flex flex-col gap-5 transition-all duration-500 ${flow === 1 ? "translate-x-[-126.5%] opacity-[1]" : flow < 1 ? "opacity-0 translate-x-[120%]" : "opacity-0 translate-x-[-360%]"}`}>
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
                                lefticon={<ThermometerColdIcon size={18} />}
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
                                lefticon={<DropSimpleIcon size={18} />}
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
                    
                    <div className={`w-[80%] flex flex-col gap-5 transition-all duration-500 ${flow === 2 ? "translate-x-[-253.25%] opacity-[1]" : flow < 2 ? "opacity-0 translate-x-[120%]" : "opacity-0 translate-x-[-360%]"}`}>
                        <PreservativeSelector selectedPreservatives={selectedPreservatives} onPreservativeChange={setSelectedPreservatives} cropType={values.cropType} />
                    </div>

                    <div className={`w-[80%] flex flex-col gap-5 transition-all duration-500 ${flow === 3 ? "translate-x-[-380%] opacity-[1]" : flow < 3 ? "opacity-0 translate-x-[120%]" : "opacity-0 translate-x-[-120%]"}`}>
                        <div className="dark:bg-gray-500/[0.09] border border-gray-500/[0.2] rounded-xl p-6 ">                                                
                            {prediction ? (
                            <div className="space-y-4 overflow-y-auto">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className={`flex flex-col justify-between border rounded-lg p-3 ${getAlertColor(prediction.alertLevel)}`}>
                                        <h3 className="text-[12px] font-semibold">Spoilage Risk</h3>
                                        <span className="text-lg font-bold">
                                        {(prediction.spoilageProbability * 100).toFixed(1)}%
                                        </span>
                                        <p className="mt-1 text-[10px]">
                                            Alert Level: <span className="font-semibold capitalize">{prediction.alertLevel}</span>
                                        </p>
                                    </div>

                                    <div className="bg-gray-500/[0.05] border border-blue-500/[0.05] rounded-lg p-3">
                                        <h3 className="font-semibold text-blue-500 mb-2">Time to Spoilage</h3>
                                        <p className="text-lg font-bold text-blue-400">
                                            {prediction.timeToSpoilage} days
                                        </p>
                                        <p className="text-[10px] text-blue-400 mt-1">
                                            Estimated time before significant spoilage occurs
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-1 py-1 border-b border-gray-500/[0.1]">Recommendations</h3>
                                    <ul className="space-y-1 py-1">
                                        {[...prediction.recommendations, ...prediction.preservativeRecommendations].map((rec, index) => (
                                        <li key={index} className="text-[12px] flex items-start">
                                            <span className="text-green-500 mr-2">✓</span>
                                            <span className="">{rec}</span>
                                        </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-gray-500/[0.05] border border-gray-500/[0.1] rounded-lg p-4">
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
                            { isSubmitting || isLoading ? <SpinnerIcon size={16} className="animate-spin" /> : flow === 2 ? "Complete submission" : "Next step"}
                            <ArrowRight />
                        </Button>
                        :
                        ""
                    }
                </div>

            </form>
        )}
    </Formik>
  )
}

export default PredictorForm