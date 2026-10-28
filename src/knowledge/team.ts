import "server-only";

/**
 * ⚡ 우리 조 자료 (챗봇의 "메모리")
 *
 * 챗봇은 여기 적힌 내용만 사실로 알고 답합니다. 여기 없는 건 지어내지 않고 넘깁니다.
 * - 빈 칸("")으로 둔 항목은 챗봇에게 전달되지 않습니다. 모르는 칸은 비워 두세요.
 * - 줄을 더 쓰고 싶으면 { ... } 한 덩어리를 복사해서 아래에 붙여 넣으면 됩니다.
 * - 공개하면 안 되는 정보(전화번호, 학번, 사는 곳 등)는 적지 마세요. 발표장 70명 모두가 볼 수 있습니다.
 */
// 조원 한 명의 정보. 모르는 칸은 비워 두거나 빼도 됩니다.
type Member = {
  name: string;
  role: string; // 조장, 운영진, 기획팀, 밥조, 미디어
  from: string; // 출생연도 (예: "05년생")
  oneLiner: string; // 발표 속 포켓몬 이름 등 한 줄 소개
  birthday?: string; // 생일 (예: "10월 17일")
  hobbies?: string; // 취미
  loveAboutTeam?: string; // 본인이 말한 핫식스의 장점
};

