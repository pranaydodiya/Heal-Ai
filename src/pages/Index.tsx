
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Activity, Brain, Heart, Microscope, Stethoscope, Upload, Search, AlertTriangle } from 'lucide-react';

const Index = () => {
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [patientData, setPatientData] = useState({
    age: '',
    gender: '',
    medicalHistory: ''
  });

  // Mock AI prediction function (would connect to Python backend)
  const predictDisease = async () => {
    setLoading(true);
    // Simulate API call to Python backend
    setTimeout(() => {
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
      setLoading(false);
    }, 2000);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Brain className="text-blue-600" size={40} />
            MediAI - Disease Detection & Cure System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI-powered disease detection, diagnosis, and treatment recommendations using machine learning
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="symptoms" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="symptoms" className="flex items-center gap-2">
              <Stethoscope size={16} />
              Symptom Analysis
            </TabsTrigger>
            <TabsTrigger value="imaging" className="flex items-center gap-2">
              <Microscope size={16} />
              Medical Imaging
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Activity size={16} />
              Health Monitoring
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Heart size={16} />
              Medical History
            </TabsTrigger>
          </TabsList>

          {/* Symptom Analysis Tab */}
          <TabsContent value="symptoms" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="text-blue-600" size={20} />
                    Describe Your Symptoms
                  </CardTitle>
                  <CardDescription>
                    Enter your symptoms and we'll analyze them using AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Age</label>
                    <Input 
                      placeholder="Enter your age"
                      value={patientData.age}
                      onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Gender</label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={patientData.gender}
                      onChange={(e) => setPatientData({...patientData, gender: e.target.value})}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Symptoms</label>
                    <Textarea
                      placeholder="Describe your symptoms in detail (e.g., fever, headache, cough, fatigue)"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button 
                    onClick={predictDisease} 
                    disabled={loading || !symptoms}
                    className="w-full"
                  >
                    {loading ? "Analyzing..." : "Analyze Symptoms"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="text-green-600" size={20} />
                    AI Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading && (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">Analyzing symptoms...</p>
                      <Progress value={66} className="w-full" />
                    </div>
                  )}
                  
                  {prediction && !loading && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{prediction.disease}</h3>
                        <Badge variant={prediction.severity === 'Mild' ? 'secondary' : 'destructive'}>
                          {prediction.severity}
                        </Badge>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-1">Confidence Level</p>
                        <Progress value={prediction.confidence} className="w-full" />
                        <p className="text-xs text-gray-600 mt-1">{prediction.confidence}% match</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Matching Symptoms</p>
                        <div className="flex flex-wrap gap-1">
                          {prediction.symptoms_match.map((symptom, index) => (
                            <Badge key={index} variant="outline">{symptom}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Recommendations</p>
                        <ul className="text-sm space-y-1">
                          {prediction.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-green-600">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          This is an AI prediction. Always consult with a healthcare professional for proper diagnosis and treatment.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  {!prediction && !loading && (
                    <p className="text-gray-500 text-center py-8">
                      Enter your symptoms to get AI-powered analysis
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Medical Imaging Tab */}
          <TabsContent value="imaging" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="text-purple-600" size={20} />
                  Medical Image Analysis
                </CardTitle>
                <CardDescription>
                  Upload X-rays, CT scans, or other medical images for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {uploadedImage ? (
                      <img src={uploadedImage} alt="Uploaded" className="max-w-full max-h-64 mx-auto mb-4" />
                    ) : (
                      <div className="space-y-2">
                        <Upload size={48} className="mx-auto text-gray-400" />
                        <p className="text-gray-600">Click to upload medical image</p>
                      </div>
                    )}
                  </label>
                </div>
                
                {uploadedImage && (
                  <div className="space-y-4">
                    <Button className="w-full">Analyze Medical Image</Button>
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Medical image analysis requires professional medical interpretation alongside AI assistance.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Heart Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600 mb-2">72 BPM</div>
                  <p className="text-sm text-gray-600">Normal range</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Blood Pressure</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">120/80</div>
                  <p className="text-sm text-gray-600">Optimal</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Temperature</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600 mb-2">98.6°F</div>
                  <p className="text-sm text-gray-600">Normal</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Medical History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
                <CardDescription>
                  Track your medical history and AI predictions over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter your medical history, allergies, medications, etc."
                  value={patientData.medicalHistory}
                  onChange={(e) => setPatientData({...patientData, medicalHistory: e.target.value})}
                  rows={6}
                />
                <Button className="mt-4">Save Medical History</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Features Grid */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="text-blue-600" size={20} />
                AI-Powered Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Advanced machine learning algorithms analyze symptoms and medical data to provide accurate predictions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Microscope className="text-green-600" size={20} />
                Medical Imaging
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Computer vision technology analyzes X-rays, CT scans, and other medical images for disease detection.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="text-red-600" size={20} />
                Treatment Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Personalized treatment suggestions based on medical history, symptoms, and current health data.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
