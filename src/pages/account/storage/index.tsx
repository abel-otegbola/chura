import { Formik } from "formik";
import { ArrowRight } from "@solar-icons/react";
import { DropSimpleIcon, OrangeIcon, SpinnerIcon, ThermometerColdIcon } from "@phosphor-icons/react";
import Button from "../../../components/button/button";
import Input from "../../../components/input/input";
import Topbar from "../../../components/topbar/topbar";
import { useNavigate } from "react-router-dom";

function StorageForm() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col w-full h-full">
            <Topbar heading="Preservation" subText="Discover best preservatives for your product"/>
        <div className="flex-1 md:flex dark:bg-[#151515] bg-gray-500/[0.04] mb-4 md:mr-4 rounded-[10px] overflow-hidden">

            <div className="md:w-[75%] w-full flex items-center">
                <div className="sm:w-[550px] mx-auto w-full md:p-6 p-4 py-[10%]">
                    
                    <div className="flex flex-col justify-center gap-6">
                        <div className="">
                            <div className="">
                                <h1 className="text-lg font-bold dark:text-white mb-1">Product profile</h1>
                                <p className="text-sm text-gray-600">What are you preserving today</p>
                            </div>
                        </div>

                        <Formik
                            initialValues={{ cropType: '', temperature: "", humidity: "" }}
                            onSubmit={( values, { setSubmitting }) => {
                                navigate(`/account/storage/result?croptype=${values.cropType}&temperature=${values.temperature}&humidity=${values.humidity}`)
                                setSubmitting(false);
                            }}
                            >
                            {({
                                errors,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                                touched,
                                values
                            }) => (

                                <form onSubmit={handleSubmit} className="flex flex-col w-full overflow-x-hidden gap-6">
                                    <div className={`flex overflow-hidden max-h-[460px] overflow-y-auto`}>
                                        <div className={`w-[100%] flex flex-col gap-5 py-2 transition-all duration-500`}>
                                            <div className="flex flex-col gap-1">
                                                <label className="font-bold text-[12px]">
                                                    What agricultural product do you want to preserve?
                                                </label>
                                                <Input
                                                    name="cropType"
                                                    value={values.cropType}
                                                    placeholder="e.g Maize"
                                                    onChange={handleChange}
                                                    lefticon={<OrangeIcon size={18} />}
                                                    error={touched.cropType ? errors.cropType : ""}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <label className="font-bold text-[12px]">
                                                    What is the temperature (°C)?
                                                </label>
                                                <Input 
                                                    name="temperature"
                                                    value={values.temperature}
                                                    onChange={handleChange}
                                                    placeholder=""
                                                    label="temperature"
                                                    type="number"
                                                    lefticon={<ThermometerColdIcon size={18} />}
                                                    error={touched.temperature ? errors.temperature : ""}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <label className="font-bold text-[12px]">
                                                    What is your current humidity (%)?
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
                                    </div>


                                    <div className="flex justify-end gap-8">
                                        <Button type="submit">
                                            { isSubmitting ? <SpinnerIcon size={16} className="animate-spin" /> : "Complete submission"}
                                            <ArrowRight />
                                        </Button>
                                    </div>

                                </form>
                            )}
                        </Formik>
            
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StorageForm