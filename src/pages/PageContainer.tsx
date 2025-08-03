import type { ReactNode } from "react";

function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen lg:w-3xl mx-auto my-6 px-8 flex-vertical">
      {children}
    </div>
  )
}

export default PageContainer;
