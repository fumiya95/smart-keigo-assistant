import React, { useState, useEffect } from 'react';
import { Book, Brain, GraduationCap, ChevronRight, RefreshCcw, CheckCircle, XCircle, ArrowUp, ArrowDown, Minus, ArrowRight, Lightbulb, Phone, Briefcase, MessageCircle, Layers, ArrowLeft } from 'lucide-react';
import { KEIGO_DB, getRandomQuestions, getTestQuestions } from './data';
import { AppMode, Question, TestResult, QuestionCategory } from './types';

// --- Sub-Components ---

const Header = ({ onGoHome, showMenuButton }: { onGoHome: () => void, showMenuButton: boolean }) => (
  <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm transition-all duration-300">
    <div className="max-w-3xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
      <div className="flex items-center space-x-2 cursor-pointer active:opacity-70 transition-opacity" onClick={onGoHome}>
        <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">敬</div>
        <h1 className="font-bold text-slate-800 text-base md:text-lg tracking-tight">ビジネス敬語 <span className="text-pink-500">やさしい教室</span></h1>
      </div>
      {showMenuButton && (
        <button onClick={onGoHome} className="text-xs md:text-sm font-bold text-slate-500 hover:text-pink-500 px-2 py-1 rounded active:bg-slate-100 transition-colors">メニュー</button>
      )}
    </div>
  </header>
);

const Footer = () => (
  <footer className="py-8 pb-12 text-center text-slate-400 text-xs font-medium bg-slate-50">
    &copy;2026 Fumiya Nemoto
  </footer>
);

const SplashScreen = () => (
  <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col items-center justify-center">
    <div className="animate-bounce">
      <div className="w-24 h-24 bg-pink-500 rounded-3xl flex items-center justify-center text-white font-bold text-6xl shadow-xl mb-8">
        敬
      </div>
    </div>
    <div className="text-center fade-in">
      <h1 className="font-bold text-slate-800 text-2xl tracking-widest mb-2">ビジネス敬語</h1>
      <p className="text-pink-500 font-bold text-lg">やさしい教室</p>
      
      <div className="mt-12 flex justify-center space-x-2">
        <div className="w-2 h-2 bg-pink-300 rounded-full animate-ping"></div>
        <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping delay-75"></div>
        <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping delay-150"></div>
      </div>
    </div>
  </div>
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
    <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-100 w-full md:w-auto">
      <div className={`p-2 rounded-full bg-white shadow-sm ${color}`}>
        <Icon size={20} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-slate-500">{label}</span>
        <span className="text-base font-bold text-slate-800">{target}</span>
      </div>
    </div>
  );
};

// Helper component for phrase list
const PhraseList = ({ items }: { items: { ng: string, ok: string, note?: string }[] }) => (
  <div className="space-y-4">
    {items.map((item, i) => (
      <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col space-y-3 relative overflow-hidden">
         {/* Note Badge */}
         {item.note && (
            <span className="absolute top-0 right-0 bg-slate-100 text-[10px] text-slate-500 px-2 py-1 rounded-bl-lg font-bold">
              {item.note}
            </span>
         )}
         <div className="flex flex-col space-y-2 pt-2">
           {/* NG Row */}
           <div className="flex items-start text-xs text-slate-500">
             <span className="font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded text-[10px] mr-2 flex-shrink-0 mt-0.5">NG</span>
             <span className="leading-relaxed">{item.ng}</span>
           </div>
           {/* OK Row */}
           <div className="flex items-start text-base font-bold text-green-700">
             <span className="font-bold bg-green-100 text-green-600 px-2 py-0.5 rounded text-[10px] mr-2 flex-shrink-0 mt-1">OK</span>
             <span className="leading-relaxed">{item.ok}</span>
           </div>
         </div>
      </div>
    ))}
  </div>
);

// --- Screen Components ---

