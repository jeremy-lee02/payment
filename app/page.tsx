"use client"

import { PaymentOrder } from "@/next-auth";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react";
const transID = Math.floor(Math.random() * 1000000);



export default function Home() {
    const [option, setOption] = useState("")
    const [amount, setAmount] = useState<string>("")

    const router = useRouter()


    const handleCheckout = async () => {
      try {
        const res = await fetch('/api/create_payment_order', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            amount: amount,
            bankCode: option,
            language: "vn",
            programId: transID.toFixed(0)
          })
          
        })
        const data = await res.json()
        console.log(data)
        router.push(data)
        
      } catch (error) {
        console.log(error)
        
      }
    }

    const handleOptionChange = (e: any) => {
      setOption(e.target.value)
    }
  
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        <h1 className="my-10 font-bold text-3xl">Payment Test</h1>
        <form className="flex-col gap-4 items-center justify-center flex" onSubmit={handleCheckout}>
          <div className="flex gap-3">
            <label htmlFor="amount" className="font-semibold text-xl">Amount: </label>
            <input 
            id="amount" 
            type="number" 
            className=" outline-slate-400 rounded-lg px-2 text-base" 
            required = {true}
            min={1000}
            onChange={(e: any) => {
            setAmount(e.target.value)
            }} />
          </div>
          <div className="flex flex-col space-y-3 ml-16">
            <div className="space-x-3">
              <input 
              type="radio" 
              name="paymentOption" 
              value="" 
              id="VNPAYQR" 
              defaultChecked={true}
              onChange={handleOptionChange} 
              checked={option === ''}/>
              <label htmlFor="VNPAYQR">Cổng thanh toán VNPAYQR</label>
            </div>
            <div className="space-x-3">
              <input 
              type="radio" 
              name="paymentOption" 
              value="VNBANK" 
              id="VNBANK" 
              onChange={handleOptionChange} 
              checked={option === 'VNBANK'} />
              <label htmlFor="VNBANK">Thanh toán qua ATM-Tài khoản ngân hàng nội địa</label>
            </div>
            <div className="space-x-3">
              <input 
              type="radio" 
              name="paymentOption" 
              value="INTCARD" 
              id="INTCARD" 
              onChange={handleOptionChange} 
              checked={option === 'INTCARD'} />
              <label htmlFor="INTCARD">Thanh toán qua thẻ quốc tế</label>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="px-3 py-2 bg-slate-800 text-white rounded-lg">Checkout</button>
          </div>
        </form>
      </div>
    );
}
