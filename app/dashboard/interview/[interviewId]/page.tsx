import React from "react";

const InterViewPage = ({ params }: { params: { interviewId: string } }) => {
  return <div>{params.interviewId}</div>;
};

export default InterViewPage;
