import { Formik } from "formik";
import { ArrowRight } from "@solar-icons/react";
import { useState } from "react";
import { DropSimpleIcon, OrangeIcon, SpinnerIcon, ThermometerColdIcon } from "@phosphor-icons/react";
import PreservativeRecommendation from "../../../components/preservativeRecommendation/preservativeRecommendation";
import Button from "../../../components/button/button";
import Input from "../../../components/input/input";
import Dropdown from "../../../components/dropdown/dropdown";

function StorageForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [flow, setFlow] = useState(0)

  return (
    <div className="w-full">
        <div className="mx-auto w-full p-6">
            
            <div className="flex flex-col justify-center gap-6">
                <div className="">
                    <div className="">
                        <h1 className="text-lg font-bold dark:text-white mb-1">Storage Predictor</h1>
                        <p className="text-sm text-gray-600">Get Best Storage Conditions</p>
                    </div>
                </div>

                <Formik
                    initialValues={{ cropType: '', temperature: "", humidity: "" }}
                    onSubmit={( values, { setSubmitting }) => {
                        if(flow === 2) {
                            setIsLoading(true);
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
                            <div className={`flex w-[200%] gap-[0%] overflow-hidden max-h-[460px] overflow-y-auto`}>
                                <div className={`w-[100%] flex flex-col gap-5 py-2 transition-all duration-500 ${flow === 0 ? "opacity-[1] translate-x-[0]" : "opacity-0 translate-x-[-480%]"}`}>
                                    <div className="flex flex-col gap-1">
                                        <label className="font-bold text-[12px]">
                                            What agricultural product do you want to preserve?
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
                                </div>
                                <div className={`w-[100%] flex flex-col gap-5 transition-all duration-500 ${flow === 1 ? "translate-x-[-100%] opacity-[1]" : flow < 1 ? "opacity-0 translate-x-[120%]" : "opacity-0 translate-x-[-360%]"}`}>
                                    <div className="dark:bg-gray-500/[0.09] border border-gray-500/[0.2] rounded-xl p-6 "> 
                                        <PreservativeRecommendation cropType={values.cropType} temperature={values.temperature} humidity={values.humidity} />                                               
                                        
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
    
            </div>
        </div>
    </div>
  )
}

export default StorageForm