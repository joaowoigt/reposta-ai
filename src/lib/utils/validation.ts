const MAX_INPUT_LENGTH = 50_000;
const MIN_INPUT_LENGTH = 100;

const VALID_PLATFORMS = ["x", "linkedin", "instagram", "newsletter"] as const;
export type ValidPlatform = (typeof VALID_PLATFORMS)[number];

interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Sanitiza texto removendo tags HTML para prevenir XSS.
 */
export function sanitizeText(text: string): string {
  return text.replace(/<[^>]*>/g, "");
}

/**
 * Valida o texto de input para geração.
 */
export function validateInputText(text: string | undefined): ValidationResult {
  if (!text || text.trim().length < MIN_INPUT_LENGTH) {
    return { valid: false, error: "O texto precisa ter pelo menos 100 caracteres" };
  }

  if (text.length > MAX_INPUT_LENGTH) {
    return { valid: false, error: `O texto não pode exceder ${MAX_INPUT_LENGTH.toLocaleString("pt-BR")} caracteres` };
  }

  return { valid: true };
}

/**
 * Valida que uma URL é válida.
 */
export function validateUrl(url: string): ValidationResult {
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return { valid: false, error: "A URL precisa começar com http:// ou https://" };
    }
    return { valid: true };
  } catch {
    return { valid: false, error: "URL inválida. Verifique o formato e tente novamente." };
  }
}

/**
 * Valida que as plataformas selecionadas são válidas.
 */
export function validatePlatforms(platforms: string[] | undefined): ValidationResult {
  if (!platforms || platforms.length === 0) {
    return { valid: false, error: "Selecione pelo menos uma plataforma" };
  }

  const invalid = platforms.filter((p) => !(VALID_PLATFORMS as readonly string[]).includes(p));
  if (invalid.length > 0) {
    return { valid: false, error: `Plataformas inválidas: ${invalid.join(", ")}` };
  }

  return { valid: true };
}

/**
 * Parse seguro do body JSON de uma request.
 */
export async function safeParseJson(request: Request): Promise<{ data: Record<string, unknown> | null; error?: string }> {
  try {
    const data = await request.json();
    return { data };
  } catch {
    return { data: null, error: "Corpo da requisição inválido" };
  }
}
