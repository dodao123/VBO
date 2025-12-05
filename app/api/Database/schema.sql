-- =============================================
-- DATABASE SCHEMA FOR GRATITUDE SCALES MODULE
-- =============================================
-- Run this SQL in Supabase SQL Editor

-- 1. Table: gratitude_scales (Định nghĩa các thang đo)
CREATE TABLE IF NOT EXISTS gratitude_scales (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_vi TEXT NOT NULL,
  description TEXT,
  min_age INTEGER,
  max_age INTEGER,
  total_questions INTEGER NOT NULL,
  min_score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Table: gratitude_questions (Câu hỏi cho từng thang đo)
CREATE TABLE IF NOT EXISTS gratitude_questions (
  id TEXT PRIMARY KEY,
  scale_id TEXT NOT NULL REFERENCES gratitude_scales(id) ON DELETE CASCADE,
  order_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  question_text_vi TEXT NOT NULL,
  reverse_scored BOOLEAN DEFAULT FALSE,
  min_score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(scale_id, order_number)
);

-- 3. Table: gratitude_score_levels (Mức độ diễn giải)
CREATE TABLE IF NOT EXISTS gratitude_score_levels (
  id SERIAL PRIMARY KEY,
  scale_id TEXT NOT NULL REFERENCES gratitude_scales(id) ON DELETE CASCADE,
  level_name TEXT NOT NULL,
  level_name_vi TEXT NOT NULL,
  min_score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  description TEXT NOT NULL,
  description_vi TEXT NOT NULL,
  suggestions TEXT[],
  emoji TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Table: gratitude_users (Thông tin người dùng)
CREATE TABLE IF NOT EXISTS gratitude_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  age INTEGER,
  gender TEXT, -- 'male', 'female', 'other'
  occupation TEXT,
  education_level TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. Table: gratitude_test_results (Kết quả bài test của users)
CREATE TABLE IF NOT EXISTS gratitude_test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES gratitude_users(id) ON DELETE SET NULL,
  scale_id TEXT NOT NULL REFERENCES gratitude_scales(id),
  answers INTEGER[] NOT NULL,
  total_score INTEGER NOT NULL,
  level_name TEXT NOT NULL,
  completed_at TIMESTAMP DEFAULT NOW(),
  session_id TEXT -- Để tracking anonymous users
);

-- =============================================
-- INSERT DEFAULT DATA
-- =============================================

-- Insert Scales
INSERT INTO gratitude_scales (id, name, name_vi, description, min_age, max_age, total_questions, min_score, max_score)
VALUES 
  ('GQ6_CHILD', 'Gratitude Questionnaire for Children', 'Thang đo lòng biết ơn cho trẻ nhỏ (GQ-6)', 'For children aged 4-9 years', 4, 9, 6, 6, 30),
  ('AGS12_TEEN', 'Adolescent Gratitude Scale', 'Thang đo lòng biết ơn cho vị thành niên (AGS-12)', 'For teenagers aged 10-18 years', 10, 18, 12, 12, 60),
  ('ADULT_DHARMA', 'Adult Gratitude Scale - Dharma Practice', 'Thang đo lòng biết ơn - Hướng tu tập Phật pháp', 'For adults 18+ practicing Buddhist dharma', 18, NULL, 20, 20, 100)
ON CONFLICT (id) DO NOTHING;

-- Insert Questions for GQ-6 (Children)
INSERT INTO gratitude_questions (id, scale_id, order_number, question_text, question_text_vi, reverse_scored, min_score, max_score)
VALUES 
  ('GQ6_Q1', 'GQ6_CHILD', 1, 'You have many things to be grateful for', 'Bạn có rất nhiều điều để biết ơn', FALSE, 1, 5),
  ('GQ6_Q2', 'GQ6_CHILD', 2, 'You have a long list of things you are grateful for', 'Bạn có một danh sách dài những điều mình biết ơn', FALSE, 1, 5),
  ('GQ6_Q3', 'GQ6_CHILD', 3, 'You don''t see much to be grateful for', 'Bạn không thấy nhiều điều để biết ơn', TRUE, 1, 5),
  ('GQ6_Q4', 'GQ6_CHILD', 4, 'You are grateful to many people', 'Bạn biết ơn rất nhiều người', FALSE, 1, 5),
  ('GQ6_Q5', 'GQ6_CHILD', 5, 'The more you think about gratitude, the more grateful you feel', 'Bạn càng nghĩ về điều biết ơn, bạn càng biết ơn những con người và những thứ trong cuộc sống của bạn', FALSE, 1, 5),
  ('GQ6_Q6', 'GQ6_CHILD', 6, 'You hardly ever feel grateful', 'Hầu như bạn không cảm thấy biết ơn', TRUE, 1, 5)
ON CONFLICT (id) DO NOTHING;

-- Insert Questions for AGS-12 (Teens)
INSERT INTO gratitude_questions (id, scale_id, order_number, question_text, question_text_vi, reverse_scored, min_score, max_score)
VALUES 
  ('AGS12_Q1', 'AGS12_TEEN', 1, 'I often notice the good things others do for me', 'Bạn thường nhận ra những điều tốt đẹp mà người khác làm cho mình', FALSE, 1, 5),
  ('AGS12_Q2', 'AGS12_TEEN', 2, 'I can easily remember things I am grateful for', 'Bạn dễ dàng nhớ ra các điều khiến con biết ơn trong cuộc sống', FALSE, 1, 5),
  ('AGS12_Q3', 'AGS12_TEEN', 3, 'Sometimes I don''t feel I have much to be grateful for', 'Đôi khi bạn cảm thấy mình chẳng có gì để biết ơn', TRUE, 1, 5),
  ('AGS12_Q4', 'AGS12_TEEN', 4, 'I realize I receive a lot of help each day', 'Bạn nhận ra rằng mình nhận được rất nhiều sự giúp đỡ mỗi ngày', FALSE, 1, 5),
  ('AGS12_Q5', 'AGS12_TEEN', 5, 'When someone helps me, I feel happy and grateful', 'Khi ai đó giúp bạn, bạn cảm thấy vui và trân trọng', FALSE, 1, 5),
  ('AGS12_Q6', 'AGS12_TEEN', 6, 'Thinking about good things makes me more grateful', 'Khi nghĩ lại những điều tốt mình đã nhận, bạn càng cảm thấy biết ơn', FALSE, 1, 5),
  ('AGS12_Q7', 'AGS12_TEEN', 7, 'I rarely feel grateful for anything', 'Bạn ít khi cảm thấy biết ơn điều gì', TRUE, 1, 5),
  ('AGS12_Q8', 'AGS12_TEEN', 8, 'I feel warm when people care about me', 'Bạn cảm thấy ấm lòng khi có người quan tâm đến bạn', FALSE, 1, 5),
  ('AGS12_Q9', 'AGS12_TEEN', 9, 'I often say thank you when helped', 'Bạn thường nói lời cảm ơn khi được giúp đỡ', FALSE, 1, 5),
  ('AGS12_Q10', 'AGS12_TEEN', 10, 'I try to do good to return kindness', 'Bạn cố gắng làm điều tốt để đáp lại sự tử tế của người khác', FALSE, 1, 5),
  ('AGS12_Q11', 'AGS12_TEEN', 11, 'I like to help others as I was helped', 'Bạn thích giúp đỡ người khác như cách mà mình đã nhận được', FALSE, 1, 5),
  ('AGS12_Q12', 'AGS12_TEEN', 12, 'Gratitude helps me live better and treat others kindly', 'Bạn nghĩ rằng biết ơn giúp bạn sống tốt và đối xử tử tế hơn', FALSE, 1, 5)
ON CONFLICT (id) DO NOTHING;

-- Insert Questions for Adult Dharma (20 questions)
INSERT INTO gratitude_questions (id, scale_id, order_number, question_text, question_text_vi, reverse_scored, min_score, max_score)
VALUES 
  ('ADULT_Q1', 'ADULT_DHARMA', 1, 'Do you recognize that this body-mind arises from countless conditions?', 'Bạn có nhận ra rằng thân tâm này được tạo thành từ vô số nhân duyên?', FALSE, 1, 5),
  ('ADULT_Q2', 'ADULT_DHARMA', 2, 'When using objects, are you aware they come from others'' labor?', 'Khi dùng một vật, bạn có ý thức nó đến nhờ lao động của nhiều người?', FALSE, 1, 5),
  ('ADULT_Q3', 'ADULT_DHARMA', 3, 'Do you contemplate that suffering and joy depend on conditions?', 'Bạn có quán chiếu khổ-vui tùy thuộc các duyên, nhờ đó thấy biết ơn?', FALSE, 1, 5),
  ('ADULT_Q4', 'ADULT_DHARMA', 4, 'Do you pause daily to see nothing arises by itself?', 'Trong ngày, bạn có dừng lại để thấy "không có gì tự nhiên mà có"?', FALSE, 1, 5),
  ('ADULT_Q5', 'ADULT_DHARMA', 5, 'When achieving, do you see it as conditions coming together?', 'Khi có thành tựu, bạn có thấy đó là thành quả của nhiều duyên?', FALSE, 1, 5),
  ('ADULT_Q6', 'ADULT_DHARMA', 6, 'Do you release the sense of "mine" to appreciate more?', 'Bạn có buông tâm sở hữu để trân trọng hơn những gì đang có?', FALSE, 1, 5),
  ('ADULT_Q7', 'ADULT_DHARMA', 7, 'Does awareness of impermanence deepen your gratitude?', 'Bạn có ý thức vô thường nên trân quý hiện tại sâu sắc hơn?', FALSE, 1, 5),
  ('ADULT_Q8', 'ADULT_DHARMA', 8, 'Can you be grateful even to those who cause difficulty?', 'Bạn có thể biết ơn người làm mình khổ vì họ giúp mình trưởng thành?', FALSE, 1, 5),
  ('ADULT_Q9', 'ADULT_DHARMA', 9, 'Do you see others'' struggles to appreciate what you have?', 'Bạn có thấy nỗi khó của người khác để trân quý những gì mình có?', FALSE, 1, 5),
  ('ADULT_Q10', 'ADULT_DHARMA', 10, 'Do you cultivate sympathetic joy for others'' success?', 'Bạn có nuôi dưỡng tâm hoan hỷ khi người khác thành công?', FALSE, 1, 5),
  ('ADULT_Q11', 'ADULT_DHARMA', 11, 'Do you practice sincere gratitude daily?', 'Bạn có thực tập lời cảm ơn chân thành hằng ngày?', FALSE, 1, 5),
  ('ADULT_Q12', 'ADULT_DHARMA', 12, 'When helped, do you remember to pass kindness forward?', 'Khi được giúp, bạn có nhớ tiếp nối sự tử tế đó đến người khác?', FALSE, 1, 5),
  ('ADULT_Q13', 'ADULT_DHARMA', 13, 'Do you appreciate your own effort in practice?', 'Bạn có biết trân trọng sự cố gắng của bản thân trong tu học?', FALSE, 1, 5),
  ('ADULT_Q14', 'ADULT_DHARMA', 14, 'Do you care for body-mind as a gift to yourself?', 'Bạn có chăm sóc thân tâm như món quà dành cho chính mình?', FALSE, 1, 5),
  ('ADULT_Q15', 'ADULT_DHARMA', 15, 'Can you smile at past mistakes as learning opportunities?', 'Bạn có mỉm cười với lỗi lầm đã qua, xem đó là bài học?', FALSE, 1, 5),
  ('ADULT_Q16', 'ADULT_DHARMA', 16, 'Do you note three things to be grateful for each evening?', 'Mỗi tối bạn có ghi nhận ba điều khiến bạn biết ơn?', FALSE, 1, 5),
  ('ADULT_Q17', 'ADULT_DHARMA', 17, 'Do you practice silent gratitude toward others?', 'Bạn có thực tập "lời cảm ơn thầm" đối với người thân, đồng nghiệp?', FALSE, 1, 5),
  ('ADULT_Q18', 'ADULT_DHARMA', 18, 'In adversity, can you see hidden meanings for practice?', 'Khi gặp nghịch cảnh, bạn có thấy "ý nghĩa tiềm ẩn" giúp tu học?', FALSE, 1, 5),
  ('ADULT_Q19', 'ADULT_DHARMA', 19, 'Do you see service as opportunity to repay what you received?', 'Bạn có thấy phụng sự là cơ hội đáp đền những gì đã thọ nhận?', FALSE, 1, 5),
  ('ADULT_Q20', 'ADULT_DHARMA', 20, 'Do you see gratitude as part of the path to benefit all?', 'Bạn có xem lòng biết ơn như con đường lợi mình lợi người?', FALSE, 1, 5)
ON CONFLICT (id) DO NOTHING;

-- Insert Score Levels for GQ-6
INSERT INTO gratitude_score_levels (scale_id, level_name, level_name_vi, min_score, max_score, description, description_vi, suggestions, emoji)
VALUES 
  ('GQ6_CHILD', 'Very Low', 'Rất thấp', 6, 14, 'Child rarely recognizes positive things', 'Trẻ ít nhận biết điều tốt đẹp xung quanh, cần tăng cường thực hành tri ân', ARRAY['Practice saying thank you', 'Draw pictures of favorite things', 'Bedtime gratitude stories'], '😢'),
  ('GQ6_CHILD', 'Low', 'Thấp', 15, 20, 'Child is beginning to form gratitude awareness', 'Trẻ mới bắt đầu hình thành khả năng nhận biết ơn', ARRAY['Gratitude jar activity', 'Thank you notes to family', 'Point out kind actions'], '🙂'),
  ('GQ6_CHILD', 'Average', 'Trung bình', 21, 25, 'Child has normal gratitude for their age', 'Trẻ có khả năng biết ơn ở mức bình thường so với lứa tuổi', ARRAY['Continue daily gratitude practice', 'Help others to feel gratitude', 'Share gratitude moments'], '😊'),
  ('GQ6_CHILD', 'High', 'Cao', 26, 30, 'Child easily recognizes positive things', 'Trẻ rất dễ nhận ra điều tích cực, thường xuyên biết ơn', ARRAY['Be a gratitude role model', 'Create gratitude projects', 'Teach others about thankfulness'], '😄')
ON CONFLICT DO NOTHING;

-- Insert Score Levels for AGS-12
INSERT INTO gratitude_score_levels (scale_id, level_name, level_name_vi, min_score, max_score, description, description_vi, suggestions, emoji)
VALUES 
  ('AGS12_TEEN', 'Low', 'Thấp', 12, 27, 'Difficulty recognizing good things, tends to demand', 'Khó nhận ra điều tốt, dễ đòi hỏi; cần rèn kỹ năng tri ân', ARRAY['Daily gratitude journal', 'Thank one person each day', 'Notice 3 good things before sleep', 'Volunteer to help others'], '😔'),
  ('AGS12_TEEN', 'Average', 'Trung bình', 28, 43, 'Shows gratitude but not consistently', 'Có biết ơn nhưng chưa ổn định; phụ thuộc tình huống', ARRAY['Weekly gratitude reflection', 'Express thanks in text/letter', 'Help family without being asked', 'Practice mindful appreciation'], '🙂'),
  ('AGS12_TEEN', 'High', 'Cao', 44, 60, 'Strong awareness, emotional depth, acts on gratitude', 'Nhận biết ơn rõ, cảm xúc mạnh, hay đáp lại bằng hành động', ARRAY['Mentor younger students', 'Start gratitude projects', 'Practice loving-kindness meditation', 'Share gratitude practices online'], '😊')
ON CONFLICT DO NOTHING;

-- Insert Score Levels for Adult Dharma
INSERT INTO gratitude_score_levels (scale_id, level_name, level_name_vi, min_score, max_score, description, description_vi, suggestions, emoji)
VALUES 
  ('ADULT_DHARMA', 'Limited Gratitude', 'Biết ơn còn hạn chế', 20, 49, 'Recognize few conditions, strong sense of "mine"', 'Nhận rõ ít nhân duyên, tâm "của tôi" còn mạnh, ít thực tập lời cảm ơn', ARRAY['Daily journal: 3 things to be grateful for', 'Contemplate dependent origination in daily life', 'Practice saying thanks at least 3 times daily', 'Morning reflection on interconnection'], '🌑'),
  ('ADULT_DHARMA', 'Developing Gratitude', 'Biết ơn đang phát triển', 50, 79, 'Recognize many supporting conditions, beginning to let go', 'Đã nhận ra nhiều điều kiện nâng đỡ, biết buông xả dần, có thực tập nhưng chưa sâu', ARRAY['Daily contemplation of non-self and impermanence', 'Practice sympathetic joy for others', 'Engage in service to develop repaying kindness', 'Study dependent origination deeply'], '🌘'),
  ('ADULT_DHARMA', 'Deep Gratitude (Prajna)', 'Biết ơn sâu sắc - Biết ơn Bát Nhã', 80, 100, 'See dependent origination in all, grateful for both favorable and adverse', 'Thấy duyên khởi trong mọi sự, biết ơn cả thuận và nghịch, biết ơn đi cùng từ bi-trí tuệ', ARRAY['Contemplate three wheels empty in giving & service', 'Practice Prajna in all interactions', 'Cultivate equanimity and sympathetic joy', 'Teach gratitude to others'], '🌕')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_questions_scale ON gratitude_questions(scale_id);
CREATE INDEX IF NOT EXISTS idx_results_scale ON gratitude_test_results(scale_id);
CREATE INDEX IF NOT EXISTS idx_results_user ON gratitude_test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_results_completed ON gratitude_test_results(completed_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE gratitude_scales ENABLE ROW LEVEL SECURITY;
ALTER TABLE gratitude_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gratitude_score_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE gratitude_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE gratitude_test_results ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access to scales, questions, and levels
CREATE POLICY "Public read access to scales" ON gratitude_scales FOR SELECT USING (true);
CREATE POLICY "Public read access to questions" ON gratitude_questions FOR SELECT USING (true);
CREATE POLICY "Public read access to score levels" ON gratitude_score_levels FOR SELECT USING (true);

-- Allow anyone to insert users (for registration)
CREATE POLICY "Public can insert users" ON gratitude_users FOR INSERT WITH CHECK (true);

-- Allow anyone to read users (for lookup)
CREATE POLICY "Public can read users" ON gratitude_users FOR SELECT USING (true);

-- Allow users to update their own info
CREATE POLICY "Users can update own info" ON gratitude_users FOR UPDATE USING (true);

-- Allow anyone to insert test results
CREATE POLICY "Public can insert test results" ON gratitude_test_results FOR INSERT WITH CHECK (true);

-- Allow anyone to view test results (for now - can be restricted later)
CREATE POLICY "Public can view test results" ON gratitude_test_results FOR SELECT USING (true);

