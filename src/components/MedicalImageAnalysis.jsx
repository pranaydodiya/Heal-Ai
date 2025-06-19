
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Camera, Scan, Brain, Eye, Microscope, X, Check, AlertTriangle } from 'lucide-react';

const MedicalImageAnalysis = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const imageTypes = {
    'xray': { name: 'X-Ray', icon: Scan, color: 'text-blue-600' },
    'ct': { name: 'CT Scan', icon: Brain, color: 'text-purple-600' },
    'mri': { name: 'MRI', icon: Microscope, color: 'text-green-600' },
    'ultrasound': { name: 'Ultrasound', icon: Eye, color: 'text-orange-600' }
  };

  const mockAnalysisResults = {
    xray: {
      findings: [
        { finding: 'No acute abnormalities detected', severity: 'normal', confidence: 94 },
        { finding: 'Heart size within normal limits', severity: 'normal', confidence: 91 },
        { finding: 'Lung fields appear clear', severity: 'normal', confidence: 88 }
      ],
      overall_assessment: 'Normal chest X-ray',
      recommendations: [
        'Routine follow-up as scheduled',
        'Continue current health maintenance',
        'No immediate intervention required'
      ]
    },
    ct: {
      findings: [
        { finding: 'Small nodule detected in right lung', severity: 'warning', confidence: 82 },
        { finding: 'No signs of acute pathology', severity: 'normal', confidence: 95 }
      ],
      overall_assessment: 'Further evaluation recommended',
      recommendations: [
        'Follow-up CT scan in 3 months',
        'Consult with pulmonologist',
        'Monitor for any respiratory symptoms'
      ]
    }
  };

  const handleImageUpload = useCallback((event) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: Date.now() + Math.random(),
          file,
          url: e.target.result,
          name: file.name,
          type: determineImageType(file.name),
          uploadTime: new Date().toISOString()
        };
        setUploadedImages(prev => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const determineImageType = (filename) => {
    const name = filename.toLowerCase();
    if (name.includes('xray') || name.includes('chest')) return 'xray';
    if (name.includes('ct') || name.includes('scan')) return 'ct';
    if (name.includes('mri')) return 'mri';
    if (name.includes('ultrasound')) return 'ultrasound';
    return 'xray'; // default
  };

  const analyzeImage = async (image) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate AI analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call delay
    setTimeout(() => {
      const results = mockAnalysisResults[image.type] || mockAnalysisResults.xray;
      setAnalysisResults({
        ...results,
        imageId: image.id,
        imageType: image.type,
        analyzedAt: new Date().toISOString()
      });
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }, 3000);
  };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
    if (analysisResults && analysisResults.imageId === imageId) {
      setAnalysisResults(null);
    }
  };

  const FindingCard = ({ finding }) => {
    const severityConfig = {
      normal: { color: 'bg-green-50 border-green-200', icon: Check, iconColor: 'text-green-600' },
      warning: { color: 'bg-yellow-50 border-yellow-200', icon: AlertTriangle, iconColor: 'text-yellow-600' },
      critical: { color: 'bg-red-50 border-red-200', icon: AlertTriangle, iconColor: 'text-red-600' }
    };

    const config = severityConfig[finding.severity] || severityConfig.normal;
    const Icon = config.icon;

    return (
      <Card className={`${config.color} border`}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Icon className={`h-5 w-5 mt-0.5 ${config.iconColor}`} />
            <div className="flex-1">
              <p className="text-sm font-medium">{finding.finding}</p>
              <div className="flex items-center justify-between mt-2">
                <Badge variant="outline" className="text-xs">
                  Confidence: {finding.confidence}%
                </Badge>
                <Progress value={finding.confidence} className="w-16 h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
          <TabsTrigger value="results">Analysis Results</TabsTrigger>
          <TabsTrigger value="history">Analysis History</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-600" />
                Medical Image Upload
              </CardTitle>
              <CardDescription>
                Upload medical images for AI-powered analysis. Supported formats: X-Ray, CT, MRI, Ultrasound
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="medical-image-upload"
                />
                <label htmlFor="medical-image-upload" className="cursor-pointer">
                  <div className="space-y-4">
                    <Camera size={48} className="mx-auto text-gray-400" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">Upload Medical Images</p>
                      <p className="text-sm text-gray-600">Click to browse or drag and drop</p>
                    </div>
                  </div>
                </label>
              </div>

              {uploadedImages.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium">Uploaded Images</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {uploadedImages.map((image) => {
                      const ImageIcon = imageTypes[image.type]?.icon || Scan;
                      return (
                        <Card key={image.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={image.url}
                                alt={image.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{image.name}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <ImageIcon className={`h-4 w-4 ${imageTypes[image.type]?.color}`} />
                                  <span className="text-xs text-gray-600">
                                    {imageTypes[image.type]?.name}
                                  </span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => analyzeImage(image)}
                                  disabled={isAnalyzing}
                                >
                                  Analyze
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeImage(image.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {isAnalyzing && (
                <Card className="mt-6">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
                        <span className="font-medium">AI Analysis in Progress...</span>
                      </div>
                      <Progress value={analysisProgress} className="w-full" />
                      <p className="text-sm text-gray-600">
                        Analyzing medical image using advanced AI algorithms
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {analysisResults ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    AI Analysis Results
                  </CardTitle>
                  <CardDescription>
                    {imageTypes[analysisResults.imageType]?.name} Analysis completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900">Overall Assessment</h4>
                      <p className="text-blue-800 mt-1">{analysisResults.overall_assessment}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Detailed Findings</h4>
                      <div className="space-y-3">
                        {analysisResults.findings.map((finding, index) => (
                          <FindingCard key={index} finding={finding} />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {analysisResults.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  AI analysis is for reference only. Always consult with qualified healthcare professionals for medical diagnosis and treatment decisions.
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Results</h3>
                <p className="text-gray-600">Upload and analyze a medical image to see results here</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analysis History</CardTitle>
              <CardDescription>Previous medical image analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-gray-500">
                  <Microscope className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Analysis history will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalImageAnalysis;
