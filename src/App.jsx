import { useState, useRef, useEffect } from 'react'
import wizardVideo from './assets/video/Wizard.mp4'
import noMoreQuestionsVideo from './assets/video/No More Questions.mp4'

const TOP_ADVICE = [
  {
    id: 1,
    text: "If you're homeless, just buy a house.",
    author: "The Management",
    color: "bg-yellow-400"
  },
  {
    id: 2,
    text: "Depressed? Have you tried just being happy? It's free.",
    author: "Life Coach (Uncertified)",
    color: "bg-pink-400"
  },
  {
    id: 3,
    text: "Can't afford rent? Stop eating avocado toast and buying coffee. Obviously.",
    author: "A Billionaire",
    color: "bg-cyan-400"
  },
  {
    id: 4,
    text: "Lost your keys? They're probably in the last place you look. Why look anywhere else?",
    author: "Captain Obvious",
    color: "bg-lime-400"
  }
]

const SARCASTIC_RESPONSES = [
  "Have you tried turning your life off and on again?",
  "That sounds like a 'you' problem, honestly.",
  "I'd help, but I'm busy being a line of code.",
  "Have you considered just... not having that problem? It's working great for me.",
  "Maybe try asking someone who actually cares?",
  "I ran a simulation of your plan. In 99% of outcomes, it ends in a facepalm.",
  
  "The stars say: 'No.' Just... no.",
  "I'd give you my two cents, but clearly, you're already bankrupt in the ideas department.",
  "I've analyzed your problem. My conclusion: Yikes."
]

function App() {
  const [question, setQuestion] = useState('')
  const [advice, setAdvice] = useState('')
  const [loading, setLoading] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [submissionCount, setSubmissionCount] = useState(0)
  const [showFinalVideo, setShowFinalVideo] = useState(false)
  const [finalVideoPlaying, setFinalVideoPlaying] = useState(false)
  const videoRef = useRef(null)
  const finalVideoRef = useRef(null)

  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleFinalVideoClick = () => {
    if (finalVideoRef.current) {
      finalVideoRef.current.play()
      setFinalVideoPlaying(true)
    }
  }

  const getAdvice = () => {
    if (!question.trim()) return
    
    // Check if this is the 3rd submission (count is currently 2)
    if (submissionCount === 2) {
      // Trigger final video immediately, no advice
      setShowFinalVideo(true)
      setQuestion('')
      return
    }
    
    setLoading(true)
    setAdvice('')
    
    // Sarcastic loading delay
    setTimeout(() => {
      const randomAdvice = SARCASTIC_RESPONSES[Math.floor(Math.random() * SARCASTIC_RESPONSES.length)]
      setAdvice(randomAdvice)
      setLoading(false)
      setSubmissionCount(prev => prev + 1)
      setQuestion('')
    }, 2000)
  }

  // Auto-play final video when it's shown
  useEffect(() => {
    if (showFinalVideo && finalVideoRef.current) {
      finalVideoRef.current.play()
      setFinalVideoPlaying(true)
    }
  }, [showFinalVideo])

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 border-b-4 border-black pb-6">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
          Give me some advice
        </h1>
        <button 
          onClick={() => alert("I said I'd ignore them. What did you expect?")}
          className="brutal-btn bg-purple-500 text-white hover:bg-purple-600"
        >
          Submit your problems (so I can ignore them)
        </button>
      </header>

      {/* Hero Section */}
      <section className="mb-16">
        {showFinalVideo ? (
          /* Final "No More Questions" Video */
          <div className="brutal-card bg-black p-0 overflow-hidden animate-in fade-in duration-500 cursor-pointer relative">
            <video 
              ref={finalVideoRef}
              className="w-full h-auto"
              playsInline
              autoPlay
              onClick={handleFinalVideoClick}
              onPause={() => setFinalVideoPlaying(false)}
              onPlay={() => setFinalVideoPlaying(true)}
              src={noMoreQuestionsVideo}
            >
              Your browser does not support the video tag.
            </video>
            
            {/* Play Button Overlay */}
            {!finalVideoPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity hover:bg-opacity-40"
                onClick={handleFinalVideoClick}
              >
                <svg
                  width="100px"
                  height="100px"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-lg transition-transform hover:scale-110"
                  aria-hidden="true"
                  role="img"
                >
                  <circle cx={32} cy={32} r={30} fill="#4fd1d9" />
                  <path fill="#ffffff" d="M25 12l20 20l-20 20z" />
                </svg>
              </div>
            )}
          </div>
        ) : !videoEnded ? (
          /* Initial Wizard Video Player */
          <div className="brutal-card bg-black p-0 overflow-hidden animate-in fade-in duration-500 cursor-pointer relative">
            <video 
              ref={videoRef}
              className="w-full h-auto"
              playsInline
              onClick={handleVideoClick}
              onEnded={() => setVideoEnded(true)}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              src={wizardVideo}
            >
              Your browser does not support the video tag.
            </video>
            
            {/* Play Button Overlay */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity hover:bg-opacity-40"
                onClick={handleVideoClick}
              >
                <svg
                  width="100px"
                  height="100px"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-lg transition-transform hover:scale-110"
                  aria-hidden="true"
                  role="img"
                >
                  <circle cx={32} cy={32} r={30} fill="#4fd1d9" />
                  <path fill="#ffffff" d="M25 12l20 20l-20 20z" />
                </svg>
              </div>
            )}
          </div>
        ) : (
          /* Question Form */
          <div className="brutal-card bg-orange-400 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            <h2 className="text-2xl font-bold mb-4 uppercase">What's your problem now?</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your pathetic struggle here..."
                className="brutal-input"
              />
              <button 
                onClick={getAdvice}
                disabled={loading || !question.trim()}
                className="brutal-btn bg-black text-white hover:bg-gray-800 disabled:bg-gray-400"
              >
                {loading ? 'Judging you...' : 'Get Advice'}
              </button>
            </div>
          </div>
        )}

        {/* Response Area */}
        {!showFinalVideo && (loading || advice) && (
          <div className={`brutal-card ${loading ? 'bg-gray-200' : 'bg-white'} border-dashed animate-in fade-in slide-in-from-top-4 duration-500`}>
            {loading ? (
              <p className="text-2xl font-bold italic">Analyzing your poor life choices...</p>
            ) : (
              <div>
                <p className="text-sm uppercase font-bold text-gray-500 mb-2">Our Expert Opinion:</p>
                <p className="text-3xl font-black">"{advice}"</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Advice Grid */}
      <section>
        <h2 className="text-3xl font-black uppercase mb-8 inline-block bg-yellow-300 px-4 py-2 border-4 border-black shadow-brutal">
          Top Advice (From People Better Than You)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {TOP_ADVICE.map((item) => (
            <div key={item.id} className={`brutal-card ${item.color}`}>
              <p className="text-2xl font-bold mb-4">"{item.text}"</p>
              <p className="text-right font-mono font-bold">— {item.author}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-20 text-center font-bold border-t-4 border-black pt-8 pb-12">
        <p>© 2026 Sarcasm Inc. We don't care about your feedback.</p>
      </footer>
    </div>
  )
}

export default App
