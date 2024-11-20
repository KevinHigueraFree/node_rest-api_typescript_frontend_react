import { object, string, number, boolean,InferOutput, array } from 'valibot'

export const DraftProductSchema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    avalability: boolean()
})

// create variable to convert an object to array
export const ProductsSchema = array(ProductSchema)
export type Product = InferOutput<typeof ProductSchema>