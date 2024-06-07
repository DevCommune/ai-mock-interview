import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen h-full w-full">
      {children}
    </div>
  );
};

export default AuthLayout;
