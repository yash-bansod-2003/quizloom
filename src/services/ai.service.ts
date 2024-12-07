import { GoogleGenerativeAI } from "@google/generative-ai";
import configuration from "@/config/configuration.js";
import { CreateQuizDto } from "@/dto/quizzes.js";

class Aiservice {
  private readonly client: GoogleGenerativeAI;
  constructor() {
    this.client = new GoogleGenerativeAI(configuration.ai.key);
  }
  async generateQuiz(
    createQuizDto: CreateQuizDto,
  ): Promise<Record<string, unknown> | null> {
    const model = this.client.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    I want you to take the following name and description of a quiz application and enhance them to make them more engaging, creative, and appealing. The enhanced name should be concise, attractive, and clearly indicate the purpose of the quiz app. The enhanced description should be detailed, exciting, and communicate the app's unique features and value in a way that entices users to participate.

    Make sure the response is strictly in the following JSON format:

    {
        "name": "enhanced name",
        "description": "enhanced description"
    }
    Here is the name and description to enhance:

    Name: ${createQuizDto.name}
    Description: ${createQuizDto.description}

    Please return only the enhanced name and description in the JSON format specified.
    `;
    const result = await model.generateContent(prompt);
    const parsedResult = this.extractJsonFromMarkdown(
      result.response.candidates[0].content.parts[0].text,
    );
    return parsedResult;
  }

  private extractJsonFromMarkdown(
    markdown: string,
  ): Record<string, unknown> | null {
    try {
      const jsonMatch = markdown.match(/```json\s*([\s\S]*?)\s*```/);

      if (jsonMatch && jsonMatch[1]) {
        const jsonString = jsonMatch[1];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const parsedJson = JSON.parse(jsonString);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return parsedJson;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error parsing JSON from markdown:", error);
      return null;
    }
  }
}

export default Aiservice;
