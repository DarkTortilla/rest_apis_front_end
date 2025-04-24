import { safeParse, } from "valibot";
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../types";
import axios from "axios";
import { toBoolean } from "../utils";

type ProductsData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductsData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    console.log(result);
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      const { data } = await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });

      console.log(data);
    } else {
      throw new Error("Datos no validos");
    }

    console.log(result);
  } catch (error) {
    console.log(error);
  }

  console.log("finux", data);
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url);
    console.log(data);
    const result = safeParse(ProductsSchema, data.data);
    console.log(result);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("");
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getPRoductByID(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } =await axios(url);

    const result = safeParse(ProductSchema, data.data);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error)
  }
}

export async function  updateProduct(data:ProductsData, id:Product['id']) {
  console.log(data)
  console.log(id)

  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const result= safeParse(ProductSchema,
      {
        id,
        name:data.name,
        price:+data.price,
        availability:toBoolean(data.availability.toString())
      }
     )
    if (result.success) {
      await axios.put(url, result.output)
    }



  } catch (error) {
    console.log(error)
  }
}

export async function deleteProduct(id:Product['id']) {
  const url=`${import.meta.env.VITE_API_URL}/api/products/${id}`;
  try {
    return await axios.delete(url)
    
  } catch (error) {
    console.log(error)
    
  }
  
}

export async function updateProductAvailability(id:Product['id']) {
  const url=`${import.meta.env.VITE_API_URL}/api/products/${id}`;
  try {
    return await axios.patch(url)
    
  } catch (error) {
    console.log(error)
    
  }
  
}