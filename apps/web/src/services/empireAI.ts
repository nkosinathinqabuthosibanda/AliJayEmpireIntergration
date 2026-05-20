import {
  EMAIL_SYSTEM_PROMPT,
  FIGURES_SYSTEM_PROMPT,
  SYSTEMS_SYSTEM_PROMPT,
} from '../data/empireAIPrompt'

export type ChatRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  role: ChatRole
  content: string
}

interface OpenAIResponse {
  choices?: { message?: { content?: string } }[]
  error?: { message?: string }
}

export async function sendEmpireAIMessage(
  messages: ChatMessage[],
  options?: { model?: string; temperature?: number }
): Promise<string> {
  const res = await fetch('/api/openai/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: options?.model ?? 'gpt-4o-mini',
      messages,
      temperature: options?.temperature ?? 0.4,
    }),
  })

  const data = (await res.json()) as OpenAIResponse

  if (!res.ok) {
    throw new Error(
      data.error?.message ??
        'Empire AI offline. Set OPENAI_API_KEY in .env (VPS) or .env.local (dev) and restart the server.'
    )
  }

  const content = data.choices?.[0]?.message?.content?.trim()
  if (!content) throw new Error('No response from Empire AI.')
  return content
}

export interface EmailDraftRequest {
  to: string
  subject: string
  tone: string
  points: string
  senderName?: string
}

export async function draftEmpireEmail(req: EmailDraftRequest): Promise<string> {
  const userPrompt = [
    'Draft a complete email with Subject line.',
    req.to && `To / recipient: ${req.to}`,
    req.subject && `Subject hint: ${req.subject}`,
    `Tone: ${req.tone}`,
    req.senderName && `Sign off as: ${req.senderName}`,
    '',
    'Content to include:',
    req.points || 'Standard Alijay Empire business correspondence.',
  ]
    .filter(Boolean)
    .join('\n')

  return sendEmpireAIMessage(
    [
      { role: 'system', content: EMAIL_SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    { temperature: 0.5 }
  )
}

export async function calculateFigures(query: string): Promise<string> {
  return sendEmpireAIMessage(
    [
      { role: 'system', content: FIGURES_SYSTEM_PROMPT },
      { role: 'user', content: query },
    ],
    { temperature: 0.2 }
  )
}

export function createSystemsSession(): ChatMessage[] {
  return [{ role: 'system', content: SYSTEMS_SYSTEM_PROMPT }]
}

export async function askSystemsHelp(
  messages: ChatMessage[],
  userMessage: string
): Promise<{ messages: ChatMessage[]; reply: string }> {
  const next: ChatMessage[] = [...messages, { role: 'user', content: userMessage }]
  const reply = await sendEmpireAIMessage(next, { temperature: 0.35 })
  return { messages: [...next, { role: 'assistant', content: reply }], reply }
}
