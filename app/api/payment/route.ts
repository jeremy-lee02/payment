

// import { PaymentOrder } from "@/next-auth";
// import axios from "axios";
// const CryptoJS = require('crypto-js');
// import { NextRequest, NextResponse } from "next/server";
// const moment = require('moment');

// type PaymentOrder = {
//     app_id: number,
//     app_trans_id: string, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
//     app_user: string,
//     app_time: number, // miliseconds
//     item: string,
//     embed_data: string,
//     amount: number,
//     description: string,
//     bank_code: string,
// }


// export const POST =  async (req: NextRequest) => {

//     try {
//         const reqTime = Date.now();
//         const hmac_input = process.env.APP_ID +'|'+ `220817_${reqTime}` +'|'+ "ZaloPayDemo" +'|'+ 10000 +"|"+ reqTime +'|'+ "{}" +"|"+ "[]"
//         // const key1 = process.env.KEY1 + ""
//         const mac =  CryptoJS.HmacSHA256(hmac_input, process.env.KEY1).toString()
//         const order = {
//             app_id: process.env.APP_ID,
//             app_user: "ZaloPayDemo",
//             app_time: reqTime,
//             amount: 10000,
//             app_trans_id: `${moment().format('YYMMDD')}_${Math.floor(Math.random() * 1000000)}`,
//             bank_code: "zalopayapp",
//             embed_data: "{}",
//             item: "[]",
//             description: `ZaloPayDemo - Thanh toán cho đơn hàng #${Math.floor(Math.random() * 1000000)}`,
//             mac: mac
//         }
        
//         // if(!order) return new Response("Invalid Order", {status: 404})
//         const res = await axios.post("https://sb-openapi.zalopay.vn/v2/create", null, {params: order})
//         return new Response(JSON.stringify(res.data), {status: 200})
//     } catch (error) {
//         console.log(error)
//         return new Response("Sth went wrong", {status:500})
//     }
    
// }

// export const POST = asnyc (req: NextRequest, res: NextResponse) => {

// }


