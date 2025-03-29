import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizFormData {
  title: string;
  description: string;
  status: "draft" | "live";
  settings: {
    enableFullscreen: boolean;
    disableCopyPaste: boolean;
    collectUserInfo: boolean;
  };
  userInfoFields: {
    name: string;
    type: "text" | "email" | "select";
    required: boolean;
    options?: string[];
  }[];
}

function QuizEditor() {
  const [formData, setFormData] = useState<QuizFormData>({
    title: "",
    description: "",
    status: "draft",
    settings: {
      enableFullscreen: true,
      disableCopyPaste: true,
      collectUserInfo: false,
    },
    userInfoFields: [],
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ ...formData, content: editor?.getHTML() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quiz Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "draft" | "live") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="live">Live</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <EditorContent editor={editor} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enableFullscreen">Enable Fullscreen</Label>
            <Switch
              id="enableFullscreen"
              checked={formData.settings.enableFullscreen}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  settings: { ...formData.settings, enableFullscreen: checked },
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="disableCopyPaste">Disable Copy/Paste</Label>
            <Switch
              id="disableCopyPaste"
              checked={formData.settings.disableCopyPaste}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  settings: { ...formData.settings, disableCopyPaste: checked },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Information Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="collectUserInfo">Collect User Information</Label>
            <Switch
              id="collectUserInfo"
              checked={formData.settings.collectUserInfo}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  settings: { ...formData.settings, collectUserInfo: checked },
                })
              }
            />
          </div>
          {formData.settings.collectUserInfo && (
            <div className="space-y-4">
              {formData.userInfoFields.map((field, index) => (
                <div key={index} className="flex gap-4">
                  <Input
                    placeholder="Field Name"
                    value={field.name}
                    onChange={(e) => {
                      const newFields = [...formData.userInfoFields];
                      newFields[index] = { ...field, name: e.target.value };
                      setFormData({ ...formData, userInfoFields: newFields });
                    }}
                  />
                  <Select
                    value={field.type}
                    onValueChange={(value: "text" | "email" | "select") => {
                      const newFields = [...formData.userInfoFields];
                      newFields[index] = { ...field, type: value };
                      setFormData({ ...formData, userInfoFields: newFields });
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="select">Select</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      const newFields = formData.userInfoFields.filter(
                        (_, i) => i !== index,
                      );
                      setFormData({ ...formData, userInfoFields: newFields });
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setFormData({
                    ...formData,
                    userInfoFields: [
                      ...formData.userInfoFields,
                      { name: "", type: "text", required: false },
                    ],
                  })
                }
              >
                Add Field
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Save Quiz</Button>
      </div>
    </form>
  );
}

export default QuizEditor;
