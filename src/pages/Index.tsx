
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Film, Sparkles, TrendingUp, Brain, Zap, BarChart3, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { analyzeSentiment } from "@/utils/sentimentAnalysis";
import { saveReview } from "@/utils/reviewStorage";

const Index = () => {
  const [review, setReview] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!review.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate AI processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = analyzeSentiment(review);
    saveReview(review, result);
    
    setIsAnalyzing(false);
    navigate("/results", { state: { review, result } });
  };

  const handleExampleReview = (exampleReview: string) => {
    setReview(exampleReview);
  };

  const exampleReviews = [
    {
      text: "This movie was absolutely fantastic! The acting was superb and the plot kept me on the edge of my seat throughout. Amazing cinematography!",
      type: "Positive",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      text: "Terrible movie. Poor acting, confusing plot, and completely waste of time. I regret watching it. Boring and predictable.",
      type: "Negative", 
      gradient: "from-red-400 to-rose-500"
    },
    {
      text: "The movie was okay. Some parts were good, others not so much. Average overall experience with decent acting.",
      type: "Neutral",
      gradient: "from-yellow-400 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
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
                <p className="text-gray-300 text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Advanced AI-Powered Analysis Engine
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/history")}
              className="text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm"
            >
              <History className="h-4 w-4 mr-2" />
              History
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/10">
              <div className="relative">
                <Zap className="h-5 w-5 text-yellow-400" />
                <div className="absolute inset-0 animate-ping">
                  <Zap className="h-5 w-5 text-yellow-400 opacity-75" />
                </div>
              </div>
              <span className="text-sm font-medium text-white">Next-Gen Sentiment Analysis</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Decode Movie Reviews with
              <span className="block text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text animate-pulse">
                Artificial Intelligence
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of sentiment analysis. Our advanced AI engine processes movie reviews 
              with unprecedented accuracy, delivering instant insights with detailed emotional breakdowns.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { icon: Brain, text: "AI-Powered", color: "from-purple-500 to-purple-600" },
                { icon: Zap, text: "Instant Results", color: "from-yellow-500 to-orange-600" },
                { icon: BarChart3, text: "Detailed Analytics", color: "from-blue-500 to-blue-600" },
                { icon: Sparkles, text: "High Accuracy", color: "from-pink-500 to-rose-600" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <feature.icon className={`h-4 w-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                  <span className="text-sm text-gray-300 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Form */}
          <Card className="mb-12 shadow-2xl border-0 bg-white/10 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
            <CardHeader className="pb-8 relative">
              <CardTitle className="text-3xl flex items-center gap-3 text-white">
                <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                  <Film className="h-6 w-6 text-white" />
                </div>
                Sentiment Analysis Engine
              </CardTitle>
              <CardDescription className="text-lg text-gray-300">
                Input any movie review and watch our AI break down the emotional sentiment in real-time
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <Label htmlFor="review" className="text-lg font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Movie Review Analysis Input
                  </Label>
                  <Textarea
                    id="review"
                    placeholder="Paste your movie review here... Our AI will analyze the sentiment, detect emotional patterns, and provide detailed insights about the reviewer's experience."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="min-h-[180px] text-base bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/50 backdrop-blur-sm resize-none"
                    disabled={isAnalyzing}
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <p className="text-sm text-gray-400">
                        {review.length} characters
                      </p>
                      <div className={`w-2 h-2 rounded-full ${review.length >= 10 ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    </div>
                    <p className="text-sm text-gray-400">
                      Minimum 10 characters required
                    </p>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={review.trim().length < 10 || isAnalyzing}
                  className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 hover:from-purple-700 hover:via-purple-800 hover:to-blue-700 text-white py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-2xl border-0 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  {isAnalyzing ? (
                    <>
                      <div className="flex items-center justify-center gap-3">
                        <div className="relative">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                        </div>
                        <span>AI Processing Review...</span>
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                          <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                          <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Brain className="h-5 w-5 mr-3" />
                      Analyze with AI
                      <Sparkles className="h-5 w-5 ml-3" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Example Reviews */}
          <Card className="shadow-2xl border-0 bg-white/5 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-yellow-400" />
                Try Sample Reviews
              </CardTitle>
              <CardDescription className="text-gray-300 text-base">
                Click any example below to see our AI sentiment analysis in action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {exampleReviews.map((example, index) => (
                  <Card 
                    key={index}
                    className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-white/5 border-white/10 hover:border-white/30 backdrop-blur-sm group relative overflow-hidden"
                    onClick={() => handleExampleReview(example.text)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${example.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <CardContent className="p-6 relative">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${example.gradient}`}></div>
                        <span className="text-sm font-semibold text-gray-300">{example.type} Review</span>
                      </div>
                      <p className="text-sm text-gray-300 line-clamp-4 leading-relaxed mb-4">
                        "{example.text}"
                      </p>
                      <Button variant="ghost" className="w-full text-white hover:bg-white/10 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                        <Zap className="h-4 w-4 mr-2" />
                        Analyze This Example
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-black/30 backdrop-blur-lg border-t border-white/10 py-12 mt-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-purple-400" />
            <p className="text-gray-300 font-medium">
              Powered by Advanced Machine Learning & Natural Language Processing
            </p>
          </div>
          <p className="text-gray-500 text-sm">
            Built with cutting-edge AI technology for accurate sentiment analysis
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