const MenuScreen = ({ onSelectMode }: { onSelectMode: (mode: AppMode) => void }) => {
  return (
    <div className="max-w-2xl mx-auto px-5 py-8 fade-in">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">ようこそ、敬語の教室へ。</h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          美しい敬語は、あなたの信頼を深めます。<br/>
          焦らず、少しずつ、一緒に身につけていきましょう。
        </p>
      </div>

      <div className="grid gap-5">
        <button 
          onClick={() => onSelectMode('learn')}
          className="group relative bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-sm active:scale-[0.98] active:border-pink-300 transition-all duration-200 text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <Book size={26} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">【基礎学習】</h3>
                <p className="text-xs md:text-sm text-slate-500 mt-1">敬語のルールや変換表を確認</p>
              </div>
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-pink-400 transition-colors" />
          </div>
        </button>

        <button 
          onClick={() => onSelectMode('drill')}
          className="group relative bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-sm active:scale-[0.98] active:border-pink-300 transition-all duration-200 text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <Brain size={26} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">【特訓ドリル】</h3>
                <p className="text-xs md:text-sm text-slate-500 mt-1">苦手なシーンを選んで練習</p>
              </div>
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-pink-400 transition-colors" />
          </div>
        </button>

        <button 
          onClick={() => onSelectMode('test')}
          className="group relative bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-sm active:scale-[0.98] active:border-pink-300 transition-all duration-200 text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                <GraduationCap size={26} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">【実力判定テスト】</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <p className="text-xs md:text-sm text-slate-500">10問チャレンジ</p>
                  <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100 whitespace-nowrap">9問以上で合格</span>
                </div>
              </div>
            </div>
            <ChevronRight className="text-slate-300 group-hover:text-pink-400 transition-colors" />
          </div>
        </button>
      </div>
    </div>
  );
};

