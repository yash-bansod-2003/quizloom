import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const GeneralSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Configure scoring algorithms and parameters.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Scoring Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Adjust scoring weights and thresholds.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
