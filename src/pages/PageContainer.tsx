import type { ReactNode } from "react";

function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen lg:w-3xl mx-auto my-6 px-8 flex flex-col gap-6">
      {children}
    </div>
  )
}

export default PageContainer;
