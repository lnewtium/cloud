import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAppSelector } from "@/hooks/redux-ts";
import { uiStrings } from "@/utils/translate";

const PathBar = () => {
  const dirStack = useAppSelector(state => state.files.dirStack);
  const currentDir = useAppSelector(state => state.files.currentDir);
  return (
    <Breadcrumb className="flex items-center ml-2">
      <BreadcrumbList>
        <BreadcrumbItem className="text-xl">{uiStrings.home}</BreadcrumbItem>
        {dirStack?.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbEllipsis />
          </>
        )}
        {currentDir && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="text-xl">
              {currentDir.name}
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PathBar;
