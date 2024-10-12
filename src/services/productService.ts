import { Product } from "../models/productModel"


export const getAllProducts=async()=>{
    return await Product.find();
}


export const setInitialProducts=async()=>{
    const products=[
        {title:"laptop",image:"https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_101244116?x=1800&y=1800&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=1800&ey=1800&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=1800&cdy=1800",price:1785,stock:3},
        {title:"tv",image:"https://m.media-amazon.com/images/I/91jimfcNHFL._AC_SL1500_.jpg",price:785,stock:5},
        {title:"iphone15 mobile",image:"https://files.refurbed.com/ii/iphone-15-1694590486.jpg",price:1400,stock:1},

        
    ]

    const existingProducts=await getAllProducts()
    if(existingProducts.length===0){
        await Product.insertMany(products)
    }
}