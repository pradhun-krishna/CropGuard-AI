
import React from 'react';
import { AlertCircle, Zap, Shield, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DiseaseInfoProps {
  prediction: {
    disease: string;
    cause: string;
    symptoms: string;
    treatment: string;
    prevention: string;
    healthy: boolean;
  };
}

const DiseaseInfo: React.FC<DiseaseInfoProps> = ({ prediction }) => {
  const infoSections = [
    {
      title: 'Cause',
      content: prediction.cause,
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Symptoms',
      content: prediction.symptoms,
      icon: Stethoscope,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Treatment',
      content: prediction.treatment,
      icon: Zap,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Prevention',
      content: prediction.prevention,
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-4">
      {infoSections.map((section) => (
        <div key={section.title} className={`p-4 rounded-lg ${section.bgColor}`}>
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg bg-white ${section.color}`}>
              <section.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{section.title}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{section.content}</p>
            </div>
          </div>
        </div>
      ))}

      {!prediction.healthy && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">Important Note</h4>
              <p className="text-sm text-yellow-700">
                This AI diagnosis is for guidance only. For severe infestations or valuable crops, 
                consult with a local agricultural extension officer or plant pathologist for professional advice.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseInfo;
