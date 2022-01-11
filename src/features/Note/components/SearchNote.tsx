import React, { KeyboardEvent, useEffect, useRef } from "react";
import { Search } from "react-feather";
import { useHistory, useLocation } from "react-router-dom";

export default function SearchNote() {
  const history = useHistory();
  const { pathname } = useLocation();
  const searchRef = useRef<HTMLInputElement>(null);

  function submit(event: KeyboardEvent<HTMLInputElement>) {
    const value = searchRef.current?.value;

    if (event.key === "Enter" && value !== "") {
      history.push(`/search/${value}`);
    }
  }

  useEffect(() => {
    if (searchRef.current && pathname !== "/search") {
      searchRef.current.value = "";
    }
  }, [pathname]);

  return (
    <div className="bg-secondary px-4 py-2 rounded-lg text-white w-full h-full flex focus-within:bg-white focus-within:text-primary">
      <Search />
      <input
        ref={searchRef}
        placeholder="Search"
        aria-label="search note"
        className="bg-transparent w-full pl-3"
        onKeyDown={submit}
      />
    </div>
  );
}
