import React from "react";
import { styles } from "../styles/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div className="pt-20">
      <div className="w-[95%] 800px:w-[92%] m-auto py-2 dark:text-white text-black px-3">
        <h1 className={`${styles.title} !text-start pt-2`}>
          Platform Terms and Condition
        </h1>
        <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Print and Review: Print a copy of this document and keep it
            available during your exam. Internet Stability: Ensure you will have
            a stable, uninterrupted internet connection for your exam. If your
            internet access fails during the exam, your results may be lost, and
            you will need to retake the exam. Navigation Warnings: Once you
            start the exam, do not refresh your browser, use browser buttons, or
            navigate away from the exam screen until the exam has been
            submitted. If you navigate away from the exam, your progress may be
            lost and cannot be recovered. Carefully follow the Exam Guidelines
            in the Knowledge Base.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Starting an Exam: Do not click the ‘Attempt exam now’ button until
            you are prepared to begin the exam and your invigilator is ready
            with your PIN. Your attempt and the exam timer will begin once the
            invigilator has entered the PIN, and you press the ‘Start attempt’
            button. Click here for more information on starting the exam.
            Submitting an Exam: You must click ‘Finish attempt’ on the final
            exam question to record your exam answers in the system. You will
            then be prompted to confirm exam submission twice. Once you click
            ‘Submit all and finish’ the second time, you cannot return to review
            your answers. Click here for complete details. Exam Study Guides
            Additional information on the exam, including time allotted and
            study techniques, is available on our Study Resources webpage.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Selecting an Invigilator Sponsors are responsible for exam
            invigilation. Read this entire document for details. In cases where
            a sponsor cannot perform this particular duty, sponsors and their
            enrolled member must agree on a member-designate to invigilate the
            exam on the sponsor’s behalf.  Member-designates can be an RPF,
            RFT, or NRP on active or retired status who is not a subordinate of,
            or related to, the applicant by blood or marriage. 
            Member-designates must be approved by the sponsor ahead of the exam
            time.  The sponsor must provide the member-designate with the
            enrolled member’s confidential PIN before the exam is started. Read
            the Confidential PIN section below.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            The invigilator is responsible for overseeing the enrolled member’s
            conduct during the exam.  Appropriate monitoring should be done to
            ensure that no other software is running and that no other
            electronic devices are available at the time of the exam. See Closed
            Book section below.  The invigilator should ensure the examinee
            follows all Exam Guidelines noted herein and here.  The invigilator
            must enter the confidential PIN on the enrolled member’s exam screen
            at the start of the exam, and  The invigilator should be present
            until the enrolled member submits the exam or the time allotted
            expires.
          </p>
        </ul>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Policy;
