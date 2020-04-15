const filterNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `archive`];

export const countTasksByType = (tasksArray, filterName) => {
  const filtered = tasksArray.filter((item) => !!item.filterName);
  return filtered.length;
};

export const generateFilters = (tasksArray, counts) => {
  let result = [];
  for (let i = 0; i < filterNames.length; i += 1) {
    let item = {
      title: filterNames[i],
      count: counts[i]
    };
    result.push(item);
  }
  return result;
  /*
  return filterNames.map((item) => {
    return {
      title: item,
      count: Math.floor(Math.random() * 10),
    };
  });
*/
};
