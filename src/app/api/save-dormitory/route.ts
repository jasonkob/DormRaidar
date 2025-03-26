import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse request body
    const dormitoryData = await request.json();
    
    // ตรวจสอบว่า dormitoryData มีข้อมูลที่จำเป็นหรือไม่
    if (!dormitoryData || !dormitoryData.name || !dormitoryData.address || !dormitoryData.price) {
      return NextResponse.json(
        { error: 'Invalid input data', details: 'Missing required fields' },
        { status: 400 }
      );
    }

    // API Gateway endpoint for the Lambda function that saves to DynamoDB
    const apiGatewayUrl = process.env.AWS_SAVE_DORMITORY_ENDPOINT || 'https://9f9tfunlc7.execute-api.ap-southeast-1.amazonaws.com/default/SaveDormitoryData';
    
    // Forward the request to API Gateway Lambda
    const response = await fetch(apiGatewayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dormitoryData),
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error saving dormitory data:', errorData);
      return NextResponse.json(
        { error: 'Failed to save dormitory data' },
        { status: 500 }
      );
    }
    
    const result = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'Dormitory data saved successfully',
      data: result
    });
  } catch (error) {
    console.error('Error in save-dormitory API route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
