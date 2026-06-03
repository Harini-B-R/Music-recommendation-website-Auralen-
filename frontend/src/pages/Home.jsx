
// import { useState, useEffect } from 'react'
// import { recommend } from '../api'
// import RecommendationList from '../components/RecommendationList'
// import AOS from 'aos'
// import 'aos/dist/aos.css'

// const MOODS = ['happy','sad','relaxed','focus','angry','romantic']

// export default function Home() {
//   const [text, setText] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [results, setResults] = useState([])
//   const [mood, setMood] = useState('')

//   useEffect(() => {
//     const saved = localStorage.getItem('history')
//     if (!saved) localStorage.setItem('history', JSON.stringify([]))

//     // Initialize AOS
//     AOS.init({ duration: 800, once: true, easing: 'ease-in-out', mirror: true })
//   }, [])

//   const submit = async (inputText) => {
//     setLoading(true)
//     const data = await recommend(inputText ?? text)
//     setLoading(false)
//     setResults(data.recommendations || [])
//     setMood(data.mood || '')

//     // Save to history
//     const history = JSON.parse(localStorage.getItem('history') || '[]')
//     history.unshift({ 
//       time: new Date().toISOString(), 
//       text: inputText ?? text, 
//       mood: data.mood, 
//       resultCount: (data.recommendations || []).length 
//     })
//     localStorage.setItem('history', JSON.stringify(history.slice(0,50)))
    
//     // Refresh AOS animations for newly rendered elements
//     AOS.refresh()
//   }

//   return (
//     <div className="card" data-aos="fade-up">
//       <h2 data-aos="fade-right" data-aos-delay="100">Get Recommendations</h2>

//       <div className="row" style={{marginBottom:12}} data-aos="fade-left" data-aos-delay="200">
//         <input 
//           className="input" 
//           placeholder="Type how you feel (e.g., I feel sad)"
//           value={text} 
//           onChange={(e)=>setText(e.target.value)} 
//         />
//         <button 
//           className="btn" 
//           onClick={()=>submit()} 
//           disabled={loading || !text.trim()}
//           data-aos="zoom-in"
//           data-aos-delay="250"
//         >
//           {loading ? 'Loading...' : 'Get Recommendations'}
//         </button>
//       </div>

//       <div className="row" style={{marginBottom:16, gap:8}}>
//         {MOODS.map((m, idx) => (
//           <button 
//             key={m} 
//             className="badge" 
//             onClick={()=>submit(m)}
//             data-aos="fade-up"
//             data-aos-delay={300 + idx*50} // staggered mood buttons
//           >
//             #{m}
//           </button>
//         ))}
//       </div>

//       {mood && (
//         <div className="small" style={{marginBottom:12}} data-aos="fade-up" data-aos-delay="500">
//           Detected mood: <b>{mood}</b>
//         </div>
//       )}

//       <RecommendationList 
//         items={results} 
//         data-aos="fade-up" 
//         data-aos-delay="600"
//       />
//     </div>
//   )
// }
import { useState, useEffect } from 'react'
import { recommend } from '../api'
import RecommendationList from '../components/RecommendationList'
import AOS from 'aos'
import 'aos/dist/aos.css'

const MOODS = ['happy','sad','relaxed','focus','angry','romantic']

export default function Home() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [mood, setMood] = useState('')
  const [visibleCount, setVisibleCount] = useState(6) // 👈 initially show only 6

  useEffect(() => {
    const saved = localStorage.getItem('history')
    if (!saved) localStorage.setItem('history', JSON.stringify([]))

    // Initialize AOS
    AOS.init({ duration: 800, once: true, easing: 'ease-in-out', mirror: true })
  }, [])

  const submit = async (inputText) => {
    setLoading(true)
    const data = await recommend(inputText ?? text)
    setLoading(false)
    setResults(data.recommendations || [])
    setMood(data.mood || '')
    setVisibleCount(6) // 👈 reset count whenever new mood is searched

    // Save to history
    const history = JSON.parse(localStorage.getItem('history') || '[]')
    history.unshift({ 
      time: new Date().toISOString(), 
      text: inputText ?? text, 
      mood: data.mood, 
      resultCount: (data.recommendations || []).length 
    })
    localStorage.setItem('history', JSON.stringify(history.slice(0,50)))
    
    // Refresh AOS animations
    AOS.refresh()
  }

  return (
    <div className="card" data-aos="fade-up">
      <h2 data-aos="fade-right" data-aos-delay="100">Get Recommendations</h2>

      <div className="row" style={{marginBottom:12}} data-aos="fade-left" data-aos-delay="200">
        <input 
          className="input" 
          placeholder="Type how you feel (e.g., I feel sad)"
          value={text} 
          onChange={(e)=>setText(e.target.value)} 
        />
        <button 
          className="btn" 
          onClick={()=>submit()} 
          disabled={loading || !text.trim()}
          data-aos="zoom-in"
          data-aos-delay="250"
        >
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </div>

      <div className="row" style={{marginBottom:16, gap:8}}>
        {MOODS.map((m, idx) => (
          <button 
            key={m} 
            className="badge" 
            onClick={()=>submit(m)}
            data-aos="fade-up"
            data-aos-delay={300 + idx*50}
          >
            #{m}
          </button>
        ))}
      </div>

      {mood && (
        <div className="small" style={{marginBottom:12}} data-aos="fade-up" data-aos-delay="500">
          Detected mood: <b>{mood}</b>
        </div>
      )}

      {/* Show only a portion of results */}
      <RecommendationList 
        items={results.slice(0, visibleCount)} 
        data-aos="fade-up" 
        data-aos-delay="600"
      />

      {/* Load more button if results > visible */}
      {results.length > visibleCount && (
        <div style={{textAlign:'center', marginTop:12}}>
          <button 
            className="btn" 
            onClick={() => setVisibleCount(c => c + 6)} // show 6 more
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
