import { InputListType, SetState } from "@/types/shared";

function fetchAndUpdateInputList(
  isLoading: boolean,
  fetchedData: any,
  primaryInputList: InputListType[][],
  setInputList: SetState<any>,
) {
  if (!isLoading) {
    const updatedInputList = primaryInputList.map((inputArray, index) => {
      if (index === 0) {
        return inputArray.map((input) => {
          if (input.element === "select" && input.options?.length === 1) {
            const categoryOptions = fetchedData.map(
              ({
                title,
                name,
                _id,
              }: {
                title?: string;
                _id: string;
                name?: string;
              }) => ({
                title: name ? name : title,
                value: _id,
              }),
            );
            const updatedSelectInput = {
              ...input,
              options: [...input.options, ...categoryOptions],
            };
            return updatedSelectInput;
          } else {
            return input;
          }
        });
      }
      return inputArray;
    });
    setInputList(updatedInputList);
  }
}

export { fetchAndUpdateInputList };
