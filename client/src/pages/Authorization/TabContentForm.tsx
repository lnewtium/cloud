import { FormEventHandler, ReactNode } from "react";
import { TabsContent } from "@radix-ui/react-tabs";

const TabContentForm = ({
  value,
  onSubmit,
  children,
}: {
  value: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}) => {
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
