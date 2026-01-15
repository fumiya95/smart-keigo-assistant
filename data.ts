import { Question } from './types';

// Helper to shuffle options array
const shuffle = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

// Database Content
// Based strictly on the provided text.

export const KEIGO_DB: Question[] = [
  // ① 社内の上司・先輩対応
  {
    id: 101,
    category: 'internal',
    questionText: "上司（部長）に対して、仕事が終わった際の挨拶として適切なのは？",
    context: "NG例：部長、ご苦労様です",
    options: ["部長、ご苦労様です", "部長、お疲れさまです"],
    correctAnswer: "部長、お疲れさまです",
    reason: "「ご苦労様」は目上が目下に使う。上司には「お疲れ様」",
    visualCue: { direction: 'up', target: '部長（上司）' }
  },
  {
    id: 102,
    category: 'internal',
    questionText: "「お客様が来た」ことを上司に伝える正しい表現は？",
    context: "NG例：お客様がまいりました",
    options: ["お客様がまいりました", "お客様がお見えになりました"],
    correctAnswer: "お客様がお見えになりました",
    reason: "「参る」は自分の謙譲語。お客様は上げるので尊敬語「お見えになる」",
    visualCue: { direction: 'up', target: 'お客様' }
  },
  {
    id: 103,
    category: 'internal',
    questionText: "上司に資料を見てほしい時の正しい表現は？",
    context: "NG例：資料を見てください",
    options: ["資料を見てください", "資料をご覧ください"],
    correctAnswer: "資料をご覧ください",
    reason: "「見てください」は命令的。尊敬語「ご覧になる」を使う",
    visualCue: { direction: 'up', target: '上司' }
  },
  {
    id: 104,
    category: 'internal',
    questionText: "報告が遅れたことを上司に謝罪する場合、より適切なのは？",
    context: "△例：報告が遅れてすみません",
    options: ["報告が遅れてすみません", "ご報告が遅くなり申し訳ございません"],
    correctAnswer: "ご報告が遅くなり申し訳ございません",
    reason: "上司への謝罪に「すみません」は軽い。「申し訳ございません」を使う",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 105,
    category: 'internal',
    questionText: "上司に「携帯電話に連絡してほしい」と伝える丁寧な表現は？",
    context: "△例：携帯電話に連絡してください",
    options: ["携帯電話に連絡してください", "携帯電話へご連絡ください"],
    correctAnswer: "携帯電話へご連絡ください",
    reason: "「あったら」は口語。「ございましたら」で丁寧さを上げる",
    visualCue: { direction: 'up', target: '上司' }
  },
  {
    id: 106,
    category: 'internal',
    questionText: "お客様の発言を上司に伝える際、適切なのは？",
    context: "NG例：お客様がいうには",
    options: ["お客様がいうには", "お客様のお話では／とのことです"],
    correctAnswer: "お客様のお話では／とのことです",
    reason: "お客様に「言う」は失礼。クッション言葉を使う",
    visualCue: { direction: 'up', target: 'お客様' }
  },
  {
    id: 107,
    category: 'internal',
    questionText: "社外の人（中本さん）からの連絡を伝える正しい表現は？",
    context: "NG例：中本さんが今日来ると言っていました",
    options: ["中本さんが今日来ると言っていました", "中本さんからお電話があり、本日お越しになるとのことでした"],
    correctAnswer: "中本さんからお電話があり、本日お越しになるとのことでした",
    reason: "社外の人は上げる。「言っていました」は口語すぎる",
    visualCue: { direction: 'up', target: '社外の人' }
  },

  // ② 三者間対応
  {
    id: 201,
    category: 'three-party',
    questionText: "取引先（鈴木様）に、自社の上司（山本部長）を紹介する場合、正しいのは？",
    context: "CASE 1：取引先に自社の上司（部長）を紹介",
    options: [
      "鈴木さん、紹介します。うちの会社の営業部の山本部長です。",
      "鈴木様、ご紹介いたします。こちらが、弊社営業部の山本でございます。"
    ],
    correctAnswer: "鈴木様、ご紹介いたします。こちらが、弊社営業部の山本でございます。",
    reason: "お客様を立てる。自社の上司でもお客様の前では呼び捨てにし、身内として下げる",
    visualCue: { direction: 'down', target: '自社の上司' }
  },
  {
    id: 202,
    category: 'three-party',
    questionText: "自社の上司に、取引先（山田さん）を紹介する場合、正しいのは？",
    context: "CASE 2：上司に取引先（山田さん）を紹介",
    options: [
      "こちらが、株式会社りそな商事の山田さんでございます",
      "こちらが、株式会社りそな商事の山田様でいらっしゃいます"
    ],
    correctAnswer: "こちらが、株式会社りそな商事の山田様でいらっしゃいます",
    reason: "山田様はお客様なので尊敬語。「でございます」は自分側に使う言葉。「でいらっしゃいます」が正解",
    visualCue: { direction: 'up', target: '取引先（お客様）' }
  },

  // ③ お客様対応 言い換え単語帳
  {
    id: 301,
    category: 'client',
    questionText: "「うちの会社」の正しい言い換えは？",
    options: ["うちの会社", "弊社／当社"],
    correctAnswer: "弊社／当社",
    reason: "ビジネスシーンでは「弊社」または「当社」を用いる",
    visualCue: { direction: 'down', target: '自社' }
  },
  {
    id: 302,
    category: 'client',
    questionText: "「あなたは誰ですか」の正しい言い換えは？",
    options: ["失礼ですが、どちら様でしょうか。", "あなたは誰ですか"],
    correctAnswer: "失礼ですが、どちら様でしょうか。",
    reason: "相手の身元を尋ねる際は最大の配慮を。",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 303,
    category: 'client',
    questionText: "「席にいません」の正しい言い換えは？",
    options: ["席にいません", "席を外しております。"],
    correctAnswer: "席を外しております。",
    reason: "事実を伝える際も丁寧語・謙譲語を用いる",
    visualCue: { direction: 'down', target: '身内' }
  },
  {
    id: 304,
    category: 'client',
    questionText: "「すみませんが」のより丁寧な言い換えは？",
    options: ["すみませんが", "恐れ入りますが／申し訳ございませんが"],
    correctAnswer: "恐れ入りますが／申し訳ございませんが",
    reason: "クッション言葉として機能させるため",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 305,
    category: 'client',
    questionText: "「すぐにいきます」の正しい言い換えは？",
    options: ["すぐにいきます", "ただいま参ります。"],
    correctAnswer: "ただいま参ります。",
    reason: "「行く」の謙譲語は「参る」",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 306,
    category: 'client',
    questionText: "「なんのようですか」の正しい言い換えは？",
    options: ["なんのようですか", "どのようなご用件でしょうか。"],
    correctAnswer: "どのようなご用件でしょうか。",
    reason: "用件を伺う際の定型表現",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 307,
    category: 'client',
    questionText: "「明日、またきてください」の正しい言い換えは？",
    options: ["明日、またきてください", "恐れ入りますが、明日改めてお越しいただけますでしょうか。"],
    correctAnswer: "恐れ入りますが、明日改めてお越しいただけますでしょうか。",
    reason: "依頼形かつ尊敬語「お越しいただく」を使う",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 308,
    category: 'client',
    questionText: "「もう一度言ってください」の正しい言い換えは？",
    options: ["もう一度言ってください", "お手数ですが、もう一度お伺いしてもよろしいでしょうか。"],
    correctAnswer: "お手数ですが、もう一度お伺いしてもよろしいでしょうか。",
    reason: "相手に手間を取らせるため「お手数ですが」をつけ、「聞く」の謙譲語「伺う」を使う",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 309,
    category: 'client',
    questionText: "「営業部の田中さんはいますか」と聞かれた時の正しい返答は？",
    options: ["営業部の田中さんはいますか", "営業部の田中はおりますでしょうか。"],
    correctAnswer: "営業部の田中はおりますでしょうか。",
    reason: "身内（田中）を下げるため呼び捨てにし、「いる」の謙譲語「おる」を使う",
    visualCue: { direction: 'down', target: '身内' }
  },
  {
    id: 310,
    category: 'client',
    questionText: "「山田は今、会議中です」の正しい言い換えは？",
    options: ["山田は今、会議中です", "山田は現在、会議中でございます。"],
    correctAnswer: "山田は現在、会議中でございます。",
    reason: "丁寧語「ございます」で状況を説明する",
    visualCue: { direction: 'down', target: '状況' }
  },
  {
    id: 311,
    category: 'client',
    questionText: "「都合を聞きたいのですが」の正しい言い換えは？",
    options: ["都合を聞きたいのですが", "ご都合をお伺いしたいのですが。"],
    correctAnswer: "ご都合をお伺いしたいのですが。",
    reason: "「聞く」の謙譲語「伺う」を使う",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 312,
    category: 'client',
    questionText: "「わかりました。担当者に言っておきます」の正しい言い換えは？",
    options: ["わかりました。担当者に言っておきます", "承知いたしました。担当者に申し伝えます。"],
    correctAnswer: "承知いたしました。担当者に申し伝えます。",
    reason: "「わかる」→「承知する」、「言う」→「申し伝える」（謙譲語）",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 313,
    category: 'client',
    questionText: "「うちの会社の鈴木から話は聞いています」の正しい言い換えは？",
    options: ["うちの会社の鈴木から話は聞いています", "弊社の鈴木よりお話は伺っております。"],
    correctAnswer: "弊社の鈴木よりお話は伺っております。",
    reason: "「聞いている」の謙譲語「伺っております」",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 314,
    category: 'client',
    questionText: "「担当者が来ますので、ちょっと待ってください」の正しい言い換えは？",
    options: ["担当者が来ますので、ちょっと待ってください", "担当者がまいりますので、少々お待ちいただけますでしょうか。"],
    correctAnswer: "担当者がまいりますので、少々お待ちいただけますでしょうか。",
    reason: "「来る」の謙譲語「まいる」、「待って」の尊敬語依頼「お待ちいただけますでしょうか」",
    visualCue: { direction: 'down', target: '身内' }
  },

  // ④ 呼称・立場マスター
  {
    id: 401,
    category: 'terms',
    questionText: "自分からお客様に対して、自分のことを何と呼ぶ？",
    options: ["私（わたし）", "私（わたくし）"],
    correctAnswer: "私（わたくし）",
    reason: "ビジネスシーンでは「わたくし」が正式",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 402,
    category: 'terms',
    questionText: "自分からお客様に対して、自社のことを何と呼ぶ？",
    options: ["うちの会社", "弊社（へいしゃ）or 当社"],
    correctAnswer: "弊社（へいしゃ）or 当社",
    reason: "「弊社」はへりくだる表現。「当社」は丁寧な表現",
    visualCue: { direction: 'down', target: '自社' }
  },
  {
    id: 403,
    category: 'terms',
    questionText: "自社内で、自社のことを何と呼ぶ？",
    options: ["弊社", "当社／うち"],
    correctAnswer: "当社／うち",
    reason: "社内ではへりくだる必要がないため",
    visualCue: { direction: 'flat', target: '自社' }
  },
  {
    id: 404,
    category: 'terms',
    questionText: "会話の中で、相手の会社を何と呼ぶ？",
    options: ["貴社（きしゃ）", "御社（おんしゃ）"],
    correctAnswer: "御社（おんしゃ）",
    reason: "話し言葉（会話）では「御社」",
    visualCue: { direction: 'up', target: '相手の会社' }
  },
  {
    id: 405,
    category: 'terms',
    questionText: "メールや文書の中で、相手の会社を何と呼ぶ？",
    options: ["貴社（きしゃ）", "御社（おんしゃ）"],
    correctAnswer: "貴社（きしゃ）",
    reason: "書き言葉（文章）では「貴社」",
    visualCue: { direction: 'up', target: '相手の会社' }
  },

  // ⑤ 敬語変換マトリクス（基本動詞）
  {
    id: 501,
    category: 'verbs',
    questionText: "「行く」の尊敬語（相手が↑）は？",
    options: ["参る", "いらっしゃる／おいでになる"],
    correctAnswer: "いらっしゃる／おいでになる",
    reason: "相手が行く場合は尊敬語。",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 502,
    category: 'verbs',
    questionText: "「行く」の謙譲語（自分が↓）は？",
    options: ["参る／伺う", "いらっしゃる"],
    correctAnswer: "参る／伺う",
    reason: "自分が行く場合は謙譲語。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 503,
    category: 'verbs',
    questionText: "「来る」の尊敬語（相手が↑）は？",
    options: ["お越しになる／お見えになる", "参る"],
    correctAnswer: "お越しになる／お見えになる",
    reason: "相手が来る場合は尊敬語。",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 504,
    category: 'verbs',
    questionText: "「言う」の尊敬語（相手が↑）は？",
    options: ["申し上げる", "おっしゃる"],
    correctAnswer: "おっしゃる",
    reason: "相手が言う場合は尊敬語。",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 505,
    category: 'verbs',
    questionText: "「言う」の謙譲語（自分が↓）は？",
    options: ["おっしゃる", "申す／申し上げる"],
    correctAnswer: "申す／申し上げる",
    reason: "自分が言う場合は謙譲語。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 506,
    category: 'verbs',
    questionText: "「聞く」の謙譲語（自分が↓）は？",
    options: ["お聞きになる", "伺う／承る"],
    correctAnswer: "伺う／承る",
    reason: "自分が聞く（引き受ける）場合は謙譲語。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 507,
    category: 'verbs',
    questionText: "「見る」の尊敬語（相手が↑）は？",
    options: ["拝見する", "ご覧になる"],
    correctAnswer: "ご覧になる",
    reason: "相手が見る場合は尊敬語。",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 508,
    category: 'verbs',
    questionText: "「見る」の謙譲語（自分が↓）は？",
    options: ["拝見する", "ご覧になる"],
    correctAnswer: "拝見する",
    reason: "自分が見る場合は謙譲語。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 509,
    category: 'verbs',
    questionText: "「食べる」の尊敬語（相手が↑）は？",
    options: ["いただく", "召し上がる"],
    correctAnswer: "召し上がる",
    reason: "相手が食べる場合は尊敬語。",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 510,
    category: 'verbs',
    questionText: "「食べる」の謙譲語（自分が↓）は？",
    options: ["いただく", "召し上がる"],
    correctAnswer: "いただく",
    reason: "自分が食べる場合は謙譲語。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 511,
    category: 'verbs',
    questionText: "「知っている」の尊敬語（相手が↑）は？",
    options: ["ご存じだ", "存じている"],
    correctAnswer: "ご存じだ",
    reason: "相手が知っている場合は尊敬語。",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 512,
    category: 'verbs',
    questionText: "「知っている」の謙譲語（自分が↓）は？",
    options: ["ご存じだ", "存じている"],
    correctAnswer: "存じている",
    reason: "自分が知っている場合は謙譲語。",
    visualCue: { direction: 'down', target: '自分' }
  }
];

export const getRandomQuestions = (count: number): Question[] => {
  return shuffle([...KEIGO_DB]).slice(0, count);
};
