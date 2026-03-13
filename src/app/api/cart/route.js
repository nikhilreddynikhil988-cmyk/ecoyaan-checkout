import { cartData } from "@/data/cartData";
export async function GET() {
    return Response.json(cartData)
}