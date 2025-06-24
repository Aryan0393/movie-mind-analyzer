
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ThumbsUp, ThumbsDown, Minus, Trash2, BarChart3, Brain, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getStoredReviews, clearStoredReviews, getReviewStats } from "@/utils/reviewStorage";

interface StoredReview {
  id: string;
  review: string;
  sentiment: string;
  confidence: number;
  timestamp: string;
}

const History = () => {
  const [reviews, setReviews] = useState<StoredReview[]>([]);
  const [stats, setStats] = useState({ total: 0, positive: 0, negative: 0, neutral: 0, averageConfidence: 0 });
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadReviews();
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const loadReviews = () => {
    const storedReviews = getStoredReviews();
    const reviewStats = getReviewStats();
    setReviews(storedReviews);
    setStats(reviewStats);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all review history? This action cannot be undone.')) {
      clearStoredReviews();
      loadReviews();
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="h-5 w-5 text-green-400" />;
      case 'negative':
        return <ThumbsDown className="h-5 w-5 text-red-400" />;
      default:
        return <Minus className="h-5 w-5 text-yellow-400" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'negative':
        return 'bg-red-500/20 text-red-300 border-red-500/50';
      default:
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-75"></div>
              <div className="relative p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl">
                <Brain className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                CineAI Sentiment
              </h1>
              <p className="text-gray-300 text-sm">Analysis History</p>
            </div>
          </div>
        </div>
      </header>

      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`flex items-center justify-between mb-12 transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="mb-6 text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <h1 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
                <BarChart3 className="h-10 w-10 text-purple-400" />
                Analysis History
              </h1>
              <p className="text-gray-300 text-lg">View your previous movie review sentiment analyses</p>
            </div>
            {reviews.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={handleClearHistory}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 backdrop-blur-sm"
              >
                <Trash2 className="h-4 w-4" />
                Clear History
              </Button>
            )}
          </div>

          {/* Statistics */}
          {reviews.length > 0 && (
            <Card className={`mb-12 shadow-2xl border-0 bg-white/10 backdrop-blur-xl border-white/20 transition-all duration-1000 delay-200 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white text-2xl">
                  <TrendingUp className="h-6 w-6 text-purple-400" />
                  Analysis Statistics
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Your AI sentiment analysis overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="text-3xl font-bold text-white mb-2">{stats.total}</div>
                    <div className="text-gray-300 font-medium">Total Reviews</div>
                  </div>
                  <div className="text-center p-4 bg-green-500/10 rounded-xl backdrop-blur-sm border border-green-500/20">
                    <div className="text-3xl font-bold text-green-300 mb-2">{stats.positive}</div>
                    <div className="text-gray-300 font-medium">Positive</div>
                  </div>
                  <div className="text-center p-4 bg-red-500/10 rounded-xl backdrop-blur-sm border border-red-500/20">
                    <div className="text-3xl font-bold text-red-300 mb-2">{stats.negative}</div>
                    <div className="text-gray-300 font-medium">Negative</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-500/10 rounded-xl backdrop-blur-sm border border-yellow-500/20">
                    <div className="text-3xl font-bold text-yellow-300 mb-2">{stats.neutral}</div>
                    <div className="text-gray-300 font-medium">Neutral</div>
                  </div>
                  <div className="text-center p-4 bg-purple-500/10 rounded-xl backdrop-blur-sm border border-purple-500/20">
                    <div className="text-3xl font-bold text-purple-300 mb-2">{Math.round(stats.averageConfidence)}%</div>
                    <div className="text-gray-300 font-medium">Avg Confidence</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <Card className={`shadow-2xl border-0 bg-white/10 backdrop-blur-xl border-white/20 transition-all duration-1000 delay-400 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <CardContent className="text-center py-20">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-50"></div>
                  <div className="relative p-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-full border border-white/20 inline-block">
                    <BarChart3 className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">No Analysis History</h3>
                <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">You haven't analyzed any movie reviews yet. Start your first analysis to see results here.</p>
                <Button 
                  onClick={() => navigate("/")}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Analyze Your First Review
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <Card key={review.id} className={`shadow-2xl border-0 bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{transitionDelay: `${(index * 100) + 400}ms`}}>
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                          {getSentimentIcon(review.sentiment)}
                        </div>
                        <div className="space-y-2">
                          <Badge className={`${getSentimentColor(review.sentiment)} border-2 px-3 py-1 font-bold text-sm`}>
                            {review.sentiment.toUpperCase()}
                          </Badge>
                          <div className="flex items-center gap-3 text-sm text-gray-300">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              Confidence: {Math.round(review.confidence)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400 mb-1">
                          {new Date(review.timestamp).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(review.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border-l-4 border-purple-500 border border-white/10">
                      <p className="text-gray-200 leading-relaxed text-lg">
                        "{review.review}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
