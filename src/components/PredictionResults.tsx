import React from "react";
import { CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface PredictionResultsProps {
  prediction: {
    disease: string;
    confidence: number;
    healthy: boolean;
  };
}

const PredictionResults: React.FC<PredictionResultsProps> = ({
  prediction,
}) => {
  const confidencePercentage = Math.round(prediction.confidence * 100);
  const isNotPlant = prediction.disease === "Not a Plant Leaf";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {isNotPlant ? (
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
          ) : prediction.healthy ? (
            <CheckCircle className="h-6 w-6 text-green-600" />
          ) : (
            <AlertTriangle className="h-6 w-6 text-red-600" />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {prediction.disease}
            </h3>
            <p className="text-sm text-gray-600">
              {isNotPlant
                ? "No plant leaf detected"
                : prediction.healthy
                ? "No disease detected"
                : "Disease identified"}
            </p>
          </div>
        </div>

        <Badge
          variant={
            isNotPlant
              ? "secondary"
              : prediction.healthy
              ? "default"
              : "destructive"
          }
          className={
            isNotPlant
              ? "bg-yellow-100 text-yellow-800"
              : prediction.healthy
              ? "bg-green-100 text-green-800"
              : ""
          }
        >
          {isNotPlant ? "Invalid" : prediction.healthy ? "Healthy" : "Diseased"}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4" />
            <span>Confidence Score</span>
          </span>
          <span className="font-medium">{confidencePercentage}%</span>
        </div>

        <Progress value={confidencePercentage} className="h-2" />

        <div className="flex justify-between text-xs text-gray-500">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      <div
        className={`p-4 rounded-lg ${
          isNotPlant
            ? "bg-yellow-50 border border-yellow-200"
            : prediction.healthy
            ? "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        }`}
      >
        <p
          className={`text-sm ${
            isNotPlant
              ? "text-yellow-800"
              : prediction.healthy
              ? "text-green-800"
              : "text-red-800"
          }`}
        >
          {isNotPlant
            ? "Please upload a clear image of a plant leaf for disease analysis."
            : prediction.healthy
            ? "Great news! Your plant appears to be healthy. Continue with your current care routine."
            : "Disease detected. Please review the treatment recommendations to help your plant recover."}
        </p>
      </div>
    </div>
  );
};

export default PredictionResults;
