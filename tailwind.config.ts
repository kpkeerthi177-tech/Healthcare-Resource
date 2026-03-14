import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Bed, Wind, HeartPulse, Users, ChevronRight } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { mockHospitals, mockPatient } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { mockVitalsHistory } from '@/data/mockData';

export default function HospitalDashboard() {
  const { canEdit } = useAuth();
  const { toast } = useToast();
  const [hospital, setHospital] = useState(mockHospitals[0]);

  const toggleTeam = (team: keyof typeof hospital.teams) => {
    if (!canEdit('team-status')) return;
    setHospital((prev) => ({
      ...prev,
      teams: {
        ...prev.teams,
        [team]: {
          ...prev.teams[team],
          status: prev.teams[team].status === 'ready' ? 'preparing' : 'ready',
        },
      },
    }));
    toast({ title: 'Team status updated', description: `${team} team status changed` });
  };

  const toggleFacility = (facility: string, value: boolean) => {
    if (!canEdit('facility')) return;
    toast({ title: 'Facility updated', description: `${facility} availability changed` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Hospital Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">{hospital.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Bed} label="ICU Beds" value={`${hospital.icuBeds.available}/${hospital.icuBeds.total}`} subtitle="available" variant="emergency" delay={0} />
        <StatCard icon={Bed} label="General Beds" value={`${hospital.generalBeds.available}/${hospital.generalBeds.total}`} subtitle="available" variant="success" delay={0.1} />
        <StatCard icon={Wind} label="Ventilators" value={`${hospital.ventilators.available}/${hospital.ventilators.total}`} subtitle="available" variant="warning" delay={0.2} />
        <StatCard icon={HeartPulse} label="Incoming Patients" value={2} subtitle="1 critical" variant="emergency" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Facility Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-5 lg:col-span-1"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-medical-blue" />
            Facility Status
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Oxygen Supply', enabled: hospital.oxygen },
              { label: 'Trauma Care', enabled: hospital.traumaCare },
              { label: 'Blood Bank', enabled: true },
              { label: 'CT Scanner', enabled: true },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <Switch
                  checked={item.enabled}
                  onCheckedChange={(v) => toggleFacility(item.label, v)}
                  disabled={!canEdit('facility')}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team Readiness */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-5 lg:col-span-1"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-success" />
            Team Readiness
          </h2>
          <div className="space-y-3">
            {(Object.entries(hospital.teams) as [keyof typeof hospital.teams, typeof hospital.teams.trauma][]).map(([key, team]) => (
              <button
                key={key}
                onClick={() => toggleTeam(key)}
                disabled={!canEdit('team-status')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-150 disabled:opacity-60"
              >
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground capitalize">{key} Team</p>
                  <p className="text-xs text-muted-foreground">{team.members} members</p>
                </div>
                <StatusBadge status={team.status as 'ready' | 'preparing'} />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Incoming Patient Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-5 lg:col-span-1 border-emergency/20"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-emergency" />
            Incoming Patient
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Patient</span>
              <span className="text-sm font-medium text-foreground">{mockPatient.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">ETA</span>
              <StatusBadge status="en-route" label="8 min" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Condition</span>
              <StatusBadge status="critical" label="Critical" pulse />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Blood Group</span>
              <span className="text-sm font-bold text-emergency">{mockPatient.bloodGroup}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 p-2 bg-muted/50 rounded-lg">{mockPatient.chiefComplaint}</p>
          </div>
        </motion.div>
      </div>

      {/* Vitals Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-xl p-5"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Incoming Patient Vitals Trend</h2>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockVitalsHistory}>
              <defs>
                <linearGradient id="heartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="bpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(214, 32%, 91%)', fontSize: '12px' }} />
              <Area type="monotone" dataKey="heartRate" stroke="hsl(0, 84%, 60%)" fill="url(#heartGrad)" strokeWidth={2} name="Heart Rate" />
              <Area type="monotone" dataKey="systolicBP" stroke="hsl(217, 91%, 60%)" fill="url(#bpGrad)" strokeWidth={2} name="Systolic BP" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
