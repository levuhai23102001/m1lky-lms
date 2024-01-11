import React from "react";
import { styles } from "../styles/style";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="pt-20 text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px] !font-[600]`}>
        What is{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r dark:from-purple-400 dark:to-pink-600 from-[#96EFFF] to-[#5FBDFF]">
          M1LKY
        </span>
      </h1>
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-[18px] font-Poppins">
          Are you ready to take your programming skills to the next level? Look
          no further than M1LKY, the premier programming community dedicated to
          helping new programmers achieve their goals and reach their full
          potential.
          <br />
          <br />
          As the founder and CEO of M1LKY, I know firsthand the challenges that
          come with learning and growing in the programming industry.
          That&lsquo;s why I created M1LKY – to provide new programmers with the
          resources and support they need to succeed.
          <br />
          <br />
          At M1LKY, we believe that price should never be a barrier to achieving
          your dreams. That&lsquo;s why our courses are priced low – so that
          anyone, regardless of their financial situation, can access the tools
          and knowledge they need to succeed.
          <br />
          <br />
          But M1LKY is more than just a community – we&lsquo;re a family. Our
          supportive community of like-minded individuals is here to help you
          every step of the way, whether you&lsquo;re just starting out or
          looking to take your skills to the next level.
          <br />
          <br />
          With M1LKY by your side, there&lsquo;s nothing standing between you
          and your dream job. Our courses and community will provide you with
          the guidance, support, and motivation you need to unleash your full
          potential and become a skilled programmer.
          <br />
          <br />
          So what are you waiting for? Join the M1LKY family today and
          let&lsquo;s conquer the programming industry together! With our
          affordable courses, informative videos, and supportive community, the
          sky&lsquo;s the limit.
        </p>
        <br />
        <span className="text-[22px]">Le Vu Hai</span>
        <h5 className="text-[18px] font-Poppins">Founder and CEO of M1LKY</h5>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
