export const BasicSort = {
    newest: { name: 'Newest', value: 'createdAt,-1' },
    oldest: { name: 'Oldest', value: 'createdAt,1' },
};

export const DefaultSort = {
    name: { name: 'Name', value: 'name,1' },
    ...BasicSort
};
