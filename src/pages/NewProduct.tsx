import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";


export async function action({ request }: ActionFunctionArgs) {
  console.log(action)
  const data = Object.fromEntries(await request.formData())
  console.log(data)

  let error = '';

  if (Object.values(data).includes('')) {
    error = 'todos los campos son obligatorios'
  }
  if (error) {
    return error
  }
  await addProduct(data)

  return redirect('/')
}

export default function NewProduct() {
  const error = useActionData() as string
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Inicio</h2>
        <Link
          to='/'
          className=" rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
          Inicio
        </Link>

      </div>
      {
        error && (
          <ErrorMessage>{error}</ErrorMessage>
        )
      }

      <Form
        className="mt-10"
        method="POST"
      >

        <ProductForm></ProductForm>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  )
}
