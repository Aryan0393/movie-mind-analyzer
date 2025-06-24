
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

// Comprehensive word dictionaries for movie reviews
const positiveWords = [
  // Basic positive words
  'good', 'great', 'excellent', 'amazing', 'fantastic', 'wonderful', 'brilliant', 'outstanding',
  'superb', 'magnificent', 'spectacular', 'marvelous', 'incredible', 'awesome', 'perfect',
  'beautiful', 'stunning', 'remarkable', 'exceptional', 'impressive', 'extraordinary',
  
  // Movie-specific positive words
  'captivating', 'engaging', 'thrilling', 'compelling', 'mesmerizing', 'breathtaking',
  'riveting', 'gripping', 'enthralling', 'fascinating', 'intriguing', 'suspenseful',
  'hilarious', 'entertaining', 'enjoyable', 'delightful', 'charming', 'witty',
  'clever', 'smart', 'intelligent', 'thought-provoking', 'moving', 'touching',
  'emotional', 'powerful', 'intense', 'dramatic', 'epic', 'masterpiece',
  'flawless', 'polished', 'refined', 'sophisticated', 'elegant', 'artistic',
  
  // Performance and technical positive words
  'stellar', 'phenomenal', 'talented', 'skilled', 'convincing', 'believable',
  'natural', 'charismatic', 'magnetic', 'dynamic', 'versatile', 'nuanced',
  'cinematography', 'directing', 'screenplay', 'score', 'soundtrack', 'editing',
  'production', 'visuals', 'effects', 'performances', 'acting', 'cast',
  
  // Emotion and impact words
  'love', 'adore', 'enjoy', 'appreciate', 'admire', 'praise', 'recommend',
  'satisfy', 'pleased', 'happy', 'excited', 'thrilled', 'amazed', 'impressed',
  'inspired', 'uplifted', 'entertained', 'engaged', 'absorbed', 'immersed'
];

const negativeWords = [
  // Basic negative words
  'bad', 'terrible', 'awful', 'horrible', 'disgusting', 'disappointing', 'poor',
  'worse', 'worst', 'pathetic', 'ridiculous', 'stupid', 'dumb', 'idiotic',
  'useless', 'pointless', 'meaningless', 'worthless', 'waste', 'garbage',
  
  // Movie-specific negative words
  'boring', 'dull', 'tedious', 'slow', 'dragging', 'lengthy', 'overlong',
  'confusing', 'convoluted', 'messy', 'incoherent', 'nonsensical', 'illogical',
  'predictable', 'cliched', 'unoriginal', 'formulaic', 'generic', 'stale',
  'cheesy', 'corny', 'cringe', 'awkward', 'forced', 'artificial', 'fake',
  'unconvincing', 'unbelievable', 'unrealistic', 'implausible', 'contrived',
  
  // Performance and technical negative words
  'overacting', 'underacting', 'miscast', 'wooden', 'stiff', 'lifeless',
  'flat', 'one-dimensional', 'shallow', 'superficial', 'weak', 'poor',
  'sloppy', 'rushed', 'lazy', 'careless', 'amateur', 'unprofessional',
  'cheap', 'low-budget', 'tacky', 'gaudy', 'tasteless', 'vulgar',
  
  // Emotion and impact words
  'hate', 'dislike', 'despise', 'regret', 'disappointed', 'frustrated',
  'annoyed', 'irritated', 'bored', 'uninterested', 'indifferent', 'cold',
  'empty', 'hollow', 'soulless', 'heartless', 'disturbing', 'uncomfortable'
];

const neutralWords = [
  'okay', 'fine', 'decent', 'average', 'mediocre', 'ordinary', 'standard',
  'typical', 'normal', 'regular', 'common', 'usual', 'expected', 'predictable',
  'moderate', 'fair', 'reasonable', 'adequate', 'sufficient', 'acceptable',
  'watchable', 'passable', 'tolerable', 'bearable', 'mixed', 'varied',
  'balanced', 'neutral', 'middle', 'center', 'between', 'neither',
  'some', 'certain', 'particular', 'specific', 'general', 'overall'
];

// Intensifiers that boost sentiment
const intensifiers = [
  'very', 'extremely', 'incredibly', 'absolutely', 'completely', 'totally',
  'utterly', 'entirely', 'thoroughly', 'perfectly', 'exceptionally',
  'remarkably', 'particularly', 'especially', 'really', 'truly', 'genuinely',
  'quite', 'rather', 'fairly', 'pretty', 'highly', 'deeply', 'severely'
];

// Negation words that flip sentiment
const negationWords = [
  'not', 'no', 'never', 'nothing', 'nowhere', 'nobody', 'none', 'neither',
  'without', 'hardly', 'barely', 'scarcely', 'rarely', 'seldom', 'little',
  'few', 'less', 'least', 'minus', 'lacking', 'missing', 'absent'
];

