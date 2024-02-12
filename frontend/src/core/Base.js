import React from "react";
import NavigationBar from "./NavigationBar";



const Base = ({
  title = "Learn And Grow",
  description = "My description",
  className = "bg-light text-#0c0c0c p-4",
  children,
}) => (
  <div>
    <NavigationBar />

    <div className={className}>{children}</div>


  </div>
);
export default Base;
