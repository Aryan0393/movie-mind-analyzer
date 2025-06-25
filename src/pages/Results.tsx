import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ThumbsUp, ThumbsDown, Minus, Brain, BarChart3, Clock, Sparkles, Zap, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface SentimentResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  positiveScore: number;
  negativeScore: number;
  neutralScore: number;
  explanation: string;
  keyWords: {
    positive: string[];
    negative: string[];
    neutral: string[];
  };
  wordCount: number;
  timestamp: string;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [animateResults, setAnimateResults] = useState(false);

  const { review, result } = location.state as { review: string; result: SentimentResult } || {};

  useEffect(() => {
    if (!review || !result) {
      navigate("/");
      return;
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setAnimateResults(true), 100);
    }, 1000);
    return () => clearTimeout(timer);
  }, [review, result, navigate]);

  if (!review || !result) {
    return null;
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="h-8 w-8 text-emerald-400" />;
      case 'negative':
        return <ThumbsDown className="h-8 w-8 text-rose-400" />;
      default:
        return <Minus className="h-8 w-8 text-amber-400" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-emerald-900/40 text-emerald-100 border-emerald-400/50';
      case 'negative':
        return 'bg-rose-900/40 text-rose-100 border-rose-400/50';
      default:
        return 'bg-amber-900/40 text-amber-100 border-amber-400/50';
    }
  };

  const getSentimentGradient = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'from-emerald-900/20 to-green-900/20';
      case 'negative':
        return 'from-rose-900/20 to-red-900/20';
      default:
        return 'from-amber-900/20 to-orange-900/20';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <Card className="w-96 shadow-2xl bg-slate-800/90 backdrop-blur-xl border-slate-700/50 relative">
          <CardContent className="flex flex-col items-center py-16">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
                <Brain className="h-12 w-12 text-white animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-4">
              <p className="text-2xl font-bold text-white">AI Processing</p>
              <p className="text-slate-300">Analyzing sentiment patterns...</p>
              <div className="flex items-center justify-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50 sticky top-0 z-50">
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
              <p className="text-slate-300 text-sm">Analysis Complete</p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-8 text-white hover:bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Analyze Another Review
          </Button>

          {/* Main Result Card */}
          <Card className={`mb-12 shadow-2xl border-0 bg-gradient-to-br ${getSentimentGradient(result.sentiment)} backdrop-blur-xl relative overflow-hidden transition-all duration-1000 ${animateResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="absolute inset-0 bg-slate-800/80 backdrop-blur-sm"></div>
            <CardHeader className="text-center pb-8 relative">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="relative p-6 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-600/50">
                    {getSentimentIcon(result.sentiment)}
                  </div>
                </div>
              </div>
              <CardTitle className="text-4xl font-bold mb-4 text-white">
                Sentiment Analysis Complete
              </CardTitle>
              <div className="flex justify-center mb-6">
                <Badge className={`text-xl px-6 py-3 ${getSentimentColor(result.sentiment)} border-2 backdrop-blur-sm font-bold`}>
                  {result.sentiment.toUpperCase()}
                </Badge>
              </div>
              <div className="inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-600/50">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">AI Confidence Analysis</span>
              </div>
            </CardHeader>
            <CardContent className="text-center relative">
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-slate-600/50">
                <p className="text-lg text-slate-200 mb-6 font-medium flex items-center justify-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Confidence Score
                </p>
                <div className="text-5xl font-bold text-white mb-4">
                  {Math.round(result.confidence)}%
                </div>
                <Progress value={result.confidence} className="h-4 bg-slate-700/50" />
              </div>
              <p className="text-slate-200 text-xl leading-relaxed bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50">
                {result.explanation}
              </p>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <div className={`grid gap-8 md:grid-cols-2 mb-12 transition-all duration-1000 delay-300 ${animateResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Score Breakdown */}
            <Card className="shadow-2xl border-0 bg-slate-800/80 backdrop-blur-xl border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white text-xl">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                  Score Breakdown
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Detailed sentiment scoring analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-emerald-300 flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4" />
                      Positive
                    </span>
                    <span className="font-bold text-emerald-300 text-lg">{Math.round(result.positiveScore)}%</span>
                  </div>
                  <Progress value={result.positiveScore} className="h-3 bg-slate-700/50" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-rose-300 flex items-center gap-2">
                      <ThumbsDown className="h-4 w-4" />
                      Negative
                    </span>
                    <span className="font-bold text-rose-300 text-lg">{Math.round(result.negativeScore)}%</span>
                  </div>
                  <Progress value={result.negativeScore} className="h-3 bg-slate-700/50" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-amber-300 flex items-center gap-2">
                      <Minus className="h-4 w-4" />
                      Neutral
                    </span>
                    <span className="font-bold text-amber-300 text-lg">{Math.round(result.neutralScore)}%</span>
                  </div>
                  <Progress value={result.neutralScore} className="h-3 bg-slate-700/50" />
                </div>
              </CardContent>
            </Card>

            {/* Analysis Info */}
            <Card className="shadow-2xl border-0 bg-slate-800/80 backdrop-blur-xl border-slate-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white text-xl">
                  <Clock className="h-6 w-6 text-blue-400" />
                  Analysis Details
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Technical information about the analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg">
                    <span className="text-slate-300">Word Count:</span>
                    <span className="font-bold text-white">{result.wordCount}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg">
                    <span className="text-slate-300">Processed At:</span>
                    <span className="font-bold text-white">{new Date(result.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg">
                    <span className="text-slate-300">AI Engine:</span>
                    <span className="font-bold text-white flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Advanced NLP
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg">
                    <span className="text-slate-300">Processing Time:</span>
                    <span className="font-bold text-white flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      ~2.0s
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Words Analysis */}
          <Card className={`mb-12 shadow-2xl border-0 bg-slate-800/80 backdrop-blur-xl border-slate-700/50 transition-all duration-1000 delay-500 ${animateResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-yellow-400" />
                Key Words Detected
              </CardTitle>
              <CardDescription className="text-slate-300 text-base">
                Important words that influenced the AI sentiment analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <h4 className="font-bold text-emerald-300 mb-4 flex items-center gap-2 text-lg">
                    <ThumbsUp className="h-5 w-5" />
                    Positive Words ({result.keyWords.positive.length})
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {result.keyWords.positive.map((word, index) => (
                      <Badge key={index} variant="outline" className="bg-emerald-900/40 text-emerald-100 border-emerald-400/50 px-3 py-1 hover:bg-emerald-800/50 transition-all duration-200">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-rose-300 mb-4 flex items-center gap-2 text-lg">
                    <ThumbsDown className="h-5 w-5" />
                    Negative Words ({result.keyWords.negative.length})
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {result.keyWords.negative.map((word, index) => (
                      <Badge key={index} variant="outline" className="bg-rose-900/40 text-rose-100 border-rose-400/50 px-3 py-1 hover:bg-rose-800/50 transition-all duration-200">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-amber-300 mb-4 flex items-center gap-2 text-lg">
                    <Minus className="h-5 w-5" />
                    Neutral Words ({result.keyWords.neutral.length})
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {result.keyWords.neutral.map((word, index) => (
                      <Badge key={index} variant="outline" className="bg-amber-900/40 text-amber-100 border-amber-400/50 px-3 py-1 hover:bg-amber-800/50 transition-all duration-200">
                        {word}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Original Review */}
          <Card className={`shadow-2xl border-0 bg-slate-800/80 backdrop-blur-xl border-slate-700/50 transition-all duration-1000 delay-700 ${animateResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <CardHeader>
              <CardTitle className="text-white text-2xl">Original Review</CardTitle>
              <CardDescription className="text-slate-300 text-base">
                The movie review that was analyzed by our AI engine
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-700/40 backdrop-blur-sm rounded-xl p-6 border-l-4 border-purple-500 border border-slate-600/50">
                <p className="text-slate-200 leading-relaxed text-lg">
                  "{review}"
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className={`flex gap-6 mt-12 justify-center transition-all duration-1000 delay-900 ${animateResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button 
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 hover:from-purple-700 hover:via-purple-800 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl border-0"
            >
              <Brain className="h-5 w-5 mr-2" />
              Analyze Another Review
            </Button>
            <Button 
              onClick={() => navigate("/history")}
              variant="outline"
              className="border-slate-600/50 text-white hover:bg-slate-800/50 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              View History
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
