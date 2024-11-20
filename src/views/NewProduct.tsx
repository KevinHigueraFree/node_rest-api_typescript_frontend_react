import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";
// se manda llamar en el router
export async function action({ request }: ActionFunctionArgs) {
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
    await addProduct(data);
    return redirect('/');
}

export default function NewProduct() {

    const error = useActionData() as string

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-600'>Registrar Producto</h2>
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

                />

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    )
}
