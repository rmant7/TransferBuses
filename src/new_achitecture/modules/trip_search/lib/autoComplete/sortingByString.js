export const sortingByString = (array, query) => {
  const keyword = query.toLocaleLowerCase();
  const sortedArray = array.sort((first, second) => {
    if (
      first.toLocaleLowerCase().startsWith(keyword) &&
      second.toLocaleLowerCase().startsWith(keyword)
    ) {
      return 0;
    }
    if (first.toLocaleLowerCase().startsWith(keyword)) {
      return -1;
    }
    return 1;
  });
  return sortedArray;
};
