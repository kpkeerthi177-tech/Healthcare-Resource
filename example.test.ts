import { motion } from 'framer-motion';
import { CalendarDays, Clock, User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { mockAppointments } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function AppointmentsPage() {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState(mockAppointments);
  const [open, setOpen] = useState(false);

  const addAppointment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setAppointments(prev => [...prev, {
      id: `ap${Date.now()}`,
      doctor: fd.get('doctor') as string,
      specialty: fd.get('specialty') as string,
      date: fd.get('date') as string,
      time: fd.get('time') as string,
      status: 'pending' as const,
    }]);
    setOpen(false);
    toast({ title: 'Appointment scheduled', description: 'Your appointment has been requested.' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Appointments</h1>
          <p className="text-sm text-muted-foreground mt-1">Schedule and manage your appointments</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gradient-blue border-0 text-accent-foreground">
              <Plus className="h-4 w-4 mr-1" /> New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Appointment</DialogTitle>
            </DialogHeader>
            <form onSubmit={addAppointment} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Doctor</label>
                <Input name="doctor" required placeholder="Dr. Name" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Specialty</label>
                <Input name="specialty" required placeholder="e.g. Cardiology" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Date</label>
                  <Input name="date" type="date" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Time</label>
                  <Input name="time" type="time" required />
                </div>
              </div>
              <Button type="submit" className="w-full gradient-blue border-0 text-accent-foreground">Schedule</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {appointments.map((apt, i) => (
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg p-2.5 bg-medical-blue/10 text-medical-blue">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{apt.doctor}</p>
                <p className="text-sm text-muted-foreground">{apt.specialty}</p>
              </div>
            </div>
            <div className="text-right flex items-center gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">{apt.date}</p>
                <p className="text-xs text-muted-foreground">{apt.time}</p>
              </div>
              <StatusBadge status={apt.status} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
