import { anthropic } from "./client";
import { SYSTEM_PROMPT, PLATFORM_PROMPTS } from "./prompts";

export type Platform = "x" | "linkedin" | "instagram" | "newsletter";

interface GenerateOptions {
  inputText: string;
  platform: Platform;
  tone?: string;
}

interface GenerateResult {
  platform: Platform;
  outputText: string;
  tokensUsed: number;
}

export async function generateForPlatform({ inputText, platform, tone }: GenerateOptions): Promise<GenerateResult> {
  const config = PLATFORM_PROMPTS[platform];

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: config.maxTokens,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: config.buildPrompt(inputText, tone),
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  const outputText = textBlock?.text ?? "";

  const tokensUsed = (response.usage.input_tokens ?? 0) + (response.usage.output_tokens ?? 0);

  return {
    platform,
    outputText,
    tokensUsed,
  };
}

export async function generateForPlatforms(
  inputText: string,
  platforms: Platform[],
  tone?: string,
): Promise<GenerateResult[]> {
  const results = await Promise.all(
    platforms.map((platform) => generateForPlatform({ inputText, platform, tone })),
  );
  return results;
}
