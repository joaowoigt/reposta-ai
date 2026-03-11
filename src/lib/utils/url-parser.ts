import * as cheerio from "cheerio";

const FETCH_TIMEOUT = 10_000;

const REMOVE_SELECTORS = [
  "script",
  "style",
  "nav",
  "footer",
  "header",
  "aside",
  "iframe",
  "noscript",
  "svg",
  "form",
  "[class*='sidebar']",
  "[class*='ad-']",
  "[class*='ads-']",
  "[class*='advertisement']",
  "[class*='menu']",
  "[class*='comment']",
  "[class*='share']",
  "[class*='social']",
  "[class*='related']",
  "[class*='newsletter']",
  "[id*='sidebar']",
  "[id*='ad-']",
  "[id*='ads-']",
  "[id*='menu']",
  "[id*='comment']",
].join(", ");

const CONTENT_SELECTORS = [
  "article",
  "main",
  "[class*='content']",
  "[class*='post']",
  "[class*='article']",
  "[class*='entry']",
  "[id*='content']",
  "[id*='post']",
  "[id*='article']",
];

export type ParseResult =
  | { success: true; text: string; title: string | null }
  | { success: false; error: string };

export async function parseUrl(url: string): Promise<ParseResult> {
  // Validar URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return { success: false, error: "URL inválida. Verifique o formato e tente novamente." };
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    return { success: false, error: "Apenas URLs HTTP e HTTPS são suportadas." };
  }

  // Fetch da página
  let html: string;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; RepostAI/1.0; +https://reposta-ai.vercel.app)",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return {
        success: false,
        error: `Não foi possível acessar a página (status ${response.status}). Tente colar o texto manualmente.`,
      };
    }

    html = await response.text();
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return {
        success: false,
        error: "A página demorou muito para responder. Tente colar o texto manualmente.",
      };
    }
    return {
      success: false,
      error: "Não foi possível acessar a página. Verifique a URL ou tente colar o texto manualmente.",
    };
  }

  // Parse HTML
  const $ = cheerio.load(html);

  // Extrair título
  const title = $("title").first().text().trim() || null;

  // Remover elementos indesejados
  $(REMOVE_SELECTORS).remove();

  // Tentar extrair conteúdo principal por seletores em ordem de prioridade
  let contentText = "";

  for (const selector of CONTENT_SELECTORS) {
    const el = $(selector).first();
    if (el.length > 0) {
      contentText = el.text();
      break;
    }
  }

  // Fallback: body inteiro
  if (!contentText.trim()) {
    contentText = $("body").text();
  }

  // Limpar whitespace excessivo
  const cleanText = contentText
    .replace(/\s+/g, " ")
    .replace(/\n\s*\n/g, "\n")
    .trim();

  if (cleanText.length < 100) {
    return {
      success: false,
      error: `O conteúdo extraído é muito curto (${cleanText.length} caracteres). O site pode estar bloqueando a extração. Tente colar o texto manualmente.`,
    };
  }

  return { success: true, text: cleanText, title };
}
