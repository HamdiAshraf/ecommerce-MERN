import { Cart } from "../models/cartModel";
import { IOrderItem, Order } from "../models/orderModel";
import { Product } from "../models/productModel";

interface CreateCartForUser{
    userId:string;
}


const createCartForUser=async({userId}:CreateCartForUser)=>{
    const cart=await Cart.create({userId,totalAmount:0});
    await cart.save();
    return cart;
}




interface GetActiveCartForUser{
    userId:string;
}


export const getActiveCartForUser=async({userId}:GetActiveCartForUser)=>{
    let cart=await Cart.findOne({userId,status:"active"});
    if(!cart){
        cart=await createCartForUser({userId});
    }

    return cart;
}




interface AddItemToCart{
    productId:any;
    quantity:number;
    userId:string;
}

export const addItemToCart=async({productId,quantity,userId}:AddItemToCart)=>{
    const cart=await getActiveCartForUser({userId});
    //Does the item exists in cart
    const existsInCart= cart.items.find((p)=>p.product.toString()===productId);
    if(existsInCart){
        return {statusCode:400,data:"this item already exist in cart"}
    }


    //fetch the product
    const product=await Product.findById(productId);
    if(!product){
        return {statusCode:400,data:"product not found!"}

    }

    if(product.stock < quantity){
        return {statusCode:400,data:"low stock for item"}

    }


    cart.items.push({product:productId,unitPrice:product.price,quantity})

    cart.totalAmount+=product.price*quantity;

    const updatedCart=await cart.save();

    return {statusCode:200,data:updatedCart};
}

interface UpdateItemInCart{
    productId:any;
    quantity:number;
    userId:string;
}

export const updateItemInCart=async({productId,quantity,userId}:UpdateItemInCart)=>{
    const cart=await getActiveCartForUser({userId});
    //Does the item exists in cart
    const existsInCart= cart.items.find((p)=>p.product.toString()===productId);

    if(!existsInCart){
        return {statusCode:400,data:"item does not exist in cart "}

    }
    const product=await Product.findById(productId);
    if(!product){
        return {statusCode:400,data:"product not found!"}

    }
    if(product.stock < quantity){
        return {statusCode:400,data:"low stock for item"}

    }


    existsInCart.quantity=quantity;
    const otherCartItems=cart.items.filter((p)=>p.product.toString()!==productId)

    let total=otherCartItems.reduce((sum,product)=>{
        sum+=product.quantity * product.unitPrice;

        return sum;
    },0)

    total+=existsInCart.quantity * existsInCart.unitPrice;
    cart.totalAmount=total;

    const updatedCart=await cart.save();

    return {statusCode:200,data:updatedCart}
}

interface DeleteItemInCart{
    userId:string;
    productId:any;
}

export const deleteItemInCart=async({userId,productId}:DeleteItemInCart)=>{
    const cart=await getActiveCartForUser({userId});
    //Does the item exists in cart
    const existsInCart= cart.items.find((p)=>p.product.toString()===productId);

    if(!existsInCart){
        return {statusCode:400,data:"item does not exist in cart "}
 
}
const otherCartItems=cart.items.filter((p)=>p.product.toString()!==productId)

let total=otherCartItems.reduce((sum,product)=>{
    sum+=product.quantity * product.unitPrice;

    return sum;
},0)

total+=existsInCart.quantity * existsInCart.unitPrice;

cart.items=otherCartItems;
cart.totalAmount=total;

const updatedCart=await cart.save();

    return {statusCode:200,data:updatedCart}


}

interface ClearCart{
    userId:string;
}
export const clearCart=async({userId}:ClearCart)=>{
    const cart=await getActiveCartForUser({userId});
cart.items=[];
cart.totalAmount=0;
const updatedCart=await cart.save();
return {statusCode:200,data:updatedCart}
}



interface CheckOut{
    userId:string;
    address:string;
}
export const checkout=async({userId,address}:CheckOut)=>{
    if(!address){
        return {statusCode:400,data:"please add the address"}
    }
    const cart=await getActiveCartForUser({userId});
    const orderItems:IOrderItem[]=[];

    for(const item of cart.items){
        const product=await Product.findById(item.product);

        if(!product){
        return {statusCode:400,data:"product not found"}
    }

    const orderItem:IOrderItem={
        productTitle:product.title,
        productImage:product.image,
        quantity:item.quantity,
        unitPrice:item.unitPrice
    }

    orderItems.push(orderItem);
    }


    const order=await Order.create({
        orderItems,
        total:cart.totalAmount,
        address,
        userId
    })


    await order.save();

    cart.status="completed";

    await cart.save();

    return {statusCode:200,data:order}

}