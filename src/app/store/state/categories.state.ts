import { Category, CategoryDTO } from "src/app/Models/category.model"


export interface Categories {
    categories: Category[]
}
export interface  CategoriesDTO {
    categories: CategoryDTO[]
}
export interface CategoriesState {
    categories: any,
}