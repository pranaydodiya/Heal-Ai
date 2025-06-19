
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Activity, Heart, Thermometer, Droplets, Zap, TrendingUp, Calendar, Clock } from 'lucide-react';

const PatientDashboard = ({ patientData, onUpdateVitals }) => {
  const [vitals, setVitals] = useState({
    heartRate: 72,
    bloodPressure: { systolic: 120, diastolic: 80 },
    temperature: 98.6,
    oxygenSaturation: 98,
    glucoseLevel: 95
  });

  const [healthTrends, setHealthTrends] = useState([
    { date: '2024-01-15', heartRate: 70, bp: '118/78', temp: 98.4 },
    { date: '2024-01-16', heartRate: 72, bp: '120/80', temp: 98.6 },
    { date: '2024-01-17', heartRate: 74, bp: '122/82', temp: 98.8 }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, doctor: 'Dr. Smith', specialty: 'Cardiology', date: '2024-01-20', time: '10:00 AM' },
    { id: 2, doctor: 'Dr. Johnson', specialty: 'General Medicine', date: '2024-01-25', time: '2:30 PM' }
  ]);

  const getVitalStatus = (vital, value) => {
    const ranges = {
      heartRate: { normal: [60, 100], warning: [50, 120] },
      systolic: { normal: [90, 120], warning: [80, 140] },
      diastolic: { normal: [60, 80], warning: [50, 90] },
      temperature: { normal: [97, 99], warning: [96, 100] },
      oxygen: { normal: [95, 100], warning: [90, 94] },
      glucose: { normal: [70, 100], warning: [60, 140] }
    };

    const range = ranges[vital];
    if (!range) return 'normal';

    if (value >= range.normal[0] && value <= range.normal[1]) return 'normal';
    if (value >= range.warning[0] && value <= range.warning[1]) return 'warning';
    return 'critical';
  };

  const VitalCard = ({ title, value, unit, icon: Icon, vitalType }) => {
    const status = getVitalStatus(vitalType, value);
    const statusColors = {
      normal: 'text-green-600',
      warning: 'text-yellow-600',
      critical: 'text-red-600'
    };

    return (
      <Card className="h-full">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon className={`h-5 w-5 ${statusColors[status]}`} />
              <span className="text-sm font-medium">{title}</span>
            </div>
            <Badge variant={status === 'normal' ? 'default' : status === 'warning' ? 'secondary' : 'destructive'}>
              {status}
            </Badge>
          </div>
          <div className="mt-2">
            <span className={`text-2xl font-bold ${statusColors[status]}`}>
              {value}{unit}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <VitalCard
          title="Heart Rate"
          value={vitals.heartRate}
          unit=" BPM"
          icon={Heart}
          vitalType="heartRate"
        />
        <VitalCard
          title="Blood Pressure"
          value={`${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic}`}
          unit=""
          icon={Activity}
          vitalType="systolic"
        />
        <VitalCard
          title="Temperature"
          value={vitals.temperature}
          unit="°F"
          icon={Thermometer}
          vitalType="temperature"
        />
        <VitalCard
          title="Oxygen Sat"
          value={vitals.oxygenSaturation}
          unit="%"
          icon={Zap}
          vitalType="oxygen"
        />
        <VitalCard
          title="Glucose"
          value={vitals.glucoseLevel}
          unit=" mg/dL"
          icon={Droplets}
          vitalType="glucose"
        />
      </div>

      {/* Health Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Health Trends (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {healthTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{trend.date}</span>
                <div className="flex space-x-4 text-sm">
                  <span>HR: {trend.heartRate}</span>
                  <span>BP: {trend.bp}</span>
                  <span>Temp: {trend.temp}°F</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{appointment.doctor}</p>
                  <p className="text-sm text-gray-600">{appointment.specialty}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{appointment.date}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {appointment.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Alerts */}
      <Alert>
        <Activity className="h-4 w-4" />
        <AlertDescription>
          Your blood pressure has been slightly elevated over the past 2 days. Consider reducing sodium intake and monitoring stress levels.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PatientDashboard;
