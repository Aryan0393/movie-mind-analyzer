
# MovieSentiment AI - Movie Review Sentiment Analysis Tool

A sophisticated AI-powered sentiment analysis tool specifically designed for movie reviews. This application analyzes the emotional tone of movie reviews and classifies them as positive, negative, or neutral with detailed explanations and confidence scores.

## 🚀 Features

### Frontend
- **Responsive Web Interface**: Modern, mobile-first design built with React and Tailwind CSS
- **Real-time Analysis**: Instant sentiment analysis with detailed results
- **Interactive Results**: Comprehensive breakdown with confidence scores and key word detection
- **Review History**: Local storage of previous analyses with statistics
- **Example Reviews**: Pre-loaded examples to test the system

### Sentiment Analysis Engine
- **Advanced Rule-Based Analysis**: Sophisticated algorithm using comprehensive word dictionaries
- **Context Awareness**: Handles negations, intensifiers, and contextual modifiers
- **Movie-Specific Vocabulary**: Specialized dictionaries for film terminology and movie review language
- **Confidence Scoring**: Provides reliability scores for each analysis
- **Key Word Detection**: Identifies and categorizes influential words

### Technical Features
- **Modern React Architecture**: Built with TypeScript, React Router, and modern hooks
- **Component-Based Design**: Modular, maintainable component structure
- **Local Data Persistence**: Client-side storage for review history
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Beautiful UI Components**: Uses shadcn/ui for consistent, accessible interface elements

## 🛠 Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom gradients and animations
- **UI Components**: shadcn/ui component library
- **Routing**: React Router DOM for navigation
- **Icons**: Lucide React for consistent iconography
- **State Management**: React hooks and local storage
- **Data Querying**: TanStack Query for efficient data management

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd moviesentiment-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The application will hot-reload as you make changes

### Production Build

```bash
npm run build
npm run preview
```

## 🧠 Sentiment Analysis Approach

### Algorithm Overview
Our sentiment analysis engine uses a sophisticated rule-based approach specifically tuned for movie reviews:

1. **Text Preprocessing**
   - Normalization of text (lowercase, punctuation handling)
   - Word tokenization and filtering
   - Context window analysis

2. **Dictionary-Based Classification**
   - **Positive Words**: 100+ carefully curated positive terms including movie-specific vocabulary
   - **Negative Words**: 100+ negative terms covering criticism and disappointment
   - **Neutral Words**: Balanced terms that indicate moderate opinions

3. **Advanced Features**
   - **Negation Handling**: Detects "not good" vs "good" with context-aware negation
   - **Intensifier Recognition**: Processes "very good" vs "good" with intensity multipliers
   - **Context Windows**: Analyzes 1-3 word context for accurate sentiment modification

4. **Scoring System**
   - Dynamic weight calculation based on word significance
   - Confidence scoring using statistical analysis
   - Percentage breakdown across all sentiment categories

### Example Analysis Process

**Input**: "This movie was not very good, but the cinematography was absolutely stunning."

**Processing**:
1. Tokenize words and identify sentiment indicators
2. Detect "not very good" (negated positive → negative)
3. Identify "absolutely stunning" (intensified positive → strong positive)
4. Calculate weighted scores and determine overall sentiment

**Output**: Neutral (balanced positive and negative elements) with detailed explanation

## 📊 Features Walkthrough

### Home Page
- Clean, intuitive interface for entering movie reviews
- Example reviews for quick testing
- Real-time character counting and validation
- Smooth loading animations during analysis

### Results Page
- **Sentiment Classification**: Clear positive/negative/neutral designation
- **Confidence Score**: Percentage reliability of the analysis
- **Score Breakdown**: Detailed percentage breakdown across all categories
- **Key Words Analysis**: Visual display of influential words by category
- **Analysis Metadata**: Word count, processing time, and timestamp

### History Page
- **Review Storage**: Local browser storage of analysis history
- **Statistics Dashboard**: Aggregate statistics across all analyses
- **Review Management**: Clear history functionality with confirmation
- **Detailed History**: Complete record of past analyses with timestamps

## 🎨 Design Philosophy

The application follows modern design principles:

- **Hierarchy**: Clear information architecture with logical flow
- **Contrast**: High contrast ratios for accessibility
- **Balance**: Symmetric layouts with purposeful asymmetry for emphasis
- **Movement**: Subtle animations and transitions for enhanced UX
- **Responsive**: Mobile-first design that scales beautifully across devices

## 🔧 Customization

### Adding New Words to Dictionaries
Edit `src/utils/sentimentAnalysis.ts` and add words to the appropriate arrays:

```typescript
const positiveWords = [
  // Add new positive words here
  'brilliant', 'masterful', 'captivating'
];
```

### Modifying Analysis Parameters
Adjust confidence calculation, intensifier weights, and negation handling in the `analyzeSentiment` function.

### Styling Customization
The application uses Tailwind CSS with custom color schemes. Modify `tailwind.config.ts` and component classes to customize the appearance.

## 📱 Browser Compatibility

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 88+
- **Features**: Uses modern JavaScript features with graceful degradation

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Traditional Hosting
```bash
npm run build
# Upload dist/ folder to your web server
```

## 🧪 Testing the Application

### Test Cases
1. **Positive Review**: "This movie was absolutely fantastic! Amazing acting and brilliant storyline."
2. **Negative Review**: "Terrible movie with poor acting and confusing plot. Complete waste of time."
3. **Neutral Review**: "The movie was okay. Some parts were good, others not so much."
4. **Complex Review**: "While the acting was not great, the cinematography was absolutely stunning."

### Expected Behaviors
- Proper sentiment classification with reasonable confidence scores
- Accurate key word detection and categorization
- Responsive design across different screen sizes
- Smooth animations and loading states

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**MovieSentiment AI** - Transforming movie review analysis with intelligent sentiment detection.
