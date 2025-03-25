// src/app/api/uploadSlip/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // รับข้อมูลจาก request
    const payload = await request.json();
    
    // ส่งต่อไปยัง API Gateway
    const response = await fetch(
      'https://dj3410mn38.execute-api.ap-southeast-1.amazonaws.com/default/UploadPaymentSlip',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );
    
    // ตรวจสอบการตอบกลับ
    const responseData = await response.json();
    
    // ส่งข้อมูลกลับไปยัง client
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error in proxy:', error);
    return NextResponse.json(
      { error: 'การอัปโหลดหลักฐานการชำระเงินล้มเหลว', details: String(error) },
      { status: 500 }
    );
  }
}
