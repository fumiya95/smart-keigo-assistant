import React, { useState, useEffect } from 'react';
import { Book, Brain, GraduationCap, ChevronRight, RefreshCcw, CheckCircle, XCircle, ArrowUp, ArrowDown, Minus, ArrowRight, Lightbulb } from 'lucide-react';
import { KEIGO_DB, getRandomQuestions } from './data';
import { AppMode, Question, TestResult } from './types';

// --- Sub-Components ---

const Header = ({ onGoHome }: { onGoHome: () => void }) => (
  <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
    <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={onGoHome}>
        <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center text-white font-bold text-xl">敬</div>
        <h1 className="font-bold text-slate-800 text-lg">ビジネス敬語 <span className="text-pink-500">やさしい教室</span></h1>
      </div>
      <button onClick={onGoHome} className="text-sm text-slate-500 hover:text-pink-500">メニューへ戻る</button>
    </div>
  </header>
);

const VisualArrow = ({ direction, target }: { direction: 'up' | 'down' | 'flat', target: string }) => {
  let color = "text-slate-400";
  let Icon = Minus;
  let label = "対等";

  if (direction === 'up') {
    color = "text-orange-500";
    Icon = ArrowUp;
    label = "相手を上げる（尊敬）";
  } else if (direction === 'down') {
    color = "text-blue-500";
    Icon = ArrowDown;
    label = "自分を下げる（謙譲）";
  }

  return (
    <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-lg border border-slate-100 inline-block">
      <div className={`p-1 rounded-full bg-white shadow-sm ${color}`}>
        <Icon size={20} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-slate-500">{label}</span>
        <span className="text-sm font-semibold text-slate-800">{target}</span>
      </div>
    </div>
  );
};

// --- Screen Components ---

const MenuScreen = ({ onSelectMode }: { onSelectMode: (mode: AppMode) => void }) => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">ようこそ、敬語の教室へ。</h2>
        <p className="text-slate-600 leading-relaxed">
          美しい日本語は、あなたの信頼を深めます。<br/>
          焦らず、少しずつ、一緒に身につけていきましょう。<br/>
          私が全力でサポートしますから、安心してくださいね。
        </p>
      </div>

      <div className="grid gap-6">
        <button 
          onClick={() => onSelectMode('learn')}
          className="group relative bg-white p-6 rounded-xl border-2 border-slate-100 shadow-sm hover:border-pink-400 hover:shadow-md transition-all text-left"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                <Book size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">【基礎学習】</h3>
                <p className="text-sm text-slate-500 mt-1">敬語のルールや変換表を、ゆっくり確認しましょう。</p>
              </div>
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-pink-400 transition-colors" />
          </div>
        </button>

        <button 
          onClick={() => onSelectMode('drill')}
          className="group relative bg-white p-6 rounded-xl border-2 border-slate-100 shadow-sm hover:border-pink-400 hover:shadow-md transition-all text-left"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <Brain size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">【特訓ドリル】</h3>
                <p className="text-sm text-slate-500 mt-1">ランダムに出題します。間違えても大丈夫ですよ。</p>
              </div>
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-pink-400 transition-colors" />
          </div>
        </button>

        <button 
          onClick={() => onSelectMode('test')}
          className="group relative bg-white p-6 rounded-xl border-2 border-slate-100 shadow-sm hover:border-pink-400 hover:shadow-md transition-all text-left"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">【実力判定テスト】</h3>
                <p className="text-sm text-slate-500 mt-1">10問チャレンジ。自信がついたら挑戦してみてください。</p>
              </div>
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-pink-400 transition-colors" />
          </div>
        </button>
      </div>
    </div>
  );
};

