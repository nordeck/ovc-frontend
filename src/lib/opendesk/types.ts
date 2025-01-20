
export interface Navigation {
    categories: Category[];
}

export interface Category {
    identifier: string,
    display_name: string,
    entries: CategoryEntry[],
}

export interface CategoryEntry {
    identifier: string,
    icon_url: string,
    display_name: string,
    link: string,
    target: string,
    keywords: string [],
}
