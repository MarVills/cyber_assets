
  export interface Category {
    id?: string;
    category: string;
    prefix?: string;
    edit: boolean;
  }

  export interface CategoryDTO {
    id?: string;
    category: string;
    prefix: string;
    edit?: boolean;
  }

export const CATEGORY_DATA: Category[] = [];