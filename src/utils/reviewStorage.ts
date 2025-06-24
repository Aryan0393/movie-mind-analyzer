
interface StoredReview {
  id: string;
  review: string;
  sentiment: string;
  confidence: number;
  timestamp: string;
}

export const saveReview = (review: string, result: any): void => {
  console.log('Saving review to localStorage:', { review: review.substring(0, 50) + '...', sentiment: result.sentiment });
  
  const storedReview: StoredReview = {
    id: Date.now().toString(),
    review,
    sentiment: result.sentiment,
    confidence: result.confidence,
    timestamp: result.timestamp
  };
  
  try {
    const existingReviews = getStoredReviews();
    const updatedReviews = [storedReview, ...existingReviews].slice(0, 50); // Keep last 50 reviews
    localStorage.setItem('movieReviews', JSON.stringify(updatedReviews));
    console.log('Review saved successfully. Total reviews:', updatedReviews.length);
  } catch (error) {
    console.error('Error saving review to localStorage:', error);
  }
};

export const getStoredReviews = (): StoredReview[] => {
  try {
    const stored = localStorage.getItem('movieReviews');
    if (stored) {
      const reviews = JSON.parse(stored);
      console.log('Retrieved', reviews.length, 'stored reviews');
      return reviews;
    }
  } catch (error) {
    console.error('Error retrieving reviews from localStorage:', error);
  }
  return [];
};

export const clearStoredReviews = (): void => {
  try {
    localStorage.removeItem('movieReviews');
    console.log('All stored reviews cleared');
  } catch (error) {
    console.error('Error clearing reviews from localStorage:', error);
  }
};

export const getReviewStats = () => {
  const reviews = getStoredReviews();
  const stats = {
    total: reviews.length,
    positive: reviews.filter(r => r.sentiment === 'positive').length,
    negative: reviews.filter(r => r.sentiment === 'negative').length,
    neutral: reviews.filter(r => r.sentiment === 'neutral').length,
    averageConfidence: reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.confidence, 0) / reviews.length 
      : 0
  };
  
  console.log('Review statistics:', stats);
  return stats;
};
