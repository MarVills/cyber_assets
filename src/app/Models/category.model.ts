
  export interface Category {
    id?: number;
    category_name: string;
    prefix?: string;
    edit: boolean;
  }

  export interface CategoryDTO {
    id?: number;
    category_name: string;
    prefix: string;
    edit?: boolean;
  }

export const CATEGORY_DATA: Category[] = [];