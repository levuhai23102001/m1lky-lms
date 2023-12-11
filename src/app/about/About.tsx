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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          voluptatum veritatis odio laborum deleniti ducimus ipsam voluptate
          quos corporis quibusdam! Totam exercitationem doloremque, id vitae
          nemo aspernatur deserunt ipsa quasi! Quisque consequ tempor inv
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          voluptatum veritatis odio laborum deleniti ducimus ipsam voluptate
          quos corporis quibusdam! Totam exercitationem doloremque, id vitae
          nemo aspernatur deserunt ipsa quasi! Quisque consequ tempor inv
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          voluptatum veritatis odio laborum deleniti ducimus ipsam voluptate
          quos corporis quibusdam! Totam exercitationem doloremque, id vitae
          nemo aspernatur deserunt ipsa quasi! Quisque consequ tempor inv
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          voluptatum veritatis odio laborum deleniti ducimus ipsam voluptate
          quos corporis quibusdam! Totam exercitationem doloremque, id vitae
          nemo aspernatur deserunt ipsa quasi! Quisque consequ tempor inv
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          voluptatum veritatis odio laborum deleniti ducimus ipsam voluptate
          quos corporis quibusdam! Totam exercitationem doloremque, id vitae
          nemo aspernatur deserunt ipsa quasi! Quisque consequ tempor inv
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          voluptatum veritatis odio laborum deleniti ducimus ipsam voluptate
          quos corporis quibusdam! Totam exercitationem doloremque, id vitae
          nemo aspernatur deserunt ipsa quasi! Quisque consequ tempor inv
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
