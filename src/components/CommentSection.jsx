import { useEffect, useState } from 'react';

const AVATAR = 'https://randomuser.me/api/portraits/men/32.jpg';
const STORAGE_KEY = 'comments-demo';

export default function CommentSection() {
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return [
      {
        name: 'Rai',
        avatar: AVATAR,
        date: '28 Mar 2024 11:15',
        text: 'Mohon maaf, apakah sertifikatnya sudah tidak dapat diunduh ? Karena saya mau download ada konfirmasi bahwa TOTP aktivasi salah Bagaimana ya solusinya ?',
        replies: [
          {
            name: 'Akmal',
            avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
            date: '28 Mar 2024 11:15',
            text: 'Saya mengunduh sertifikatnya kok juga belum bisa',
          },
        ],
      },
    ];
  });
  const [text, setText] = useState('');
  const [replying, setReplying] = useState(null); // index komentar yang sedang dibalas
  const [replyText, setReplyText] = useState('');
  const maxChar = 50;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  }, [comments]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!text) return;
    setComments([
      {
        name: 'Anonim',
        avatar: AVATAR,
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        text,
        replies: [],
      },
      ...comments,
    ]);
    setText('');
  }

  function handleReplySubmit(e, idx) {
    e.preventDefault();
    if (!replyText) return;
    setComments((comments) =>
      comments.map((c, i) =>
        i === idx
          ? {
              ...c,
              replies: [
                ...(c.replies || []),
                {
                  name: 'Anonim',
                  avatar: AVATAR,
                  date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                  text: replyText,
                },
              ],
            }
          : c,
      ),
    );
    setReplying(null);
    setReplyText('');
  }

  return (
    <div className="mb-8">
      <h3 className="font-semibold mb-4 text-lg border-l-4 border-blue-500 pl-2">Komentar</h3>
      {/* Form */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <img src={AVATAR} alt="avatar" className="w-10 h-10 rounded-full object-cover mt-1" />
        <div className="flex-1">
          <textarea
            className="w-full border border-gray-400 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring"
            placeholder="Apa yang ingin anda tanyakan?"
            maxLength={maxChar}
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex justify-end mt-1">
            <span className="text-xs text-gray-400">
              {text.length}/{maxChar}
            </span>
          </div>
          <button type="submit" className="mt-3 bg-blue-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-600">
            Kirim
          </button>
        </div>
      </form>
      {/* List Komentar */}
      <div className="divide-y divide-gray-600">
        {comments.map((c, i) => (
          <div key={i} className="py-5">
            <div className="flex gap-3 items-start">
              <img src={c.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-700">{c.name}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-xs text-gray-400">{c.date}</span>
                </div>
                <div className="mb-2 text-gray-700">{c.text}</div>
                <button
                  className="text-blue-500 text-sm font-medium hover:underline"
                  onClick={() => {
                    setReplying(i);
                    setReplyText('');
                  }}
                  type="button"
                >
                  Balas
                </button>
                {/* Form balas */}
                {replying === i && (
                  <form onSubmit={(e) => handleReplySubmit(e, i)} className="flex gap-2 mt-3 ml-8">
                    <img src={AVATAR} alt="avatar" className="w-8 h-8 rounded-full object-cover mt-1" />
                    <div className="flex-1">
                      <textarea
                        className="w-full border border-gray-400 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring"
                        placeholder="Tulis balasan..."
                        maxLength={maxChar}
                        rows={2}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div className="flex justify-end mt-1">
                        <span className="text-xs text-gray-400">
                          {replyText.length}/{maxChar}
                        </span>
                      </div>
                      <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-lg font-medium hover:bg-blue-600">
                        Kirim
                      </button>
                      <button type="button" className="ml-2 text-xs text-gray-400 hover:underline" onClick={() => setReplying(null)}>
                        Batal
                      </button>
                    </div>
                  </form>
                )}
                {/* Replies */}
                {c.replies &&
                  c.replies.map((r, j) => (
                    <div key={j} className="flex gap-3 mt-4 ml-8">
                      <img src={r.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-700 text-sm">{r.name}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-xs text-gray-400">{r.date}</span>
                        </div>
                        <div className="mb-2 text-gray-700 text-sm">{r.text}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Dummy */}
      <div className="flex items-center justify-between mt-8 text-sm text-gray-500">
        <div>
          Item per page{' '}
          <select className="border border-gray-400 rounded px-2 text-gray-700">
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>{' '}
          of 200
        </div>
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 rounded hover:bg-gray-100">&lt;</button>
          <button className="px-2 py-1 rounded bg-blue-500 text-white">1</button>
          <button className="px-2 py-1 rounded hover:bg-gray-100">2</button>
          <button className="px-2 py-1 rounded hover:bg-gray-100">&gt;</button>
        </div>
      </div>
    </div>
  );
}
