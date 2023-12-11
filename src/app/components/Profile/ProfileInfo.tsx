import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import avatarIcon from "../../../../public/assets/avatar.jpg";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";
import {
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from "@/app/redux/features/user/userApi";
import { useLoadUserQuery } from "@/app/redux/features/api/apiSlice";
import { toast } from "react-toastify";

type Props = {
  user: any;
  avatar: string | null;
};

const ProfileInfo: FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [updateProfile, { isSuccess: success, error: updateError }] =
    useUpdateProfileMutation();
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});

  const imageHandler = (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      refetch();
    }
    if (error || updateError) {
      console.log(error);
    }
    if (success) {
      toast.success("Profile updated successfully!");
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await updateProfile({ name: name });
    }
  };
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={
              userData?.user?.avatar || avatar
                ? userData?.user.avatar.url || avatar
                : avatarIcon
            }
            alt="avatar icon"
            width={120}
            height={120}
            className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 dark:border-[#ff3377] border-[#00ffca] object-cover"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp,image/gif"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={18} className="z-9" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2 text-black dark:text-white">
                Full Name
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0"`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2 text-black dark:text-white">
                Email Address
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0"`}
                required
                readOnly
                value={user?.email}
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
    </>
  );
};

export default ProfileInfo;
