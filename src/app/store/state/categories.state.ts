import { Category, CategoryDTO } from "src/app/Models/equipment.model"


export interface Categories {
    categories: Category[]
}
export interface  CategoriesDTO {
    categories: CategoryDTO[]
}
export interface CategoriesState {
    categories: any,
}