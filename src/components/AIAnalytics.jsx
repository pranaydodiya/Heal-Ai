
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, BarChart3, PieChart } from 'lucide-react';

const AIAnalytics = ({ patientData, predictions }) => {
  const [riskAssessment, setRiskAssessment] = useState({
    cardiovascular: 15,
    diabetes: 8,
    hypertension: 22,
    obesity: 12,
    mental_health: 18
  });

  const [aiInsights, setAiInsights] = useState([
    {
      category: 'Preventive Care',
      insight: 'Based on your age and family history, consider annual cardiovascular screening',
      priority: 'medium',
      confidence: 85
    },
    {
      category: 'Lifestyle',
      insight: 'Your BMI indicates optimal weight. Continue current exercise routine',
      priority: 'low',
      confidence: 92
    },
    {
      category: 'Medication',
      insight: 'Current medications show no adverse interactions detected',
      priority: 'low',
      confidence: 98
    }
  ]);

  const [predictiveModels, setPredictiveModels] = useState({
    disease_progression: {
      accuracy: 94.2,
      last_updated: '2024-01-18',
      predictions: [
        { condition: 'Hypertension Risk', probability: 15, timeframe: '5 years' },
        { condition: 'Diabetes Risk', probability: 8, timeframe: '10 years' },
        { condition: 'Heart Disease Risk', probability: 12, timeframe: '15 years' }
      ]
    },
    treatment_response: {
      accuracy: 89.7,
      recommendations: [
        { treatment: 'Lifestyle Modification', success_rate: 78 },
        { treatment: 'Medication Therapy', success_rate: 85 },
        { treatment: 'Combined Approach', success_rate: 92 }
      ]
    }
  });

  const RiskMeter = ({ label, value, maxValue = 100 }) => {
    const getRiskColor = (risk) => {
      if (risk < 10) return 'text-green-600 bg-green-100';
      if (risk < 25) return 'text-yellow-600 bg-yellow-100';
      return 'text-red-600 bg-red-100';
    };

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{label}</span>
          <Badge className={getRiskColor(value)}>
            {value}% Risk
          </Badge>
        </div>
        <Progress value={value} max={maxValue} className="h-2" />
      </div>
    );
  };

  const InsightCard = ({ insight }) => {
    const priorityColors = {
      high: 'border-red-200 bg-red-50',
      medium: 'border-yellow-200 bg-yellow-50',
      low: 'border-green-200 bg-green-50'
    };

    const priorityIcons = {
      high: AlertTriangle,
      medium: TrendingUp,
      low: CheckCircle
    };

    const Icon = priorityIcons[insight.priority];

    return (
      <Card className={`${priorityColors[insight.priority]} border`}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{insight.category}</span>
                <Badge variant="outline" className="text-xs">
                  {insight.confidence}% confidence
                </Badge>
              </div>
              <p className="text-sm text-gray-700">{insight.insight}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="risk-assessment" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="risk-assessment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Health Risk Assessment
              </CardTitle>
              <CardDescription>
                AI-powered analysis of your health risks based on current data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(riskAssessment).map(([condition, risk]) => (
                <RiskMeter
                  key={condition}
                  label={condition.replace('_', ' ').toUpperCase()}
                  value={risk}
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-4">
          <div className="grid gap-4">
            {aiInsights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Predictive Health Models
              </CardTitle>
              <CardDescription>
                Advanced AI predictions for future health outcomes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Disease Progression Predictions</h4>
                <div className="space-y-3">
                  {predictiveModels.disease_progression.predictions.map((pred, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium">{pred.condition}</span>
                        <p className="text-sm text-gray-600">Within {pred.timeframe}</p>
                      </div>
                      <Badge variant={pred.probability < 10 ? 'default' : pred.probability < 20 ? 'secondary' : 'destructive'}>
                        {pred.probability}% risk
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Treatment Response Predictions</h4>
                <div className="space-y-3">
                  {predictiveModels.treatment_response.recommendations.map((treatment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">{treatment.treatment}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={treatment.success_rate} className="w-20 h-2" />
                        <span className="text-sm font-medium">{treatment.success_rate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Model Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Disease Prediction Accuracy</span>
                      <span className="text-sm font-medium">94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Treatment Response Accuracy</span>
                      <span className="text-sm font-medium">89.7%</span>
                    </div>
                    <Progress value={89.7} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Risk Assessment Precision</span>
                      <span className="text-sm font-medium">91.5%</span>
                    </div>
                    <Progress value={91.5} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Analyses</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Successful Predictions</span>
                    <span className="font-medium">1,175</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Model Updates</span>
                    <span className="font-medium">Weekly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Training</span>
                    <span className="font-medium">Jan 18, 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAnalytics;