export const analyzeSentiment = (text: string): SentimentResult => {
  console.log('Starting sentiment analysis for text:', text.substring(0, 100) + '...');
  
  // Normalize text
  const normalizedText = text.toLowerCase().replace(/[^\w\s]/g, ' ');
  const words = normalizedText.split(/\s+/).filter(word => word.length > 0);
  
  console.log('Normalized text into', words.length, 'words');
  
  let positiveScore = 0;
  let negativeScore = 0;
  let neutralScore = 0;
  
  const foundWords = {
    positive: [] as string[],
    negative: [] as string[],
    neutral: [] as string[]
  };
  
  // Analyze each word with context
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let wordScore = 0;
    let isIntensified = false;
    let isNegated = false;
    
    // Check for intensifiers in the previous word
    if (i > 0 && intensifiers.includes(words[i - 1])) {
      isIntensified = true;
    }
    
    // Check for negation in the previous 1-3 words
    for (let j = Math.max(0, i - 3); j < i; j++) {
      if (negationWords.includes(words[j])) {
        isNegated = true;
        break;
      }
    }
    
    // Calculate base word score
    if (positiveWords.includes(word)) {
      wordScore = 1;
      foundWords.positive.push(word);
    } else if (negativeWords.includes(word)) {
      wordScore = -1;
      foundWords.negative.push(word);
    } else if (neutralWords.includes(word)) {
      wordScore = 0;
      foundWords.neutral.push(word);
    }
    
    // Apply intensification
    if (isIntensified && wordScore !== 0) {
      wordScore *= 1.5;
      console.log(`Word "${word}" intensified by previous word`);
    }
    
    // Apply negation
    if (isNegated && wordScore !== 0) {
      wordScore *= -1;
      console.log(`Word "${word}" negated by previous negation word`);
    }
    
    // Add to appropriate score
    if (wordScore > 0) {
      positiveScore += wordScore;
    } else if (wordScore < 0) {
      negativeScore += Math.abs(wordScore);
    } else {
      neutralScore += 0.1; // Small neutral contribution
    }
  }
  
  console.log('Raw scores - Positive:', positiveScore, 'Negative:', negativeScore, 'Neutral:', neutralScore);
  
  // Calculate percentages
  const totalScore = positiveScore + negativeScore + neutralScore;
  const positivePercentage = totalScore > 0 ? (positiveScore / totalScore) * 100 : 0;
  const negativePercentage = totalScore > 0 ? (negativeScore / totalScore) * 100 : 0;
  const neutralPercentage = totalScore > 0 ? (neutralScore / totalScore) * 100 : 100;
  
  // Determine overall sentiment
  let sentiment: 'positive' | 'negative' | 'neutral';
  let confidence: number;
  
  const scoreDifference = Math.abs(positiveScore - negativeScore);
  const maxScore = Math.max(positiveScore, negativeScore, neutralScore);
  
  if (positiveScore > negativeScore && positiveScore > neutralScore) {
    sentiment = 'positive';
    confidence = Math.min(95, 50 + (scoreDifference / maxScore) * 45);
  } else if (negativeScore > positiveScore && negativeScore > neutralScore) {
    sentiment = 'negative';
    confidence = Math.min(95, 50 + (scoreDifference / maxScore) * 45);
  } else {
    sentiment = 'neutral';
    confidence = Math.min(90, 40 + (neutralScore / totalScore) * 50);
  }
  
  // Generate explanation
  let explanation: string;
  const totalSentimentWords = foundWords.positive.length + foundWords.negative.length;
  
  if (sentiment === 'positive') {
    explanation = `This review expresses a positive sentiment with ${foundWords.positive.length} positive words detected. The review contains optimistic language and favorable opinions about the movie.`;
  } else if (sentiment === 'negative') {
    explanation = `This review expresses a negative sentiment with ${foundWords.negative.length} negative words detected. The review contains critical language and unfavorable opinions about the movie.`;
  } else {
    explanation = `This review expresses a neutral sentiment with balanced or moderate language. The review contains ${totalSentimentWords} sentiment words with no strong emotional leaning.`;
  }
  
  console.log('Final analysis:', {
    sentiment,
    confidence,
    positivePercentage,
    negativePercentage,
    neutralPercentage
  });
  
  return {
    sentiment,
    confidence,
    positiveScore: positivePercentage,
    negativeScore: negativePercentage,
    neutralScore: neutralPercentage,
    explanation,
    keyWords: {
      positive: [...new Set(foundWords.positive)].slice(0, 10), // Remove duplicates and limit
      negative: [...new Set(foundWords.negative)].slice(0, 10),
      neutral: [...new Set(foundWords.neutral)].slice(0, 10)
    },
    wordCount: words.length,
    timestamp: new Date().toISOString()
  };
};
