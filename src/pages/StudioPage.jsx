import { useState } from 'react'
import { Studio } from 'sanity'
import config from '../sanity/sanity.config'
import Preloader from '../components/Preloader'

export default function StudioPage() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="h-screen w-screen bg-[#050505] text-white relative z-50 text-left">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Studio config={config} />
    </div>
  )
}
