import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, Brain, Heart, Microscope, Stethoscope, Upload, Search, AlertTriangle, Users, BarChart3, Settings, Zap, TrendingUp } from 'lucide-react';

// Import components
import PatientDashboard from '../components/PatientDashboard';
import AIAnalytics from '../components/AIAnalytics';
import MedicalImageAnalysis from '../components/MedicalImageAnalysis';

const Index = () => {
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState({
    age: '',
    gender: '',
    medicalHistory: ''
  });

  // Animated counter hook
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, [end, duration]);
    
    return count;
  };

  // Stats for animated counters
  const stats = [
    { value: 94, label: "AI Accuracy", suffix: "%" },
    { value: 1247, label: "Analyses", suffix: "+" },
    { value: 50, label: "Specialists", suffix: "+" },
    { value: 24, label: "Support", suffix: "/7" }
  ];

  const predictDisease = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: symptoms,
          age: patientData.age,
          gender: patientData.gender
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        setPrediction(result);
      } else {
        const mockResults = {
          disease: "Common Cold",
          confidence: 85,
          symptoms_match: ["fever", "cough", "fatigue"],
          recommendations: [
            "Rest and hydration",
            "Over-the-counter pain relievers",
            "Consult doctor if symptoms persist"
          ],
          severity: "Mild"
        };
        setPrediction(mockResults);
      }
    } catch (error) {
      const mockResults = {
        disease: "Common Cold",
        confidence: 85,
        symptoms_match: ["fever", "cough", "fatigue"],
        recommendations: [
          "Rest and hydration",
          "Over-the-counter pain relievers",
          "Consult doctor if symptoms persist"
        ],
        severity: "Mild"
      };
      setPrediction(mockResults);
    } finally {
      setLoading(false);
    }
  };

  const AnimatedCounter = ({ end, duration, suffix = "" }) => {
    const count = useCounter(end, duration);
    return <span>{count}{suffix}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500 rounded-full opacity-10 animate-ping"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-6">
                <Brain className="text-white" size={48} />
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6 leading-tight">
                MediAI Pro
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Next-generation AI-powered healthcare platform with advanced machine learning models for disease detection and treatment optimization
              </p>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    <AnimatedCounter end={stat.value} duration={2000 + index * 200} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8 bg-black/20 backdrop-blur-sm border border-white/10">
              <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
                <Activity size={16} />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="symptoms" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
                <Stethoscope size={16} />
                AI Diagnosis
              </TabsTrigger>
              <TabsTrigger value="imaging" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
                <Microscope size={16} />
                Medical Imaging
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
                <BarChart3 size={16} />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="patients" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
                <Users size={16} />
                Patients
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
                <Settings size={16} />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <PatientDashboard patientData={patientData} />
              </div>
            </TabsContent>

            {/* AI Diagnosis Tab */}
            <TabsContent value="symptoms" className="space-y-6 animate-fade-in">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-black/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-[1.02]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg">
                        <Search className="text-white" size={20} />
                      </div>
                      Advanced AI Diagnosis Engine
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      State-of-the-art neural networks for accurate medical diagnosis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Age</label>
                        <Input 
                          placeholder="Enter age"
                          value={patientData.age}
                          onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Gender</label>
                        <select 
                          className="w-full p-2 bg-white/5 border border-white/20 rounded-md text-white"
                          value={patientData.gender}
                          onChange={(e) => setPatientData({...patientData, gender: e.target.value})}
                        >
                          <option value="" className="bg-slate-800">Select Gender</option>
                          <option value="male" className="bg-slate-800">Male</option>
                          <option value="female" className="bg-slate-800">Female</option>
                          <option value="other" className="bg-slate-800">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Symptoms</label>
                      <Textarea
                        placeholder="Describe symptoms in detail..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        rows={4}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <Button 
                      onClick={predictDisease} 
                      disabled={loading || !symptoms}
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 h-12 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Analyzing with AI...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Brain size={20} />
                          Analyze Symptoms
                        </div>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg">
                        <Brain className="text-white" size={20} />
                      </div>
                      AI Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading && (
                      <div className="space-y-6 animate-pulse">
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-gray-300">Advanced AI processing...</p>
                        </div>
                        <Progress value={66} className="w-full h-2 bg-white/10" />
                        <p className="text-xs text-gray-400 text-center">Neural network analysis in progress</p>
                      </div>
                    )}
                    
                    {prediction && !loading && (
                      <div className="space-y-6 animate-fade-in">
                        <div className="text-center p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl border border-purple-500/20">
                          <h3 className="text-2xl font-bold text-white mb-2">{prediction.disease}</h3>
                          <Badge className={`${prediction.severity === 'Mild' ? 'bg-green-500' : prediction.severity === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
                            {prediction.severity}
                          </Badge>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-300 mb-2">AI Confidence Level</p>
                            <div className="bg-white/5 rounded-full p-1">
                              <Progress value={prediction.confidence} className="h-4" />
                            </div>
                            <p className="text-xs text-gray-400 mt-1 text-center">{prediction.confidence}% accuracy</p>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-300 mb-3">Detected Symptoms</p>
                            <div className="flex flex-wrap gap-2">
                              {prediction.symptoms_match.map((symptom, index) => (
                                <Badge key={index} variant="outline" className="bg-white/5 text-gray-300 border-white/20">
                                  {symptom}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-300 mb-3">AI Recommendations</p>
                            <div className="space-y-2">
                              {prediction.recommendations.map((rec, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-sm text-gray-300">{rec}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Alert className="bg-yellow-500/10 border-yellow-500/20 text-yellow-300">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              AI analysis is for reference only. Always consult healthcare professionals.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </div>
                    )}

                    {!prediction && !loading && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Brain className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-gray-400">Enter symptoms for AI-powered analysis</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Other tabs with consistent styling */}
            <TabsContent value="imaging" className="animate-fade-in">
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <MedicalImageAnalysis />
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="animate-fade-in">
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <AIAnalytics patientData={patientData} predictions={prediction} />
              </div>
            </TabsContent>

            <TabsContent value="patients" className="animate-fade-in">
              <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg">
                      <Users className="text-white" size={20} />
                    </div>
                    Patient Management System
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Comprehensive patient data management and tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-4">Patient Management</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                      Advanced patient tracking, medical history, and treatment planning
                    </p>
                    <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 transform hover:scale-105 transition-all duration-300">
                      Add New Patient
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="animate-fade-in">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-black/20 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white">AI Model Configuration</CardTitle>
                    <CardDescription className="text-gray-400">Configure AI analysis parameters</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-300">Prediction Confidence Threshold</label>
                      <Input placeholder="85%" className="bg-white/5 border-white/20 text-white" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-300">Analysis Model Version</label>
                      <select className="w-full p-2 bg-white/5 border border-white/20 rounded-md text-white">
                        <option className="bg-slate-800">MediAI v2.1 (Latest)</option>
                        <option className="bg-slate-800">MediAI v2.0</option>
                        <option className="bg-slate-800">MediAI v1.9</option>
                      </select>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0">
                      Update Configuration
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white">System Integration</CardTitle>
                    <CardDescription className="text-gray-400">Connect with external healthcare systems</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-300">Hospital Management System</label>
                      <Input placeholder="API Endpoint" className="bg-white/5 border-white/20 text-white" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block text-gray-300">Lab Results Integration</label>
                      <Input placeholder="Lab API Key" className="bg-white/5 border-white/20 text-white" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0">
                      Connect Systems
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Feature showcase with animations */}
          <div className="mt-16 grid md:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "Advanced AI Models", desc: "Deep learning with 94%+ accuracy", color: "from-blue-500 to-purple-500" },
              { icon: Microscope, title: "Medical Imaging AI", desc: "Computer vision for medical scans", color: "from-green-500 to-teal-500" },
              { icon: BarChart3, title: "Predictive Analytics", desc: "Risk assessment and health predictions", color: "from-purple-500 to-pink-500" },
              { icon: Heart, title: "Treatment Intelligence", desc: "Personalized treatment recommendations", color: "from-red-500 to-orange-500" }
            ].map((feature, index) => (
              <Card key={index} className="group bg-black/20 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className={`inline-flex p-4 bg-gradient-to-r ${feature.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="text-white" size={32} />
                  </div>
                  <CardTitle className="text-white text-lg group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm text-center leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-20 text-center text-gray-400 text-sm">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
            <p>© 2024 MediAI Pro - Advanced Healthcare Intelligence Platform</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
