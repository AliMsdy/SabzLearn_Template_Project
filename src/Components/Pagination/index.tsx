//component
import { Button } from "..";

//icon
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

function Pagination({darkBackground="dark:bg-dark-theme-secondary"}) {
  return (
      <div className="mt-14 flex items-center justify-center gap-x-4 transition-all">
        <Button className={`h-10 w-10 bg-[#f0f0f1] px-2 text-dark-color duration-300 hover:bg-primary-color hover:text-white  dark:text-white ${darkBackground}`}>
          <FaLongArrowAltRight size={15} />
        </Button>
        {Array.from(Array(3)).map((_, index) => (
          <Button
            key={index}
            className={`h-10 w-10 bg-[#f0f0f1] px-2 text-dark-color duration-300 hover:bg-primary-color hover:text-white  dark:text-white ${darkBackground}`}
          >
            {index + 1}
          </Button>
        ))}
        <Button className={`h-10 w-10 bg-[#f0f0f1] px-2 text-dark-color duration-300 hover:bg-primary-color hover:text-white  dark:text-white ${darkBackground}`}>
          <FaLongArrowAltLeft size={15} />
        </Button>
      </div>
  );
}

export { Pagination };
