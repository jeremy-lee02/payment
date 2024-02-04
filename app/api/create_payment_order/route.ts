import moment from "moment";
import { NextRequest, NextResponse } from "next/server";
import { payment_config } from "@/payment-config/config";
import { redirect } from 'next/navigation'

const querystring = require('qs')
import * as crypto from 'crypto'


export const POST = async (req:NextRequest, res: NextResponse) => {
    try {

        let date = new Date()
        let createDate = moment(date).format('YYYYMMDDHHmmss')

        const ipAddress = req.headers.get('x-forwarded-for') || req.ip

        let orderId = moment(date).format('DDHHmmss');

        const data = await req.json()
        // console.log(data)
        // if(!data) return NextResponse.json({message: "No order information available"}, {status: 404})
        let amount = data.amount;
        let bankCode = data.bankCode;
        let locale = data.language;
        if(locale === null || locale === ''){
            locale = 'vn';
        }
        const currency = 'VND';
        let vnp_Params: any = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = payment_config.vnp_TmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currency;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId + ` - Don hang Program: ${data.programId}`;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = payment_config.vnp_ReturnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddress;
        vnp_Params['vnp_CreateDate'] = createDate;
        if(bankCode !== null && bankCode !== ''){
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        
        let signData = querystring.stringify(vnp_Params, {encode:false})
        
        let hmac = crypto.createHmac("sha512", payment_config.vnp_HashSecret);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex')

        vnp_Params['vnp_SecureHash'] = signed;
        let vnpUrl = payment_config.vnp_Url;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        
        return NextResponse.json(vnpUrl, {status: 200})
        
        // redirect(vnpUrl)
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }

}


function sortObject(obj: { [key: string]: string }): { [key: string]: string } {
    let sorted: { [key: string]: string } = {};
    let str: string[] = [];
    let key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }

    str.sort();

    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }

    return sorted;
}