export const BasicSort = {
    newest: { name: 'Newest', value: 'createdAt,-1' },
    oldest: { name: 'Oldest', value: 'createdAt,1' },
};

export const DefaultSort = {
    name: { name: 'Name', value: 'name,1' },
    ...BasicSort
};

export const SettingTypes = {
    general: { name: 'General', className: '!bg-primary/10 text-primary-500 shadow-primary/10 [a&]:hover:!bg-primary/30' },
    payment: { name: 'Payment', className: '!bg-sky-100 text-sky-500 shadow-sky/10 [a&]:hover:!bg-sky-300' },
    storage: { name: 'Storage', className: '!bg-amber-100 text-amber-500 shadow-amber/10 [a&]:hover:!bg-amber-300' },
    mail: { name: 'Mail', className: '!bg-rose-100 text-rose-500 shadow-rose/10 [a&]:hover:!bg-rose-300' },
};
