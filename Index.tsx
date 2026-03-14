@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 210 40% 98%;
    --foreground: 222 47% 11%;

    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;

    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;

    --primary: 222 47% 11%;
    --primary-foreground: 210 40% 98%;

    --secondary: 214 32% 91%;
    --secondary-foreground: 222 47% 11%;

    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;

    --accent: 217 91% 60%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --success: 160 84% 39%;
    --success-foreground: 0 0% 100%;

    --warning: 38 92% 50%;
    --warning-foreground: 0 0% 100%;

    --emergency: 0 84% 60%;
    --emergency-foreground: 0 0% 100%;

    --medical-blue: 217 91% 60%;
    --medical-blue-foreground: 0 0% 100%;

    --navy: 222 47% 11%;
    --navy-foreground: 210 40% 98%;

    --border: 214 32% 91%;
    --input: 214 32% 91%;
    --ring: 217 91% 60%;

    --radius: 0.75rem;

    --sidebar-background: 222 47% 11%;
    --sidebar-foreground: 210 40% 98%;
    --sidebar-primary: 217 91% 60%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 222 47% 18%;
    --sidebar-accent-foreground: 210 40% 98%;
    --sidebar-border: 222 47% 18%;
    --sidebar-ring: 217 91% 60%;
    --sidebar-muted: 215 16% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
    font-family: 'Inter', system-ui, sans-serif;
  }
}

@layer utilities {
  .glass-card {
    @apply bg-card/80 backdrop-blur-xl border border-border shadow-sm;
  }

  .glass-card-elevated {
    @apply bg-card/90 backdrop-blur-xl border border-border shadow-md;
  }

  .gradient-navy {
    background: linear-gradient(135deg, hsl(222 47% 11%), hsl(222 47% 18%));
  }

  .gradient-emergency {
    background: linear-gradient(135deg, hsl(0 84% 60%), hsl(0 72% 51%));
  }

  .gradient-success {
    background: linear-gradient(135deg, hsl(160 84% 39%), hsl(142 71% 45%));
  }

  .gradient-blue {
    background: linear-gradient(135deg, hsl(217 91% 60%), hsl(224 76% 48%));
  }

  .emergency-pulse {
    animation: emergency-glow 2s ease-in-out infinite;
  }

  .status-dot {
    @apply w-2.5 h-2.5 rounded-full;
  }

  .status-dot-available {
    @apply status-dot bg-emerald-500;
    box-shadow: 0 0 8px hsl(160 84% 39% / 0.5);
  }

  .status-dot-occupied {
    @apply status-dot bg-red-500;
    box-shadow: 0 0 8px hsl(0 84% 60% / 0.5);
  }

  .status-dot-preparing {
    @apply status-dot bg-amber-500;
    box-shadow: 0 0 8px hsl(38 92% 50% / 0.5);
  }
}

@keyframes emergency-glow {
  0%, 100% {
    box-shadow: 0 0 5px hsl(0 84% 60% / 0.3), 0 0 20px hsl(0 84% 60% / 0.1);
  }
  50% {
    box-shadow: 0 0 15px hsl(0 84% 60% / 0.5), 0 0 40px hsl(0 84% 60% / 0.2);
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2.2);
    opacity: 0;
  }
}

.sos-ring {
  animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}
