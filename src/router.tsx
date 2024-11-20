import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import Products, { loader as productsLoader, action as updateAvalabilityAction } from './views/Products';
import NewProduct, { action as newProductAction } from './views/NewProduct';
import EditProduct, { loader as editProductLoader, action as editProductAction } from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails';


export const router = createBrowserRouter([
    {
        // las paghinas que esten dentro de children will be  children oif layout
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,// para que aparezca dentro de el layout
                element: <Products />,
                loader: productsLoader,
                action: updateAvalabilityAction
            },
            {
                path: 'productos/nuevo',// sprecifi when show this page
                index: true,// para que se ejecute una accion cuando se muestre la pagina
                element: <NewProduct />,//  para que aparezca dentro de el layout
                action: newProductAction // para que se ejecurte  un action llamando a la function newProductAction
            },
            {
                path: 'productos/:id/editar', //ROA Partten - Resourse-oriented desing
                element: <EditProduct />,
                loader: editProductLoader, // para que se ejecute  un action llamando a la function editProductAction
                action: editProductAction


            },
            {
                path: 'productos/:id/eliminar', //ROA Partten - Resourse-oriented desing
                action: deleteProductAction
            }

        ]
    }
])