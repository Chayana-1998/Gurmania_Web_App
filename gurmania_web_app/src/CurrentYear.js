import React from "react";

const CurrentYear = () => {
  const currentYear = new Date().getFullYear();
  return (
      <p>&copy; {currentYear}. Веб-приложение "Гурмания"</p>
  )
};

export default CurrentYear;