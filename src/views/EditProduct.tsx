import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct, getProductById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

// el params en este caso es id desde  el path de la url en el router
export async function loader({ params }: LoaderFunctionArgs) {

    if (params.id !== undefined) {

        const product = await getProductById(+params.id);// the + become the string to number
        if (!product) {
            return redirect('/');
        }
        return product

    }

    return {}
}
// se manda llamar en el router
export async function action({ request, params }: ActionFunctionArgs) {
    //obtener los datos de formData
    const data = Object.fromEntries(await request.formData())

    let error = ''
    if (Object.values(data).includes('')) {
        error = "No has llenado todos los campos"
    }
    if (error.length) {
        return error
    }
    // wait to addProduct do all its mothods or steps

    if (params.id !== undefined) {
        const result = await updateProduct(data, +params.id);
        return redirect('/');
    }

}
const avalabilityOptions = [
    { name: 'Disponible', value: true },
    { name: 'No Disponible', value: false }
]

export default function EditProduct() {

    const product = useLoaderData() as Product
    const error = useActionData() as string

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-600'>Editar Producto</h2>
                <Link
                    to={"/"}
                    className='rounded-md bg-indigo-700 p-3 text-sm font-bold shadow-sm text-white hover:bg-indigo-600'
                >
                    Volver a productos
                </Link>
            </div >
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form
                className="mt-10"
                method="POST"

            >

                <ProductForm
                    product={product}
                />


                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="avalability"
                    >Disponibilidad:</label>
                    <select
                        id="avalability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="avalability"
                        defaultValue={product?.avalability.toString()}
                    >
                        {avalabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Actualizar Producto"
                />
            </Form>
        </>
    )
}