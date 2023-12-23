import {
  useEditLayoutMutation,
  useGetLayoutDataQuery,
} from "@/app/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
type Props = {};

const EditCategories = (props: Props) => {
  const [categories, setCategories] = useState<any[]>([]);
  const { data, refetch, isLoading } = useGetLayoutDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
    if (layoutSuccess) {
      toast.success("Categories updated successfully!");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage?.data.message);
      }
    }
  }, [data, layoutSuccess, error, refetch]);
  const handleCategoriesAdd = (index: number, value: string) => {
    setCategories((prevCategory) =>
      prevCategory.map((category, i) =>
        i === index ? { ...category, title: value } : category
      )
    );
  };
  const handleNewCategories = () => {
    if (categories[categories.length - 1]?.title === "") {
      toast.error("Category title can't be empty!");
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
    }
    // setCategories((prevCategory) => [...prevCategory, { title: "" }]);
  };
  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };
  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((i) => i.title === "");
  };
  const handleEditCategories = async () => {
    if (
      !areCategoriesUnchanged(data.layout.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({ type: "Categories", categories });
    }
  };
  const handleDeleteCategory = (index: number) => {
    setCategories((prevCategory: any) =>
      prevCategory.filter((_: any, i: number) => i !== index)
    );
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}>All Categories</h1>
          {categories.length > 0 ? (
            categories &&
            categories.map((item: any, index: number) => {
              return (
                <div className="p-3" key={index}>
                  <div className="flex items-center w-full justify-center">
                    <input
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      onChange={(e) =>
                        handleCategoriesAdd(index, e.target.value)
                      }
                      value={item.title}
                      placeholder="Enter category title..."
                    />
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => handleDeleteCategory(index)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center flex-col w-full h-[50vh] mt-4">
              <Image
                src={require("../../../../../public/assets/no_data.png")}
                width={300}
                height={300}
                alt=""
              />
              <p className="dark:text-white text-black text-[20px]">
                No Data Categories
              </p>
            </div>
          )}
          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={handleNewCategories}
            />
          </div>
          <br />
          <br />
          <br />
          <div
            className={`w-[100px] min-h-[40px] h-[40px] inline-flex items-center justify-center py-2 px-6 dark:text-white text-black bg-[#cccccc34] z-[999] ${
              areCategoriesUnchanged(data?.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? "!cursor-not-allowed"
                : "!cursor-pointer !bg-[#ff3377]"
            } !rounded absolute bottom-10 right-10`}
            onClick={
              areCategoriesUnchanged(data?.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? () => null
                : handleEditCategories
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