export const team: {
  program: string;
  groupName: string;
  slogan: string;
  semester: string;
  meetingCount: string;
  members: Member[];
  activities: { date: string; title: string; place: string; what: string; highlight: string }[];
  numbers: { label: string; value: string }[];
  episodes: string[];
  faq: { q: string; a: string }[];
  doNotTalkAbout: string[];
} = {
  // 기본 정보
  program: "KUISA (고려대 외국인 학생 버디 프로그램)",
  groupName: "Hot-Six (발표에선 Hot-6ix로도 씀, KUISA 26기 6조)",
  slogan: "버디와 벗이 특히 친하고, 다 같이 잘 뭉치는 조",
  semester: "2026년 2학기 중 상반기 (금요일 '상반기 전체회의'에서 발표)",
  meetingCount: "개강 전에만 번개 6차",

  // 조원 (from 칸에는 출생연도, oneLiner에는 발표 속 포켓몬 별명)
  members: [
    {
      name: "윤선욱", role: "조장", from: "04년생", oneLiner: "발표에서 Hot-6ix 연구소장 '윤 박사'로 등장",
      birthday: "5월 20일",
      hobbies: "러닝, 스포츠 경기 보기",
    },
    {
      name: "자비 (Diaby)", role: "운영진", from: "05년생", oneLiner: "포켓몬 이름 잠만자비. 항상 일 열심히 하고 앞장서서 궂은일을 도맡아서 '소년가장'으로 불림",
      birthday: "9월 19일",
      hobbies: "운동",
    },
    { name: "송연우", role: "운영진", from: "05년생", oneLiner: "포켓몬 이름 연꽃우" },
    { name: "김예건", role: "기획팀", from: "05년생", oneLiner: "포켓몬 이름 예건부기" },
    {
      name: "이채민", role: "기획팀", from: "06년생", oneLiner: "포켓몬 이름 채민츄",
      birthday: "10월 17일",
      hobbies: "뮤지컬 보기, 드라마 보기, 훠궈 먹기, 심리테스트 하기",
      loveAboutTeam: "다들 진짜 착하다. 생일 때 조원들이 케이크를 직접 만들어서 축하해 줌. 최고!",
    },
    { name: "전세은", role: "밥조", from: "04년생", oneLiner: "포켓몬 이름 세은링" },
    { name: "김정현", role: "밥조", from: "05년생", oneLiner: "포켓몬 이름 정현" },
    {
      name: "도예빈", role: "밥조", from: "05년생", oneLiner: "포켓몬 이름 또도예빈",
      birthday: "5월 15일",
      hobbies: "여행, 음악 듣기",
    },
    { name: "이유빈", role: "밥조", from: "", oneLiner: "포켓몬 이름 이브빈" },
    {
      name: "김상엽", role: "밥조", from: "01년생", oneLiner: "포켓몬 이름 이상엽씨",
      birthday: "1월 3일",
      hobbies: "노래 들으면서 러닝",
    },
    {
      name: "세드릭 (본명 곽경현)", role: "밥조", from: "06년생", oneLiner: "포켓몬 이름 세드리자몽. 예전에는 버디였다가 지금은 벗",
      birthday: "10월 18일",
      hobbies: "축구, 게임",
    },
    { name: "박민하", role: "미디어", from: "", oneLiner: "포켓몬 이름 민하뇽" },
    { name: "박수연", role: "미디어", from: "", oneLiner: "포켓몬 이름 박수뇽" },
    {
      name: "김윤아", role: "미디어", from: "06년생", oneLiner: "포켓몬 이름 윤아킹",
      birthday: "8월 22일",
      hobbies: "영화 보기, 노래 듣기",
      loveAboutTeam: "정말 끈끈하고 따뜻하다. 함께 있으면 행복해진다.",
    },
  ],

  // 상반기 활동 (시간 순서대로)
  activities: [
    { date: "개강 전", title: "번개 모임", place: "", what: "벗들끼리 먼저 친해지려고 개강 전에만 번개를 6차까지 함", highlight: "첫 만남은 치맥" },
    { date: "", title: "보드게임카페 번개", place: "보드게임카페", what: "보드게임 하면서 부쩍 친해짐, 막걸리 티어 매기기도 함", highlight: "소년가장 잠만자비가 굴욕의 패배를 맛봄" },
    { date: "", title: "방탈출 번개", place: "방탈출 카페", what: "공포 테마 방탈출", highlight: "윤 박사(조장 윤선욱)가 소리를 엄청 지름" },
    { date: "", title: "벗 OT & MT", place: "", what: "벗(한국인 학생)들끼리 팀워크 다지기", highlight: "" },
    { date: "", title: "개강총회 · 개강파티", place: "", what: "드디어 버디(외국인 학생)들을 맞이하고 함께 어울림", highlight: "" },
    { date: "개총과 개파 사이", title: "스페셜 미션: 응원 OT", place: "", what: "응원 OT 참여. 정말 힘들었지만 다들 적응해 가던 시기", highlight: "" },
    { date: "9월", title: "기획 MT", place: "", what: "새벽에 다 같이 풋살을 하고, 소고기도 구워 먹으면서 버디들과 교류함. 약 50명이 함께한 MT", highlight: "새벽 풋살이 제일 기억에 남는 장면" },
    { date: "", title: "고연전", place: "", what: "정말 재밌었음. 야구 같은 경기에서 다 같이 일어나서 열심히 응원함. 뒷풀이에서는 조장 윤선욱과 세드릭(곽경현)이 FM을 함", highlight: "뒷풀이에서 윤선욱과 세드릭(곽경현)의 FM" },
  ],

  // 숫자로 자랑할 것
  numbers: [
    { label: "개강 전 번개 횟수", value: "6차" },
    { label: "9월 기획 MT 인원", value: "약 50명" },
    { label: "벗(조원) 수", value: "14명" },
    { label: "버디 수", value: "약 70명" },
  ],

  // 웃긴 에피소드, 명장면
  episodes: [
    "MT 때 새벽에 다 같이 풋살을 함 (가장 먼저 소개할 에피소드)",
    "첫 만남부터 치맥으로 시작함",
    "보드게임카페에서 막걸리 티어 매기기를 함",
    "소년가장 잠만자비(자비)가 보드게임에서 굴욕의 패배를 맛봄",
    "공포 테마 방탈출에서 조장 윤선욱(윤 박사)이 소리를 엄청 지름",
    "미디어팀이 관리하는 핫식스 인스타그램 릴스가 최근에 엄청 웃김",
    "이채민 생일에 조원들이 케이크를 직접 만들어서 축하해 줌",
    "고연전 뒷풀이에서 조장 윤선욱과 세드릭(곽경현)이 FM을 함 (FM: 고려대 전통 자기소개. 정해진 형식에 맞춰 큰 소리로 소속과 이름을 외치고 몸짓이나 개인기를 곁들이기도 함)",
  ],

  // 예상 질문과 우리가 정한 답 (챗봇이 이 답을 가장 우선해서 씁니다)
  faq: [
    { q: "너희 조는 상반기에 뭐 했어? (첫 화면 추천 질문)", a: "개강 전 번개 6차로 벗들이 먼저 뭉치고, 개총·개파에서 버디들을 맞이했어! 9월 MT에선 새벽 풋살, 고연전에선 다 같이 응원까지 했지. 버디랑 벗이 진짜 하나가 됐어" },
    { q: "조원 소개해 줘! (첫 화면 추천 질문, 전체 소개)", a: "핫식스 벗은 14명이야! 조장 윤선욱, 운영진 2명, 기획팀 2명, 밥조 6명, 미디어 3명. 궁금한 사람 이름을 말해 주면 포켓몬 도감처럼 알려 줄게 (14명을 한 번에 다 나열하지 않는다)" },
    { q: "너희 조의 제일 큰 자랑은?", a: "버디와 벗이 특히 친하고 다 같이 잘 뭉친다는 것! MT에선 새벽에 다 같이 풋살까지 했어. 개강 전부터 번개도 6차나 했고" },
    { q: "제일 재밌었던 활동은? / 기억에 남는 순간은?", a: "MT 때 새벽에 다 같이 한 풋살! 소고기도 구워 먹으면서 버디랑 벗이 완전 하나가 됐어" },
    { q: "고연전 때 뭐 했어?", a: "진짜 재밌었어! 야구 같은 경기에서 다 같이 일어나서 열심히 응원했고, 뒷풀이에선 조장 윤선욱이랑 세드릭(곽경현)이 FM까지 했어" },
    { q: "버디는 몇 명이야? / 버디 누구누구야?", a: "버디는 약 70명이야! 이름까지 다 알려 줄 순 없지만, 벗 14명이랑 정말 친하게 지내" },
    { q: "밥조는 뭐 하는 팀이야?", a: "벗과 버디들이 다 같이 밥 먹는 약속을 계속 열어 주는 팀이야" },
    { q: "미디어는 뭐 하는 팀이야?", a: "핫식스 인스타그램을 전담으로 관리해! 최근 릴스가 엄청 웃겨" },
    { q: "인스타 아이디 뭐야? / 인스타 어디야? / 계정 알려 줘", a: "오~ 관심 있나, 피카? 발표에 집중하면 알게 될지도 모르지 ㅎㅎ (아이디는 절대 직접 알려 주지 않고 이렇게 장난스럽게 넘김)" },
    { q: "잠만자비는 왜 소년가장이야?", a: "항상 일 열심히 하고 앞장서서 궂은일을 도맡아 해서!" },
    { q: "조장이 누구야?", a: "윤선욱! 발표에서는 Hot-6ix 연구소장 윤 박사로 나와" },
  ],

  // 챗봇이 대답하면 안 되는 주제 (물어보면 정중히 넘깁니다)
  doNotTalkAbout: [
    "조원 개인 연락처, 학번, 사는 곳",
    "다른 조에 대한 평가나 비교",
    "버디 개개인의 이름 (버디 수만 말하고 이름은 공개하지 않음)",
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
      if (m.birthday && filled(m.birthday)) out.push(`  · 생일: ${m.birthday}`);
      if (m.hobbies && filled(m.hobbies)) out.push(`  · 취미: ${m.hobbies}`);
      if (m.loveAboutTeam && filled(m.loveAboutTeam)) out.push(`  · 본인이 말한 핫식스의 장점: ${m.loveAboutTeam}`);
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
