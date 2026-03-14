import { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Send, Camera, Save, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { mockPatient } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function ParamedicPatient() {
  const { canEdit } = useAuth();
  const { toast } = useToast();
  const isEditable = canEdit('patient-data') || canEdit('vitals');

  const [patient, setPatient] = useState(mockPatient);
  const [vitals, setVitals] = useState(mockPatient.vitals);
  const [observations, setObservations] = useState(mockPatient.observations);
  const [chiefComplaint, setChiefComplaint] = useState(mockPatient.chiefComplaint);

  const handleSubmit = () => {
    toast({ title: 'Data sent to hospital', description: 'City General Hospital has been notified with patient data.' });
  };

  const handleSave = () => {
    toast({ title: 'Saved', description: 'Patient data saved locally.' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Paramedic-Patient Module</h1>
          <p className="text-sm text-muted-foreground mt-1">{isEditable ? 'Edit mode' : 'View only'}</p>
        </div>
        {isEditable && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
            <Button size="sm" className="gradient-blue border-0 text-accent-foreground" onClick={handleSubmit}>
              <Send className="h-4 w-4 mr-1" /> Submit to Hospital
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-5"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-medical-blue" />
            Patient Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Full Name', value: patient.name, key: 'name' },
              { label: 'Age', value: patient.age, key: 'age' },
              { label: 'Gender', value: patient.gender, key: 'gender' },
              { label: 'Blood Group', value: patient.bloodGroup, key: 'bloodGroup' },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{field.label}</label>
                <Input
                  value={field.value}
                  readOnly={!isEditable}
                  className="bg-muted/50 border-border text-sm"
                  onChange={(e) => setPatient({ ...patient, [field.key]: e.target.value })}
                />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Allergies</label>
            <Input
              value={patient.allergies.join(', ')}
              readOnly={!isEditable}
              className="bg-muted/50 border-border text-sm"
            />
          </div>
          <div className="mt-4">
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Existing Conditions</label>
            <Input
              value={patient.conditions.join(', ')}
              readOnly={!isEditable}
              className="bg-muted/50 border-border text-sm"
            />
          </div>
        </motion.div>

        {/* Vitals Entry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-5"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-emergency" />
            Vitals
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Heart Rate (bpm)', key: 'heartRate', value: vitals.heartRate },
              { label: 'Systolic BP', key: 'systolicBP', value: vitals.systolicBP },
              { label: 'Diastolic BP', key: 'diastolicBP', value: vitals.diastolicBP },
              { label: 'SpO₂ (%)', key: 'oxygenSat', value: vitals.oxygenSat },
              { label: 'Temperature (°C)', key: 'temperature', value: vitals.temperature },
              { label: 'Resp. Rate (/min)', key: 'respiratoryRate', value: vitals.respiratoryRate },
              { label: 'Glucose (mg/dL)', key: 'glucose', value: vitals.glucose },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">{field.label}</label>
                <Input
                  type="number"
                  value={field.value}
                  readOnly={!isEditable}
                  className="bg-muted/50 border-border text-sm"
                  onChange={(e) => setVitals({ ...vitals, [field.key]: parseFloat(e.target.value) || 0 })}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Clinical Assessment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-5"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Clinical Assessment</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Chief Complaint</label>
            <Textarea
              value={chiefComplaint}
              readOnly={!isEditable}
              className="bg-muted/50 border-border text-sm resize-none"
              rows={3}
              onChange={(e) => setChiefComplaint(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Observations</label>
            <Textarea
              value={observations}
              readOnly={!isEditable}
              className="bg-muted/50 border-border text-sm resize-none"
              rows={3}
              onChange={(e) => setObservations(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Medications Administered</label>
          <Input
            value={patient.medications.join(', ')}
            readOnly={!isEditable}
            className="bg-muted/50 border-border text-sm"
          />
        </div>
        {isEditable && (
          <Button variant="outline" size="sm" className="mt-4">
            <Camera className="h-4 w-4 mr-1" /> Add Photo Documentation
          </Button>
        )}
      </motion.div>
    </div>
  );
}
