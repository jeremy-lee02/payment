"use client"
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'

type Props = {}

export default function Order (){
    const param = useSearchParams()
    function checkStatus(statusCode: string | null) {
        if(statusCode === '00') return "Success"
        return "Failed"
    }
    
    return (
        <Suspense fallback={<>Loading...</>}>
            <div className="flex text-xl gap-4 h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
                <h1 className='font-bold text-3xl'>Payment Status</h1>
                <div className='flex flex-col items-start justify-center'>
                    <div>
                    <p className='font-bold'>Amount: <span className=' font-normal'>{param.get('vnp_Amount')}</span></p> 
                    </div>
                    <div>
                        <p className='font-bold'>Description: <span className=' font-normal'>{param.get('vnp_OrderInfo')}</span></p> 
                    </div>
                    <div>
                        <p className='font-bold'>Bank: <span className=' font-normal'>{param.get('vnp_BankCode')}</span></p> 
                    </div>
                    <div>
                        <p className='font-bold'>Code: <span className=' font-normal'>{param.get('vnp_TxnRef')}</span></p> 
                    </div>
                    <div>
                        <p className='font-bold'>Status: <span className=' font-normal'>{checkStatus(param.get('vnp_TransactionStatus'))}</span></p> 
                    </div>

                </div>

                

            </div>
        </Suspense>
    )
}
