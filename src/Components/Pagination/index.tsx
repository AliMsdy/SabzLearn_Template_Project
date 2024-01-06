import { Fragment } from "react";
//component
import { Button } from "..";

//icon
import { useEffect, useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

//type
import { SetState } from "@/types/shared";
type PaginationProps = {
  darkBackground?: string;
  items: never[];
  setShowedItems: SetState<never[]>;
};

function Pagination({
  darkBackground = "dark:bg-dark-theme-secondary",
  items,
  setShowedItems,
}: PaginationProps) {
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState<null | number>(null);
  const itemsCount = 3;
  useEffect(() => {
    const endIndex = itemsCount * page;
    const startIndex = endIndex - itemsCount;
    const paginatedItems = items.slice(startIndex, endIndex);
    setShowedItems(paginatedItems);
    const pagesNumber = Math.ceil(items.length / itemsCount);
    setPagesCount(pagesNumber);
    if (pagesNumber === 1 || pagesNumber < page) setPage(1);
  }, [page, items]); // eslint-disable-line

  const isFirstPage = page == 1;
  const isLastPage = page == pagesCount;

  const BtnClassName = `h-10 w-10 bg-[#f0f0f1] px-2 text-dark-color duration-300 hover:bg-primary-color hover:text-white  dark:text-white dark:hover:bg-[#504e4e]  ${darkBackground} disabled:hover:bg-[#f0f0f1] disabled:hover:text-dark-color dark:hover:disabled:bg-dark-theme-secondary dark:disabled:hover:text-white`;

  function getButtonClassName(index: number) {
    const isActive = index + 1 === page;
    const baseClassName = `h-10 w-10 bg-[#f0f0f1] px-2 text-dark-color duration-300 hover:text-white dark:text-white`;
    if (isActive) {
      return `${baseClassName} bg-primary-color text-white dark:bg-[#504e4e]`;
    } else {
      return `${baseClassName} hover:bg-primary-color dark:hover:bg-[#504e4e] ${darkBackground}`;
    }
  }

  return (
    <div className="mt-14 flex items-center justify-center gap-x-4 transition-all">
      <Button
        disabled={isFirstPage}
        onClick={() => setPage((page) => page - 1)}
        className={BtnClassName}
      >
        <FaLongArrowAltRight size={15} />
      </Button>
      {Array(pagesCount)
        .fill(0)
        .map((_, index) => (
          <Fragment key={index}>
            <Button
              onClick={() => setPage(index + 1)}
              className={getButtonClassName(index)}
            >
              {index + 1}
            </Button>
          </Fragment>
        ))}
      <Button
        disabled={isLastPage}
        onClick={() => setPage((page) => page + 1)}
        className={BtnClassName}
      >
        <FaLongArrowAltLeft size={15} />
      </Button>
    </div>
  );
}

export { Pagination };
