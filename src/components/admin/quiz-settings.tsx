"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface QuizSettingsProps {
  onSubmit: () => void;
}

export function QuizSettings({ onSubmit }: QuizSettingsProps) {
  const [settings, setSettings] = useState({
    fullscreenMode: false,
    shuffleQuestions: false,
    shuffleAnswers: false,
    displayScore: true,
    allowBackNavigation: true,
    smartTracking: false,
    startDate: "",
    endDate: "",
    duration: 30,
  });

  const handleToggle = (key: string) => {
    setSettings({
      ...settings,
      [key]: !settings[key as keyof typeof settings],
    });
  };

  const handleInputChange = (key: string, value: string | number) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Settings</CardTitle>
        <CardDescription>Configure the settings for your quiz.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Display Options</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="fullscreen-mode">Fullscreen Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Force fullscreen mode during quiz taking
                </p>
              </div>
              <Switch
                id="fullscreen-mode"
                checked={settings.fullscreenMode}
                onCheckedChange={() => handleToggle("fullscreenMode")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="shuffle-questions">Shuffle Questions</Label>
                <p className="text-sm text-muted-foreground">
                  Randomize the order of questions for each participant
                </p>
              </div>
              <Switch
                id="shuffle-questions"
                checked={settings.shuffleQuestions}
                onCheckedChange={() => handleToggle("shuffleQuestions")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="shuffle-answers">Shuffle Answers</Label>
                <p className="text-sm text-muted-foreground">
                  Randomize the order of answer options for each question
                </p>
              </div>
              <Switch
                id="shuffle-answers"
                checked={settings.shuffleAnswers}
                onCheckedChange={() => handleToggle("shuffleAnswers")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="display-score">Display Score</Label>
                <p className="text-sm text-muted-foreground">
                  Show score to participants after quiz completion
                </p>
              </div>
              <Switch
                id="display-score"
                checked={settings.displayScore}
                onCheckedChange={() => handleToggle("displayScore")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="back-navigation">Allow Back Navigation</Label>
                <p className="text-sm text-muted-foreground">
                  Allow participants to go back to previous questions
                </p>
              </div>
              <Switch
                id="back-navigation"
                checked={settings.allowBackNavigation}
                onCheckedChange={() => handleToggle("allowBackNavigation")}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Timing & Availability</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date (Optional)</Label>
              <Input
                id="start-date"
                type="datetime-local"
                value={settings.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-date">End Date (Optional)</Label>
              <Input
                id="end-date"
                type="datetime-local"
                value={settings.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Time Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              value={settings.duration}
              onChange={(e) =>
                handleInputChange("duration", parseInt(e.target.value))
              }
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Premium Features</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="smart-tracking">Smart Tracking</Label>
              <p className="text-sm text-muted-foreground">
                Enable advanced analytics and cheating prevention
              </p>
            </div>
            <Switch
              id="smart-tracking"
              checked={settings.smartTracking}
              onCheckedChange={() => handleToggle("smartTracking")}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Back</Button>
        <Button onClick={onSubmit}>Save Quiz</Button>
      </CardFooter>
    </Card>
  );
}
