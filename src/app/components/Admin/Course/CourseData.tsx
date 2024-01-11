import { styles } from "@/app/styles/style";
import React, { FC } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toast } from "react-toastify";

type Benefit = {
  title: string;
};

type Props = {
  benefits: Benefit[];
  setBenefits: React.Dispatch<React.SetStateAction<Benefit[]>>;
  prerequisites: Benefit[];
  setPrerequisites: React.Dispatch<React.SetStateAction<Benefit[]>>;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitsChange = (index: number, value: any) => {
    setBenefits((prevBenefits: Benefit[]) => {
      const updatedBenefits = [...prevBenefits];
      updatedBenefits[index] = {
        ...updatedBenefits[index],
        title: value,
      };
      return updatedBenefits;
    });
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    setPrerequisites((prevPrerequisites: Benefit[]) => {
      const updatedPrerequisites = [...prevPrerequisites];
      updatedPrerequisites[index] = {
        ...updatedPrerequisites[index],
        title: value,
      };
      return updatedPrerequisites;
    });
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields for go to next!");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`}>
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            key={index}
            type="text"
            name="Benefits"
            placeholder="You will be able to build a full stack LMS platform..."
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e: any) => handleBenefitsChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0", cursor: "pointer", width: "30px" }}
          className="text-black dark:text-white"
          onClick={handleAddBenefit}
        />
      </div>

      <div>
        <label className={`${styles.label} text-[20px]`}>
          What are the prerequisites for starting this course?
        </label>
        <br />
        {prerequisites.map((prerequisite: any, index: number) => (
          <input
            key={index}
            type="text"
            name="Benefits"
            placeholder="You will be able to build a full stack LMS platform..."
            required
            className={`${styles.input} my-2`}
            value={prerequisite.title}
            onChange={(e: any) =>
              handlePrerequisitesChange(index, e.target.value)
            }
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0", cursor: "pointer", width: "30px" }}
          className="text-black dark:text-white"
          onClick={handleAddPrerequisites}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#ff3377] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#ff3377] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
