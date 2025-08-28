import React from "react";

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <h2 className="text-3xl font-extrabold text-center mb-8">{title}</h2>
  );
};

export default Title;
