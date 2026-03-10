import type { Platform } from "./generate";

export const SYSTEM_PROMPT = `Você é um especialista em repurposing de conteúdo com anos de experiência criando posts virais para redes sociais.

Regras fundamentais:
- NUNCA invente fatos, dados ou citações que não estejam no conteúdo original
- Apenas reformule, adapte e reorganize o que já existe no texto fonte
- Mantenha a essência e a mensagem central do conteúdo original
- Adapte o formato, tom e linguagem para a plataforma de destino
- Retorne APENAS o texto do post, sem explicações, prefácios ou comentários
- Não inclua aspas ao redor do texto gerado`;

type Tone = "casual" | "profissional" | "educacional" | "inspiracional";

const TONE_INSTRUCTIONS: Record<Tone, string> = {
  casual: "Use tom leve, conversacional, como se estivesse falando com um amigo. Pode usar gírias leves e linguagem informal.",
  profissional: "Use tom profissional e confiante, sem ser corporativo ou frio. Transmita autoridade no assunto.",
  educacional: "Use tom didático e claro. Estruture como se estivesse ensinando algo. Use exemplos quando possível.",
  inspiracional: "Use tom motivacional e envolvente. Conecte o conteúdo com uma mensagem maior. Inspire ação.",
};

function toneInstruction(tone?: string): string {
  if (!tone || !(tone in TONE_INSTRUCTIONS)) return "";
  return `\nTom desejado: ${TONE_INSTRUCTIONS[tone as Tone]}`;
}

interface PromptConfig {
  maxTokens: number;
  buildPrompt: (content: string, tone?: string) => string;
}

export const PLATFORM_PROMPTS: Record<Platform, PromptConfig> = {
  x: {
    maxTokens: 400,
    buildPrompt: (content: string, tone?: string) => `Gere um post para X (Twitter) com base no conteúdo abaixo.

Regras da plataforma:
- Máximo 280 caracteres no post
- Tom conversacional e direto
- Comece com um hook que prenda atenção nos primeiros 5 segundos
- Use quebras de linha para legibilidade
- Inclua 1-2 hashtags relevantes no final se fizer sentido
- Máximo 1-2 emojis (apenas se fizerem sentido no contexto)
- O post deve funcionar sozinho, sem contexto adicional
${toneInstruction(tone)}

--- CONTEÚDO ORIGINAL ---
${content}
--- FIM DO CONTEÚDO ---`,
  },

  linkedin: {
    maxTokens: 1500,
    buildPrompt: (content: string, tone?: string) => `Gere um post para LinkedIn com base no conteúdo abaixo.

Regras da plataforma:
- Entre 800 e 1300 caracteres
- Comece com um hook forte (primeira linha que prende atenção — o leitor decide em 2 segundos se continua)
- Use quebras de linha curtas para facilitar leitura no mobile
- Estrutura recomendada: hook → contexto → insight principal → call-to-action
- Inclua uma pergunta ou call-to-action no final para gerar engajamento
- Máximo 3-5 hashtags no final do post
- Evite jargão corporativo vazio ("sinergia", "paradigma", "stakeholders")
- Tom profissional mas acessível — como uma conversa inteligente
${toneInstruction(tone)}

--- CONTEÚDO ORIGINAL ---
${content}
--- FIM DO CONTEÚDO ---`,
  },

  instagram: {
    maxTokens: 2500,
    buildPrompt: (content: string, tone?: string) => `Gere uma legenda para Instagram com base no conteúdo abaixo.

Regras da plataforma:
- Até 2200 caracteres
- Comece com um hook forte (primeira frase é o que aparece antes do "mais...")
- Tom autêntico e envolvente — como se estivesse compartilhando com sua audiência
- Use parágrafos curtos (2-3 linhas no máximo)
- Inclua um call-to-action claro (salve este post, compartilhe com alguém, comente sua opinião)
- Adicione 5-10 hashtags relevantes no final, separados por uma linha em branco
- Pode usar emojis com moderação para dar personalidade e quebrar o texto
${toneInstruction(tone)}

--- CONTEÚDO ORIGINAL ---
${content}
--- FIM DO CONTEÚDO ---`,
  },

  newsletter: {
    maxTokens: 1200,
    buildPrompt: (content: string, tone?: string) => `Gere um trecho para newsletter/email com base no conteúdo abaixo.

Regras da plataforma:
- Entre 500 e 1000 caracteres
- Tom editorial e informativo — como um curador de conteúdo compartilhando o melhor da semana
- Estrutura: abertura com contexto → ponto principal com 1-2 takeaways → conclusão com insight
- Escreva como se estivesse conversando diretamente com o leitor (use "você")
- Não use hashtags
- Não use emojis
- O texto deve funcionar como um resumo executivo que faz o leitor querer saber mais
${toneInstruction(tone)}

--- CONTEÚDO ORIGINAL ---
${content}
--- FIM DO CONTEÚDO ---`,
  },
};