const LearnScreen = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 fade-in space-y-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">基礎学習データベース</h2>
        <p className="text-slate-500 mt-2">困ったときは、いつでもここに戻ってきてくださいね。</p>
      </div>

      {/* 1. Matrix */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-pink-600 border-b border-pink-100 pb-2 mb-4">① 敬語変換マトリクス</h3>
        <p className="text-sm text-slate-600 mb-4 bg-pink-50 p-3 rounded">
            <strong>基本のキ：</strong>「丁寧語」は基本の「です・ます」。「尊敬語」は相手を高める。「謙譲語」は自分を低めて相手を立てる。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-bold">
              <tr>
                <th className="p-3 border-b border-slate-200 whitespace-nowrap">普通</th>
                <th className="p-3 border-b border-slate-200 whitespace-nowrap">丁寧</th>
                <th className="p-3 text-orange-600 border-b border-slate-200 min-w-[140px]">尊敬語 (相手↑)</th>
                <th className="p-3 text-blue-600 border-b border-slate-200 min-w-[140px]">謙譲語 (自分↓)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50"><td className="p-3">行く</td><td className="p-3">行きます</td><td className="p-3 font-bold text-slate-800">いらっしゃる<br/>おいでになる</td><td className="p-3 font-bold text-slate-800">伺う／参る</td></tr>
              <tr className="hover:bg-slate-50"><td className="p-3">来る</td><td className="p-3">来ます</td><td className="p-3 font-bold text-slate-800">お見えになる<br/>お越しになる</td><td className="p-3 font-bold text-slate-800">伺う／参る</td></tr>
              <tr className="hover:bg-slate-50"><td className="p-3">言う</td><td className="p-3">言います</td><td className="p-3 font-bold text-slate-800">おっしゃる</td><td className="p-3 font-bold text-slate-800">申す／申し上げる</td></tr>
              <tr className="hover:bg-slate-50"><td className="p-3">聞く</td><td className="p-3">聞きます</td><td className="p-3 font-bold text-slate-800">お聞きになる</td><td className="p-3 font-bold text-slate-800">伺う／承る</td></tr>
              <tr className="hover:bg-slate-50"><td className="p-3">見る</td><td className="p-3">見ます</td><td className="p-3 font-bold text-slate-800">ご覧になる</td><td className="p-3 font-bold text-slate-800">拝見する</td></tr>
              <tr className="hover:bg-slate-50"><td className="p-3">食べる</td><td className="p-3">食べます</td><td className="p-3 font-bold text-slate-800">召し上がる</td><td className="p-3 font-bold text-slate-800">いただく</td></tr>
              <tr className="hover:bg-slate-50"><td className="p-3">会う</td><td className="p-3">会います</td><td className="p-3 font-bold text-slate-800">お会いになる</td><td className="p-3 font-bold text-slate-800">お目にかかる</td></tr>
              <tr className="hover:bg-slate-50"><td className="p-3">知る</td><td className="p-3">知っています</td><td className="p-3 font-bold text-slate-800">ご存じだ</td><td className="p-3 font-bold text-slate-800">存じている</td></tr>
              <tr className="hover:bg-slate-50"><td className="p-3">もらう</td><td className="p-3">もらいます</td><td className="p-3 font-bold text-slate-800">お受けになる</td><td className="p-3 font-bold text-slate-800">いただく</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Terms */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-pink-600 border-b border-pink-100 pb-2 mb-4">② 呼称・立場マスター</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100"><span className="text-slate-500 text-sm">自分 → お客様</span><span className="font-bold text-slate-900">私（わたくし）</span></li>
          <li className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100"><span className="text-slate-500 text-sm">自社 → お客様</span><span className="font-bold text-slate-900">弊社（へいしゃ）or 当社</span></li>
          <li className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100"><span className="text-slate-500 text-sm">自社 → 社内</span><span className="font-bold text-slate-900">当社／うち</span></li>
          <li className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100"><span className="text-slate-500 text-sm">相手の会社（会話）</span><span className="font-bold text-slate-900">御社（おんしゃ）</span></li>
          <li className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100"><span className="text-slate-500 text-sm">相手の会社（文章）</span><span className="font-bold text-slate-900">貴社（きしゃ）</span></li>
        </ul>
      </section>

      {/* 3. Three-party Rules */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-pink-600 border-b border-pink-100 pb-2 mb-4">③ 三者間対応の鉄則</h3>
        <div className="bg-yellow-50 p-4 rounded border border-yellow-200 mb-6">
          <p className="font-bold text-yellow-900 text-center">【最重要】お客様が最上位（↑）。自分と自社の人間は下げる（↓）。</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
            <p className="text-sm font-bold text-indigo-900 mb-3 bg-indigo-50 inline-block px-2 py-1 rounded">CASE 1：取引先に自社の上司（部長）を紹介</p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 opacity-60">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-slate-600 text-sm line-through">「鈴木さん、紹介します。うちの会社の営業部の山本部長です。」</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-slate-900 font-bold">「鈴木様、ご紹介いたします。こちらが、弊社営業部の山本でございます。」</p>
                  <p className="text-xs text-slate-500 mt-2">
                    <span className="font-bold bg-slate-200 px-1 rounded mr-1">POINT</span>
                    お客様を立てるため、自社の上司でも呼び捨てにし、身内として下げる。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-lg border border-slate-100">
            <p className="text-sm font-bold text-indigo-900 mb-3 bg-indigo-50 inline-block px-2 py-1 rounded">CASE 2：上司に取引先（山田さん）を紹介</p>
             <div className="space-y-3">
              <div className="flex items-start space-x-3 opacity-60">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-slate-600 text-sm line-through">「こちらが、株式会社りそな商事の山田さんでございます」</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-slate-900 font-bold">「こちらが、株式会社りそな商事の山田様でいらっしゃいます。」</p>
                  <p className="text-xs text-slate-500 mt-2">
                    <span className="font-bold bg-slate-200 px-1 rounded mr-1">POINT</span>
                     「でございます」は自分側に使う言葉。お客様には尊敬語「でいらっしゃいます」を使う。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Phrases (Enriched Content) */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-pink-600 border-b border-pink-100 pb-2 mb-4">④ 現場で使える言い換え単語帳</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Internal */}
          <div>
            <h4 className="font-bold text-slate-800 mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-sm">社内</span>
              対 上司・先輩（NG → OK）
            </h4>
            <div className="space-y-2">
              {[
                { ng: "ご苦労様です", ok: "お疲れさまです", note: "目上へのねぎらい" },
                { ng: "了解です", ok: "承知いたしました", note: "理解の表明" },
                { ng: "すいません", ok: "申し訳ございません", note: "謝罪" },
                { ng: "資料を見てください", ok: "資料をご覧ください", note: "依頼" },
                { ng: "◯◯さんが言っていました", ok: "◯◯さんがおっしゃっていました", note: "上司の言動" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100 text-sm">
                   <div className="flex flex-col">
                     <span className="text-red-400 line-through text-xs mb-1">{item.ng}</span>
                     <span className="text-green-700 font-bold">{item.ok}</span>
                   </div>
                   <span className="text-[10px] text-slate-400 bg-white px-2 py-1 rounded border border-slate-100">{item.note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer */}
          <div>
             <h4 className="font-bold text-slate-800 mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-2 text-sm">社外</span>
              対 お客様（クッション言葉）
            </h4>
            <div className="grid gap-3">
              {[
                { q: "あなたは誰ですか", a: "失礼ですが、どちら様でしょうか。" },
                { q: "席にいません", a: "ただいま席を外しております。" },
                { q: "なんのようですか", a: "どのようなご用件でしょうか。" },
                { q: "明日また来てください", a: "恐れ入りますが、明日改めてお越しいただけますでしょうか。" },
                { q: "もう一度言ってください", a: "お手数ですが、もう一度お伺いしてもよろしいでしょうか。" },
                { q: "都合を聞きたいのですが", a: "ご都合をお伺いしたいのですが。" },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded border border-slate-100">
                  <div className="flex items-center text-xs text-slate-500 mb-1">
                    <Minus size={12} className="mr-1"/> {item.q}
                  </div>
                  <p className="text-slate-900 font-bold text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const QuizCard = ({ 
  question, 
  onAnswer, 
  feedback, 
  onNext, 
  isLast 
}: { 
  question: Question, 
  onAnswer: (option: string) => void, 
  feedback: 'correct' | 'wrong' | null,
  onNext: () => void,
  isLast?: boolean
}) => {
  const [showHint, setShowHint] = useState(false);

  // Reset hint state when question changes
  useEffect(() => {
    setShowHint(false);
  }, [question]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        {/* Question Area */}
        <div className="p-8 border-b border-slate-100">
          <span className="inline-block px-3 py-1 bg-pink-50 text-pink-600 text-xs font-bold rounded-full mb-4">
            {question.category === 'internal' ? '社内対応' : 
             question.category === 'client' ? 'お客様対応' :
             question.category === 'three-party' ? '三者間対応' :
             question.category === 'verbs' ? '動詞変換' : '用語知識'}
          </span>
          <h3 className="text-xl font-bold text-slate-900 mb-4 leading-relaxed">{question.questionText}</h3>
          
          {question.context && (
            <div className="mt-4">
              {!showHint && feedback === null ? (
                <button 
                  onClick={() => setShowHint(true)}
                  className="flex items-center space-x-2 text-sm text-pink-500 font-bold hover:text-pink-600 transition-colors"
                >
                  <Lightbulb size={16} />
                  <span>ヒントを見る</span>
                </button>
              ) : (
                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-300 fade-in">
                  <p className="text-xs text-slate-400 font-bold mb-1">ヒント</p>
                  <p className="text-slate-600 font-mono text-sm">{question.context}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Options Area */}
        <div className="p-8 bg-slate-50 space-y-4">
          {feedback === null ? (
            // Choices
            question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => onAnswer(opt)}
                className="w-full p-4 bg-white border-2 border-slate-200 rounded-xl text-left text-slate-700 font-medium hover:border-pink-400 hover:text-pink-600 hover:shadow-md transition-all"
              >
                {opt}
              </button>
            ))
          ) : (
            // Feedback View
            <div className="fade-in">
              <div className={`flex items-center space-x-3 mb-6 ${feedback === 'correct' ? 'text-green-600' : 'text-orange-500'}`}>
                {feedback === 'correct' ? <CheckCircle size={32} /> : <XCircle size={32} />}
                <span className="text-2xl font-bold">{feedback === 'correct' ? '正解です！' : '惜しい！'}</span>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">正解</p>
                  <p className="text-lg font-bold text-slate-900">{question.correctAnswer}</p>
                </div>
                
                <div className="border-t border-slate-100 pt-4">
                   <VisualArrow direction={question.visualCue.direction} target={question.visualCue.target} />
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">解説</p>
                  <p className="text-slate-700 leading-relaxed">{question.reason}</p>
                </div>
              </div>

              <button
                onClick={onNext}
                className="w-full mt-6 py-4 bg-pink-500 text-white rounded-xl font-bold shadow-lg hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
              >
                <span>{isLast ? '結果を見る' : '次の問題へ'}</span>
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DrillMode = ({ onFinish }: { onFinish: () => void }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [questions] = useState(() => getRandomQuestions(100)); // Load all shuffled
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentQ = questions[currentQIndex];

  const handleAnswer = (ans: string) => {
    if (ans === currentQ.correctAnswer) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setCurrentQIndex(prev => (prev + 1) % questions.length);
  };

  return (
    <div>
      <div className="text-center py-4 bg-blue-50">
        <p className="text-blue-800 font-bold text-sm">特訓モード：ゆっくり頑張りましょう</p>
      </div>
      <QuizCard 
        question={currentQ} 
        onAnswer={handleAnswer} 
        feedback={feedback}
        onNext={handleNext}
        isLast={false}
      />
    </div>
  );
};

const TestMode = ({ onFinish }: { onFinish: (result: TestResult) => void }) => {
  const [questions] = useState(() => getRandomQuestions(10));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{question: Question, isCorrect: boolean, userAnswer: string}[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentQ = questions[currentIdx];
  
  // Re-implementation for simpler flow inside TestMode
  // We need to capture the user's specific answer string for the history.
  const [userSelection, setUserSelection] = useState<string | null>(null);

  const onSelect = (ans: string) => {
    setUserSelection(ans);
    const isCorrect = ans === currentQ.correctAnswer;
    setFeedback(isCorrect ? 'correct' : 'wrong');
  };

  const onConfirmNext = () => {
    const isCorrect = userSelection === currentQ.correctAnswer;
    const newAnswers = [...answers, {
      question: currentQ,
      isCorrect,
      userAnswer: userSelection!
    }];
    setAnswers(newAnswers);
    setFeedback(null);
    setUserSelection(null);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Finish
      const correctCount = newAnswers.filter(a => a.isCorrect).length;
      const result: TestResult = {
        score: correctCount,
        total: questions.length,
        passed: (correctCount / questions.length) >= 0.9,
        history: newAnswers
      };
      onFinish(result);
    }
  };

  // Helper to find the wrong answer for history (hacky but works since we only have 2 options mostly)
  const questionOptionsDiff = (q: Question, correct: string) => q.options.find(o => o !== correct) || "";

  return (
    <div>
      <div className="text-center py-4 bg-pink-50 flex justify-between px-8">
        <span className="text-pink-800 font-bold text-sm">実力判定テスト</span>
        <span className="text-pink-800 font-bold text-sm">{currentIdx + 1} / {questions.length}</span>
      </div>
      <QuizCard 
        question={currentQ} 
        onAnswer={onSelect} 
        feedback={feedback}
        onNext={onConfirmNext}
        isLast={currentIdx === questions.length - 1}
      />
    </div>
  );
};

const ResultScreen = ({ result, onRetry, onGoHome }: { result: TestResult, onRetry: () => void, onGoHome: () => void }) => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 fade-in">
      <div className={`text-center p-8 rounded-2xl mb-8 ${result.passed ? 'bg-green-50 border-2 border-green-100' : 'bg-red-50 border-2 border-red-100'}`}>
        <div className="mb-4">
          {result.passed ? (
            <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto text-4xl shadow-lg">
              <GraduationCap />
            </div>
          ) : (
            <div className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto text-4xl shadow-lg">
              <XCircle />
            </div>
          )}
        </div>
        <h2 className={`text-3xl font-bold mb-2 ${result.passed ? 'text-green-800' : 'text-red-800'}`}>
          {result.passed ? '合格おめでとうございます！' : 'あと少しです！'}
        </h2>
        <p className="text-xl font-bold text-slate-700 mb-4">
          正答率: <span className="text-3xl">{Math.round((result.score / result.total) * 100)}</span>%
        </p>
        <p className="text-slate-600">
          {result.passed 
            ? "素晴らしいです！自信を持って現場で使ってくださいね。" 
            : "大丈夫。復習してもう一度チャレンジしましょう！"}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden mb-8">
        <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
          振り返り
        </div>
        {result.history.map((item, idx) => (
          <div key={idx} className="p-4 border-b border-slate-100 last:border-0 flex items-start space-x-4">
            <div className={`mt-1 flex-shrink-0 ${item.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {item.isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
            </div>
            <div>
              <p className="text-sm text-slate-800 font-bold mb-1">{item.question.questionText}</p>
              {!item.isCorrect && (
                <div className="text-sm bg-red-50 p-2 rounded text-red-800 mt-2">
                  <span className="font-bold text-xs uppercase mr-2">あなたの回答</span>
                  {item.userAnswer}
                </div>
              )}
              <div className="text-sm bg-green-50 p-2 rounded text-green-800 mt-2">
                 <span className="font-bold text-xs uppercase mr-2">正解</span>
                 {item.question.correctAnswer}
              </div>
              <p className="text-xs text-slate-500 mt-2">解説: {item.question.reason}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={onRetry}
          className="flex items-center justify-center space-x-2 py-3 bg-white border border-slate-300 rounded-lg font-bold text-slate-700 hover:bg-slate-50"
        >
          <RefreshCcw size={18} />
          <span>もう一度</span>
        </button>
        <button 
          onClick={onGoHome}
          className="py-3 bg-pink-500 rounded-lg font-bold text-white hover:bg-pink-600 shadow"
        >
          メニューへ戻る
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [mode, setMode] = useState<AppMode>('menu');
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const handleTestFinish = (result: TestResult) => {
    setTestResult(result);
    setMode('result');
  };

  const handleRetry = () => {
    setMode('test');
  };

  const handleGoHome = () => {
    setMode('menu');
    setTestResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header onGoHome={handleGoHome} />
      
      <main>
        {mode === 'menu' && <MenuScreen onSelectMode={setMode} />}
        {mode === 'learn' && <LearnScreen />}
        {mode === 'drill' && <DrillMode onFinish={handleGoHome} />}
        {mode === 'test' && <TestMode onFinish={handleTestFinish} />}
        {mode === 'result' && testResult && (
          <ResultScreen 
            result={testResult} 
            onRetry={handleRetry} 
            onGoHome={handleGoHome} 
          />
        )}
      </main>
    </div>
  );
}