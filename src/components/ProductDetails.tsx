import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
  product: Product
}

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id)
    return redirect('/')
  }
}


export default function ProductDetails({ product }: ProductDetailsProps) {
  const fetcher = useFetcher() // usado para realizar interacciones en la pagina y mantenernos en la misma sin recargar
  const navigate = useNavigate()
  const isAvailable = product.avalability ? 'Disponible' : 'No Disponible'

  return (
    <tr className="border-b">
      <td className="p-3 textlg text-gray-800">{product.name}</td>
      <td className="p-3 textlg text-gray-800">{formatCurrency(product.price)}</td>
      <td className="p-3 textlg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id" //pasamos esta key id
            value={product.id} //pasamos este valor para la key id
            className={`${product.avalability ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold  w-full border border-black-100 hover:cursor-pointer`}
          >
            {isAvailable}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 textlg text-gray-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/productos/${product.id}/editar`
            )}
            className="rounded-md px-2 py-1 w-full text-center bg-indigo-600 text-white  hover:bg-indigo-500">Editar</button>
          <Form
            className="w-full"
            method="POST"
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm('¿Eliminar?')) {
                e.preventDefault()
              }
            }}
          >
            <input
              type="submit"
              value='Eliminar'
              className="rounded-md px-2 py-1 bg-red-600 w-full text-white hover:bg-red-400"
            />
          </Form>
        </div>
      </td>
    </tr>
  )
}
