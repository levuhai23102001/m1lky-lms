import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "@/app/styles/style";
import { useRegisterMutation } from "@/app/redux/features/auth/authApi";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Successfully!";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Sign up to M 1 L K Y</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={`${styles.label}`} htmlFor="name">
            Name
          </label>
          <input
            type="text"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="your name"
            className={`${errors.name && touched.name && "border-pink-500"} ${
              styles.input
            }`}
          />
          {errors.name && touched.name && (
            <span className="text-pink-600 pt-2 block">{errors.name}</span>
          )}
        </div>
        <div className="w-full mt-5">
          <label className={`${styles.label}`} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="your-email@example.com"
            className={`${errors.email && touched.email && "border-pink-500"} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-pink-600 pt-2 block">{errors.email}</span>
          )}
        </div>

        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            Password
          </label>
          <input
            type={!show ? "password" : "text"}
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@%"
            className={`${
              errors.password && touched.password && "border-pink-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-pink-600 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-5">
          <button type="submit" className={`${styles.button}`}>
            <span className="absolute w-0 h-0 transition-all duration-200 ease-out bg-white rounded-full group-hover:w-full group-hover:h-full opacity-25"></span>
            <span className="relative">Sign Up</span>
          </button>
        </div>
        <h5 className="text-center mt-7 font-Poppins text-[14px] text-black dark:text-white">
          or sign up with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub
            size={30}
            fill={theme === "light" ? "#000" : "#fff"}
            className="cursor-pointer ml-2"
          />
        </div>
        <h5 className="text-center my-5 font-Poppins text-[14px] text-black dark:text-white">
          Already have an account?
          <span
            className="text-[#ff3377] pl-1 cursor-pointer font-semibold"
            onClick={() => setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
      </form>
    </div>
  );
};

export default SignUp;
