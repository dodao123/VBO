// app/components/LandingPage/GoldenBoard.tsx
'use client';

import { useEffect, useState } from 'react';

interface LeaderboardEntry {
  rank: number;
  id: string;
  userName: string;
  age: number | null;
  totalScore: number;
  levelName: string;
  scaleId: string;
  completedAt: string;
}

export default function GoldenBoard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedScale, setSelectedScale] = useState<string>('all');

  useEffect(() => {
    loadLeaderboard();
  }, [selectedScale]);

  async function loadLeaderboard() {
    setLoading(true);
    try {
      const url = selectedScale === 'all' 
        ? '/api/gratitude/leaderboard?limit=10'
        : `/api/gratitude/leaderboard?scale=${selectedScale}&limit=10`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setLeaderboard(data.data);
      }
    } catch (err) {
      console.error('Error loading leaderboard:', err);
    } finally {
      setLoading(false);
    }
  }

  const getScaleName = (scaleId: string) => {
    switch (scaleId) {
      case 'GQ6_CHILD':
        return 'Trẻ nhỏ (4-9 tuổi)';
      case 'AGS12_TEEN':
        return 'Vị thành niên (10-18 tuổi)';
      case 'ADULT_DHARMA':
        return 'Người lớn (Tu học)';
      default:
        return scaleId;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-br from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-br from-amber-600 to-amber-800 text-white';
      default:
        return 'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-800';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  return (
    <div className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="text-6xl animate-bounce">🏆</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mb-3">
            Bảng Vàng Tu Tập
          </h2>
          <p className="text-gray-600 text-lg">
            Những tấm gương về lòng biết ơn đáng học hỏi
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setSelectedScale('all')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedScale === 'all'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-orange-100'
            }`}
          >
            🌟 Tất cả
          </button>
          <button
            onClick={() => setSelectedScale('GQ6_CHILD')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedScale === 'GQ6_CHILD'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-blue-100'
            }`}
          >
            🧒 Trẻ nhỏ
          </button>
          <button
            onClick={() => setSelectedScale('AGS12_TEEN')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedScale === 'AGS12_TEEN'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-purple-100'
            }`}
          >
            🎓 Vị thành niên
          </button>
          <button
            onClick={() => setSelectedScale('ADULT_DHARMA')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedScale === 'ADULT_DHARMA'
                ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-orange-100'
            }`}
          >
            🙏 Tu học
          </button>
        </div>

        {/* Leaderboard */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải bảng xếp hạng...</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-600 text-lg">Chưa có kết quả nào. Hãy là người đầu tiên!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div
                key={entry.id}
                className={`
                  ${getRankStyle(entry.rank)}
                  rounded-2xl p-5 shadow-lg
                  transform transition-all duration-300 hover:scale-102 hover:shadow-xl
                  flex items-center justify-between
                  ${entry.rank <= 3 ? 'border-4 border-yellow-300' : ''}
                `}
              >
                {/* Rank & Name */}
                <div className="flex items-center gap-4 flex-1">
                  {/* Rank Badge */}
                  <div className={`
                    text-3xl font-bold
                    ${entry.rank <= 3 ? 'text-5xl' : 'text-2xl'}
                  `}>
                    {getRankIcon(entry.rank)}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className={`font-bold ${entry.rank <= 3 ? 'text-2xl' : 'text-xl'}`}>
                        {entry.userName}
                      </h3>
                      {entry.age && (
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          entry.rank <= 3 
                            ? 'bg-white bg-opacity-30' 
                            : 'bg-orange-300 text-orange-900'
                        }`}>
                          {entry.age} tuổi
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${
                      entry.rank <= 3 ? 'text-white text-opacity-90' : 'text-gray-600'
                    }`}>
                      {getScaleName(entry.scaleId)} • {entry.levelName}
                    </p>
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <div className={`${entry.rank <= 3 ? 'text-4xl' : 'text-3xl'} font-bold`}>
                    {entry.totalScore}
                  </div>
                  <div className={`text-xs ${
                    entry.rank <= 3 ? 'text-white text-opacity-80' : 'text-gray-500'
                  }`}>
                    điểm
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-10">
          <p className="text-gray-700 mb-4 text-lg">
            Bạn cũng muốn xuất hiện trên bảng vàng?
          </p>
          <a
            href="/Practise"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-bold text-lg hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Bắt đầu làm bài ngay! 🚀
          </a>
        </div>
      </div>
    </div>
  );
}