const LearnScreen = ({ onGoHome }: { onGoHome: () => void }) => {
  const internalPhrases = [
    { ng: "部長、ご苦労様です", ok: "部長、お疲れさまです", note: "ねぎらい" },
    { ng: "お客様が参りました", ok: "お客様がお見えになりました", note: "敬語変換" },
    { ng: "資料をみてください", ok: "資料をご覧ください", note: "依頼" },
    { ng: "報告が遅れて、すみません", ok: "ご報告が遅くなり申し訳ございません", note: "謝罪" },
    { ng: "何かあったら連絡してください", ok: "何かございましたらご連絡ください", note: "依頼" },
    { ng: "お客様が言うには〜", ok: "お客様のお話では〜", note: "伝聞" },
    { ng: "今日来るって言っていました", ok: "本日お越しになるとのことでした", note: "伝言" },
  ];

  const customerPhrases = [
    { ng: "うちの会社", ok: "弊社（へいしゃ）", note: "謙譲語" },
    { ng: "あなたは誰ですか", ok: "失礼ですが、どちら様でしょうか。", note: "クッション言葉" },
    { ng: "席にいません", ok: "ただいま席を外しております。", note: "慣用句" },
    { ng: "すみませんが", ok: "恐れ入りますが、", note: "クッション言葉" },
    { ng: "すぐにいきます", ok: "すぐに伺います／参ります。", note: "謙譲語" },
    { ng: "なんのようですか", ok: "どのようなご用件でしょうか。", note: "丁寧語" },
    { ng: "明日、またきてください", ok: "恐れ入りますが、明日改めてお越しいただけますでしょうか。", note: "依頼" },
    { ng: "もう一度言ってください", ok: "恐れ入りますが、もう一度お伺いしてもよろしいでしょうか。", note: "再依頼" },
    { ng: "営業部の田中さんはいますか", ok: "営業部の田中様はいらっしゃいますでしょうか。", note: "確認" },
    { ng: "山田は今、会議中です", ok: "山田は現在、会議中でございます。", note: "状況説明" },
    { ng: "都合を聞きたいのですが", ok: "ご都合をお伺いしてもよろしいでしょうか。", note: "謙譲語" },
    { ng: "わかりました。言っておきます", ok: "かしこまりました。担当者に申し伝えます。", note: "承諾" },
    { ng: "鈴木から話は聞いています", ok: "弊社の鈴木よりお話は伺っております。", note: "謙譲語" },
    { ng: "担当者が来ますので待ってください", ok: "担当者が参りますので、少々お待ちください。", note: "案内" },
  ];

  // Matrix Data for Rendering
  const matrixData = [
    { normal: '行く', polite: '行きます', respect: ['いらっしゃる', 'おいでになる'], humble: ['伺う', '参る'] },
    { normal: '来る', polite: '来ます', respect: ['お見えになる', 'お越しになる'], humble: ['伺う', '参る'] },
    { normal: '言う', polite: '言います', respect: ['おっしゃる'], humble: ['申す', '申し上げる'] },
    { normal: '聞く', polite: '聞きます', respect: ['お聞きになる'], humble: ['伺う', '承る'] },
    { normal: '見る', polite: '見ます', respect: ['ご覧になる'], humble: ['拝見する'] },
    { normal: '食べる', polite: '食べます', respect: ['召し上がる'], humble: ['いただく'] },
    { normal: '会う', polite: '会います', respect: ['お会いになる'], humble: ['お目にかかる'] },
    { normal: '知る', polite: '知っています', respect: ['ご存じだ'], humble: ['存じている'] },
    { normal: 'もらう', polite: 'もらいます', respect: ['お受けになる'], humble: ['いただく'] },
    { normal: 'する', polite: 'します', respect: ['なさる'], humble: ['いたす'] },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 fade-in space-y-10">
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900">敬語の基本ルールブック</h2>
        <p className="text-sm text-slate-500 mt-2">困ったときは、いつでもここに戻ってきてくださいね。</p>
      </div>

      {/* 1. Matrix */}
      <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-pink-600 border-b border-pink-100 pb-3 mb-4">① 敬語変換マトリクス</h3>
        <p className="text-sm text-slate-600 mb-4 bg-pink-50 p-4 rounded-xl leading-relaxed">
            <strong>基本のキ：</strong><br/>
            「尊敬語」は相手を高める（相手の動作）。<br/>
            「謙譲語」は自分を低めて相手を立てる（自分の動作）。
        </p>
        
        {/* Desktop Table View (Hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto -mx-5 px-5 pb-2">
          <table className="w-full text-sm text-left border-collapse min-w-[500px]">
            <thead className="bg-slate-100 text-slate-700 font-bold">
              <tr>
                <th className="p-3 border-b border-slate-200 whitespace-nowrap rounded-tl-lg">普通</th>
                <th className="p-3 border-b border-slate-200 whitespace-nowrap">丁寧</th>
                <th className="p-3 text-orange-600 border-b border-slate-200 min-w-[140px]">尊敬語 (相手↑)</th>
                <th className="p-3 text-blue-600 border-b border-slate-200 min-w-[140px] rounded-tr-lg">謙譲語 (自分↓)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {matrixData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-600">{row.normal}</td>
                  <td className="p-3 text-slate-600">{row.polite}</td>
                  <td className="p-3 font-bold text-slate-800">
                     {row.respect.map((r, idx) => <div key={idx}>{r}</div>)}
                  </td>
                  <td className="p-3 font-bold text-slate-800">
                     {row.humble.map((h, idx) => <div key={idx}>{h}</div>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View (Hidden on desktop) */}
        <div className="md:hidden space-y-4">
          {matrixData.map((row, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm">
               <div className="flex justify-between items-baseline mb-3 border-b border-slate-200 pb-2">
                 <span className="font-bold text-lg text-slate-800">{row.normal}</span>
                 <span className="text-sm font-medium text-slate-500">{row.polite}</span>
               </div>
               <div className="grid grid-cols-2 gap-3">
                 <div className="bg-white p-3 rounded-lg border border-orange-100 shadow-sm">
                   <div className="text-[10px] font-bold text-orange-500 mb-1 uppercase tracking-wide">尊敬語 (相手)</div>
                   <div className="text-sm font-bold text-slate-800 space-y-1">
                     {row.respect.map((r, idx) => <div key={idx}>{r}</div>)}
                   </div>
                 </div>
                 <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                   <div className="text-[10px] font-bold text-blue-500 mb-1 uppercase tracking-wide">謙譲語 (自分)</div>
                   <div className="text-sm font-bold text-slate-800 space-y-1">
                      {row.humble.map((h, idx) => <div key={idx}>{h}</div>)}
                   </div>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Terms */}
      <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-pink-600 border-b border-pink-100 pb-3 mb-4">② 呼称・立場マスター</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100"><span className="text-slate-500 text-sm">自分 → お客様</span><span className="font-bold text-slate-900">私（わたくし）</span></li>
          <li className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100"><span className="text-slate-500 text-sm">自社 → お客様</span><span className="font-bold text-slate-900">弊社（へいしゃ）</span></li>
          <li className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100"><span className="text-slate-500 text-sm">自社 → 社内</span><span className="font-bold text-slate-900">当社／うち</span></li>
          <li className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100"><span className="text-slate-500 text-sm">相手の会社（会話）</span><span className="font-bold text-slate-900">御社（おんしゃ）</span></li>
          <li className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100"><span className="text-slate-500 text-sm">相手の会社（文章）</span><span className="font-bold text-slate-900">貴社（きしゃ）</span></li>
        </ul>
      </section>

      {/* 3. Three-party Rules */}
      <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-pink-600 border-b border-pink-100 pb-3 mb-4">③ 三者間対応の鉄則</h3>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mb-6">
          <p className="font-bold text-yellow-900 text-center text-sm md:text-base">【最重要】お客様が最上位（↑）。自分と自社の人間は下げる（↓）。</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-xs md:text-sm font-bold text-indigo-900 mb-3 bg-indigo-100 inline-block px-3 py-1 rounded-full">CASE 1：取引先に自社の上司（部長）を紹介</p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 opacity-60">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-slate-600 text-sm line-through">「鈴木さん、紹介します。うちの会社の営業部の山本部長です。」</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-slate-900 font-bold text-sm md:text-base">「鈴木様、ご紹介いたします。こちらが、弊社営業部の山本でございます。」</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-xs md:text-sm font-bold text-indigo-900 mb-3 bg-indigo-100 inline-block px-3 py-1 rounded-full">CASE 2：上司に取引先（山田さん）を紹介</p>
             <div className="space-y-3">
              <div className="flex items-start space-x-3 opacity-60">
                <XCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-slate-600 text-sm line-through">「こちらが、株式会社りそな商事の山田さんでございます」</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-slate-900 font-bold text-sm md:text-base">「こちらが、株式会社りそな商事の山田様でいらっしゃいます。」</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Phrases (Enriched Content) */}
      <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-pink-600 border-b border-pink-100 pb-3 mb-6">④ 現場で使える言い換え単語帳</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Internal */}
          <div>
            <h4 className="font-bold text-slate-800 mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-sm font-bold">社内</span>
              対 上司・先輩
            </h4>
            <PhraseList items={internalPhrases} />
          </div>

          {/* Customer */}
          <div>
             <h4 className="font-bold text-slate-800 mb-4 flex items-center">
              <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-2 text-sm font-bold">社外</span>
              対 お客様
            </h4>
            <PhraseList items={customerPhrases} />
          </div>
        </div>
      </section>

      <button
        onClick={onGoHome}
        className="w-full p-4 flex items-center justify-center space-x-2 text-slate-500 font-bold rounded-xl border-2 border-transparent hover:bg-slate-100 hover:text-slate-700 active:scale-[0.98] transition-all"
      >
        <ArrowLeft size={20} />
        <span>メニューへ戻る</span>
      </button>
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
    <div className="max-w-2xl mx-auto px-4 py-6 fade-in">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Question Area */}
        <div className="p-6 md:p-8 border-b border-slate-100">
          <span className="inline-block px-3 py-1 bg-pink-50 text-pink-600 text-xs font-bold rounded-full mb-4">
            {question.category === 'internal' ? '社内対応' : 
             question.category === 'client' ? 'お客様対応' :
             question.category === 'three-party' ? '三者間対応' :
             question.category === 'verbs' ? '動詞変換' : '用語知識'}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 leading-relaxed">{question.questionText}</h3>
          
          {question.context && (
            <div className="mt-4">
              {!showHint && feedback === null ? (
                <button 
                  onClick={() => setShowHint(true)}
                  className="flex items-center space-x-2 text-sm text-pink-500 font-bold hover:text-pink-600 transition-colors py-2"
                >
                  <Lightbulb size={18} />
                  <span>ヒントを見る</span>
                </button>
              ) : (
                <div className="bg-slate-50 p-4 rounded-xl border-l-4 border-slate-300 fade-in">
                  <p className="text-xs text-slate-400 font-bold mb-1">ヒント</p>
                  <p className="text-slate-600 font-mono text-sm leading-relaxed">{question.context}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Options Area */}
        <div className="p-6 md:p-8 bg-slate-50 space-y-4">
          {feedback === null ? (
            // Choices
            question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => onAnswer(opt)}
                className="w-full p-5 bg-white border-2 border-slate-200 rounded-2xl text-left text-slate-700 font-bold text-base md:text-lg hover:border-pink-400 hover:text-pink-600 active:bg-pink-50 active:border-pink-500 active:scale-[0.98] transition-all duration-150 shadow-sm"
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
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">正解</p>
                  <p className="text-lg md:text-xl font-bold text-slate-900 leading-relaxed">{question.correctAnswer}</p>
                </div>
                
                <div className="border-t border-slate-100 pt-5">
                   <VisualArrow direction={question.visualCue.direction} target={question.visualCue.target} />
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">解説</p>
                  <p className="text-slate-700 leading-relaxed text-sm md:text-base">{question.reason}</p>
                </div>
              </div>

              <button
                onClick={onNext}
                className="w-full mt-6 py-4 bg-pink-500 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-pink-600 active:bg-pink-700 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
              >
                <span>{isLast ? '結果を見る' : '次の問題へ'}</span>
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DrillMode = ({ 
  onFinish, 
  step, 
  setStep 
}: { 
  onFinish: () => void,
  step: 'select' | 'quiz',
  setStep: (s: 'select' | 'quiz') => void
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const startDrill = (categories: QuestionCategory[] | null) => {
    // If null, allow all categories
    const selectedQuestions = getRandomQuestions(100, categories || undefined);
    setQuestions(selectedQuestions);
    setStep('quiz');
    setCurrentQIndex(0);
    setFeedback(null);
  };

  if (step === 'select') {
    return (
      <div className="max-w-2xl mx-auto px-5 py-8 fade-in">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">特訓コースを選んでください</h2>
          <p className="text-slate-600 text-sm">苦手なシーンを重点的に練習しましょう。</p>
        </div>

        <div className="grid gap-4 mb-8">
           {/* Course 1: Basics */}
           <button 
            onClick={() => startDrill(['verbs', 'terms'])}
            className="flex items-center p-5 bg-white border-2 border-slate-200 rounded-2xl active:border-pink-400 active:bg-slate-50 active:scale-[0.98] transition-all duration-200"
          >
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Book size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-900 text-lg">🔰 基礎・用語コース</h3>
              <p className="text-xs text-slate-500 mt-1">敬語変換と用語の基本をチェック</p>
            </div>
          </button>

          {/* Course 2: Internal */}
          <button 
            onClick={() => startDrill(['internal'])}
            className="flex items-center p-5 bg-white border-2 border-slate-200 rounded-2xl active:border-pink-400 active:bg-slate-50 active:scale-[0.98] transition-all duration-200"
          >
             <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Briefcase size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-900 text-lg">🏢 社内・上司対応コース</h3>
              <p className="text-xs text-slate-500 mt-1">上司への報告・連絡・相談など</p>
            </div>
          </button>

          {/* Course 3: Client & Phone */}
          <button 
            onClick={() => startDrill(['client', 'three-party'])}
            className="flex items-center p-5 bg-white border-2 border-slate-200 rounded-2xl active:border-pink-400 active:bg-slate-50 active:scale-[0.98] transition-all duration-200"
          >
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Phone size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-900 text-lg">📞 電話・来客対応コース</h3>
              <p className="text-xs text-slate-500 mt-1">お客様対応と三者間の敬語</p>
            </div>
          </button>

          {/* Course 4: All */}
          <button 
            onClick={() => startDrill(null)}
            className="flex items-center p-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl shadow-md active:scale-[0.98] transition-all duration-200"
          >
             <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Layers size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg">🔥 総合特訓コース</h3>
              <p className="text-xs text-white/90 mt-1">全ジャンルからランダムに出題</p>
            </div>
          </button>
        </div>

        {/* Back Button */}
        <button
          onClick={onFinish}
          className="w-full p-4 flex items-center justify-center space-x-2 text-slate-500 font-bold rounded-xl border-2 border-transparent hover:bg-slate-100 hover:text-slate-700 active:scale-[0.98] transition-all"
        >
          <ArrowLeft size={20} />
          <span>メニューへ戻る</span>
        </button>
      </div>
    );
  }

  // Quiz View
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
      <div className="text-center py-4 bg-blue-50 flex justify-between px-4 md:px-6 items-center sticky top-14 md:top-16 z-40 shadow-sm border-b border-blue-100">
        <button onClick={() => setStep('select')} className="text-xs font-bold text-blue-500 hover:text-blue-700 bg-white py-1 px-3 rounded border border-blue-200">コース選択へ</button>
        <span className="text-blue-800 font-bold text-sm">特訓中...</span>
        <div className="w-16"></div>
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
  // Use getTestQuestions to ensure first 3 are verbs
  const [questions] = useState(() => getTestQuestions());
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

  return (
    <div>
      <div className="text-center py-4 bg-pink-50 flex justify-between px-5 sticky top-14 md:top-16 z-40 shadow-sm border-b border-pink-100">
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
    <div className="max-w-2xl mx-auto px-5 py-8 fade-in">
      <div className={`text-center p-8 rounded-3xl mb-8 ${result.passed ? 'bg-green-50 border-2 border-green-100' : 'bg-red-50 border-2 border-red-100'}`}>
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
        <h2 className={`text-2xl font-bold mb-2 ${result.passed ? 'text-green-800' : 'text-red-800'}`}>
          {result.passed ? '合格おめでとうございます！' : 'あと少しです！'}
        </h2>
        <p className="text-lg font-bold text-slate-700 mb-4">
          正答率: <span className="text-3xl">{Math.round((result.score / result.total) * 100)}</span>%
        </p>
        <p className="text-slate-600 text-sm md:text-base">
          {result.passed 
            ? "素晴らしいです！自信を持って現場で使ってくださいね。" 
            : "大丈夫。復習してもう一度チャレンジしましょう！"}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-slate-700">
          振り返り
        </div>
        {result.history.map((item, idx) => (
          <div key={idx} className="p-4 border-b border-slate-100 last:border-0 flex items-start space-x-4">
            <div className={`mt-1 flex-shrink-0 ${item.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
              {item.isCorrect ? <CheckCircle size={24} /> : <XCircle size={24} />}
            </div>
            <div>
              <p className="text-sm md:text-base text-slate-800 font-bold mb-2 leading-relaxed">{item.question.questionText}</p>
              {!item.isCorrect && (
                <div className="text-sm bg-red-50 p-3 rounded-lg text-red-800 mt-2 border border-red-100">
                  <span className="font-bold text-xs uppercase block mb-1 opacity-70">あなたの回答</span>
                  {item.userAnswer}
                </div>
              )}
              <div className="text-sm bg-green-50 p-3 rounded-lg text-green-800 mt-2 border border-green-100">
                 <span className="font-bold text-xs uppercase block mb-1 opacity-70">正解</span>
                 {item.question.correctAnswer}
              </div>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed bg-slate-50 p-2 rounded">解説: {item.question.reason}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 pb-8">
        <button 
          onClick={onRetry}
          className="flex items-center justify-center space-x-2 py-4 bg-white border-2 border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-transform"
        >
          <RefreshCcw size={20} />
          <span>もう一度</span>
        </button>
        <button 
          onClick={onGoHome}
          className="py-4 bg-pink-500 rounded-xl font-bold text-white hover:bg-pink-600 shadow-md active:bg-pink-700 active:scale-[0.98] transition-transform"
        >
          メニューへ戻る
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<AppMode>('menu');
  const [drillStep, setDrillStep] = useState<'select' | 'quiz'>('select');
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  useEffect(() => {
    // 擬似的なロード時間
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Modeが切り替わったらトップへスクロール
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [mode]);

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
    setDrillStep('select');
  };

  if (loading) {
    return <SplashScreen />;
  }

  // Calculate if we should show the menu button.
  // We hide it on the main menu, and ALSO on the Drill Mode's selection screen.
  const showMenuButton = mode !== 'menu' && !(mode === 'drill' && drillStep === 'select');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Header onGoHome={handleGoHome} showMenuButton={showMenuButton} />
      
      <main className="flex-grow">
        {mode === 'menu' && <MenuScreen onSelectMode={setMode} />}
        {mode === 'learn' && <LearnScreen onGoHome={handleGoHome} />}
        {mode === 'drill' && (
          <DrillMode 
            onFinish={handleGoHome} 
            step={drillStep}
            setStep={setDrillStep}
          />
        )}
        {mode === 'test' && <TestMode onFinish={handleTestFinish} />}
        {mode === 'result' && testResult && (
          <ResultScreen 
            result={testResult} 
            onRetry={handleRetry} 
            onGoHome={handleGoHome} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
}