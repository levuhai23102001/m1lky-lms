import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import React, { useState, useEffect } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import avatar from "../../../../public/assets/avatar.jpg";
import Image from "next/image";
import {
  useAddNewAnswerMutation,
  useAddNewQuestionMutation,
  useAddReplyToReviewMutation,
  useAddReviewMutation,
  useGetCourseDetailsQuery,
} from "@/app/redux/features/courses/coursesApi";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data: any;
  id: string;
  user: any;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  user,
  activeVideo,
  setActiveVideo,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [review, setReview] = useState("");
  const [reviewReply, setReviewReply] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [rating, setRating] = useState(1);
  const [
    addNewQuestion,
    { isSuccess, error, isLoading: createQuestionLoading },
  ] = useAddNewQuestionMutation({});
  const [
    addNewAnswer,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: createAnswerLoading,
    },
  ] = useAddNewAnswerMutation({});
  const [
    addReview,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: createReviewLoading,
    },
  ] = useAddReviewMutation({});
  const [
    addReplyToReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: createReplyLoading,
    },
  ] = useAddReplyToReviewMutation({});
  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const course = courseData?.course;
  const isReviewExists = data?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestionSubmit = async () => {
    await addNewQuestion({
      question,
      courseId: id,
      contentId: data[activeVideo]?._id,
    });
  };

  useEffect(() => {
    //success
    if (isSuccess) {
      setQuestion("");
      refetch();
      socketId.emit("notification", {
        title: "New Question Received",
        message: `You have a new question in ${data[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: "New Reply Received",
          message: `You have a new question reply in ${data[activeVideo].title}`,
          userId: user._id,
        });
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      socketId.emit("notification", {
        title: "New Review Received",
        message: `You have a new review in ${data[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (replySuccess) {
      setReviewReply("");
      courseRefetch();
    }
    //error
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = replyError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    replySuccess,
    replyError,
    refetch,
    courseRefetch,
  ]);

  const handleAnswerSubmit = async () => {
    await addNewAnswer({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId,
    });
  };

  const handleReviewSubmit = async () => {
    await addReview({
      review,
      rating,
      courseId: id,
    });
  };

  const handleReviewReplySubmit = async () => {
    await addReplyToReview({
      comment: reviewReply,
      courseId: id,
      reviewId,
    });
  };

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset]  ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset]  ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] text-black dark:text-white">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer ${
              activeBar === index
                ? "text-[#ff3377]"
                : "text-black dark:text-white"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 text-black dark:text-white">
          {data[activeVideo]?.description}
        </p>
      )}

      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="800px:text-[20px] 800px:inline-block text-black dark:text-white">
                {item.title && item.title + " :"}
              </h2>
              <a
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                href={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}

      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar.url : avatar}
              width={50}
              height={50}
              alt=""
              className="rounded-full w-[50px] h-[50px] object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Write your question..."
              className="outline-none bg-transparent ml-3 border dark:border-[#ffffff57] border-[#000000] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins dark:text-white text-black"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`!w-[120px] !h-[40px] text-[18px] inline-flex items-center justify-center py-2 px-6 dark:text-white text-black mt-5 rounded font-Poppins ${
                question.length === 0
                  ? "!bg-[#cccccc34]"
                  : "!bg-[#ff3377] cursor-pointer"
              }`}
              onClick={
                question.length === 0 ? () => null : handleQuestionSubmit
              }
            >
              Enter
            </div>
          </div>
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              questionId={questionId}
              setQuestionId={setQuestionId}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <div className="w-full">
          {!isReviewExists && (
            <>
              {user.role === "user" && (
                <>
                  <div className="w-full flex">
                    <Image
                      src={user.avatar ? user.avatar.url : avatar}
                      width={50}
                      height={50}
                      alt=""
                      className="rounded-full w-[50px] h-[50px] object-cover"
                    />
                    <div className="w-full">
                      <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                        Give a Rating <span className="text-[#ff3377]">*</span>
                      </h5>
                      <div className="w-full flex ml-2 pb-3">
                        {[1, 2, 3, 4, 5].map((i) =>
                          rating >= i ? (
                            <AiFillStar
                              key={i}
                              className="mr-1 cursor-pointer"
                              color="rgb(246,186,0)"
                              size={25}
                              onClick={() => setRating(i)}
                            />
                          ) : (
                            <AiOutlineStar
                              key={i}
                              className="mr-1 cursor-pointer"
                              color="rgb(246,186,0)"
                              size={25}
                              onClick={() => setRating(i)}
                            />
                          )
                        )}
                      </div>
                      <textarea
                        name=""
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        id=""
                        cols={40}
                        rows={5}
                        placeholder="Write your review..."
                        className="outline-none bg-transparent ml-3 border dark:border-[#ffffff57] border-[#000000] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins dark:text-white text-black"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <div
                      className={`!w-[120px] !h-[40px] text-[18px] inline-flex items-center justify-center py-2 px-6 dark:text-white text-black mt-5 rounded font-Poppins ${
                        review.length === 0
                          ? "!bg-[#cccccc34]"
                          : "!bg-[#ff3377] cursor-pointer"
                      }`}
                      onClick={
                        review.length === 0 ? () => null : handleReviewSubmit
                      }
                    >
                      Enter
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div className="w-full my-2">
            {(course?.reviews && [...course.reviews].reverse())?.map(
              (item: any, index: number) => (
                <>
                  <div
                    className="my-4 w-full text-black dark:text-white"
                    key={index}
                  >
                    <div className="w-full flex mb-2">
                      <div>
                        <Image
                          src={item.user.avatar ? item.user.avatar.url : avatar}
                          alt=""
                          width={50}
                          height={50}
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>
                      <div className="pl-3">
                        <div className="flex items-center">
                          <h5 className="text-[20px] dark:text-white text-black">
                            {item?.user.name}{" "}
                          </h5>
                          {item.user.role === "admin" && (
                            <VscVerifiedFilled className="text-[#ff3377] ml-2 text-[20px]" />
                          )}
                        </div>
                        <Ratings rating={item?.rating} />
                        <p className="dark:text-white text-black">
                          {item?.comment}
                        </p>
                        <div className="w-full flex items-center">
                          <small className="dark:text-[#ffffff83] text-[#00000083]">
                            {format(item?.createdAt)} •
                          </small>
                          {user.role === "admin" && (
                            <>
                              <span
                                className="800px:ml-2 800px:mr-1 dark:text-[#ffffff] text-[#000000] cursor-pointer text-[14px] w-[60px] h-[30px] bg-transparent hover:bg-[#ffffff42] flex items-center justify-center rounded-lg"
                                onClick={() => {
                                  setIsReviewReply(true);
                                  setReviewId(item._id);
                                }}
                              >
                                Reply
                              </span>
                              <BiMessage
                                size={16}
                                className="cursor-pointer dark:text-white text-black mt-1"
                              />
                              <span className="cursor-pointer pl-1 mt-[-2px] dark:text-white text-black text-[14px]">
                                {item.commentReplies.length}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {item.commentReplies.map((item: any, index: number) => (
                    <>
                      <div
                        className="w-full flex 800px:ml-16 my-5 dark:text-white text-black"
                        key={index}
                      >
                        <div className="mt-1">
                          <Image
                            src={
                              item.user.avatar ? item.user.avatar.url : avatar
                            }
                            alt=""
                            width={35}
                            height={35}
                            className="w-[35px] h-[35px] rounded-full object-cover"
                          />
                        </div>
                        <div className="pl-2">
                          <div className="flex items-center">
                            <h5 className="text-[20px] dark:text-white text-black">
                              {item?.user.name}
                            </h5>
                            {item.user.role === "admin" && (
                              <VscVerifiedFilled className="text-[#ff3377] ml-2 text-[20px]" />
                            )}
                          </div>
                          <p className="dark:text-white text-black">
                            {item?.comment}
                          </p>
                          <div className="w-full flex items-center">
                            <small className="dark:text-[#ffffff83] text-[#00000083]">
                              {format(item?.createdAt)} •
                            </small>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                  {isReviewReply && reviewId === item._id && (
                    <>
                      <div className="w-full relative ml-14">
                        <div className="w-full 800px:ml-[10px] flex">
                          <Image
                            src={user.avatar ? user.avatar.url : avatar}
                            alt=""
                            width={30}
                            height={30}
                            className="!w-[30px] !h-[30px] rounded-full object-cover mt-3"
                          />
                          <input
                            type="text"
                            placeholder="Enter your reply..."
                            value={reviewReply}
                            onChange={(e: any) =>
                              setReviewReply(e.target.value)
                            }
                            className="block 800px:ml-2 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:text-white text-black dark:border-[#fff] p-[5px] w-[91%]"
                          />
                        </div>
                        <div className="w-full relative flex justify-end right-12 items-center">
                          <span
                            className="!w-[100px] !h-[40px] text-[18px] dark:text-[#ffffff] text-[#000000] cursor-pointer bg-transparent hover:bg-[#ffffff42] flex items-center justify-center rounded mr-2 mt-5"
                            onClick={() => setIsReviewReply(false)}
                          >
                            Cancel
                          </span>
                          <button
                            type="submit"
                            className={`!w-[120px] !h-[40px] text-[18px] inline-flex items-center justify-center py-2 px-6 dark:text-white text-black mt-5 rounded font-Poppins ${
                              reviewReply.length === 0
                                ? "!bg-[#cccccc34]"
                                : "!bg-[#ff3377] cursor-pointer"
                            }`}
                            onClick={
                              reviewReply.length === 0
                                ? () => null
                                : handleReviewReplySubmit
                            }
                          >
                            Enter
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  questionId,
  setQuestionId,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            user={user}
            questionId={questionId}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  questionId,
  setQuestionId,
  answer,
  setAnswer,
  handleAnswerSubmit,
  item,
  user,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);

  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={item.user.avatar ? item.user.avatar.url : avatar}
              alt=""
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </div>
          <div className="pl-3">
            <div className="flex items-center">
              <h5 className="text-[20px] dark:text-white text-black">
                {item?.user.name}{" "}
              </h5>
              {item.user.role === "admin" && (
                <VscVerifiedFilled className="text-[#ff3377] ml-2 text-[20px]" />
              )}
            </div>
            <p className="dark:text-white text-black">{item?.question}</p>
            <div className="w-full flex items-center">
              <small className="dark:text-[#ffffff83] text-[#00000083]">
                {!item.createdAt ? "" : format(item?.createdAt)} •
              </small>
              <span
                className="800px:ml-2 800px:mr-1 dark:text-[#ffffff] text-[#000000] cursor-pointer text-[14px] w-[60px] h-[30px] bg-transparent hover:bg-[#ffffff42] flex items-center justify-center rounded-lg"
                onClick={() => {
                  setReplyActive(true);
                  setQuestionId(item._id);
                }}
              >
                Reply
              </span>
              <BiMessage
                size={16}
                className="cursor-pointer dark:text-white text-black mt-1"
              />
              <span className="cursor-pointer pl-1 mt-[-2px] dark:text-white text-black text-[14px]">
                {item.questionReplies.length}
              </span>
            </div>
          </div>
        </div>
        {replyActive && questionId === item._id && (
          <>
            {item.questionReplies.map((item: any, index: number) => (
              <>
                <div
                  className="w-full flex 800px:ml-16 my-5 dark:text-white text-black"
                  key={index}
                >
                  <div className="mt-1">
                    <Image
                      src={item.user.avatar ? item.user.avatar.url : avatar}
                      alt=""
                      width={35}
                      height={35}
                      className="w-[35px] h-[35px] rounded-full object-cover"
                    />
                  </div>
                  <div className="pl-2">
                    <div className="flex items-center">
                      <h5 className="text-[20px] dark:text-white text-black">
                        {item?.user.name}
                      </h5>
                      {item.user.role === "admin" && (
                        <VscVerifiedFilled className="text-[#ff3377] ml-2 text-[20px]" />
                      )}
                    </div>
                    <p className="dark:text-white text-black">{item?.answer}</p>
                    <div className="w-full flex items-center">
                      <small className="dark:text-[#ffffff83] text-[#00000083]">
                        {format(item?.createdAt)} •
                      </small>
                      {/* <span
                        className="800px:ml-2 dark:text-[#ffffff] text-[#000000] cursor-pointer text-[14px] w-[60px] h-[30px] bg-transparent hover:bg-[#ffffff42] flex items-center justify-center rounded-lg"
                        onClick={() => {
                          setReplyActive(true);
                          setQuestionId(item._id);
                        }}
                      >
                        Reply
                      </span>
                      <BiMessage
                        size={16}
                        className="cursor-pointer dark:text-white text-black"
                      />
                      <span className="cursor-pointer pl-1 mt-[-3px] dark:text-white text-black text-[14px]">
                        {item.questionReplies.length}
                      </span> */}
                    </div>
                  </div>
                </div>
              </>
            ))}
            <div className="w-full relative ml-14">
              <div className="800px:ml-[10px] flex">
                <Image
                  src={user.avatar ? user.avatar.url : avatar}
                  alt=""
                  width={30}
                  height={30}
                  className="!w-[30px] !h-[30px] rounded-full object-cover mt-3"
                />
                <input
                  type="text"
                  placeholder="Enter your reply..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="block 800px:ml-2 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:text-white text-black dark:border-[#fff] p-[5px] w-[91%]"
                />
              </div>
              <div className="w-full relative flex justify-end right-14 items-center">
                <span
                  className="!w-[100px] !h-[40px] text-[18px] dark:text-[#ffffff] text-[#000000] cursor-pointer bg-transparent hover:bg-[#ffffff42] flex items-center justify-center rounded mr-2 mt-5"
                  onClick={() => setReplyActive(false)}
                >
                  Cancel
                </span>
                <button
                  type="submit"
                  className={`!w-[120px] !h-[40px] text-[18px] inline-flex items-center justify-center py-2 px-6 dark:text-white text-black mt-5 rounded font-Poppins
                  ${
                    answer.length === 0
                      ? "!bg-[#cccccc34]"
                      : "!bg-[#ff3377] cursor-pointer"
                  }`}
                  onClick={handleAnswerSubmit}
                >
                  Enter
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
