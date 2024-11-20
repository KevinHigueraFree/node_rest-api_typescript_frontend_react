import { safeParse } from 'valibot';
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from '../types';
import axios from 'axios';
import { toBoolean } from '../utils';

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data: ProductData) {
    try {
        // validate the schema with valibot
        const result = safeParse(DraftProductSchema, {
            name: data.name,// to validate the value of name
            price: +data.price // to validate and convert to number the data.price
        })

        // do peticion
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            //forma 1
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
            //forma 2
            // const { data } = await axios(url,{
            //   method: 'POST'
            // }

        } else {
            throw new Error('Datos invalidos')
        }

    } catch (error) {
        console.log(error);

    }
}
export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)

        const result = safeParse(ProductsSchema, data.data)// le pasamos ProductSchems y le decimos quer queremos validar data.data

        if (result.success) {
            return result.output
        } else {
            throw new Error('Error al obtener productos')
        }

    } catch (error) {
        console.log(error);
    }
}
export async function getProductById(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`// request to this url to get the product
        const { data } = await axios(url)

        const result = safeParse(ProductSchema, data.data)// le pasamos ProductSchems y le decimos quer queremos validar data.data

        if (result.success) {
            return result.output
        } else {
            throw new Error('Error al obtener productos')
        }


    } catch (error) {
        console.log(error);
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
    try {

        const NumberPrice: number = Number(data.price)

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: NumberPrice,
            avalability: toBoolean(data.avalability.toString())
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`// request to this url to get the product
            await axios.put(url, result.output)// asi los datos se limpian con valibot
        }



    } catch (error) {
        console.log(error);
    }
}

export async function deleteProduct(id: Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error);
    }
}

export async function updateProductAvalability(id: Product['id']) {
    try {

        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`// request to this url to get the product
        await axios.patch(url)// asi los datos se limpian con valibot

    } catch (error) {
        console.log(error);
    }
}