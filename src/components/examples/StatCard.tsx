import StatCard from '../StatCard'
import { Users } from 'lucide-react'

export default function StatCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8">
      <StatCard icon={Users} value="500+" label="Talents Discovered" />
      <StatCard value="45" label="Active Projects" />
      <StatCard value="120" label="Volunteers" />
      <StatCard value="15" label="Partner Organizations" />
    </div>
  )
}
