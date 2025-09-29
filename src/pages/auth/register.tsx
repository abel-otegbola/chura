import { Formik } from "formik";
import { useContext, useEffect, useRef } from "react";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import { registerSchema } from "../../schema/authSchema";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingIcon from "../../assets/icons/loading";
import { Link, useSearchParams } from "react-router-dom";
import AuthOverlay from "../../components/overlay/overlay";
import { Letter, Lock } from "@solar-icons/react";

export default function Register() {
  const { signup, loading } = useContext(AuthContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [URLSearchParams] = useSearchParams()
  const callbackURL = URLSearchParams.get("callbackURL") || ""

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  return (
    <div className="min-h-[400px] font-Legend flex sm:items-center justify-between">

      <AuthOverlay />

      <div className="flex 2xl:w-[42%] xl:w-[48%] md:w-[50%] h-full w-full">
        <div className="sm:w-[445px] md:mx-0 mx-auto w-full p-6">
          <div className="flex flex-col justify-center gap-6 md:p-[5%] md:py-[5%] py-[80px]">
            <div>
              <h1 className="font-semibold md:text-[30px] text-[24px] text-dark-500">Create Your Account</h1>
              <p className="text-gray-500">Sign up to get started with Chura</p>
            </div>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={registerSchema}
              onSubmit={(values, { setSubmitting }) => {
                signup(values.email, values.password, callbackURL || "/account");
                setSubmitting(false);
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
                  <Input
                    name="email"
                    value={values.email}
                    lefticon={<Letter weight="Bold" size={16} />}
                    onChange={handleChange}
                    type="email"
                    error={touched.email ? errors.email : ""}
                    label="Email Address"
                  />
                  <Input
                    name="password"
                    value={values.password}
                    lefticon={<Lock weight="Bold" size={16} />}
                    onChange={handleChange}
                    type="password"
                    error={touched.password ? errors.password : ""}
                    label="Password"
                  />
                  <Button type="submit" className="w-full">
                    {isSubmitting || loading ? <LoadingIcon color="white" className="animate-spin w-[20px]" /> : "Register"}
                  </Button>
                </form>
              )}
            </Formik>
            <div className="text-center mt-4 text-[14px]">
              Already have an account? <Link to="/"><span className="text-primary">Login</span></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

