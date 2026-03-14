import { motion } from 'framer-motion';
import { Activity, Ambulance, Building2, Users, AlertTriangle, Clock } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { mockHospitals, mockTrackingUpdates } from '@/data/mockData';

export default function CommandCenter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Command Center</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time emergency coordination overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={AlertTriangle} label="Active Emergencies" value={3} subtitle="2 critical" variant="emergency" delay={0} />
        <StatCard icon={Ambulance} label="Ambulances Active" value={7} subtitle="of 12 total" variant="blue" delay={0.1} />
        <StatCard icon={Building2} label="Hospitals Online" value={8} subtitle="92% readiness" variant="success" delay={0.2} />
        <StatCard icon={Clock} label="Avg Response Time" value="6.2 min" subtitle="↓ 12% from last week" variant="default" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-5"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-medical-blue" />
            Hospital Availability
          </h2>
          <div className="space-y-3">
            {mockHospitals.map((h) => (
              <div key={h.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-foreground text-sm">{h.name}</p>
                  <p className="text-xs text-muted-foreground">{h.distance} · {h.eta}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={h.icuBeds.available > 2 ? 'available' : 'critical'} label={`ICU: ${h.icuBeds.available}`} />
                  <StatusBadge status={h.generalBeds.available > 10 ? 'available' : 'preparing'} label={`Gen: ${h.generalBeds.available}`} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-5"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-emergency" />
            Live Activity Feed
          </h2>
          <div className="space-y-3">
            {mockTrackingUpdates.map((update, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="flex items-start gap-3"
              >
                <span className="text-xs text-muted-foreground font-mono mt-0.5 w-10 flex-shrink-0">{update.time}</span>
                <div className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${
                  update.type === 'alert' ? 'bg-emergency' :
                  update.type === 'dispatch' ? 'bg-medical-blue' :
                  update.type === 'hospital' ? 'bg-success' : 'bg-muted-foreground'
                }`} />
                <p className="text-sm text-foreground">{update.event}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
