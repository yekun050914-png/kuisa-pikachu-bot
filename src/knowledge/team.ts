import "server-only";

/**
 * ⚡ 우리 조 자료 (챗봇의 "메모리")
 *
 * 챗봇은 여기 적힌 내용만 사실로 알고 답합니다. 여기 없는 건 지어내지 않고 넘깁니다.
 * - 빈 칸("")으로 둔 항목은 챗봇에게 전달되지 않습니다. 모르는 칸은 비워 두세요.
 * - 줄을 더 쓰고 싶으면 { ... } 한 덩어리를 복사해서 아래에 붙여 넣으면 됩니다.
 * - 공개하면 안 되는 정보(전화번호, 학번, 사는 곳 등)는 적지 마세요. 발표장 70명 모두가 볼 수 있습니다.
 */
export const team = {
  // 기본 정보
  program: "KUISA (고려대 외국인 학생 버디 프로그램)",
  groupName: "Hot-Six (KUISA 26기 6조)", // 예: "6조 hot-six"
  slogan: "", // 조 한 줄 소개. 예: "버디보다 벗이 더 신난 조"
  semester: "2026년 상반기",
  meetingCount: "", // 예: "공식 모임 5번, 번개 3번"

  // 조원 (벗 = 한국인 학생, 버디 = 외국인 학생)
  members: [
    { name: "", role: "벗", from: "", oneLiner: "" },
    { name: "", role: "버디", from: "", oneLiner: "" },
    // 예: { name: "예건", role: "벗", from: "한국", oneLiner: "레크 담당, 게임 만들다 밤샘" },
  ],

  // 상반기 활동 (시간 순서대로)
  activities: [
    { date: "", title: "", place: "", what: "", highlight: "" },
    // 예: { date: "3월 넷째 주", title: "첫 만남", place: "안암 OO식당", what: "자기소개, 이름 외우기 게임", highlight: "버디가 떡볶이 처음 먹고 울었음" },
  ],

  // 숫자로 자랑할 것
  numbers: [
    { label: "", value: "" },
    // 예: { label: "같이 먹은 삼겹살", value: "약 12인분" },
  ],

  // 웃긴 에피소드, 명장면
  episodes: [
    "",
    // 예: "MT에서 버디가 한국어로 '배고파'만 30번 말함",
  ],

  // 예상 질문과 우리가 정한 답 (챗봇이 이 답을 가장 우선해서 씁니다)
  faq: [
    { q: "", a: "" },
    // 예: { q: "제일 재밌었던 활동은?", a: "MT! 레크 게임에서 조원 전원이 벌칙 받음" },
  ],

  // 챗봇이 대답하면 안 되는 주제 (물어보면 정중히 넘깁니다)
  doNotTalkAbout: [
    "조원 개인 연락처, 학번, 사는 곳",
    "다른 조에 대한 평가나 비교",
  ],
};

// 첫 화면에 버튼으로 보여 줄 추천 질문 (눌러서 바로 물어볼 수 있음)
export const suggestedQuestions: string[] = [
  "너희 조는 상반기에 뭐 했어?",
  "제일 재밌었던 활동은?",
  "조원 소개해 줘!",
  "웃긴 에피소드 하나만!",
];

/* ---------- 아래는 수정할 필요 없습니다 ---------- */

const filled = (value: string) => value.trim().length > 0;

function line(label: string, value: string) {
  return filled(value) ? `- ${label}: ${value.trim()}` : null;
}

/** 채워진 칸만 골라 챗봇에게 줄 자료 문자열을 만듭니다. */
export function buildKnowledge(): string {
  const out: (string | null)[] = [];

  out.push("[기본 정보]");
  out.push(line("프로그램", team.program));
  out.push(line("조 이름", team.groupName));
  out.push(line("한 줄 소개", team.slogan));
  out.push(line("활동 기간", team.semester));
  out.push(line("모임 횟수", team.meetingCount));

  const members = team.members.filter((m) => filled(m.name));
  if (members.length) {
    out.push("\n[조원]");
    for (const m of members) {
      const extra = [m.from, m.oneLiner].filter(filled).join(", ");
      out.push(`- ${m.name} (${m.role})${extra ? `: ${extra}` : ""}`);
    }
  }

  const activities = team.activities.filter((a) => filled(a.title) || filled(a.what));
  if (activities.length) {
    out.push("\n[상반기 활동]");
    for (const a of activities) {
      const head = [a.date, a.title, a.place && `@${a.place}`].filter((v) => v && filled(v)).join(" / ");
      const body = [a.what, a.highlight && `명장면: ${a.highlight}`].filter((v) => v && filled(v)).join(" / ");
      out.push(`- ${head}${body ? ` → ${body}` : ""}`);
    }
  }

  const numbers = team.numbers.filter((n) => filled(n.label) && filled(n.value));
  if (numbers.length) {
    out.push("\n[숫자]");
    for (const n of numbers) out.push(`- ${n.label}: ${n.value}`);
  }

  const episodes = team.episodes.filter(filled);
  if (episodes.length) {
    out.push("\n[에피소드]");
    for (const e of episodes) out.push(`- ${e}`);
  }

  const faq = team.faq.filter((f) => filled(f.q) && filled(f.a));
  if (faq.length) {
    out.push("\n[자주 묻는 질문과 정해진 답 — 비슷한 질문이 오면 이 답을 우선 사용]");
    for (const f of faq) out.push(`- Q: ${f.q}\n  A: ${f.a}`);
  }

  const banned = team.doNotTalkAbout.filter(filled);
  if (banned.length) {
    out.push("\n[대답하지 않는 주제]");
    for (const b of banned) out.push(`- ${b}`);
  }

  return out.filter((v): v is string => v !== null).join("\n");
}
