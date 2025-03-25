'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home or another appropriate page
    // if someone lands on the payment page without a dormitory name
    router.push('/Home');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting to home page...</p>
    </div>
  );
}