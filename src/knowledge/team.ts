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
  funFacts?: string; // 단톡방에서 나온 소소한 이야기
};

export const team: {
  program: string;
  groupName: string;
  slogan: string;
  vibe: string;
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
  groupName: "Hot-Six (Hot-6ix, 26기 6조)",
  slogan: "버디와 벗이 특히 친하고 다 같이 잘 뭉치는 조",
  vibe: "취향 겹치는 사람이 많음(일드·중드·F1·축구·운동 등) / 운명이 갈라놓은 쌍둥이처럼 잘 맞음 / 모든 행사 참여율 1위 / 번개가 많음 / 핑크블러드가 흐르는 사람이 많음(뜻은 따로 풀이하지 말 것)",
  semester: "2026년 2학기 상반기 (금요일 상반기 전체회의 발표)",
  meetingCount: "금요일 발표자는 도예빈, 이채민, 김예건",

  // 조원. from=출생연도, oneLiner=포켓몬 이름 등
  members: [
    { name: "윤선욱", role: "조장", from: "04", oneLiner: "발표 속 '윤 박사'(Hot-6ix 연구소장)", birthday: "5/20", hobbies: "러닝, 스포츠 관람",
      funFacts: "하스(하나스퀘어) 상주 공부러, 밤에 하스 잔디 치킨 파티 주최, 어릴 때 미대 준비해서 그림 잘 그림, 새콤달콤 복숭아맛 러버, 참깨라면+누룽지 추천, 이과 감성, 고대 건물 부수기 게임 SMASH-KU 1등" },
    { name: "자비(Diaby)", role: "운영진", from: "05", oneLiner: "포켓몬 이름 잠만자비, 궂은일을 앞장서 도맡아 별명이 '소년가장'", birthday: "9/19", hobbies: "운동", funFacts: "최애 컵라면 콕콕콕 스파게티" },
    { name: "송연우", role: "운영진", from: "05", oneLiner: "포켓몬 이름 연꽃우" },
    { name: "김예건", role: "기획팀", from: "05", oneLiner: "포켓몬 이름 예건부기", birthday: "9/14", hobbies: "맛있는 커피 마시기, 스포츠 보기" },
    { name: "이채민", role: "기획팀", from: "06", oneLiner: "포켓몬 이름 채민츄", birthday: "10/17", hobbies: "뮤지컬, 드라마, 훠궈, 심리테스트",
      loveAboutTeam: "진짜 착함! 생일에 케이크 직접 만들어 축하해 줌", funFacts: "조원들이 '핫식스 하트', '핫식스 필수조건'이라 부름" },
    { name: "전세은", role: "밥조", from: "04", oneLiner: "포켓몬 이름 세은링", birthday: "12/9", hobbies: "드라마", funFacts: "본인 TMI: 노래방에서 탬버린을 너무 미친 듯이 쳐서 손가락에 금 간 것 같다고 함" },
    { name: "김정현", role: "밥조", from: "05", oneLiner: "포켓몬 이름 정현", birthday: "7/11", hobbies: "러닝, 넷플릭스" },
    { name: "도예빈", role: "밥조", from: "05", oneLiner: "포켓몬 이름 또도예빈", birthday: "5/15", hobbies: "여행, 음악", funFacts: "열품타 그룹 'Hotsix never sleep' 만듦" },
    { name: "이유빈", role: "밥조", from: "03", oneLiner: "포켓몬 이름 이브빈", birthday: "2/4", hobbies: "헬스, 드라마", funFacts: "곧 졸업, 졸업 스냅에 조원들이 축하하러 감" },
    { name: "김상엽", role: "밥조", from: "01", oneLiner: "포켓몬 이름 이상엽씨, 조에서 '아빠'로 불림", birthday: "1/3", hobbies: "노래 들으며 러닝" },
    { name: "세드릭(본명 곽경현)", role: "밥조", from: "06", oneLiner: "포켓몬 이름 세드리자몽, 예전엔 버디였다가 지금은 벗", birthday: "10/18", hobbies: "축구, 게임",
      funFacts: "쿠이사FC 활동, 조원 공부용 스터디룸 예약" },
    { name: "박민하", role: "미디어", from: "", oneLiner: "포켓몬 이름 민하뇽", birthday: "10/7" },
    { name: "박수연", role: "미디어", from: "", oneLiner: "포켓몬 이름 박수뇽", funFacts: "코노(코인노래방) 소모임을 엶" },
    { name: "김윤아", role: "미디어", from: "06", oneLiner: "포켓몬 이름 윤아킹", birthday: "8/22", hobbies: "영화, 노래 듣기",
      loveAboutTeam: "끈끈하고 따뜻해서 함께 있으면 행복함", funFacts: "최애 라면 육개장, 참깨라면" },
  ],

  // 활동 (시간순). 재밌는 장면은 아래 episodes에만 적습니다.
  activities: [
    { date: "개강 전", title: "번개 6차", place: "", what: "벗들끼리 먼저 친해짐 (보드게임카페, 방탈출 등)", highlight: "" },
    { date: "", title: "벗 OT & MT", place: "", what: "벗들끼리 팀워크 다지기", highlight: "" },
    { date: "", title: "개총·개파", place: "", what: "버디들을 맞이하고 함께 어울림", highlight: "" },
    { date: "개총과 개파 사이", title: "스페셜 미션 응원 OT", place: "", what: "정말 힘들었지만 다들 적응해 가던 시기", highlight: "" },
    { date: "9월", title: "기획 MT", place: "", what: "약 50명 참여. 새벽 풋살, 소고기 구워 먹으며 버디와 교류", highlight: "" },
    { date: "", title: "고연전", place: "", what: "야구 등 일어나서 열심히 응원, 뒷풀이까지", highlight: "" },
    { date: "10월 시험기간", title: "양꼬치 회식 & 같이 공부", place: "안암", what: "벗들끼리 양꼬치 1차 회식, 열품타·스터디룸·하스에서 같이 공부", highlight: "" },
    { date: "10/27", title: "시험 끝 벗 회식", place: "", what: "시험 끝나자마자 다 같이 회식", highlight: "" },
  ],

  numbers: [
    { label: "벗(조원)", value: "14명" },
    { label: "버디", value: "약 70명" },
    { label: "개강 전 번개", value: "6차" },
    { label: "행사 참여율", value: "모든 행사 1위" },
  ],

  // 에피소드 (첫 번째부터 소개)
  episodes: [
    "MT 새벽에 다 같이 풋살함",
    "고연전 뒷풀이에서 조장 윤선욱과 세드릭이 FM을 함 (FM: 고려대 전통 자기소개, 정해진 형식으로 소속과 이름을 크게 외치고 몸짓·개인기를 곁들임)",
    "첫 만남부터 치맥",
    "보드게임카페에서 막걸리 티어 매기기, 소년가장 잠만자비가 굴욕의 패배",
    "공포 테마 방탈출에서 윤선욱이 소리를 엄청 지름",
    "이채민 생일에 조원들이 케이크를 직접 만들어 줌",
    "조원 생일(박민하, 이채민, 세드릭)마다 자정 땡 하자마자 단톡방이 축하로 도배됨. 이채민은 공부하다 뛰쳐나왔고, 세드릭 생일엔 채민이 '이제 우리 동갑'",
    "벗회의 뒷풀이 신청 인원이 우리 조가 제일 많았음",
    "운석이 세냐 핵폭탄이 세냐 논쟁에서 윤선욱이 퍼텐셜 에너지까지 설명하고 '미안 너무 이과였다'고 사과함",
    "시험기간 정경관은 모기 지옥이라 다들 공부를 못 했다고 주장함",
    "세드릭이 말없이 공부만 하는 공부 소모임이 무서워서 도망침",
    "윤선욱이 밤 10시 반 하스 잔디 치킨 파티를 열어 줌",
    "핫식스 릴스가 다른 조보다 늦게 올라와 다들 기다렸고, 올라오자 너무 잘 나왔다고 난리 남",
    "최애 컵라면 토론 (윤선욱 참깨라면+누룽지, 자비 콕콕콕 스파게티, 김윤아 육개장)",
  ],

  // 정해진 답 (비슷한 질문이면 우선 사용)
  faq: [
    { q: "상반기에 뭐 했어?", a: "개강 전 번개 6차로 벗들이 먼저 뭉치고, 개총·개파에서 버디들을 맞이했어! 9월 MT에선 새벽 풋살, 고연전에선 다 같이 응원까지. 버디랑 벗이 진짜 하나가 됐어" },
    { q: "조원 소개해 줘 (전체)", a: "벗은 14명! 조장 윤선욱, 운영진 2, 기획팀 2, 밥조 6, 미디어 3명. 궁금한 사람 이름을 말하면 포켓몬 도감처럼 알려 줄게 (한 번에 14명 나열 금지)" },
    { q: "조의 제일 큰 자랑?", a: "버디와 벗이 특히 친하고 잘 뭉친다는 것! 모든 행사 참여율 1위에, MT에선 새벽에 다 같이 풋살까지 했어" },
    { q: "조 분위기 / 특징?", a: "일드·중드·F1·축구·운동처럼 취향 겹치는 사람이 많아서, 운명이 갈라놓은 쌍둥이처럼 잘 맞아! 번개도 많고 핑크블러드가 흐르는 사람도 많아" },
    { q: "제일 재밌었던 활동 / 기억에 남는 순간?", a: "MT 새벽 풋살! 소고기도 구워 먹으면서 버디랑 벗이 하나가 됐어" },
    { q: "고연전 때 뭐 했어?", a: "야구 같은 경기에서 다 같이 일어나서 응원했고, 뒷풀이에선 윤선욱이랑 세드릭이 FM까지 했어" },
    { q: "버디 몇 명 / 누구?", a: "약 70명! 이름은 비밀이지만 벗 14명이랑 정말 친해" },
    { q: "밥조는 뭐 해?", a: "벗과 버디가 다 같이 밥 먹는 약속을 계속 열어 줘" },
    { q: "미디어는 뭐 해?", a: "핫식스 인스타 전담! 최근 릴스가 엄청 웃겨" },
    { q: "인스타 아이디?", a: "오~ 관심 있나? 발표에 집중하면 알게 될지도 ㅎㅎ (아이디는 절대 말하지 않음)" },
    { q: "조장은?", a: "윤선욱! 발표에선 Hot-6ix 연구소장 윤 박사" },
  ],

  doNotTalkAbout: [
    "연락처, 학번, 사는 곳 등 개인정보",
    "다른 조 평가·비교",
    "버디 개개인의 이름",
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
  out.push(line("조 분위기", team.vibe));
  out.push(line("활동 기간", team.semester));
  out.push(line("참고", team.meetingCount));

  const members = team.members.filter((m) => filled(m.name));
  if (members.length) {
    out.push("\n[조원]");
    for (const m of members) {
      const parts = [
        filled(m.from) ? `${m.from}년생` : "",
        m.birthday ? `생일 ${m.birthday}` : "",
        m.oneLiner,
        m.hobbies ? `취미 ${m.hobbies}` : "",
        m.loveAboutTeam ? `본인이 말한 핫식스 장점: ${m.loveAboutTeam}` : "",
        m.funFacts ?? "",
      ].filter(filled);
      out.push(`- ${m.name}(${m.role}): ${parts.join(" / ")}`);
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
    out.push("\n[에피소드 (위에서부터 소개)]");
    for (const e of episodes) out.push(`- ${e}`);
  }

  const faq = team.faq.filter((f) => filled(f.q) && filled(f.a));
  if (faq.length) {
    out.push("\n[정해진 답 — 비슷한 질문이면 우선 사용]");
    for (const f of faq) out.push(`- ${f.q} → ${f.a}`);
  }

  const banned = team.doNotTalkAbout.filter(filled);
  if (banned.length) {
    out.push("\n[대답하지 않는 주제]");
    for (const b of banned) out.push(`- ${b}`);
  }

  return out.filter((v): v is string => v !== null).join("\n");
}
