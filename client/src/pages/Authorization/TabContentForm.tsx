import React, { FormEventHandler } from "react";
import { TabsContent } from "@radix-ui/react-tabs";

const TabContentForm = ({
  value,
  onSubmit,
  children,
}: React.PropsWithChildren<{
  value: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
}>) => {
  return (
    <TabsContent value={value} className="outline-0">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center mt-6 outline-0 gap-4">
        {children}
      </form>
    </TabsContent>
  );
};

export default TabContentForm;
