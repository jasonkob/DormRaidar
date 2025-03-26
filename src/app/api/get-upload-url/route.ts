// app/api/get-upload-url/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { fileName, contentType } = body;
    
    if (!fileName || !contentType) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    // API Gateway endpoint for the Lambda function that generates pre-signed URLs
    const apiGatewayUrl = process.env.AWS_PRESIGNED_URL_ENDPOINT || 'https://71nqamr7kh.execute-api.ap-southeast-1.amazonaws.com/default/pre-signed';
    
    // Forward the request to API Gateway Lambda
    const response = await fetch(apiGatewayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.AWS_API_KEY || '', // If you're using API Key authentication
      },
      body: JSON.stringify({
        fileName,
        contentType,
        bucket: process.env.AWS_S3_BUCKET
      }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Error getting pre-signed URL:', error);
      return NextResponse.json(
        { error: 'Failed to generate upload URL' },
        { status: 500 }
      );
    }
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in get-upload-url API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
