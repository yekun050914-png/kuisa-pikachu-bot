# KUISA 우리 조 피카츄 챗봇

전체회의 발표 첫 화면에 띄워서, 듣는 사람들이 우리 조 상반기 활동을 물어보면 피카츄 말투로 답하는 챗봇입니다.

## 고칠 파일은 딱 두 개

| 파일 | 무엇을 바꾸나 |
| --- | --- |
| `src/knowledge/team.ts` | **우리 조 자료(메모리)**. 조원, 활동, 숫자, 에피소드, 예상 질문과 답, 추천 질문 버튼 |
| `src/prompts/character.ts` | 피카츄 말투와 답변 규칙 (보통은 안 건드려도 됨) |

`team.ts`에서 빈 칸("")으로 둔 항목은 챗봇에게 전달되지 않습니다. 챗봇은 여기 적힌 것만 사실로 알고, 없는 건 "발표에서 직접 들어 봐, 피카!"로 넘깁니다.

캐릭터 사진은 `public/character.png`에 넣으면 됩니다. 없으면 ⚡ 아이콘이 대신 나옵니다.

## 실행

```bash
npm install
cp .env.example .env.local   # 그다음 .env.local에 OPENAI_API_KEY 입력
npm run dev                  # http://localhost:3000
```

## 배포 (Vercel)

1. GitHub에 새 레포를 만들고 이 폴더를 push
2. Vercel에서 그 레포를 Import
3. Environment Variables에 `OPENAI_API_KEY`(필수), `OPENAI_MODEL`(선택, 기본 gpt-5.4-mini) 입력
4. 공유는 **프로덕션 URL**(`프로젝트명.vercel.app`)로. 브랜치별 URL은 로그인 화면이 뜹니다.

자료를 고친 뒤에는 다시 push하면 자동으로 재배포됩니다.

## 비용

- 기본 모델 gpt-5.4-mini 기준 질문 1개에 약 5원 안팎 → 1,000원이면 약 150~200개 질문
- 답변 길이(400토큰), 질문 길이(300자), 보내는 대화 수(최근 6개)를 코드에서 제한해 둠
- 충전된 크레딧을 다 쓰면 API가 멈추고 화면에 "사용 한도" 안내가 나옵니다
