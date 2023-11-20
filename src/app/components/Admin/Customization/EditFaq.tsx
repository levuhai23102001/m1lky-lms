import {
  useEditLayoutMutation,
  useGetLayoutDataQuery,
} from "@/app/redux/features/layout/layoutApi";
import { styles } from "@/app/styles/style";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import Loader from "../../Loader/Loader";
import Image from "next/image";

type Props = {};

const EditFaq = (props: Props) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const { data, refetch, isLoading } = useGetLayoutDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
    if (layoutSuccess) {
      toast.success("FAQ updated successfully!");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage?.data.message);
      }
    }
  }, [data, layoutSuccess, error, refetch]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (index: number, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) => (i === index ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (index: number, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) => (i === index ? { ...q, answer: value } : q))
    );
  };

  const handleNewFaq = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  //func to check if the FAQ arrays are unchanged
  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (question: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };
  const handleDeleteFaq = (index: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_: any, i: number) => i !== index)
    );
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
          <div className="mt-12">
            <dl className="space-y-8">
              {questions.length > 0 ? (
                questions.map((q: any, index) => (
                  <div
                    key={q._id}
                    className={`${
                      q._id !== questions[0]?._id && "border-t"
                    } dark:border-gray-200 border-[#000] pt-6`}
                  >
                    <dt className="text-lg">
                      <button
                        className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                        onClick={() => toggleQuestion(q._id)}
                      >
                        <input
                          className={`${styles.input} border-none`}
                          value={q.question}
                          onChange={(e: any) =>
                            handleQuestionChange(index, e.target.value)
                          }
                          placeholder="Add your question..."
                        />

                        <span className="ml-6 flex-shrink-0">
                          {q.active ? (
                            <HiMinus className="w-6 h-6" />
                          ) : (
                            <HiPlus className="w-6 h-6" />
                          )}
                        </span>
                      </button>
                    </dt>
                    {q.active && (
                      <dd className="mt-2 pr-12">
                        <input
                          className={`${styles.input} border-none`}
                          value={q.answer}
                          onChange={(e: any) =>
                            handleAnswerChange(index, e.target.value)
                          }
                          placeholder="Add your answer..."
                        />
                        <span className="ml-6 flex-shrink-0">
                          <AiOutlineDelete
                            className="dark:text-white text-black text-[18px] cursor-pointer"
                            onClick={() => handleDeleteFaq(index)}
                          />
                        </span>
                      </dd>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center flex-col w-full h-[50vh] mt-4">
                  <Image
                    src={require("../../../../../public/assets/no_data.png")}
                    width={300}
                    height={300}
                    alt=""
                  />
                  <p className="dark:text-white text-black text-[20px]">
                    No Data FAQ
                  </p>
                </div>
              )}
            </dl>
            <br />
            <br />

            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={handleNewFaq}
            />
          </div>
          <div
            className={`w-[100px] min-h-[40px] h-[40px] inline-flex items-center justify-center py-2 px-6 dark:text-white text-black bg-[#cccccc34] z-[999] ${
              areQuestionsUnchanged(data?.layout.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? "!cursor-not-allowed"
                : "!cursor-pointer !bg-[#ff3377]"
            } !rounded absolute bottom-10 right-10`}
            onClick={
              areQuestionsUnchanged(data?.layout.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? () => null
                : handleEdit
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;
