import { motion } from 'framer-motion';
import { User, Heart, Shield, Droplets, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/StatusBadge';
import { mockPatient } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function HealthProfile() {
  const { canEdit } = useAuth();
  const { toast } = useToast();
  const editable = canEdit('health-profile');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Health Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">Digital Health ID</p>
        </div>
        {editable && (
          <Button size="sm" className="gradient-blue border-0 text-accent-foreground" onClick={() => toast({ title: 'Profile saved' })}>
            Save Changes
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-medical-blue" /> Personal Info
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Full Name', value: mockPatient.name },
              { label: 'Age', value: mockPatient.age },
              { label: 'Gender', value: mockPatient.gender },
              { label: 'Emergency Contact', value: mockPatient.emergencyContact },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{f.label}</label>
                <Input value={f.value} readOnly={!editable} className="bg-muted/50 border-border text-sm" />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-5">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Heart className="h-5 w-5 text-emergency" /> Medical Info
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Blood Group</label>
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-emergency" />
                <span className="text-2xl font-bold text-emergency">{mockPatient.bloodGroup}</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Allergies</label>
              <div className="flex flex-wrap gap-1.5">
                {mockPatient.allergies.map(a => <StatusBadge key={a} status="critical" label={a} />)}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Existing Conditions</label>
              <div className="flex flex-wrap gap-1.5">
                {mockPatient.conditions.map(c => <StatusBadge key={c} status="preparing" label={c} />)}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
