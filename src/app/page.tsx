import Chat from "@/components/Chat";
import { character } from "@/prompts/character";
import { suggestedQuestions } from "@/knowledge/team";

export default function Home() {
  // 서버 페이지에서 표시 정보만 골라 보냅니다. 조 자료와 지침 전체는 서버에만 남습니다.
  return <Chat
    character={{
      name: character.name,
      description: character.description,
      greeting: character.greeting,
    }}
    suggestions={suggestedQuestions}
  />;
}
