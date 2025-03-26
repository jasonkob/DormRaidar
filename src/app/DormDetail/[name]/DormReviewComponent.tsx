"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface ReviewProps {
  dormName: string;
  currentUser: { id: string; name: string } | null;
}

interface Review {
  review_id: string;
  user_id: string;
  dorm_name: string;
  user_name?: string;
  comment: string;
  point: number;
  created_at?: string;
}

export const DormReviewComponent: React.FC<ReviewProps> = ({ dormName, currentUser }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [canReview, setCanReview] = useState(false);
  const [verifyingBooking, setVerifyingBooking] = useState(false);

  // Fetch all reviews for this dormitory
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // Encode the dormitory name for the URL
        const encodedDormName = encodeURIComponent(dormName);
        const response = await fetch(`https://if738iu2e2.execute-api.ap-southeast-1.amazonaws.com/comments/${encodedDormName}`);
        
        if (!response.ok) {
          console.error("Error response status:", response.status);
          const errorText = await response.text();
          console.error("Error response body:", errorText);
          throw new Error(`Error fetching reviews: ${response.status}`);
        }
        
        const responseData = await response.json();
        console.log("API Response:", responseData);
        
        // Check if the response has a body property (Lambda API Gateway format)
        let reviewsData: Review[] = [];
        
        if (typeof responseData === 'string') {
          // If the response is a JSON string
          reviewsData = JSON.parse(responseData);
        } else if (responseData.body && typeof responseData.body === 'string') {
          // If the response has a body property that's a JSON string
          try {
            reviewsData = JSON.parse(responseData.body);
          } catch (e) {
            console.error("Error parsing response body:", e);
            reviewsData = [];
          }
        } else if (Array.isArray(responseData)) {
          // If the response is already an array
          reviewsData = responseData;
        } else if (responseData.body && Array.isArray(responseData.body)) {
          // If the response has a body property that's already an array
          reviewsData = responseData.body;
        } else {
          console.error("Unexpected response format:", responseData);
          reviewsData = [];
        }
        
        setReviews(reviewsData);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("ไม่สามารถโหลดข้อมูลรีวิวได้ กรุณาลองใหม่อีกครั้ง");
      } finally {
        setLoading(false);
      }
    };

    if (dormName) {
      fetchReviews();
    }
  }, [dormName]);

  // Check if the user has a completed booking for this dorm
  const verifyUserCanReview = async () => {
    if (!currentUser) {
      setCanReview(false);
      return;
    }

    

    try {
      console.log("currentUser.id:", currentUser?.id);
      console.log("dormName:", dormName);
      setVerifyingBooking(true);
      
      // Call the verification API
      const response = await fetch("https://fvkrhtp8bj.execute-api.ap-southeast-1.amazonaws.com/default/verify_booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: JSON.stringify({
            userId: currentUser.id,
            dormName: dormName
          })
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error verifying booking: ${response.status}`);
      }
      
      const responseData = await response.json();
      console.log("Verification raw response:", responseData);
      
      // Parse the response body if it's a string
      let result;
      if (typeof responseData === 'string') {
        result = JSON.parse(responseData);
      } else if (responseData.body && typeof responseData.body === 'string') {
        result = JSON.parse(responseData.body);
      } else {
        result = responseData;
      }
      
      console.log("Verification parsed result:", result);
      
      // Update the state based on the response
      setCanReview(result.canReview === true);
      
      if (!result.canReview) {
        console.log("User cannot review this dorm - no completed booking found");
        setError("คุณต้องมีการจองหอพักที่สำเร็จแล้วเพื่อเขียนรีวิว");
        
        // Clear the error after 3 seconds
        setTimeout(() => {
          setError(null);
        }, 3000);
      } else {
        setShowCommentForm(true);
      }
    } catch (err) {
      console.error("Error verifying booking:", err);
      setError("ไม่สามารถตรวจสอบสถานะการจอง กรุณาลองใหม่อีกครั้ง");
      
      // Default to false if there's an error
      setCanReview(false);
    } finally {
      setVerifyingBooking(false);
    }
  };

  // Handle review button click 
  const handleReviewButtonClick = () => {
    if (!currentUser) {
      setError("กรุณาเข้าสู่ระบบก่อนแสดงความคิดเห็น");
      return;
    }
    
    verifyUserCanReview();
  };

  // Submit a new review
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError("กรุณาเข้าสู่ระบบก่อนแสดงความคิดเห็น");
      return;
    }
    
    if (!canReview) {
      setError("คุณต้องมีการจองหอพักที่สำเร็จแล้วเพื่อเขียนรีวิว");
      return;
    }
    
    if (rating === 0) {
      setError("กรุณาให้คะแนนหอพัก");
      return;
    }
    
    if (!newComment.trim()) {
      setError("กรุณาใส่ความคิดเห็น");
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      // Generate a review ID with timestamp for uniqueness
      const timestamp = Date.now();
      const reviewId = `R${timestamp}`;
      
      const reviewData = {
        review_id: reviewId,
        user_id: currentUser.id,
        dorm_name: dormName,
        comment: newComment,
        point: rating,
        user_name: currentUser.name,
        created_at: new Date().toLocaleDateString('th-TH')
      };
      
      console.log("Submitting review:", reviewData);
      
      const response = await fetch("https://if738iu2e2.execute-api.ap-southeast-1.amazonaws.com/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response body:", errorText);
        throw new Error(`Error submitting review: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("Review submitted successfully:", result);
      
      // Add the new review to the list
      setReviews([reviewData, ...reviews]);
      setNewComment("");
      setRating(0);
      setShowCommentForm(false);
      setSuccessMessage("ขอบคุณสำหรับความคิดเห็น!");
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("ไม่สามารถบันทึกความคิดเห็นได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    
    // If it's already in a readable format, return as is
    if (dateStr.includes('/')) return dateStr;
    
    try {
      // If it's a timestamp
      const date = new Date(parseInt(dateStr));
      if (isNaN(date.getTime())) {
        return dateStr;
      }
      return date.toLocaleDateString('th-TH');
    } catch {
      return dateStr;
    }    
  };

  const RatingStars = ({ value, onChange }: { value: number; onChange?: (rating: number) => void }) => {
    const [hoverRating, setHoverRating] = useState(0);
    
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={24}
            className={`cursor-pointer ${
              star <= (hoverRating || value) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => onChange && onChange(star)}
            onMouseEnter={() => onChange && setHoverRating(star)}
            onMouseLeave={() => onChange && setHoverRating(0)} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-6 mb-6">
      <div className="flex justify-between items-center">
        <span className="text-[20px] font-semibold">รีวิวจากผู้เข้าพัก</span>
        {currentUser && !showCommentForm && (
          <button 
            onClick={handleReviewButtonClick}
            className="text-white bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg transition-colors text-sm disabled:bg-indigo-300"
            disabled={verifyingBooking}
          >
            {verifyingBooking ? "กำลังตรวจสอบ..." : "เขียนรีวิว"}
          </button>
        )}
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg my-3">
          {successMessage}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg my-3">
          {error}
        </div>
      )}

      {/* Comment form */}
      {showCommentForm && (
        <form onSubmit={handleSubmitReview} className="mt-4 mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="mb-3">
            <label className="text-black block mb-2 text-sm font-medium">ให้คะแนนหอพัก</label>
            <RatingStars value={rating} onChange={setRating} />
          </div>
          <div className="mb-3">
            <label className="text-black block mb-2 text-sm font-medium">ความคิดเห็นของคุณ</label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="text-black w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={4}
              placeholder="เขียนความคิดเห็นของคุณที่นี่..."
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              type="button" 
              onClick={() => setShowCommentForm(false)}
              className="text-black px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              ยกเลิก
            </button>
            <button 
              type="submit" 
              disabled={submitting}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:bg-gray-400"
            >
              {submitting ? "กำลังบันทึก..." : "บันทึกรีวิว"}
            </button>
          </div>
        </form>
      )}

      {/* Reviews list */}
      {loading ? (
        <div className="text-center py-4">กำลังโหลดรีวิว...</div>
      ) : reviews.length > 0 ? (
        <ul className="mt-1">
          {reviews.map((review, index) => (
            <li key={review.review_id || index} className="my-2 mt-1 mb-4">
              <span className="font-medium">{review.user_name || "ผู้ใช้"}</span>
              <div className="flex mb-2 mt-2 pl-3">
                <RatingStars value={parseInt(review.point.toString())} />
                {review.created_at && (
                  <span className="ml-3 text-slate-400">{formatDate(review.created_at)}</span>
                )}
              </div>
              <p className="pl-3">{review.comment}</p>
              {index < reviews.length - 1 && (
                <hr className="mt-4 border-gray-200" />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-4 text-gray-500">ยังไม่มีรีวิวสำหรับหอพักนี้</div>
      )}

      {!currentUser && (
        <div className="text-center text-sm mt-4 bg-gray-50 p-3 rounded-lg">
          <a href="/login" className="text-indigo-500 hover:underline">เข้าสู่ระบบ</a> เพื่อแสดงความคิดเห็น
        </div>
      )}
    </div>
  );
}
export default DormReviewComponent;