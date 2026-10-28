"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  MAX_QUESTION_LENGTH,
  validateMessages,
  type CharacterDisplay,
  type Message,
} from "@/lib/chat";

export default function Chat({
  character,
  suggestions,
}: {
  character: CharacterDisplay;
  suggestions: string[];
}) {
  // public 폴더에 있는 사진만 씁니다. 없으면 기본 모양(⚡, 화살표 등)이 그대로 나옵니다.
  const img = useAvailableImages(IMAGE_FILES);
  const cornerSrc = useFirstAvailable(CORNER_FILES);
  // 성공한 대화만 기록합니다. 첫 인사는 화면에서 별도로 보여 주는 설정 문구입니다.
  // [확장 포인트] 새로고침 후에도 기록을 유지하려면 초기 조회와 성공 시 DB 저장을 연결합니다.
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [pendingMessage, setPendingMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // ref는 재렌더링 전 연속 클릭도 막고, 초기화 이전 응답을 구분합니다.
  const activeRequest = useRef<AbortController | null>(null);
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView({ block: "nearest" });
  }, [messages, isLoading, error]);
  useEffect(() => () => activeRequest.current?.abort(), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await send(input.trim());
  }

  async function send(content: string) {
    if (!content || activeRequest.current) return;

    const nextMessages: Message[] = [...messages, { role: "user", content }];

    const validation = validateMessages(nextMessages);

    if ("error" in validation) {
      setError(validation.error);
      return;
    }

    // 여기서부터 input과 실제 전송할 메시지를 완전히 분리
    setInput("");

    const controller = new AbortController();
    activeRequest.current = controller;

    setPendingMessage(content);
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages,
        }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "메시지를 보내지 못했어요.",
        );
      }

      if (typeof data?.reply !== "string" || !data.reply.trim()) {
        throw new Error("답변이 비어 있어요. 다시 보내 주세요.");
      }

      if (activeRequest.current !== controller) return;

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (cause) {
      if (activeRequest.current !== controller) return;

      // 실패했을 때만 다시 입력창에 복구
      setInput(content);

      setError(
        cause instanceof Error &&
          !(cause instanceof TypeError) &&
          !(cause instanceof SyntaxError)
          ? cause.message
          : "연결에 문제가 생겼어요. 잠시 후 다시 보내 주세요.",
      );
    } finally {
      if (activeRequest.current === controller) {
        activeRequest.current = null;
        setIsLoading(false);
        setPendingMessage("");
      }
    }
  }

  function resetConversation() {
    // 먼저 기존 요청을 무효화하므로 늦게 도착한 응답이 새 대화에 섞이지 않습니다.
    const previous = activeRequest.current;
    activeRequest.current = null;
    previous?.abort();
    setMessages([]);
    setInput("");
    setError("");
    setPendingMessage("");
    setIsLoading(false);
  }

  return (
    <main className="shell">
      <section className="chat-card" aria-label={`${character.name}와 대화`}>
        <header className="chat-header">
          {/* 캐릭터 사진 넣는 자리 */}
          <div className="character-photo-slot" aria-label="캐릭터 사진 자리">
            {img.character ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={IMAGE_FILES.character} alt={character.name} width={64} height={64} />
            ) : (
              <span className="photo-fallback" aria-hidden="true">⚡</span>
            )}
          </div>
          <div className="character-info">
            <div className="character-name-row">
              <h1>{character.name}</h1>
            </div>
            <p>{character.description}</p>
          </div>
          <button
            className="reset"
            type="button"
            onClick={resetConversation}
            aria-label="대화 초기화"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M16.4 9.2a6.5 6.5 0 1 1-2.2-4.8M16.4 3.7v4.5h-4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>새 대화</span>
          </button>
        </header>
        <div className="conversation-wrap">
        {cornerSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="chat-corner" src={cornerSrc} alt="" aria-hidden="true" />
        )}
        <div
          className="conversation"
          role="log"
          aria-label="대화 목록"
          aria-live="polite"
        >
          <p className="conversation-start">
            <span /> 야생의 {character.name}가 나타났다! <span />
          </p>
          <article className="message assistant">
            <Speaker name={character.name} avatar={img.avatar ? IMAGE_FILES.avatar : null} />
            <p className="message-bubble">{character.greeting}</p>
          </article>
          {messages.length === 0 && !isLoading && suggestions.length > 0 && (
            <div className="suggestions" aria-label="추천 질문">
              {suggestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="suggestion"
                  onClick={() => send(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}
          {messages.map((message, index) => (
            <article className={`message ${message.role}`} key={index}>
              {message.role === "user" ? (
                <Speaker name="나" avatar={img.userAvatar ? IMAGE_FILES.userAvatar : null} />
              ) : (
                <Speaker name={character.name} avatar={img.avatar ? IMAGE_FILES.avatar : null} />
              )}
              <p className="message-bubble">{message.content}</p>
            </article>
          ))}
          {isLoading && (
            <>
              <article className="message user pending">
                <Speaker name="나 · 전송 중" avatar={img.userAvatar ? IMAGE_FILES.userAvatar : null} />
                <p className="message-bubble">{pendingMessage}</p>
              </article>
              <p className="waiting" role="status">
                <span className="typing-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                {character.name}가 볼에 전기를 모으는 중… ⚡
              </p>
            </>
          )}
          <div ref={bottom} />
        </div>
        </div>
        <form className="composer" onSubmit={handleSubmit}>
          {error && (
            <p className="error" role="alert">
              {error} 입력한 내용은 남아 있어요.
            </p>
          )}
          <label htmlFor="message" className="sr-only">질문</label>
          <div className="input-row">
            <textarea
              id="message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing
                ) {
                  event.preventDefault();

                  if (!isLoading && input.trim()) {
                    event.currentTarget.form?.requestSubmit();
                  }
                }
              }}
              placeholder="우리 조에 대해 궁금한 걸 물어봐!"
              maxLength={MAX_QUESTION_LENGTH}
              rows={2}
              disabled={isLoading}
            />
            <button
              className={img.send ? "send send-ball" : "send"}
              type="submit"
              disabled={isLoading || !input.trim()}
            >
              {img.send ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={IMAGE_FILES.send} alt="" aria-hidden="true" />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <span className="sr-only">
                {isLoading ? "답변 기다리는 중" : "보내기"}
              </span>
            </button>
          </div>
          <div className="input-help">
            <span>새로고침하면 대화가 초기화됩니다.</span>
            <span>
              {input.length} / {MAX_QUESTION_LENGTH}
            </span>
          </div>
        </form>
      </section>
      <p className="footer-note">
        AI가 우리 조 자료로만 답해요. 틀린 내용은 발표자에게 물어봐 주세요!
      </p>
    </main>
  );
}

