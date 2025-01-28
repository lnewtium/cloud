import { ChangeEventHandler, useRef, useState } from "react";
import { showLoader } from "@/reducers/appReducer";
import { getFiles, searchFiles } from "@/actions/file";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import Input from "@/components/ui/input/Input";

const Search = () => {
  const currentDir = useAppSelector(state => state.files.currentDir);
  const dispatch = useAppDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const searchChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setSearchName(e.target.value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader());
    if (e.target.value != "") {
      setSearchTimeout(
        setTimeout(
          (value: string) => {
            dispatch(searchFiles(value));
          },
          500,
          e.target.value,
        ),
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  };

  return (
    <form autoComplete="off" className="grow hidden md:block">
      {/* Use form to break autofill*/}
      <Input
        onChange={searchChangeHandler}
        value={searchName}
        id="search"
        type="text"
        autoComplete="off"
        ref={ref}
        placeholder="Search..."
      />
    </form>
  );
};

export default Search;
