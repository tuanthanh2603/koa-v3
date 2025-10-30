export interface Category {
    id: number
    name: string
    name_vn: string
    name_en: string
    projects: Project[]
}
export interface Image {
    id: number
    image: string
}
export interface Project {
    id: number
    name_vn: string
    name_en: string
    description_vn: string
    description_en: string
    image: string
    slug?: string
    images?: Image[]
}