/* ---------- 사진 자리 ----------
 * public 폴더에 아래 이름으로 넣으면 자동으로 적용됩니다.
 * (배경 사진 background.jpg, chat-bg.jpg, header-bg.jpg는 globals.css에서 처리)
 */
const IMAGE_FILES = {
  character: "/character.png", // 상단 동그라미 얼굴
  send: "/send.png", // 보내기 버튼
  avatar: "/avatar.png", // 피카츄 말풍선 옆 작은 얼굴
  userAvatar: "/user-avatar.png", // 내 말풍선 옆 작은 얼굴
} as const;

type ImageKey = keyof typeof IMAGE_FILES;

/** 각 사진이 실제로 있는지 미리 불러 보고, 성공한 것만 true로 표시합니다. */
function useAvailableImages(files: typeof IMAGE_FILES) {
  const [ok, setOk] = useState<Record<ImageKey, boolean>>({
    character: false,
    send: false,
    avatar: false,
    userAvatar: false,
  });
  useEffect(() => {
    let alive = true;
    (Object.keys(files) as ImageKey[]).forEach((key) => {
      const probe = new window.Image();
      probe.onload = () => alive && setOk((prev) => ({ ...prev, [key]: true }));
      probe.src = files[key];
    });
    return () => {
      alive = false;
    };
  }, [files]);
  return ok;
}

function Speaker({ name, avatar }: { name: string; avatar: string | null }) {
  return (
    <span className="speaker">
      {avatar && (
        <span
          className="speaker-avatar"
          style={{ backgroundImage: `url(${avatar})` }}
          aria-hidden="true"
        />
      )}
      {name}
    </span>
  );
}

// 대화창 오른쪽 아래 장식 사진. 확장자는 png, jpg, jpeg, webp 아무거나 됩니다.
const CORNER_FILES = ["/chat-corner.png", "/chat-corner.jpg", "/chat-corner.jpeg", "/chat-corner.webp"];

/** 후보 중 실제로 있는 첫 번째 사진 주소를 돌려줍니다. 없으면 null. */
function useFirstAvailable(candidates: string[]) {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    const tryAt = (i: number) => {
      if (!alive || i >= candidates.length) return;
      const probe = new window.Image();
      probe.onload = () => alive && setSrc(candidates[i]);
      probe.onerror = () => tryAt(i + 1);
      probe.src = candidates[i];
    };
    tryAt(0);
    return () => {
      alive = false;
    };
  }, [candidates]);
  return src;
}
