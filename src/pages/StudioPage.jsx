import { Studio } from 'sanity'
import config from '../sanity/sanity.config'

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white relative z-50 text-left">
      <Studio config={config} />
    </div>
  )
}
