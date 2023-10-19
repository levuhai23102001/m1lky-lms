import React, { FC, useState, useEffect } from "react";
import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/app/redux/features/user/userApi";
import { toast } from "react-toastify";

type Props = {};

const ChangePassword: FC<Props> = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const HandleChangePassword = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password do not match!");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full pl-6 px-2 800px:pl-0 800px:px-5">
      <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-6">
        Change Password
      </h1>
      <div className="w-full">
        <form
          onSubmit={HandleChangePassword}
          className="flex flex-col items-center"
        >
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2 text-black dark:text-white">
                Enter your old password
              </label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0"`}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2 text-black dark:text-white">
                Enter your new password
              </label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0"`}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2 text-black dark:text-white">
                Confirm your new password
              </label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0"`}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input
              className={`w-full 800px:w-[250px] h-[40px] border dark:border-[#ff3377] border-[#00ffca]  text-center dark:text-[#fff] text-black rounded-[4px] mt-6 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
