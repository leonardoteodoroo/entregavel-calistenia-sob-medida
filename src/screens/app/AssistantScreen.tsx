import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ScreenFrame } from '../../components/ScreenFrame';
import { exerciseMap } from '../../data/exercises';
import { resolveAssistantIntent } from '../../lib/assistantRules';

interface ChatMessage {
  id: string;
  from: 'aluna' | 'assistente';
  text: string;
}

let messageCounter = 0;
const nextMessageId = () => `message-${messageCounter++}`;

export const AssistantScreen = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'seed',
      from: 'assistente',
      text: 'Me diga sua dúvida: substituição, dor no joelho/punho, treino curto ou perdi um dia.',
    },
  ]);

  const quickPrompts = useMemo(
    () => ['Preciso de substituição', 'Meu joelho dói', 'Hoje tenho só 10 minutos', 'Perdi um dia'],
    [],
  );

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const intent = resolveAssistantIntent(trimmed);
    const suggestions = intent.suggestedExerciseIds
      .map((id) => exerciseMap.get(id)?.name)
      .filter((value): value is string => Boolean(value));

    const assistantText =
      suggestions.length > 0
        ? `${intent.answer}\n\nSugestão agora: ${suggestions.slice(0, 2).join(' • ')}.`
        : intent.answer;

    setMessages((previous) => [
      ...previous,
      { id: nextMessageId(), from: 'aluna', text: trimmed },
      { id: nextMessageId(), from: 'assistente', text: assistantText },
    ]);
    setInput('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <ScreenFrame title="Assistente" subtitle="Apoio rápido, sem tirar foco do treino">
      <div className="flex flex-1 flex-col gap-3">
        <div className="max-h-[55vh] space-y-2 overflow-y-auto rounded-2xl border border-white/10 bg-[color:var(--color-surface)] p-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line ${
                message.from === 'assistente'
                  ? 'bg-white/10 text-white'
                  : 'ml-auto bg-[color:var(--color-brand)] text-black'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendMessage(prompt)}
              className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-[color:var(--color-muted-text)]"
            >
              {prompt}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Digite sua dúvida"
            className="flex-1 rounded-xl border border-white/10 bg-[color:var(--color-surface)] px-3 py-2 text-sm text-white"
          />
          <button
            type="submit"
            className="rounded-xl bg-[color:var(--color-brand)] px-4 py-2 text-sm font-semibold text-black"
          >
            Enviar
          </button>
        </form>

        <Link to="/app/biblioteca" className="text-center text-xs text-[color:var(--color-accent)]">
          Voltar para biblioteca
        </Link>
      </div>
    </ScreenFrame>
  );
};
