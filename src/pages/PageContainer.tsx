import type { ReactNode } from "react";

function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen lg:w-128 mx-auto my-6 px-8 flex flex-col gap-4">
      {children}
    </div>
  )
}

export default PageContainer;
