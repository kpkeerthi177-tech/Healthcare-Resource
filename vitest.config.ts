import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, Phone, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { mockPatient, mockAppointments } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { useAuth } from '@/contexts/AuthContext';

export default function SOSPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [sosActive, setSosActive] = useState(false);
  const [pulse, setPulse] = useState(false);

  const triggerSOS = () => {
    setPulse(true);
    setTimeout(() => {
      setSosActive(true);
      setPulse(false);
      toast({
        title: '🚨 SOS Alert Sent!',
        description: 'Nearest ambulance dispatched. Stay calm.',
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Emergency SOS</h1>
        <p className="text-sm text-muted-foreground mt-1">One-tap emergency alert system</p>
      </div>

      {/* SOS Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center py-8"
      >
        <div className="relative">
          {pulse && (
            <>
              <span className="absolute inset-0 rounded-full bg-emergency/30 sos-ring" />
              <span className="absolute inset-0 rounded-full bg-emergency/20 sos-ring" style={{ animationDelay: '0.5s' }} />
            </>
          )}
          <button
            onClick={triggerSOS}
            disabled={sosActive}
            className={`relative w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 font-bold text-xl shadow-2xl transition-all duration-150 ${
              sosActive
                ? 'bg-success text-success-foreground'
                : 'gradient-emergency text-emergency-foreground hover:shadow-emergency/40 hover:scale-105 active:scale-95'
            }`}
          >
            {sosActive ? (
              <>
                <Heart className="h-8 w-8" />
                <span className="text-sm">Help is coming</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-10 w-10" />
                <span>SOS</span>
              </>
            )}
          </button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          {sosActive ? 'Ambulance AMB-042 dispatched — ETA 6 min' : 'Press to alert nearest ambulance & hospitals'}
        </p>
      </motion.div>

      {sosActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-5 border-success/30"
        >
          <h2 className="text-lg font-semibold text-foreground mb-3">Dispatch Confirmed</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ambulance</span>
              <span className="font-medium text-foreground">AMB-042</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ETA</span>
              <StatusBadge status="en-route" label="6 min" />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hospital</span>
              <span className="font-medium text-foreground">City General</span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="tel:112"><Phone className="h-4 w-4 mr-1" /> Call 112</a>
            </Button>
            <Button size="sm" className="gradient-blue border-0 text-accent-foreground" asChild>
              <a href="/tracking/active"><MapPin className="h-4 w-4 mr-1" /> Track Ambulance</a>
            </Button>
          </div>
        </motion.div>
      )}

      {/* Health Profile Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-5"
      >
        <h2 className="text-lg font-semibold text-foreground mb-3">Your Health Profile</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-muted-foreground">Blood Group</span><p className="font-bold text-emergency">{mockPatient.bloodGroup}</p></div>
          <div><span className="text-muted-foreground">Emergency Contact</span><p className="font-medium text-foreground">{mockPatient.emergencyContact}</p></div>
          <div className="col-span-2"><span className="text-muted-foreground">Allergies</span>
            <div className="flex gap-1 mt-1">{mockPatient.allergies.map(a => <StatusBadge key={a} status="critical" label={a} />)}</div>
          </div>
          <div className="col-span-2"><span className="text-muted-foreground">Conditions</span>
            <div className="flex gap-1 mt-1">{mockPatient.conditions.map(c => <StatusBadge key={c} status="preparing" label={c} />)}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
