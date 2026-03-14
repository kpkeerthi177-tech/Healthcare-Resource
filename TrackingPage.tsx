import { motion } from 'framer-motion';
import { Ambulance, MapPin, HeartPulse, Clock, Navigation, Stethoscope } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { mockAmbulance, mockPatient } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

export default function AmbulanceDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Ambulance Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Unit {mockAmbulance.unit} · {mockAmbulance.paramedic}</p>
        </div>
        <StatusBadge status="en-route" label="En Route" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Clock} label="ETA" value={mockAmbulance.eta} subtitle="to City General" variant="blue" delay={0} />
        <StatCard icon={MapPin} label="Distance" value={mockAmbulance.distance} subtitle="remaining" variant="default" delay={0.1} />
        <StatCard icon={HeartPulse} label="Patient HR" value={`${mockPatient.vitals.heartRate} bpm`} subtitle="elevated" variant="emergency" delay={0.2} />
        <StatCard icon={Ambulance} label="Speed" value="45 km/h" subtitle="city traffic" variant="warning" delay={0.3} />
      </div>

      {/* Journey Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Navigation className="h-5 w-5 text-medical-blue" />
            Journey Progress
          </h2>
          <span className="text-sm font-medium text-medical-blue">{mockAmbulance.progress}%</span>
        </div>
        <Progress value={mockAmbulance.progress} className="h-3 mb-3" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Patient Location</span>
          <span>City General Hospital</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-5"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Patient Information</h2>
          <div className="space-y-3">
            {[
              ['Name', mockPatient.name],
              ['Age / Gender', `${mockPatient.age} / ${mockPatient.gender}`],
              ['Blood Group', mockPatient.bloodGroup],
              ['Chief Complaint', mockPatient.chiefComplaint],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-medium text-foreground text-right max-w-[60%]">{value}</span>
              </div>
            ))}
            <div>
              <span className="text-sm text-muted-foreground">Allergies</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {mockPatient.allergies.map((a) => (
                  <StatusBadge key={a} status="critical" label={a} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Vitals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-5"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Live Vitals</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Heart Rate', value: `${mockPatient.vitals.heartRate} bpm`, warn: mockPatient.vitals.heartRate > 90 },
              { label: 'Blood Pressure', value: `${mockPatient.vitals.systolicBP}/${mockPatient.vitals.diastolicBP}`, warn: mockPatient.vitals.systolicBP > 135 },
              { label: 'SpO₂', value: `${mockPatient.vitals.oxygenSat}%`, warn: mockPatient.vitals.oxygenSat < 95 },
              { label: 'Temperature', value: `${mockPatient.vitals.temperature}°C`, warn: false },
              { label: 'Resp. Rate', value: `${mockPatient.vitals.respiratoryRate}/min`, warn: false },
              { label: 'Glucose', value: `${mockPatient.vitals.glucose} mg/dL`, warn: mockPatient.vitals.glucose > 160 },
            ].map((v) => (
              <div key={v.label} className={`p-3 rounded-lg ${v.warn ? 'bg-emergency/5 border border-emergency/20' : 'bg-muted/50'}`}>
                <p className="text-xs text-muted-foreground">{v.label}</p>
                <p className={`text-lg font-bold ${v.warn ? 'text-emergency' : 'text-foreground'}`}>{v.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex gap-3">
        <Button asChild className="gradient-blue border-0 text-accent-foreground">
          <Link to="/paramedic">
            <Stethoscope className="h-4 w-4 mr-2" /> Open Paramedic Module
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/tracking/active">
            <MapPin className="h-4 w-4 mr-2" /> Live Tracking
          </Link>
        </Button>
      </div>
    </div>
  );
}
