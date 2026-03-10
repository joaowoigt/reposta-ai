import { anthropic } from "./client";

export type Platform = "x" | "linkedin" | "instagram" | "newsletter";

interface GenerateOptions {
  inputText: string;
  platform: Platform;
}

interface GenerateResult {
  platform: Platform;
  outputText: string;
  tokensUsed: number;
}

const PLATFORM_CONFIG: Record<Platform, { maxTokens: number; instructions: string }> = {
  x: {
    maxTokens: 280,
    instructions: `Gere um post para X (Twitter). Regras:
- Máximo 280 caracteres
- Tom conversacional e direto
- Use quebras de linha para legibilidade
- Inclua 1-2 hashtags relevantes no final se fizer sentido
- Não use emojis em excesso (máximo 1-2)
- O post deve funcionar sozinho, sem contexto adicional`,
  },
  linkedin: {
    maxTokens: 1300,
    instructions: `Gere um post para LinkedIn. Regras:
- Máximo 1300 caracteres
- Tom profissional mas acessível
- Comece com um hook forte (primeira linha que prende atenção)
- Use quebras de linha curtas para facilitar leitura no mobile
- Inclua uma pergunta ou call-to-action no final
- Não use hashtags em excesso (máximo 3-5 no final)
- Evite jargão corporativo vazio`,
  },
  instagram: {
    maxTokens: 2200,
    instructions: `Gere uma legenda para Instagram. Regras:
- Máximo 2200 caracteres
- Tom autêntico e envolvente
- Comece com um hook forte
- Use parágrafos curtos
- Inclua um call-to-action (salve, compartilhe, comente)
- Adicione 5-10 hashtags relevantes no final, separados por uma linha em branco
- Pode usar emojis com moderação para dar personalidade`,
  },
  newsletter: {
    maxTokens: 1000,
    instructions: `Gere um trecho para newsletter/email. Regras:
- Máximo 1000 caracteres
- Tom informativo e direto
- Estrutura: abertura com contexto, ponto principal, conclusão com insight
- Não use hashtags
- Não use emojis
- Escreva como se estivesse conversando diretamente com o leitor
- O texto deve funcionar como um resumo executivo do conteúdo original`,
  },
};

export async function generateForPlatform({ inputText, platform }: GenerateOptions): Promise<GenerateResult> {
  const config = PLATFORM_CONFIG[platform];

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250514",
    max_tokens: config.maxTokens,
    messages: [
      {
        role: "user",
        content: `Você é um especialista em criação de conteúdo para redes sociais. Sua tarefa é transformar o conteúdo abaixo em um post otimizado.

${config.instructions}

IMPORTANTE: Retorne APENAS o texto do post, sem explicações, prefácios ou comentários. Não inclua aspas ao redor do texto.

--- CONTEÚDO ORIGINAL ---
${inputText}
--- FIM DO CONTEÚDO ---`,
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
): Promise<GenerateResult[]> {
  const results = await Promise.all(
    platforms.map((platform) => generateForPlatform({ inputText, platform })),
  );
  return results;
}
