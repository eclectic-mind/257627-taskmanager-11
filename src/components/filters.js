const makeFilter = (filter, isChecked) => {
  const {title, count} = filter;

  return (
    `<input
      type="radio"
      id="filter__${title}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
    />
    <label for="filter__${title}" class="filter__label">
      ${title} <span class="filter__${title}-count">${count}</span></label
    >`
  );
};

export const makeFiltersMarkup = (filters) => {
  const filterMarkup = filters.map((item, i) => makeFilter(item, i === 0)).join(`\n`);
  return (
    `<section class="main__filter filter container">
    ${filterMarkup}
    </section>`
  );
}
