import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Predict from "./predict";
import StorageForm from "./storage";
import StorageResult from "./result";
import ProducePage from "./produce";

export default function Account() {
    // const { user } = useContext(AuthContext);
    
    // if(!user) {
    //     return <Navigate to={`/?callbackURL=${pathname}`} />
    // }
    // else {
        return (
            <div className="min-h-full w-full 2xl:text-[16px] text-[12px] max-w-[420px]:text-[12px]">
                <div className={`relative flex w-full`}>
                    <Sidebar />

                    <div className="w-full flex-1">
                        <Routes>
                            <Route path="/" element={<Navigate to={"/account/predictor"} />} />
                            <Route path="/predictor" element={<Predict />} />
                            <Route path="/storage" element={<StorageForm />} />
                            <Route path="/storage/result" element={<StorageResult />} />
                            <Route path="/produce" element={<ProducePage />} />
                        </Routes>
                    </div>
                </div>
            </div>
        )   
    // } 
}
