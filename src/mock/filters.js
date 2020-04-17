export const countTasksByType = (tasksArray, filterName) => {
  const filtered = tasksArray.filter((item) => !!item[filterName]);
  return filtered.length;
};

export const generateFilters = (tasks) => {
  const today = new Date();
  const allCount = tasks.length;
  const overdueCount = tasks.filter((task) => task.dueDate instanceof Date && task.dueDate < today).length;
  const todayFilterCount = tasks.filter((task) => task.dueDate instanceof Date && task.dueDate.getDay() === today.getDay() && task.dueDate.getMonth() === today.getMonth()).length;
  const favoritesCount = tasks.filter((task) => !!task.isFavorite).length;
  const repeatingCount = tasks.filter((task) => Object.values(task.repeatingDays).some(Boolean)).length;

  return [
    {title: `all`, count: allCount},
    {title: `overdue`, count: overdueCount},
    {title: `today`, count: todayFilterCount},
    {title: `favorites`, count: favoritesCount},
    {title: `repeating`, count: repeatingCount},
    {title: `archive`, count: countTasksByType(tasks, `isArchive`)}
  ];
};
