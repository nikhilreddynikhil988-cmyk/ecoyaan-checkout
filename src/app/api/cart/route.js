import { CartData } from "@/data/cartData";

export async function GET(){
    return Response.json(CartData)
}