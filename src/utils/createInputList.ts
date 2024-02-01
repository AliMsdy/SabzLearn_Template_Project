function genereteInputListFromColumnList(list: any, rowData: any) {
  //removing the _id and action column from the final Input List(just show important data)
  const filteredList = list.filter((item: any) => {
    if (item.accessorKey !== "_id" && item.accessorKey !== "actions") {
      return item;
    }
  });

  // making inputList based on the filtered List and adding them name and label for display in the input section
  const generatedInputList = filteredList.map((item: any) => ({
    name: item.accessorKey,
    label: item.header,
    type:"text"
  }));

  //this is for categoryID column cause category id column is nested and need to go down for its title property
  const InputList = generatedInputList.map((item: any) => {
    if (item.name === "categoryID") {
      return { ...item, value: rowData.original[item.name].title };
    } else {
      return { ...item, value: rowData.original[item.name] };
    }
  });
  return InputList;
}

export { genereteInputListFromColumnList };
