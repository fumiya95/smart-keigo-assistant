import { Question, QuestionCategory } from './types';

// Helper to shuffle options array
const shuffle = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

// Database Content
// 問題文の頭に【場面】タグを追加し、状況を瞬時に理解できるように改善。

export const KEIGO_DB: Question[] = [
  // ① 社内の上司・先輩対応 (Category: internal)
  {
    id: 101,
    category: 'internal',
    questionText: "【社内・退社時】まだ残業している上司（部長）に声をかけて先に帰る際、適切な挨拶は？",
    context: "目上の人に対して「苦労」をねぎらう言葉を使うのは適切でしょうか。",
    options: ["部長、ご苦労様でした", "部長、お先に失礼いたします"],
    correctAnswer: "部長、お先に失礼いたします",
    reason: "「ご苦労様」は目上が目下に使う言葉。本来は「お疲れ様」だが、先に帰る場合は「お先に失礼します」がマナー。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 102,
    category: 'internal',
    questionText: "【社内】受付にお客様が到着されました。社内にいる担当の上司に取り次ぐ際、どう伝えますか？",
    context: "「参る」は謙譲語（自分の動作）です。お客様の動作に使うとどうなるでしょう？",
    options: ["お客様が参られました", "お客様がお見えになりました"],
    correctAnswer: "お客様がお見えになりました",
    reason: "「参る」は謙譲語なのでお客様には使わない。「参られる」も誤用。「お見えになる」や「お越しになる」が正解。",
    visualCue: { direction: 'up', target: 'お客様' }
  },
  {
    id: 103,
    category: 'internal',
    questionText: "【社内】上司に書類の内容を確認してほしい時、手渡しながら何と言いますか？",
    context: "「拝見する」は謙譲語（自分が見る）です。上司に見てもらいたい場合は尊敬語を使います。",
    options: ["こちらの資料を拝見してください", "こちらの資料をご覧ください"],
    correctAnswer: "こちらの資料をご覧ください",
    reason: "「拝見する」は自分が見ること。「ご覧になる」が尊敬語。",
    visualCue: { direction: 'up', target: '上司' }
  },
  {
    id: 104,
    category: 'internal',
    questionText: "【社内】報告が遅れてしまい、上司に謝罪する場合。より誠意が伝わるのは？",
    context: "「すみません」は口語的で軽い印象を与えます。",
    options: ["ご報告が遅れてすみませんでした", "ご報告が遅くなり申し訳ございません"],
    correctAnswer: "ご報告が遅くなり申し訳ございません",
    reason: "ビジネスでの謝罪は「申し訳ございません」が基本。「すみません」は避ける。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 105,
    category: 'internal',
    questionText: "【電話・社内】外出中の上司の携帯に電話をかけ、「後で折り返してほしい」と伝言を残す場合。",
    context: "「してください」は丁寧語ですが、命令のニュアンスが含まれます。より依頼の形にしましょう。",
    options: ["後ほど携帯電話にご連絡ください", "後ほど携帯電話へご連絡いただけますか"],
    correctAnswer: "後ほど携帯電話へご連絡いただけますか",
    reason: "「〜ください」は指示・命令に聞こえる場合がある。「〜いただけますか」と依頼形で尋ねるのがベター。",
    visualCue: { direction: 'up', target: '上司' }
  },
  {
    id: 106,
    category: 'internal',
    questionText: "【社内】お客様（田中様）の発言内容を、社内の上司に報告する際の表現は？",
    context: "「申す」は謙譲語です。お客様の言動に対しては尊敬語を使います。",
    options: ["田中様がそのように申しておりました", "田中様がそのようにおっしゃっていました"],
    correctAnswer: "田中様がそのようにおっしゃっていました",
    reason: "「申す」は自分や身内の発言に使う謙譲語。お客様の発言は「おっしゃる」。",
    visualCue: { direction: 'up', target: 'お客様' }
  },
  {
    id: 107,
    category: 'internal',
    questionText: "【社内】社外の人（中本様）からの電話を上司に取り次ぐ際、相手が「これから行く」と言っていたことを伝えるには？",
    context: "社外の人の動作なので尊敬語を使います。「来る」の尊敬語を選びましょう。",
    options: ["中本様が本日参られるそうです", "中本様が本日お越しになるそうです"],
    correctAnswer: "中本様が本日お越しになるそうです",
    reason: "「参る」はお客様には使わない。「お越しになる」「お見えになる」を使う。",
    visualCue: { direction: 'up', target: '社外の人' }
  },

  // ② 三者間対応 (Category: three-party)
  {
    id: 201,
    category: 'three-party',
    questionText: "【応接室】取引先の鈴木様に対して、自社の上司である「山本部長」を紹介する場合、正しいのは？",
    context: "社外の人に対しては、自社の上司であっても「身内」として扱い、敬称を外します。",
    options: [
      "弊社の山本部長をご紹介いたします",
      "弊社営業部長の山本をご紹介いたします"
    ],
    correctAnswer: "弊社営業部長の山本をご紹介いたします",
    reason: "社外の人に対して自社の人間を呼ぶ際、役職名（部長など）は名前の後ろにつけず、「部長の山本」とするか呼び捨てにする。",
    visualCue: { direction: 'down', target: '自社の上司' }
  },

  {
    id: 202,
    category: 'three-party',
    questionText: "【社内】自社の上司に、来社した取引先の山田さんを紹介する場合。",
    context: "上司に対してであっても、お客様は「最上位」の存在です。",
    options: [
      "こちらがりそな商事の山田様でございます",
      "こちらがりそな商事の山田様でいらっしゃいます"
    ],
    correctAnswer: "こちらがりそな商事の山田様でいらっしゃいます",
    reason: "「ございます」は丁寧語だが、紹介の場面では「〜だ」の意。お客様には尊敬語の「いらっしゃる」を使う。",
    visualCue: { direction: 'up', target: '取引先（お客様）' }
  },

  // ③ お客様対応 (Category: client)
  {
    id: 301,
    category: 'client',
    questionText: "【商談】お客様に対して、自分の会社のことを話す際の一人称は？",
    context: "「当社」は丁寧ですが、対等な関係のニュアンスがあります。相手を立てる場合は？",
    options: ["当社といたしましては", "弊社といたしましては"],
    correctAnswer: "弊社といたしましては",
    reason: "相手を立ててへりくだる場合は「弊社（へいしゃ）」を使う。「当社」は社内や対等な場面で使う。",
    visualCue: { direction: 'down', target: '自社' }
  },
  {
    id: 302,
    category: 'client',
    questionText: "【受付】来客の名前が聞き取れませんでした。失礼のないように尋ねるには？",
    context: "直球で名前を聞くのは失礼です。「クッション言葉」を挟みましょう。",
    options: ["お名前を頂戴できますか？", "失礼ですが、どちら様でしょうか？"],
    correctAnswer: "失礼ですが、どちら様でしょうか？",
    reason: "「お名前を頂戴する」は過剰敬語（名前はもらえない）。「失礼ですが、どちら様でしょうか」が定型。",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 303,
    category: 'client',
    questionText: "【電話】指名された担当者が不在でした。お客様にその旨を伝える場合。",
    context: "「いない」を丁寧にしつつ、事実を伝えます。",
    options: ["あいにく席を外しております", "あいにく席におりません"],
    correctAnswer: "あいにく席を外しております",
    reason: "「席を外す」という慣用句を使うのがビジネスの基本。「おりません」だけだと、外出か休みか曖昧。",
    visualCue: { direction: 'down', target: '身内' }
  },
  {
    id: 304,
    category: 'client',
    questionText: "【商談・電話】お客様に何かを依頼する際、冒頭につける「クッション言葉」として最適なのは？",
    context: "相手に手間をかけさせることを詫びる言葉を選びます。",
    options: ["ご苦労をおかけしますが", "お手数をおかけしますが"],
    correctAnswer: "お手数をおかけしますが",
    reason: "「ご苦労」は目下に使う言葉。「お手数」が適切。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 305,
    category: 'client',
    questionText: "【電話】お客様の会社まで「行く」と伝える際の謙譲表現は？",
    context: "「行く」の謙譲語を選びます。",
    options: ["そちらへ参上いたします", "そちらへ伺います／参ります"],
    correctAnswer: "そちらへ伺います／参ります",
    reason: "「参上する」は時代がかった表現で、通常のビジネスでは「伺う」や「参る」を使う。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 306,
    category: 'client',
    questionText: "【受付】お客様に「何の用ですか？」と尋ねるのは失礼です。正しい表現は？",
    context: "用件を丁寧に聞く表現を選びます。",
    options: ["どのようなご用件でしょうか", "どういったご用向きでしょうか"],
    correctAnswer: "どのようなご用件でしょうか",
    reason: "「ご用向き」も間違いではないが、現代の口語では「ご用件」が一般的で自然。",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 307,
    category: 'client',
    questionText: "【電話】アポイントの日程を変更してもらい、再度来てもらうよう依頼する場合。",
    context: "「来てほしい」を最大限丁寧に依頼します。",
    options: ["改めてお越しいただけますでしょうか", "改めて参っていただけますでしょうか"],
    correctAnswer: "改めてお越しいただけますでしょうか",
    reason: "「参る」は謙譲語なので相手の動作には使わない。「お越しいただく」が正解。",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 308,
    category: 'client',
    questionText: "【電話】相手の声が遠くて聞こえにくい時、もう一度言ってもらうには？",
    context: "相手のせいにするのではなく、「自分の聞き取り」の問題として伝えます。",
    options: ["お電話が遠いようなのですが", "お声が小さいようなのですが"],
    correctAnswer: "お電話が遠いようなのですが",
    reason: "「声が小さい」と指摘するのは失礼。「電話が遠い」という慣用句を使う。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 309,
    category: 'client',
    questionText: "【電話】お客様に「田中さんはいますか？」と聞かれ、田中がいる場合の返答。",
    context: "身内（田中）のことを聞かれています。「いる」の謙譲語を使います。",
    options: ["はい、田中はいらっしゃいます", "はい、田中はただいまおります"],
    correctAnswer: "はい、田中はただいまおります",
    reason: "身内に「いらっしゃる（尊敬語）」は使わない。「おる（謙譲語）」を使う。",
    visualCue: { direction: 'down', target: '身内' }
  },
  {
    id: 310,
    category: 'client',
    questionText: "【電話】お客様に「佐藤課長は会議中です」と伝える場合。",
    context: "身内の役職者への敬称は外します。状態説明は丁寧語で。",
    options: ["佐藤課長は会議中でございます", "課長の佐藤は会議中でございます"],
    correctAnswer: "課長の佐藤は会議中でございます",
    reason: "社外の人に対して「佐藤課長」と呼ぶのはNG。「課長の佐藤」または「佐藤」と呼ぶ。",
    visualCue: { direction: 'down', target: '状況' }
  },
  {
    id: 311,
    category: 'client',
    questionText: "【電話】日程調整のため、相手の都合が良い日時を聞きたい時。",
    context: "「聞く」の謙譲語を使います。",
    options: ["ご都合をお聞きしたいのですが", "ご都合をお伺いしたいのですが"],
    correctAnswer: "ご都合をお伺いしたいのですが",
    reason: "「お聞きする」よりも「お伺いする」の方が、よりへりくだった丁寧な印象を与える。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 312,
    category: 'client',
    questionText: "【電話】お客様からの依頼を了承し、「担当者に伝える」と言う場合。",
    context: "「言う」の謙譲語を使います。",
    options: ["担当者に申しておきます", "担当者に申し伝えます"],
    correctAnswer: "担当者に申し伝えます",
    reason: "伝言を取り次ぐ場合は「申し伝える」が定型表現。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 313,
    category: 'client',
    questionText: "【商談】「弊社の鈴木から、話は聞いています」とお客様に伝える場合。",
    context: "身内から聞いた話であっても、お客様に関する内容を聞いた（拝聴した）というニュアンスを含めます。",
    options: ["鈴木から伺っております", "鈴木からお聞きしています"],
    correctAnswer: "鈴木から伺っております",
    reason: "「聞く」の謙譲語「伺う」を使うことで、話題の主であるお客様への敬意を示す。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 314,
    category: 'client',
    questionText: "【応接室】担当者が来るまで少し待っていてほしいと伝える場合。",
    context: "「待ってくれ」は命令形です。丁寧な依頼形にします。",
    options: ["少々お待ち願えますか", "少々お待ちいただけますでしょうか"],
    correctAnswer: "少々お待ちいただけますでしょうか",
    reason: "「お待ち願えますか」よりも「お待ちいただけますでしょうか」の方がより丁寧で柔らかい。",
    visualCue: { direction: 'down', target: '身内' }
  },

  // ④ 呼称・立場マスター (Category: terms)
  {
    id: 401,
    category: 'terms',
    questionText: "【用語】ビジネスの場での一人称。「わたし」よりもフォーマルな言い方は？",
    context: "男女問わず使える、最も改まった一人称です。",
    options: ["わたくし", "自分"],
    correctAnswer: "わたくし",
    reason: "「自分」は少し体育会系・カジュアルな印象。「わたくし」がビジネス標準。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 404,
    category: 'terms',
    questionText: "【用語】面接や商談など、「話し言葉」で相手の会社を呼ぶときは？",
    context: "書き言葉（メール）と話し言葉（会話）で使い分けます。",
    options: ["御社（おんしゃ）", "貴社（きしゃ）"],
    correctAnswer: "御社（おんしゃ）",
    reason: "会話では「御社」。メールや履歴書などの文書では「貴社」を使う。",
    visualCue: { direction: 'up', target: '相手の会社' }
  },

  // ⑤ 敬語変換マトリクス（基本動詞） (Category: verbs)
  {
    id: 501,
    category: 'verbs',
    questionText: "【敬語変換】お客様が「行く」ことを尊敬語で表現すると？",
    context: "相手を高める表現です。「参る」は自分がへりくだる言葉です。",
    options: ["参られる", "いらっしゃる"],
    correctAnswer: "いらっしゃる",
    reason: "「参る」は謙譲語。「参られる」という言葉は誤用。「いらっしゃる」や「おいでになる」が正解。",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 502,
    category: 'verbs',
    questionText: "【敬語変換】自分が「行く」ことを謙譲語で表現すると？",
    context: "自分を低める表現です。「いらっしゃる」は相手に使います。",
    options: ["伺う／参る", "行かれる"],
    correctAnswer: "伺う／参る",
    reason: "「行かれる」は尊敬語（れる・られる）。自分の動作には「参る」や「伺う」を使う。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 503,
    category: 'verbs',
    questionText: "【敬語変換】お客様が「来る」ことを尊敬語で表現すると？",
    context: "「来る」の尊敬語は複数あります。",
    options: ["お見えになられる", "お見えになる"],
    correctAnswer: "お見えになる",
    reason: "「お見えになられる」は二重敬語（お〜なる＋れる）。「お見えになる」だけで尊敬語として成立している。",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 504,
    category: 'verbs',
    questionText: "【敬語変換】お客様が「言う」ことを尊敬語で表現すると？",
    context: "「申す」は謙譲語です。",
    options: ["おっしゃられる", "おっしゃる"],
    correctAnswer: "おっしゃる",
    reason: "「おっしゃられる」は二重敬語（おっしゃる＋れる）。「おっしゃる」が正解。",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 505,
    category: 'verbs',
    questionText: "【敬語変換】自分が「言う」ことを謙譲語で表現すると？",
    context: "相手に対して自分が発言する場合です。",
    options: ["申される", "申す／申し上げる"],
    correctAnswer: "申す／申し上げる",
    reason: "「申される」は尊敬語の形だが動詞が謙譲語で不自然。素直に「申す」を使う。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 506,
    category: 'verbs',
    questionText: "【敬語変換】自分が相手の話を「聞く」ことを謙譲語で表現すると？",
    context: "「お聞きする」よりも改まった表現があります。",
    options: ["拝聴いたす", "承る／伺う"],
    correctAnswer: "承る／伺う",
    reason: "「拝聴いたす」も間違いではないが、通常会話では「承る（うけたまわる）」や「伺う」が一般的。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 507,
    category: 'verbs',
    questionText: "【敬語変換】お客様が資料を「見る」ことを尊敬語で表現すると？",
    context: "「拝見」は自分が見ることです。",
    options: ["ご覧になられる", "ご覧になる"],
    correctAnswer: "ご覧になる",
    reason: "「ご覧になられる」は二重敬語。「ご覧になる」で十分敬意を表せる。",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 508,
    category: 'verbs',
    questionText: "【敬語変換】自分が資料を「見る」ことを謙譲語で表現すると？",
    context: "「ご覧になる」は相手が見ることです。",
    options: ["拝見する", "見させていただく"],
    correctAnswer: "拝見する",
    reason: "「拝見する」という専用の謙譲語があるため、「見させていただく」よりもスマート。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 509,
    category: 'verbs',
    questionText: "【敬語変換】お客様が食事を「食べる」ことを尊敬語で表現すると？",
    context: "「いただく」は自分が食べる時の言葉です。",
    options: ["召し上がる", "いただかれる"],
    correctAnswer: "召し上がる",
    reason: "「いただく」は謙譲語。「召し上がる」が尊敬語。",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 510,
    category: 'verbs',
    questionText: "【敬語変換】自分が食事を「食べる」ことを謙譲語で表現すると？",
    context: "食事の挨拶としても使われる言葉です。",
    options: ["いただく", "頂戴する"],
    correctAnswer: "いただく",
    reason: "「頂戴する」は「もらう」の謙譲語。「食べる」の謙譲語は「いただく」。",
    visualCue: { direction: 'down', target: '自分' }
  },
  {
    id: 511,
    category: 'verbs',
    questionText: "【敬語変換】お客様が事情を「知っている」ことを尊敬語で表現すると？",
    context: "「存じる」は自分が知っている場合に使います。",
    options: ["ご存じだ", "存じていらっしゃる"],
    correctAnswer: "ご存じだ",
    reason: "「存じる」は謙譲語なので、相手には使わない。「ご存じ」を使う。",
    visualCue: { direction: 'up', target: '相手' }
  },
  {
    id: 512,
    category: 'verbs',
    questionText: "【敬語変換】自分が事情を「知っている」ことを謙譲語で表現すると？",
    context: "「存じ上げる」などとも言います。",
    options: ["存じている", "知り置いている"],
    correctAnswer: "存じている",
    reason: "「知り置く」はやや尊大な印象。「存じている」または「存じ上げております」が適切。",
    visualCue: { direction: 'down', target: '自分' }
  }
];

// Updated to accept filtering categories
export const getRandomQuestions = (count: number, categories?: QuestionCategory[]): Question[] => {
  let pool = [...KEIGO_DB];
  if (categories && categories.length > 0) {
    pool = pool.filter(q => categories.includes(q.category));
  }
  return shuffle(pool).slice(0, count);
};