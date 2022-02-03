interface Searchable {
  isMatchingSearches: (term: string) => boolean;
}

export const searchable: Searchable = {
  isMatchingSearches(term: string): boolean {
    const objValues = Object.values(this);

    // @ts-ignore
    const filteredArray = objValues.filter((objValue: any) => {
      if (typeof objValue === 'string') {
        if (objValue.toLowerCase().includes(term.toLowerCase())) {
          return objValue;
        }
      }
    });
    return filteredArray.length > 0 ? true : false;
  },
};
