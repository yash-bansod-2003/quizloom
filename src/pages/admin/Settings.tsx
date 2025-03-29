import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Settings {
  general: {
    siteName: string;
    siteDescription: string;
    defaultTimeLimit: number;
    enableRegistration: boolean;
  };
  quiz: {
    enableFullscreen: boolean;
    disableCopyPaste: boolean;
    showTimer: boolean;
    randomizeQuestions: boolean;
    showResults: boolean;
  };
  email: {
    sendWelcomeEmail: boolean;
    sendQuizResults: boolean;
    sendReminders: boolean;
  };
}

export function Settings() {
  const [settings, setSettings] = useState<Settings>({
    general: {
      siteName: "QuizLoom",
      siteDescription: "Create and manage online quizzes",
      defaultTimeLimit: 30,
      enableRegistration: true,
    },
    quiz: {
      enableFullscreen: true,
      disableCopyPaste: true,
      showTimer: true,
      randomizeQuestions: false,
      showResults: true,
    },
    email: {
      sendWelcomeEmail: true,
      sendQuizResults: true,
      sendReminders: false,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle settings submission
    console.log(settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button onClick={handleSubmit}>Save Changes</Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="quiz">Quiz Settings</TabsTrigger>
          <TabsTrigger value="email">Email Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.general.siteName}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      general: {
                        ...settings.general,
                        siteName: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.general.siteDescription}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      general: {
                        ...settings.general,
                        siteDescription: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultTimeLimit">
                  Default Time Limit (minutes)
                </Label>
                <Input
                  id="defaultTimeLimit"
                  type="number"
                  value={settings.general.defaultTimeLimit}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      general: {
                        ...settings.general,
                        defaultTimeLimit: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="enableRegistration">
                  Enable User Registration
                </Label>
                <Switch
                  id="enableRegistration"
                  checked={settings.general.enableRegistration}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      general: {
                        ...settings.general,
                        enableRegistration: checked,
                      },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enableFullscreen">Enable Fullscreen Mode</Label>
                <Switch
                  id="enableFullscreen"
                  checked={settings.quiz.enableFullscreen}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      quiz: {
                        ...settings.quiz,
                        enableFullscreen: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="disableCopyPaste">Disable Copy/Paste</Label>
                <Switch
                  id="disableCopyPaste"
                  checked={settings.quiz.disableCopyPaste}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      quiz: {
                        ...settings.quiz,
                        disableCopyPaste: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="showTimer">Show Timer</Label>
                <Switch
                  id="showTimer"
                  checked={settings.quiz.showTimer}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      quiz: {
                        ...settings.quiz,
                        showTimer: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="randomizeQuestions">Randomize Questions</Label>
                <Switch
                  id="randomizeQuestions"
                  checked={settings.quiz.randomizeQuestions}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      quiz: {
                        ...settings.quiz,
                        randomizeQuestions: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="showResults">Show Results</Label>
                <Switch
                  id="showResults"
                  checked={settings.quiz.showResults}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      quiz: {
                        ...settings.quiz,
                        showResults: checked,
                      },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="sendWelcomeEmail">Send Welcome Email</Label>
                <Switch
                  id="sendWelcomeEmail"
                  checked={settings.email.sendWelcomeEmail}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      email: {
                        ...settings.email,
                        sendWelcomeEmail: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sendQuizResults">Send Quiz Results</Label>
                <Switch
                  id="sendQuizResults"
                  checked={settings.email.sendQuizResults}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      email: {
                        ...settings.email,
                        sendQuizResults: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sendReminders">Send Reminders</Label>
                <Switch
                  id="sendReminders"
                  checked={settings.email.sendReminders}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      email: {
                        ...settings.email,
                        sendReminders: checked,
                      },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Settings;
