// Legacy Grade 3 question bank (globals) reused as the adaptive item pool.
// Built-in Grade 3 question bank for offline use, structured to match the
// 2026 NJSLA-Adaptive format: three separate assessments — Mathematics,
// ELA-Reading, and ELA-Writing.
//
// Each question is tagged with subject, domain, CCSS/NJSLS standard, and a
// difficulty from 1 (easiest) to 5 (hardest). The adaptive engine pulls from
// this bank when no Claude API key is set (or as a fallback).
//
// Types:
//   'mc'    single-answer multiple choice -> answer is an index
//   'ms'    multi-select                  -> answer is an array of indices
//   'num'   numeric entry                 -> answer is a number
//   'essay' extended-response writing task -> scored on a 2-dimension rubric

const SUBJECTS = {
  math: 'Mathematics',
  reading: 'ELA — Reading',
  writing: 'ELA — Writing',
};

const DOMAINS = {
  math: {
    OA: 'Operations & Algebraic Thinking',
    NBT: 'Number & Operations in Base Ten',
    NF: 'Fractions',
    MD: 'Measurement & Data',
    G: 'Geometry',
  },
  reading: {
    RL: 'Reading: Literature',
    RI: 'Reading: Informational',
    L: 'Language & Vocabulary',
  },
  writing: {
    W: 'Written Expression',
  },
};

// Short reading passages used by ELA-Reading questions.
const PASSAGES = {
  p_garden: {
    title: 'Maya’s Garden',
    text:
      'Maya wanted to grow tomatoes in her backyard. In the spring, she dug small holes ' +
      'in the soft brown dirt and dropped in tiny seeds. Every morning before school she ' +
      'gave the seeds a drink of water. At first nothing happened, and Maya worried that ' +
      'the seeds were not growing. Then one Tuesday she saw tiny green shoots poking up ' +
      'through the soil. By summer, the plants were taller than Maya, and bright red ' +
      'tomatoes hung from the green stems. Maya was proud. She had learned that good things ' +
      'take patience and care.',
  },
  p_bats: {
    title: 'Amazing Bats',
    text:
      'Bats are the only mammals that can truly fly. Most bats sleep during the day and ' +
      'come out at night to find food. Many bats eat insects, and a single bat can catch ' +
      'thousands of mosquitoes in one night. To find their food in the dark, bats make ' +
      'high squeaking sounds. The sounds bounce off objects and come back to the bat’s ' +
      'ears. This is called echolocation. It helps bats know where things are, even when ' +
      'they cannot see them. Because bats eat so many insects, farmers are glad to have ' +
      'them living nearby.',
  },
  p_race: {
    title: 'The Big Race',
    text:
      'Tomas had practiced running all month for the school race. On the day of the race, ' +
      'his stomach felt full of butterflies. When the whistle blew, he ran as fast as he ' +
      'could. Halfway around the track, he saw his friend Dev trip and fall. Tomas slowed ' +
      'down and stopped to help Dev up. They finished the race together, in last place. ' +
      'Tomas did not win a ribbon, but his teacher said he had shown true sportsmanship. ' +
      'Tomas smiled. He felt like a winner anyway.',
  },
  p_moon: {
    title: 'Our Moon',
    text:
      'The Moon is Earth’s closest neighbor in space. It does not make its own light. ' +
      'Instead, it shines because sunlight bounces off it. The Moon moves around Earth, ' +
      'and it takes about one month to travel all the way around. As the Moon moves, we see ' +
      'different amounts of its lighted side. These shapes are called phases. Sometimes the ' +
      'Moon looks like a thin curve, and other times it looks like a bright circle. People ' +
      'have studied the Moon for thousands of years, and astronauts have even walked on it.',
  },
  p_lost: {
    title: 'The Lost Mitten',
    text:
      'On a snowy morning, Lily lost one of her red mittens on the way to school. She looked ' +
      'everywhere but could not find it. That afternoon, her friend Sam came to her desk ' +
      'smiling. He had found the mitten near the swings and kept it safe all day. Lily ' +
      'thanked him again and again. The next day, Lily brought Sam a warm cookie to say ' +
      'thank you. The two friends laughed together. Lily learned that good friends look out ' +
      'for each other.',
  },
};

const QUESTIONS = [
  // ===================== MATH: Operations & Algebraic Thinking =====================
  { id: 'm_oa_1', subject: 'math', domain: 'OA', standard: '3.OA.A.1', difficulty: 1, type: 'mc',
    stem: 'There are 3 bags. Each bag has 4 apples. How many apples are there in all?',
    choices: ['7', '12', '34', '1'], answer: 1, explanation: '3 groups of 4 = 3 × 4 = 12.' },
  { id: 'm_oa_2', subject: 'math', domain: 'OA', standard: '3.OA.A.3', difficulty: 2, type: 'mc',
    stem: 'A box holds 6 crayons. How many crayons are in 5 boxes?',
    choices: ['11', '30', '25', '36'], answer: 1, explanation: '5 × 6 = 30.' },
  { id: 'm_oa_3', subject: 'math', domain: 'OA', standard: '3.OA.A.2', difficulty: 2, type: 'mc',
    stem: '15 stickers are shared equally among 3 friends. How many stickers does each friend get?',
    choices: ['3', '5', '12', '18'], answer: 1, explanation: '15 ÷ 3 = 5.' },
  { id: 'm_oa_4', subject: 'math', domain: 'OA', standard: '3.OA.C.7', difficulty: 1, type: 'mc',
    stem: 'What is 7 × 2?',
    choices: ['9', '14', '12', '5'], answer: 1, explanation: '7 × 2 = 14.' },
  { id: 'm_oa_5', subject: 'math', domain: 'OA', standard: '3.OA.C.7', difficulty: 3, type: 'mc',
    stem: 'What is 8 × 7?',
    choices: ['54', '56', '63', '49'], answer: 1, explanation: '8 × 7 = 56.' },
  { id: 'm_oa_6', subject: 'math', domain: 'OA', standard: '3.OA.A.4', difficulty: 3, type: 'num',
    stem: 'Find the missing number: 4 × ___ = 36. Type the number.',
    answer: 9, explanation: '4 × 9 = 36, so the missing number is 9.' },
  { id: 'm_oa_7', subject: 'math', domain: 'OA', standard: '3.OA.D.8', difficulty: 4, type: 'mc',
    stem: 'Sara had 24 marbles. She gave away 6 and then bought 3 more bags with 5 marbles each. How many marbles does she have now?',
    choices: ['33', '18', '27', '23'], answer: 0, explanation: '24 − 6 = 18, then 3 × 5 = 15, and 18 + 15 = 33.' },
  { id: 'm_oa_8', subject: 'math', domain: 'OA', standard: '3.OA.D.9', difficulty: 4, type: 'mc',
    stem: 'Which number completes the pattern? 5, 10, 15, 20, ___',
    choices: ['22', '24', '25', '30'], answer: 2, explanation: 'The pattern adds 5 each time, so 20 + 5 = 25.' },
  { id: 'm_oa_9', subject: 'math', domain: 'OA', standard: '3.OA.D.8', difficulty: 5, type: 'num',
    stem: 'A teacher has 7 packs of pencils with 8 pencils in each pack. She gives 9 pencils to the office. How many pencils are left? Type the number.',
    answer: 47, explanation: '7 × 8 = 56, then 56 − 9 = 47.' },
  { id: 'm_oa_10', subject: 'math', domain: 'OA', standard: '3.OA.C.7', difficulty: 5, type: 'ms',
    stem: 'Which expressions equal 24? Select ALL that apply.',
    choices: ['6 × 4', '3 × 8', '5 × 5', '12 + 12'], answer: [0, 1, 3], explanation: '6×4=24, 3×8=24, 12+12=24. But 5×5=25.' },
  { id: 'm_oa_11', subject: 'math', domain: 'OA', standard: '3.OA.C.7', difficulty: 3, type: 'mc',
    stem: 'What is 6 × 6?', choices: ['12', '36', '30', '42'], answer: 1, explanation: '6 × 6 = 36.' },
  { id: 'm_oa_12', subject: 'math', domain: 'OA', standard: '3.OA.A.3', difficulty: 4, type: 'num',
    stem: 'There are 9 rows of chairs with 7 chairs in each row. How many chairs are there? Type the number.',
    answer: 63, explanation: '9 × 7 = 63.' },
  { id: 'm_oa_13', subject: 'math', domain: 'OA', standard: '3.OA.A.2', difficulty: 2, type: 'mc',
    stem: '24 ÷ 6 = ?', choices: ['3', '4', '6', '8'], answer: 1, explanation: '24 ÷ 6 = 4.' },

  // ===================== MATH: Number & Operations in Base Ten =====================
  { id: 'm_nbt_1', subject: 'math', domain: 'NBT', standard: '3.NBT.A.1', difficulty: 1, type: 'mc',
    stem: 'Round 48 to the nearest ten.',
    choices: ['40', '50', '45', '60'], answer: 1, explanation: '48 is closer to 50 than 40.' },
  { id: 'm_nbt_2', subject: 'math', domain: 'NBT', standard: '3.NBT.A.2', difficulty: 2, type: 'num',
    stem: 'What is 256 + 137? Type the number.',
    answer: 393, explanation: '256 + 137 = 393.' },
  { id: 'm_nbt_3', subject: 'math', domain: 'NBT', standard: '3.NBT.A.2', difficulty: 2, type: 'num',
    stem: 'What is 405 − 168? Type the number.',
    answer: 237, explanation: '405 − 168 = 237.' },
  { id: 'm_nbt_4', subject: 'math', domain: 'NBT', standard: '3.NBT.A.1', difficulty: 3, type: 'mc',
    stem: 'Round 372 to the nearest hundred.',
    choices: ['300', '370', '400', '380'], answer: 2, explanation: '372 is closer to 400 than to 300.' },
  { id: 'm_nbt_5', subject: 'math', domain: 'NBT', standard: '3.NBT.A.3', difficulty: 3, type: 'mc',
    stem: 'What is 6 × 40?',
    choices: ['240', '46', '24', '200'], answer: 0, explanation: '6 × 4 = 24, then add a zero: 240.' },
  { id: 'm_nbt_6', subject: 'math', domain: 'NBT', standard: '3.NBT.A.2', difficulty: 4, type: 'num',
    stem: 'A library had 628 books. They received 145 more and then 87 were checked out. How many books are in the library now? Type the number.',
    answer: 686, explanation: '628 + 145 = 773, then 773 − 87 = 686.' },
  { id: 'm_nbt_7', subject: 'math', domain: 'NBT', standard: '3.NBT.A.1', difficulty: 5, type: 'mc',
    stem: 'A number rounds to 600 when rounded to the nearest hundred. Which number could it be?',
    choices: ['540', '661', '655', '551'], answer: 3, explanation: 'A number rounds to 600 if it is from 550 to 649. 551 rounds to 600. (540 → 500, 661 → 700, 655 → 700.)' },
  { id: 'm_nbt_8', subject: 'math', domain: 'NBT', standard: '3.NBT.A.1', difficulty: 1, type: 'mc',
    stem: 'What is the value of the 7 in the number 472?', choices: ['7', '70', '700', '47'], answer: 1, explanation: 'The 7 is in the tens place, so it means 70.' },
  { id: 'm_nbt_9', subject: 'math', domain: 'NBT', standard: '3.NBT.A.2', difficulty: 3, type: 'num',
    stem: 'What is 318 + 256? Type the number.', answer: 574, explanation: '318 + 256 = 574.' },

  // ===================== MATH: Fractions =====================
  { id: 'm_nf_1', subject: 'math', domain: 'NF', standard: '3.NF.A.1', difficulty: 1, type: 'mc',
    stem: 'A pizza is cut into 4 equal pieces. You eat 1 piece. What fraction did you eat?',
    choices: ['1/2', '1/4', '4/1', '1/3'], answer: 1, explanation: '1 piece out of 4 equal pieces is 1/4.' },
  { id: 'm_nf_2', subject: 'math', domain: 'NF', standard: '3.NF.A.3', difficulty: 2, type: 'mc',
    stem: 'Which fraction is equal to 1/2?',
    choices: ['2/4', '1/3', '3/4', '1/4'], answer: 0, explanation: '2/4 = 1/2.' },
  { id: 'm_nf_3', subject: 'math', domain: 'NF', standard: '3.NF.A.3', difficulty: 3, type: 'mc',
    stem: 'Which fraction is greater: 3/4 or 1/4?',
    choices: ['3/4', '1/4', 'They are equal', 'Cannot tell'], answer: 0, explanation: '3 fourths is more than 1 fourth.' },
  { id: 'm_nf_4', subject: 'math', domain: 'NF', standard: '3.NF.A.2', difficulty: 3, type: 'mc',
    stem: 'On a number line from 0 to 1 split into 6 equal parts, which fraction is at the 5th mark?',
    choices: ['5/6', '6/5', '1/6', '5/1'], answer: 0, explanation: 'The 5th mark out of 6 equal parts is 5/6.' },
  { id: 'm_nf_5', subject: 'math', domain: 'NF', standard: '3.NF.A.3', difficulty: 4, type: 'mc',
    stem: 'Which comparison is TRUE?',
    choices: ['2/3 < 1/3', '1/8 > 1/4', '2/6 = 1/3', '3/4 < 1/2'], answer: 2, explanation: '2/6 simplifies to 1/3, so 2/6 = 1/3.' },
  { id: 'm_nf_6', subject: 'math', domain: 'NF', standard: '3.NF.A.3', difficulty: 5, type: 'ms',
    stem: 'Which fractions are equal to 1 whole? Select ALL that apply.',
    choices: ['4/4', '3/3', '2/3', '6/6'], answer: [0, 1, 3], explanation: 'Any fraction with the same top and bottom equals 1 whole: 4/4, 3/3, 6/6.' },
  { id: 'm_nf_7', subject: 'math', domain: 'NF', standard: '3.NF.A.1', difficulty: 2, type: 'mc',
    stem: 'A rectangle is split into 3 equal parts and 2 are shaded. What fraction is shaded?',
    choices: ['2/3', '3/2', '1/3', '2/5'], answer: 0, explanation: '2 shaded out of 3 equal parts is 2/3.' },

  // ===================== MATH: Measurement & Data =====================
  { id: 'm_md_1', subject: 'math', domain: 'MD', standard: '3.MD.A.1', difficulty: 1, type: 'mc',
    stem: 'A clock shows 3:00. What time will it be in 1 hour?',
    choices: ['2:00', '4:00', '3:30', '5:00'], answer: 1, explanation: '3:00 + 1 hour = 4:00.' },
  { id: 'm_md_2', subject: 'math', domain: 'MD', standard: '3.MD.A.1', difficulty: 2, type: 'mc',
    stem: 'Recess started at 10:15 and lasted 20 minutes. What time did it end?',
    choices: ['10:35', '10:20', '10:45', '11:15'], answer: 0, explanation: '10:15 + 20 minutes = 10:35.' },
  { id: 'm_md_3', subject: 'math', domain: 'MD', standard: '3.MD.C.7', difficulty: 3, type: 'num',
    stem: 'A rectangle is 5 units long and 3 units wide. What is its area in square units? Type the number.',
    answer: 15, explanation: 'Area = length × width = 5 × 3 = 15 square units.' },
  { id: 'm_md_4', subject: 'math', domain: 'MD', standard: '3.MD.D.8', difficulty: 3, type: 'num',
    stem: 'A square has sides of 6 cm. What is its perimeter in cm? Type the number.',
    answer: 24, explanation: 'Perimeter = 6 + 6 + 6 + 6 = 24 cm.' },
  { id: 'm_md_5', subject: 'math', domain: 'MD', standard: '3.MD.B.3', difficulty: 4, type: 'mc',
    stem: 'A bar graph shows: Dogs 8, Cats 5, Birds 3. How many more dogs than birds are there?',
    choices: ['11', '5', '3', '8'], answer: 1, explanation: '8 dogs − 3 birds = 5 more dogs.' },
  { id: 'm_md_6', subject: 'math', domain: 'MD', standard: '3.MD.C.7', difficulty: 5, type: 'num',
    stem: 'A garden is made of two rectangles joined together. One is 4 by 3 and the other is 2 by 3. What is the total area in square units? Type the number.',
    answer: 18, explanation: '4×3 = 12 and 2×3 = 6; 12 + 6 = 18 square units.' },
  { id: 'm_md_7', subject: 'math', domain: 'MD', standard: '3.MD.A.2', difficulty: 3, type: 'mc',
    stem: 'A bottle holds 2 liters of water. How many liters do 4 bottles hold?',
    choices: ['6', '8', '2', '24'], answer: 1, explanation: '4 × 2 = 8 liters.' },

  // ===================== MATH: Geometry =====================
  { id: 'm_g_1', subject: 'math', domain: 'G', standard: '3.G.A.1', difficulty: 1, type: 'mc',
    stem: 'How many sides does a triangle have?',
    choices: ['2', '3', '4', '5'], answer: 1, explanation: 'A triangle has 3 sides.' },
  { id: 'm_g_2', subject: 'math', domain: 'G', standard: '3.G.A.1', difficulty: 2, type: 'mc',
    stem: 'Which shape is a quadrilateral (has exactly 4 sides)?',
    choices: ['Triangle', 'Square', 'Circle', 'Pentagon'], answer: 1, explanation: 'A square has 4 sides, so it is a quadrilateral.' },
  { id: 'm_g_3', subject: 'math', domain: 'G', standard: '3.G.A.2', difficulty: 3, type: 'mc',
    stem: 'A shape is divided into 4 equal parts. Each part is what fraction of the whole?',
    choices: ['1/2', '1/3', '1/4', '4'], answer: 2, explanation: 'One of 4 equal parts is 1/4.' },
  { id: 'm_g_4', subject: 'math', domain: 'G', standard: '3.G.A.1', difficulty: 4, type: 'ms',
    stem: 'Which shapes are ALWAYS quadrilaterals? Select ALL that apply.',
    choices: ['Rectangle', 'Rhombus', 'Triangle', 'Square'], answer: [0, 1, 3], explanation: 'Rectangles, rhombuses, and squares all have 4 sides. A triangle has 3.' },
  { id: 'm_g_5', subject: 'math', domain: 'G', standard: '3.G.A.1', difficulty: 3, type: 'mc',
    stem: 'Which is NOT a quadrilateral?', choices: ['Square', 'Rectangle', 'Triangle', 'Rhombus'], answer: 2, explanation: 'A triangle has 3 sides; the others have 4.' },

  // ===================== READING: Literature =====================
  { id: 'e_rl_1', subject: 'reading', domain: 'RL', standard: 'RL.3.1', difficulty: 1, type: 'mc', passage: 'p_garden',
    stem: 'What did Maya want to grow in her backyard?',
    choices: ['Flowers', 'Tomatoes', 'Corn', 'Trees'], answer: 1, explanation: 'The first sentence says Maya wanted to grow tomatoes.' },
  { id: 'e_rl_2', subject: 'reading', domain: 'RL', standard: 'RL.3.3', difficulty: 2, type: 'mc', passage: 'p_garden',
    stem: 'Why did Maya worry at first?',
    choices: ['It was raining', 'Nothing was growing yet', 'She lost her seeds', 'Birds ate the seeds'], answer: 1, explanation: '"At first nothing happened, and Maya worried that the seeds were not growing."' },
  { id: 'e_rl_3', subject: 'reading', domain: 'RL', standard: 'RL.3.2', difficulty: 4, type: 'mc', passage: 'p_garden',
    stem: 'What is the main lesson, or theme, of the story?',
    choices: ['Tomatoes are red', 'Good things take patience and care', 'Gardens need water', 'School starts in spring'], answer: 1, explanation: 'The last line states the lesson: good things take patience and care.' },
  { id: 'e_rl_4', subject: 'reading', domain: 'RL', standard: 'RL.3.3', difficulty: 3, type: 'mc', passage: 'p_race',
    stem: 'Why did Tomas stop during the race?',
    choices: ['He was tired', 'To help his friend Dev who fell', 'He forgot the way', 'He dropped his shoe'], answer: 1, explanation: 'Tomas slowed down and stopped to help Dev up after Dev tripped.' },
  { id: 'e_rl_5', subject: 'reading', domain: 'RL', standard: 'RL.3.2', difficulty: 5, type: 'mc', passage: 'p_race',
    stem: 'The story says Tomas "felt like a winner anyway." What does this MOST show about Tomas?',
    choices: ['He cared more about kindness than winning', 'He was angry he lost', 'He did not try hard', 'He wanted a ribbon'], answer: 0, explanation: 'Helping his friend mattered more to Tomas than winning a ribbon.' },
  { id: 'e_rl_6', subject: 'reading', domain: 'RL', standard: 'RL.3.4', difficulty: 3, type: 'mc', passage: 'p_race',
    stem: 'In the story, "his stomach felt full of butterflies" means Tomas felt —',
    choices: ['hungry', 'sick from food', 'nervous', 'sleepy'], answer: 2, explanation: '"Butterflies in the stomach" is an expression meaning nervous.' },
  { id: 'e_rl_7', subject: 'reading', domain: 'RL', standard: 'RL.3.1', difficulty: 1, type: 'mc', passage: 'p_lost',
    stem: 'What did Lily lose on the way to school?', choices: ['Her hat', 'A red mitten', 'Her lunch', 'A book'], answer: 1, explanation: 'Lily lost one of her red mittens.' },
  { id: 'e_rl_8', subject: 'reading', domain: 'RL', standard: 'RL.3.3', difficulty: 3, type: 'mc', passage: 'p_lost',
    stem: 'How did Lily thank Sam?', choices: ['She gave him a cookie', 'She gave him money', 'She gave him a mitten', 'She did not thank him'], answer: 0, explanation: 'Lily brought Sam a warm cookie to say thank you.' },
  { id: 'e_rl_9', subject: 'reading', domain: 'RL', standard: 'RL.3.2', difficulty: 4, type: 'mc', passage: 'p_lost',
    stem: 'What is the lesson of the story?', choices: ['Always wear mittens', 'Good friends look out for each other', 'Cookies are tasty', 'Snow is cold'], answer: 1, explanation: 'The last sentence states the lesson about friendship.' },

  // ===================== READING: Informational =====================
  { id: 'e_ri_1', subject: 'reading', domain: 'RI', standard: 'RI.3.1', difficulty: 1, type: 'mc', passage: 'p_bats',
    stem: 'According to the passage, what is special about bats?',
    choices: ['They are the only mammals that can truly fly', 'They are birds', 'They cannot see at all', 'They sleep at night'], answer: 0, explanation: 'The passage says bats are the only mammals that can truly fly.' },
  { id: 'e_ri_2', subject: 'reading', domain: 'RI', standard: 'RI.3.4', difficulty: 3, type: 'mc', passage: 'p_bats',
    stem: 'What does "echolocation" help bats do?',
    choices: ['Fly faster', 'Find food in the dark', 'Sleep better', 'Talk to farmers'], answer: 1, explanation: 'Echolocation helps bats know where things are in the dark.' },
  { id: 'e_ri_3', subject: 'reading', domain: 'RI', standard: 'RI.3.2', difficulty: 4, type: 'mc', passage: 'p_bats',
    stem: 'What is the main idea of the passage?',
    choices: ['Bats are scary', 'Bats are interesting animals that help by eating insects', 'Farmers do not like bats', 'Bats only live in caves'], answer: 1, explanation: 'The passage describes what makes bats interesting and how they help farmers by eating insects.' },
  { id: 'e_ri_4', subject: 'reading', domain: 'RI', standard: 'RI.3.3', difficulty: 5, type: 'mc', passage: 'p_bats',
    stem: 'Why are farmers glad to have bats living nearby?',
    choices: ['Bats are pretty', 'Bats eat many insects that can harm crops', 'Bats make good pets', 'Bats fly at night'], answer: 1, explanation: 'Bats eat huge numbers of insects, which helps farmers protect their crops.' },
  { id: 'e_ri_5', subject: 'reading', domain: 'RI', standard: 'RI.3.1', difficulty: 2, type: 'mc', passage: 'p_moon',
    stem: 'Why does the Moon shine?', choices: ['It makes its own light', 'Sunlight bounces off it', 'It is on fire', 'Stars light it up'], answer: 1, explanation: 'The Moon shines because sunlight bounces off it.' },
  { id: 'e_ri_6', subject: 'reading', domain: 'RI', standard: 'RI.3.4', difficulty: 3, type: 'mc', passage: 'p_moon',
    stem: 'In the passage, the word "phases" means —', choices: ['the different shapes of the lighted Moon', 'the color of the Moon', 'the size of Earth', 'the speed of the Moon'], answer: 0, explanation: 'Phases are the different amounts of the Moon’s lighted side that we see.' },
  { id: 'e_ri_7', subject: 'reading', domain: 'RI', standard: 'RI.3.2', difficulty: 4, type: 'mc', passage: 'p_moon',
    stem: 'What is the main idea of the passage?', choices: ['The Moon is made of cheese', 'The Moon is Earth’s neighbor that we can learn about', 'Astronauts are brave', 'Sunlight is bright'], answer: 1, explanation: 'The passage gives facts about the Moon as Earth’s neighbor.' },

  // ===================== READING: Language & Vocabulary =====================
  { id: 'e_l_1', subject: 'reading', domain: 'L', standard: 'L.3.1', difficulty: 1, type: 'mc',
    stem: 'Choose the correct word: The dog wagged ___ tail.',
    choices: ['it’s', 'its', 'its’', 'it'], answer: 1, explanation: '"Its" shows possession; "it’s" means "it is".' },
  { id: 'e_l_2', subject: 'reading', domain: 'L', standard: 'L.3.2', difficulty: 2, type: 'mc',
    stem: 'Which sentence is written correctly?',
    choices: ['we went to the park.', 'We went to the park.', 'We went to the park', 'we Went to the Park.'], answer: 1, explanation: 'A sentence begins with a capital letter and ends with a period.' },
  { id: 'e_l_3', subject: 'reading', domain: 'L', standard: 'L.3.4', difficulty: 3, type: 'mc',
    stem: 'The prefix "un-" in the word "unhappy" means —',
    choices: ['very', 'not', 'again', 'before'], answer: 1, explanation: '"Un-" means "not," so "unhappy" means "not happy."' },
  { id: 'e_l_4', subject: 'reading', domain: 'L', standard: 'L.3.5', difficulty: 3, type: 'mc',
    stem: 'Which word is a SYNONYM for "happy"?',
    choices: ['sad', 'glad', 'tired', 'angry'], answer: 1, explanation: '"Glad" means about the same as "happy."' },
  { id: 'e_l_5', subject: 'reading', domain: 'L', standard: 'L.3.4', difficulty: 4, type: 'mc',
    stem: 'Read the sentence: "The hikers were exhausted after the long climb." What does "exhausted" mean?',
    choices: ['very tired', 'very happy', 'very fast', 'very hungry'], answer: 0, explanation: 'After a long climb, the hikers would be very tired.' },
  { id: 'e_l_6', subject: 'reading', domain: 'L', standard: 'L.3.1', difficulty: 5, type: 'ms',
    stem: 'Which sentences use a verb in the PAST tense? Select ALL that apply.',
    choices: ['She walked to school.', 'They play outside.', 'He jumped over the log.', 'We will eat lunch.'], answer: [0, 2], explanation: '"Walked" and "jumped" are past tense. "Play" is present and "will eat" is future.' },
  { id: 'e_l_7', subject: 'reading', domain: 'L', standard: 'L.3.1', difficulty: 2, type: 'mc',
    stem: 'Choose the correct plural: one child, two ___.', choices: ['childs', 'children', 'childes', 'child'], answer: 1, explanation: 'The plural of "child" is "children".' },
  { id: 'e_l_8', subject: 'reading', domain: 'L', standard: 'L.3.5', difficulty: 3, type: 'mc',
    stem: 'Which word is an ANTONYM (opposite) of "begin"?', choices: ['start', 'end', 'open', 'go'], answer: 1, explanation: '"End" is the opposite of "begin".' },
  { id: 'e_l_9', subject: 'reading', domain: 'L', standard: 'L.3.2', difficulty: 4, type: 'mc',
    stem: 'Which sentence uses commas correctly?', choices: ['I bought apples oranges and pears.', 'I bought apples, oranges, and pears.', 'I bought, apples oranges and pears.', 'I, bought apples oranges and pears.'], answer: 1, explanation: 'Commas separate items in a list: apples, oranges, and pears.' },

  // ===================== WRITING: extended-response tasks =====================
  // The Writing assessment is a single extended-response task, scored on two
  // dimensions (Composition and Conventions). The engine picks ONE of these.
  { id: 'w_opinion_1', subject: 'writing', domain: 'W', standard: 'W.3.1', difficulty: 3, type: 'essay', mode: 'Opinion',
    stem: 'Some schools are thinking about having a longer recess. Do you think recess should be longer? Write an opinion essay. State your opinion clearly, give at least two reasons, and explain each reason with details. Write in complete paragraphs.',
    rubric: 'Composition (ideas & organization): clear stated opinion, at least two reasons each developed with details, logical order, beginning and ending. Conventions: complete sentences, correct capitalization, punctuation, and grade-3 spelling.' },
  { id: 'w_narr_1', subject: 'writing', domain: 'W', standard: 'W.3.3', difficulty: 3, type: 'essay', mode: 'Narrative',
    stem: 'Write a story about a day when something surprising happened to you or a character you make up. Tell the events in order. Include what the characters did, said, and felt. Give your story a clear beginning, middle, and end.',
    rubric: 'Composition (ideas & organization): clear sequence of events, characters with actions/feelings/dialogue, descriptive details, satisfying ending. Conventions: complete sentences, correct capitalization, punctuation, and grade-3 spelling.' },
  { id: 'w_info_1', subject: 'writing', domain: 'W', standard: 'W.3.2', difficulty: 3, type: 'essay', mode: 'Informative',
    stem: 'Think of an animal you know about. Write to teach a reader about that animal. Tell what it looks like, where it lives, and what it eats. Use facts and details, and group your ideas together. Write in complete paragraphs.',
    rubric: 'Composition (ideas & organization): clear topic, facts and details grouped logically, an introduction and conclusion. Conventions: complete sentences, correct capitalization, punctuation, and grade-3 spelling.' },
];

// ---- Additional ELA-Reading passages + items (reduce recycling in full tests) ----
Object.assign(PASSAGES, {
  p_turtles: {
    title: 'Sea Turtles',
    text:
      'Sea turtles are reptiles that live in the ocean. A mother sea turtle crawls onto a ' +
      'sandy beach at night to lay her eggs. She digs a deep hole, lays many eggs, and ' +
      'covers them with sand. Then she returns to the sea. Weeks later, tiny baby turtles, ' +
      'called hatchlings, dig their way out and hurry to the water. Many animals try to eat ' +
      'the hatchlings, so only a few grow up. Sea turtles can live for many years and travel ' +
      'thousands of miles in the ocean. Today, people work to keep beaches safe so more ' +
      'turtles can survive.',
  },
  p_kite: {
    title: 'Ravi’s Kite',
    text:
      'Ravi got a bright blue kite for his birthday. On a windy Saturday, he took it to the ' +
      'park with his dad. At first the kite would not fly. It kept dipping down and crashing ' +
      'into the grass. Ravi felt like giving up. His dad showed him how to run into the wind ' +
      'and let the string out slowly. Ravi tried again, and this time the kite lifted high ' +
      'into the sky. He laughed as it danced above the trees. Ravi was glad he had not quit.',
  },
  p_recycle: {
    title: 'Why We Recycle',
    text:
      'Every day, people throw away paper, cans, and plastic. When this trash goes to a ' +
      'landfill, it can stay there for a very long time. Recycling is a better choice. When ' +
      'we recycle, old materials are made into new things. Used paper can become new paper, ' +
      'and old cans can become new cans. Recycling saves energy and keeps our land and water ' +
      'clean. You can help by sorting your trash and putting bottles and paper in the ' +
      'recycling bin. Small actions by many people can make a big difference.',
  },
  p_newpup: {
    title: 'A New Puppy',
    text:
      'Grace had wanted a dog for a long time. One Saturday, her family went to the animal ' +
      'shelter. There were big dogs, small dogs, and noisy dogs. In the corner, a small brown ' +
      'puppy sat quietly, wagging its tail. Grace knelt down, and the puppy licked her hand. ' +
      'She knew right away that this was the one. Grace named the puppy Cocoa. At home, Cocoa ' +
      'chewed a slipper and tipped over the water bowl, but Grace did not mind. She had a new ' +
      'best friend, and she promised to take good care of him.',
  },
});

QUESTIONS.push(
  // Reading: Literature (new)
  { id: 'e_rl_10', subject: 'reading', domain: 'RL', standard: 'RL.3.1', difficulty: 1, type: 'mc', passage: 'p_kite',
    stem: 'What did Ravi get for his birthday?', choices: ['A bike', 'A blue kite', 'A puppy', 'A ball'], answer: 1, explanation: 'Ravi got a bright blue kite for his birthday.' },
  { id: 'e_rl_11', subject: 'reading', domain: 'RL', standard: 'RL.3.3', difficulty: 3, type: 'mc', passage: 'p_kite',
    stem: 'Why did the kite finally fly?', choices: ['The wind stopped', 'Ravi ran into the wind and let the string out slowly', 'Ravi bought a new kite', 'Ravi’s dad threw it'], answer: 1, explanation: 'His dad showed him to run into the wind and let the string out slowly.' },
  { id: 'e_rl_12', subject: 'reading', domain: 'RL', standard: 'RL.3.2', difficulty: 4, type: 'mc', passage: 'p_kite',
    stem: 'What is the lesson of this story?', choices: ['Kites are blue', 'Do not give up when something is hard', 'Parks are fun', 'Birthdays are the best'], answer: 1, explanation: 'Ravi almost quit but kept trying and succeeded — don’t give up.' },
  { id: 'e_rl_13', subject: 'reading', domain: 'RL', standard: 'RL.3.1', difficulty: 2, type: 'mc', passage: 'p_newpup',
    stem: 'Where did Grace’s family get the puppy?', choices: ['A pet store', 'The animal shelter', 'A friend', 'The park'], answer: 1, explanation: 'They went to the animal shelter.' },
  { id: 'e_rl_14', subject: 'reading', domain: 'RL', standard: 'RL.3.3', difficulty: 3, type: 'mc', passage: 'p_newpup',
    stem: 'How did Grace know the brown puppy was the right one?', choices: ['It was the biggest', 'It barked the loudest', 'It sat quietly and licked her hand', 'It was sleeping'], answer: 2, explanation: 'The quiet puppy wagged its tail and licked her hand, and she knew right away.' },
  { id: 'e_rl_15', subject: 'reading', domain: 'RL', standard: 'RL.3.4', difficulty: 4, type: 'mc', passage: 'p_newpup',
    stem: 'The puppy chewed a slipper and tipped the water bowl, "but Grace did not mind." This shows that Grace —', choices: ['was angry', 'cared about the puppy more than the mess', 'wanted a different dog', 'was bored'], answer: 1, explanation: 'She was happy to have a new best friend and did not mind the trouble.' },

  // Reading: Informational (new)
  { id: 'e_ri_8', subject: 'reading', domain: 'RI', standard: 'RI.3.1', difficulty: 2, type: 'mc', passage: 'p_turtles',
    stem: 'Where does a mother sea turtle lay her eggs?', choices: ['In the water', 'In a tree', 'In a hole on a sandy beach', 'In a nest of sticks'], answer: 2, explanation: 'She digs a deep hole on a sandy beach and lays her eggs there.' },
  { id: 'e_ri_9', subject: 'reading', domain: 'RI', standard: 'RI.3.4', difficulty: 3, type: 'mc', passage: 'p_turtles',
    stem: 'What are baby sea turtles called?', choices: ['Hatchlings', 'Cubs', 'Calves', 'Chicks'], answer: 0, explanation: 'The passage says baby turtles are called hatchlings.' },
  { id: 'e_ri_10', subject: 'reading', domain: 'RI', standard: 'RI.3.3', difficulty: 4, type: 'mc', passage: 'p_turtles',
    stem: 'Why do only a few hatchlings grow up?', choices: ['They get lost', 'Many animals try to eat them', 'They are too slow to swim', 'They stay on the beach'], answer: 1, explanation: 'Many animals try to eat the hatchlings, so only a few survive.' },
  { id: 'e_ri_11', subject: 'reading', domain: 'RI', standard: 'RI.3.2', difficulty: 3, type: 'mc', passage: 'p_recycle',
    stem: 'What is the main idea of "Why We Recycle"?', choices: ['Trash is fun', 'Recycling helps by turning old materials into new things and keeping Earth clean', 'Landfills are nice', 'Paper is white'], answer: 1, explanation: 'The passage explains how recycling reuses materials and keeps land and water clean.' },
  { id: 'e_ri_12', subject: 'reading', domain: 'RI', standard: 'RI.3.1', difficulty: 2, type: 'mc', passage: 'p_recycle',
    stem: 'According to the passage, what can used paper become?', choices: ['New cans', 'New paper', 'Plastic', 'Glass'], answer: 1, explanation: 'The passage says used paper can become new paper.' },
  { id: 'e_ri_13', subject: 'reading', domain: 'RI', standard: 'RI.3.8', difficulty: 5, type: 'mc', passage: 'p_recycle',
    stem: 'Which sentence from the passage BEST supports the idea that one person can help?', choices: ['"Every day, people throw away paper, cans, and plastic."', '"You can help by sorting your trash and putting bottles and paper in the recycling bin."', '"Recycling is a better choice."', '"It can stay there for a very long time."'], answer: 1, explanation: 'That sentence tells what a single reader can do to help.' },

  // Reading: Language & Vocabulary (new)
  { id: 'e_l_10', subject: 'reading', domain: 'L', standard: 'L.3.4', difficulty: 2, type: 'mc',
    stem: 'The suffix "-ful" in the word "helpful" means —', choices: ['without', 'full of', 'again', 'before'], answer: 1, explanation: '"-ful" means "full of," so "helpful" means full of help.' },
  { id: 'e_l_11', subject: 'reading', domain: 'L', standard: 'L.3.5', difficulty: 3, type: 'mc',
    stem: 'Which word means ALMOST the same as "tiny"?', choices: ['huge', 'small', 'fast', 'loud'], answer: 1, explanation: '"Small" is a synonym for "tiny."' },
  { id: 'e_l_12', subject: 'reading', domain: 'L', standard: 'L.3.1', difficulty: 3, type: 'mc',
    stem: 'Choose the correct word: She ran ___ than her brother.', choices: ['fast', 'faster', 'fastest', 'more fast'], answer: 1, explanation: 'Comparing two people uses "faster."' },
  { id: 'e_l_13', subject: 'reading', domain: 'L', standard: 'L.3.2', difficulty: 2, type: 'mc',
    stem: 'Which word is spelled correctly?', choices: ['frend', 'freind', 'friend', 'freind'], answer: 2, explanation: 'The correct spelling is "friend."' },
  { id: 'e_l_14', subject: 'reading', domain: 'L', standard: 'L.3.1', difficulty: 4, type: 'mc',
    stem: 'Which word is a CONJUNCTION that joins two ideas in: "I was tired, ___ I kept working."', choices: ['but', 'dog', 'quickly', 'under'], answer: 0, explanation: '"But" is a conjunction that connects two ideas.' },
  { id: 'e_l_15', subject: 'reading', domain: 'L', standard: 'L.3.4', difficulty: 5, type: 'mc',
    stem: 'Read: "The room was spotless after we cleaned." The word "spotless" most likely means —', choices: ['very dirty', 'very clean', 'very dark', 'very large'], answer: 1, explanation: 'Cleaning makes a room spotless, which means very clean (without spots).' }
);

// ===================== MATH expansion (to 100+ items) =====================
QUESTIONS.push(
  // Operations & Algebraic Thinking
  { id: 'm_oa_14', subject: 'math', domain: 'OA', standard: '3.OA.C.7', difficulty: 1, type: 'mc', stem: 'What is 3 × 3?', choices: ['6', '9', '12', '3'], answer: 1, explanation: '3 × 3 = 9.' },
  { id: 'm_oa_15', subject: 'math', domain: 'OA', standard: '3.OA.C.7', difficulty: 1, type: 'mc', stem: 'What is 2 × 8?', choices: ['10', '16', '18', '14'], answer: 1, explanation: '2 × 8 = 16.' },
  { id: 'm_oa_16', subject: 'math', domain: 'OA', standard: '3.OA.C.7', difficulty: 2, type: 'mc', stem: 'What is 9 × 5?', choices: ['40', '45', '50', '54'], answer: 1, explanation: '9 × 5 = 45.' },
  { id: 'm_oa_17', subject: 'math', domain: 'OA', standard: '3.OA.A.2', difficulty: 2, type: 'mc', stem: 'What is 28 ÷ 4?', choices: ['6', '7', '8', '9'], answer: 1, explanation: '28 ÷ 4 = 7.' },
  { id: 'm_oa_18', subject: 'math', domain: 'OA', standard: '3.OA.C.7', difficulty: 2, type: 'mc', stem: 'What is 4 × 7?', choices: ['24', '28', '32', '21'], answer: 1, explanation: '4 × 7 = 28.' },
  { id: 'm_oa_19', subject: 'math', domain: 'OA', standard: '3.OA.C.7', difficulty: 3, type: 'mc', stem: 'What is 7 × 6?', choices: ['42', '48', '36', '49'], answer: 0, explanation: '7 × 6 = 42.' },
  { id: 'm_oa_20', subject: 'math', domain: 'OA', standard: '3.OA.A.2', difficulty: 3, type: 'mc', stem: 'What is 56 ÷ 8?', choices: ['6', '7', '8', '9'], answer: 1, explanation: '56 ÷ 8 = 7.' },
  { id: 'm_oa_21', subject: 'math', domain: 'OA', standard: '3.OA.A.4', difficulty: 3, type: 'num', stem: 'Find the missing number: 6 × ___ = 54. Type the number.', answer: 9, explanation: '6 × 9 = 54.' },
  { id: 'm_oa_22', subject: 'math', domain: 'OA', standard: '3.OA.D.8', difficulty: 4, type: 'mc', stem: 'There are 5 baskets with 8 apples in each. If 7 apples are eaten, how many are left?', choices: ['33', '40', '47', '35'], answer: 0, explanation: '5 × 8 = 40, then 40 − 7 = 33.' },
  { id: 'm_oa_23', subject: 'math', domain: 'OA', standard: '3.OA.D.9', difficulty: 4, type: 'mc', stem: 'What number comes next? 3, 6, 9, 12, ___', choices: ['14', '15', '18', '13'], answer: 1, explanation: 'The pattern adds 3 each time: 12 + 3 = 15.' },
  { id: 'm_oa_24', subject: 'math', domain: 'OA', standard: '3.OA.A.3', difficulty: 4, type: 'num', stem: 'There are 8 teams with 6 players on each team. How many players in all? Type the number.', answer: 48, explanation: '8 × 6 = 48.' },
  { id: 'm_oa_25', subject: 'math', domain: 'OA', standard: '3.OA.C.7', difficulty: 5, type: 'ms', stem: 'Which expressions equal 36? Select ALL that apply.', choices: ['6 × 6', '4 × 9', '5 × 7', '18 + 18'], answer: [0, 1, 3], explanation: '6×6=36, 4×9=36, 18+18=36. But 5×7=35.' },
  { id: 'm_oa_26', subject: 'math', domain: 'OA', standard: '3.OA.D.8', difficulty: 5, type: 'num', stem: 'A store had 9 boxes with 7 markers in each box. They sold 12 markers. How many markers are left? Type the number.', answer: 51, explanation: '9 × 7 = 63, then 63 − 12 = 51.' },

  // Number & Operations in Base Ten
  { id: 'm_nbt_10', subject: 'math', domain: 'NBT', standard: '3.NBT.A.1', difficulty: 1, type: 'mc', stem: 'Round 73 to the nearest ten.', choices: ['70', '80', '75', '60'], answer: 0, explanation: '73 is closer to 70 than 80.' },
  { id: 'm_nbt_11', subject: 'math', domain: 'NBT', standard: '3.NBT.A.1', difficulty: 1, type: 'mc', stem: 'What is the value of the 4 in 458?', choices: ['4', '40', '400', '48'], answer: 2, explanation: 'The 4 is in the hundreds place, so it means 400.' },
  { id: 'm_nbt_12', subject: 'math', domain: 'NBT', standard: '3.NBT.A.2', difficulty: 2, type: 'num', stem: 'What is 147 + 225? Type the number.', answer: 372, explanation: '147 + 225 = 372.' },
  { id: 'm_nbt_13', subject: 'math', domain: 'NBT', standard: '3.NBT.A.2', difficulty: 2, type: 'num', stem: 'What is 503 − 247? Type the number.', answer: 256, explanation: '503 − 247 = 256.' },
  { id: 'm_nbt_14', subject: 'math', domain: 'NBT', standard: '3.NBT.A.1', difficulty: 2, type: 'mc', stem: 'Round 615 to the nearest hundred.', choices: ['600', '700', '610', '620'], answer: 0, explanation: '615 is closer to 600 than 700.' },
  { id: 'm_nbt_15', subject: 'math', domain: 'NBT', standard: '3.NBT.A.3', difficulty: 3, type: 'mc', stem: 'What is 8 × 30?', choices: ['110', '240', '38', '24'], answer: 1, explanation: '8 × 3 = 24, then add a zero: 240.' },
  { id: 'm_nbt_16', subject: 'math', domain: 'NBT', standard: '3.NBT.A.2', difficulty: 3, type: 'num', stem: 'What is 364 + 248? Type the number.', answer: 612, explanation: '364 + 248 = 612.' },
  { id: 'm_nbt_17', subject: 'math', domain: 'NBT', standard: '3.NBT.A.1', difficulty: 3, type: 'mc', stem: 'Round 249 to the nearest ten.', choices: ['240', '250', '200', '300'], answer: 1, explanation: '249 is closer to 250 than 240.' },
  { id: 'm_nbt_18', subject: 'math', domain: 'NBT', standard: '3.NBT.A.2', difficulty: 4, type: 'num', stem: 'What is 712 − 356? Type the number.', answer: 356, explanation: '712 − 356 = 356.' },
  { id: 'm_nbt_19', subject: 'math', domain: 'NBT', standard: '3.NBT.A.2', difficulty: 4, type: 'num', stem: 'A farm had 540 eggs. They collected 175 more, then sold 90. How many eggs now? Type the number.', answer: 625, explanation: '540 + 175 = 715, then 715 − 90 = 625.' },
  { id: 'm_nbt_20', subject: 'math', domain: 'NBT', standard: '3.NBT.A.1', difficulty: 5, type: 'mc', stem: 'Which number rounds to 400 when rounded to the nearest hundred?', choices: ['349', '461', '455', '372'], answer: 3, explanation: 'A number rounds to 400 if it is from 350 to 449. 372 rounds to 400. (349→300, 461→500, 455→500.)' },
  { id: 'm_nbt_21', subject: 'math', domain: 'NBT', standard: '3.NBT.A.3', difficulty: 5, type: 'num', stem: 'What is 9 × 50? Type the number.', answer: 450, explanation: '9 × 5 = 45, then add a zero: 450.' },

  // Fractions
  { id: 'm_nf_8', subject: 'math', domain: 'NF', standard: '3.NF.A.1', difficulty: 1, type: 'mc', stem: 'A bar is split into 3 equal parts and 1 part is shaded. What fraction is shaded?', choices: ['1/3', '3/1', '1/2', '2/3'], answer: 0, explanation: '1 of 3 equal parts is 1/3.' },
  { id: 'm_nf_9', subject: 'math', domain: 'NF', standard: '3.NF.A.1', difficulty: 1, type: 'mc', stem: 'Which fraction means one half?', choices: ['1/2', '1/4', '2/3', '1/3'], answer: 0, explanation: 'One half is written 1/2.' },
  { id: 'm_nf_10', subject: 'math', domain: 'NF', standard: '3.NF.A.3', difficulty: 2, type: 'mc', stem: 'Which fraction is equal to 1/2?', choices: ['3/6', '2/3', '1/3', '3/4'], answer: 0, explanation: '3/6 = 1/2.' },
  { id: 'm_nf_11', subject: 'math', domain: 'NF', standard: '3.NF.A.3', difficulty: 2, type: 'mc', stem: 'Which is greater: 2/3 or 2/6?', choices: ['2/3', '2/6', 'They are equal', 'Cannot tell'], answer: 0, explanation: 'With the same number of parts taken, larger pieces (thirds) make 2/3 greater.' },
  { id: 'm_nf_12', subject: 'math', domain: 'NF', standard: '3.NF.A.3', difficulty: 3, type: 'mc', stem: 'Which is greater: 4/6 or 5/6?', choices: ['4/6', '5/6', 'They are equal', 'Cannot tell'], answer: 1, explanation: '5 sixths is more than 4 sixths.' },
  { id: 'm_nf_13', subject: 'math', domain: 'NF', standard: '3.NF.A.2', difficulty: 3, type: 'mc', stem: 'On a number line from 0 to 1 split into 4 equal parts, which fraction is at the 3rd mark?', choices: ['3/4', '4/3', '1/4', '3/1'], answer: 0, explanation: 'The 3rd mark of 4 equal parts is 3/4.' },
  { id: 'm_nf_14', subject: 'math', domain: 'NF', standard: '3.NF.A.3', difficulty: 3, type: 'mc', stem: 'Which fraction is equal to 4/8?', choices: ['1/2', '1/4', '2/3', '3/4'], answer: 0, explanation: '4/8 = 1/2.' },
  { id: 'm_nf_15', subject: 'math', domain: 'NF', standard: '3.NF.A.3', difficulty: 4, type: 'mc', stem: 'Which comparison is TRUE?', choices: ['1/2 < 1/4', '3/6 = 1/2', '2/3 < 1/3', '1/8 > 1/2'], answer: 1, explanation: '3/6 simplifies to 1/2, so 3/6 = 1/2.' },
  { id: 'm_nf_16', subject: 'math', domain: 'NF', standard: '3.NF.A.3', difficulty: 4, type: 'mc', stem: 'Which is greater: 3/4 or 3/8?', choices: ['3/8', '3/4', 'They are equal', 'Cannot tell'], answer: 1, explanation: 'Fourths are bigger pieces than eighths, so 3/4 > 3/8.' },
  { id: 'm_nf_17', subject: 'math', domain: 'NF', standard: '3.NF.A.3', difficulty: 4, type: 'mc', stem: 'Which fraction equals 1 whole?', choices: ['5/5', '3/4', '2/3', '1/2'], answer: 0, explanation: 'A fraction with the same top and bottom equals 1: 5/5 = 1.' },
  { id: 'm_nf_18', subject: 'math', domain: 'NF', standard: '3.NF.A.3', difficulty: 5, type: 'ms', stem: 'Which fractions are equal to 1/2? Select ALL that apply.', choices: ['2/4', '3/6', '2/3', '4/8'], answer: [0, 1, 3], explanation: '2/4, 3/6, and 4/8 all equal 1/2. 2/3 does not.' },
  { id: 'm_nf_19', subject: 'math', domain: 'NF', standard: '3.NF.A.2', difficulty: 5, type: 'mc', stem: 'On a number line from 0 to 1 split into thirds, which fraction is at the 2nd mark?', choices: ['1/3', '2/3', '3/3', '0'], answer: 1, explanation: 'The 2nd mark of 3 equal parts is 2/3.' },

  // Measurement & Data
  { id: 'm_md_8', subject: 'math', domain: 'MD', standard: '3.MD.A.1', difficulty: 1, type: 'mc', stem: 'A clock shows 5:00. What time will it be in 2 hours?', choices: ['6:00', '7:00', '3:00', '5:30'], answer: 1, explanation: '5:00 + 2 hours = 7:00.' },
  { id: 'm_md_9', subject: 'math', domain: 'MD', standard: '3.MD.A.2', difficulty: 1, type: 'mc', stem: 'Which unit would you use to measure the mass of an apple?', choices: ['liters', 'grams', 'meters', 'hours'], answer: 1, explanation: 'Mass is measured in grams.' },
  { id: 'm_md_10', subject: 'math', domain: 'MD', standard: '3.MD.A.1', difficulty: 2, type: 'mc', stem: 'A movie started at 9:30 and a preview lasted 15 minutes. When did the preview end?', choices: ['9:45', '9:50', '10:30', '9:15'], answer: 0, explanation: '9:30 + 15 minutes = 9:45.' },
  { id: 'm_md_11', subject: 'math', domain: 'MD', standard: '3.MD.C.7', difficulty: 2, type: 'num', stem: 'A rectangle is 4 units by 6 units. What is its area in square units? Type the number.', answer: 24, explanation: 'Area = 4 × 6 = 24 square units.' },
  { id: 'm_md_12', subject: 'math', domain: 'MD', standard: '3.MD.D.8', difficulty: 3, type: 'num', stem: 'A rectangle is 5 cm long and 3 cm wide. What is its perimeter in cm? Type the number.', answer: 16, explanation: 'Perimeter = 5 + 3 + 5 + 3 = 16 cm.' },
  { id: 'm_md_13', subject: 'math', domain: 'MD', standard: '3.MD.B.3', difficulty: 3, type: 'mc', stem: 'A graph shows Apples 7 and Bananas 4. How many more apples than bananas?', choices: ['11', '3', '4', '7'], answer: 1, explanation: '7 − 4 = 3 more apples.' },
  { id: 'm_md_14', subject: 'math', domain: 'MD', standard: '3.MD.C.7', difficulty: 3, type: 'num', stem: 'A square has sides of 7 units. What is its area in square units? Type the number.', answer: 49, explanation: 'Area = 7 × 7 = 49 square units.' },
  { id: 'm_md_15', subject: 'math', domain: 'MD', standard: '3.MD.C.7', difficulty: 4, type: 'num', stem: 'A rectangle has an area of 36 square units and a width of 4 units. What is its length? Type the number.', answer: 9, explanation: '36 ÷ 4 = 9 units.' },
  { id: 'm_md_16', subject: 'math', domain: 'MD', standard: '3.MD.A.2', difficulty: 4, type: 'mc', stem: 'A jug holds 3 liters. How many liters do 5 jugs hold?', choices: ['8', '15', '2', '35'], answer: 1, explanation: '5 × 3 = 15 liters.' },
  { id: 'm_md_17', subject: 'math', domain: 'MD', standard: '3.MD.A.1', difficulty: 4, type: 'mc', stem: 'How much time passes from 2:15 to 3:00?', choices: ['45 minutes', '30 minutes', '15 minutes', '60 minutes'], answer: 0, explanation: 'From 2:15 to 3:00 is 45 minutes.' },
  { id: 'm_md_18', subject: 'math', domain: 'MD', standard: '3.MD.C.7', difficulty: 5, type: 'num', stem: 'A figure is two rectangles joined: one is 3 by 4 and the other is 3 by 2. What is the total area in square units? Type the number.', answer: 18, explanation: '3×4 = 12 and 3×2 = 6; 12 + 6 = 18.' },
  { id: 'm_md_19', subject: 'math', domain: 'MD', standard: '3.MD.D.8', difficulty: 5, type: 'mc', stem: 'A square has an area of 16 square units. What is its perimeter?', choices: ['8', '16', '4', '12'], answer: 1, explanation: 'Side = 4 (since 4×4=16), so perimeter = 4 × 4 = 16.' },

  // Geometry
  { id: 'm_g_6', subject: 'math', domain: 'G', standard: '3.G.A.1', difficulty: 1, type: 'mc', stem: 'How many sides does a square have?', choices: ['3', '4', '5', '6'], answer: 1, explanation: 'A square has 4 sides.' },
  { id: 'm_g_7', subject: 'math', domain: 'G', standard: '3.G.A.1', difficulty: 1, type: 'mc', stem: 'Which shape has no straight sides?', choices: ['square', 'triangle', 'circle', 'rectangle'], answer: 2, explanation: 'A circle has no straight sides.' },
  { id: 'm_g_8', subject: 'math', domain: 'G', standard: '3.G.A.1', difficulty: 2, type: 'mc', stem: 'How many sides does a pentagon have?', choices: ['4', '5', '6', '3'], answer: 1, explanation: 'A pentagon has 5 sides.' },
  { id: 'm_g_9', subject: 'math', domain: 'G', standard: '3.G.A.1', difficulty: 2, type: 'mc', stem: 'Which shape is a quadrilateral?', choices: ['triangle', 'trapezoid', 'circle', 'pentagon'], answer: 1, explanation: 'A trapezoid has 4 sides, so it is a quadrilateral.' },
  { id: 'm_g_10', subject: 'math', domain: 'G', standard: '3.G.A.2', difficulty: 3, type: 'mc', stem: 'A shape is divided into 3 equal parts. Each part is what fraction of the whole?', choices: ['1/2', '1/3', '1/4', '3'], answer: 1, explanation: 'One of 3 equal parts is 1/3.' },
  { id: 'm_g_11', subject: 'math', domain: 'G', standard: '3.G.A.1', difficulty: 3, type: 'mc', stem: 'Which shape has 4 equal sides AND 4 right angles?', choices: ['rectangle', 'square', 'triangle', 'rhombus'], answer: 1, explanation: 'A square has 4 equal sides and 4 right angles.' },
  { id: 'm_g_12', subject: 'math', domain: 'G', standard: '3.G.A.1', difficulty: 4, type: 'ms', stem: 'Which shapes are quadrilaterals? Select ALL that apply.', choices: ['square', 'trapezoid', 'hexagon', 'rectangle'], answer: [0, 1, 3], explanation: 'Squares, trapezoids, and rectangles have 4 sides. A hexagon has 6.' },
  { id: 'm_g_13', subject: 'math', domain: 'G', standard: '3.G.A.1', difficulty: 4, type: 'mc', stem: 'A shape with 6 sides is called a —', choices: ['pentagon', 'hexagon', 'octagon', 'quadrilateral'], answer: 1, explanation: 'A 6-sided shape is a hexagon.' },
  { id: 'm_g_14', subject: 'math', domain: 'G', standard: '3.G.A.1', difficulty: 5, type: 'mc', stem: 'Which statement is TRUE?', choices: ['All squares are rectangles', 'All rectangles are squares', 'A triangle has 4 sides', 'A circle is a polygon'], answer: 0, explanation: 'Every square is a special rectangle (4 right angles), but not every rectangle is a square.' },
  { id: 'm_g_15', subject: 'math', domain: 'G', standard: '3.G.A.2', difficulty: 2, type: 'mc', stem: 'A rectangle is split into 4 equal parts. One part is what fraction of the whole?', choices: ['1/4', '1/2', '1/3', '4'], answer: 0, explanation: 'One of 4 equal parts is 1/4.' },
  { id: 'm_g_16', subject: 'math', domain: 'G', standard: '3.G.A.1', difficulty: 3, type: 'mc', stem: 'How many corners (vertices) does a triangle have?', choices: ['2', '3', '4', '1'], answer: 1, explanation: 'A triangle has 3 corners.' }
);

// ===================== READING expansion (to 100+ items) =====================
Object.assign(PASSAGES, {
  p_treehouse: {
    title: 'The Treehouse',
    text:
      'Ben and his sister Mia wanted a treehouse. All summer they worked together. They ' +
      'carried boards, hammered nails, and painted the walls bright green. Sometimes they ' +
      'argued about where the window should go, but they always made up. One rainy day, they ' +
      'could not work outside, so they drew plans inside instead. By the end of August, the ' +
      'treehouse was finished. Ben and Mia sat inside and watched the sunset. Building it ' +
      'together had been the best part of the whole summer.',
  },
  p_lemonade: {
    title: 'The Lemonade Stand',
    text:
      'Priya set up a lemonade stand on a hot Saturday. She made a colorful sign and squeezed ' +
      'many lemons. At first, no one stopped, and Priya felt discouraged. Then she smiled and ' +
      'waved at the people walking by, and soon a line formed. By the afternoon, she had sold ' +
      'every cup. Priya counted her coins and decided to give half of the money to the animal ' +
      'shelter. Helping others made her feel even happier than the money did.',
  },
  p_newkid: {
    title: 'The New Kid',
    text:
      'A new boy named Leo joined Grace’s class. He did not know anyone, and he sat alone at ' +
      'lunch. Grace remembered how it had felt to be new last year. She walked over and asked ' +
      'Leo to sit with her friends. Leo smiled for the first time all day. Soon he was laughing ' +
      'and telling jokes. Grace was glad she had been brave enough to say hello. A small ' +
      'kindness had made a big difference.',
  },
  p_bees: {
    title: 'Busy Honeybees',
    text:
      'Honeybees are busy insects that live together in a hive. Each hive can have thousands of ' +
      'bees. Worker bees fly from flower to flower to collect a sweet liquid called nectar. They ' +
      'bring the nectar back to the hive and turn it into honey. As bees move between flowers, ' +
      'they also carry pollen, which helps plants make seeds and fruit. Without bees, many ' +
      'plants could not grow. That is why bees are so important to people and to nature.',
  },
  p_volcano: {
    title: 'How Volcanoes Work',
    text:
      'A volcano is an opening in the Earth’s surface. Deep underground, it is so hot that rock ' +
      'melts into a thick liquid called magma. When pressure builds up, the magma can burst out ' +
      'of the volcano. Once it reaches the surface, the melted rock is called lava. Lava is very ' +
      'hot and can flow down the sides of the volcano. After many eruptions, the cooled lava can ' +
      'build up and form a mountain. Scientists study volcanoes to help keep people safe.',
  },
  p_penguins: {
    title: 'Penguins',
    text:
      'Penguins are birds, but they cannot fly. Instead, they are excellent swimmers. Their ' +
      'smooth bodies and strong flippers help them zoom through cold ocean water to catch fish. ' +
      'Most penguins live in the southern part of the world, where it is very cold. Thick ' +
      'feathers and a layer of fat keep them warm. Penguin parents take turns caring for their ' +
      'eggs and chicks, working hard to keep their babies safe and fed.',
  },
});

QUESTIONS.push(
  // Literature: The Treehouse
  { id: 'e_rl_16', subject: 'reading', domain: 'RL', standard: 'RL.3.1', difficulty: 1, type: 'mc', passage: 'p_treehouse', stem: 'What did Ben and Mia want to build?', choices: ['A fort', 'A treehouse', 'A boat', 'A sandcastle'], answer: 1, explanation: 'The first sentence says they wanted a treehouse.' },
  { id: 'e_rl_17', subject: 'reading', domain: 'RL', standard: 'RL.3.3', difficulty: 2, type: 'mc', passage: 'p_treehouse', stem: 'What did they do on the rainy day?', choices: ['Painted the walls', 'Carried boards', 'Drew plans inside', 'Watched the sunset'], answer: 2, explanation: 'On the rainy day they drew plans inside instead of working outside.' },
  { id: 'e_rl_18', subject: 'reading', domain: 'RL', standard: 'RL.3.4', difficulty: 3, type: 'mc', passage: 'p_treehouse', stem: 'The story says they "always made up." This means they —', choices: ['invented stories', 'stopped being friends', 'stopped arguing and became friendly again', 'built more quickly'], answer: 2, explanation: '"Made up" means they stopped arguing and were friendly again.' },
  { id: 'e_rl_19', subject: 'reading', domain: 'RL', standard: 'RL.3.2', difficulty: 4, type: 'mc', passage: 'p_treehouse', stem: 'What is the theme of the story?', choices: ['Treehouses should be green', 'Working together can be rewarding', 'Rainy days are boring', 'Summer is too long'], answer: 1, explanation: 'The ending says building it together had been the best part — working together is rewarding.' },
  { id: 'e_rl_20', subject: 'reading', domain: 'RL', standard: 'RL.3.1', difficulty: 2, type: 'mc', passage: 'p_treehouse', stem: 'What color did they paint the walls?', choices: ['Blue', 'Green', 'Red', 'Yellow'], answer: 1, explanation: 'They painted the walls bright green.' },

  // Literature: The Lemonade Stand
  { id: 'e_rl_21', subject: 'reading', domain: 'RL', standard: 'RL.3.1', difficulty: 1, type: 'mc', passage: 'p_lemonade', stem: 'What did Priya sell?', choices: ['Cookies', 'Lemonade', 'Toys', 'Flowers'], answer: 1, explanation: 'Priya set up a lemonade stand.' },
  { id: 'e_rl_22', subject: 'reading', domain: 'RL', standard: 'RL.3.3', difficulty: 3, type: 'mc', passage: 'p_lemonade', stem: 'Why did a line of customers finally form?', choices: ['She lowered her price', 'She smiled and waved at people', 'It started to rain', 'She made a bigger sign'], answer: 1, explanation: 'After she smiled and waved at people walking by, a line formed.' },
  { id: 'e_rl_23', subject: 'reading', domain: 'RL', standard: 'RL.3.4', difficulty: 3, type: 'mc', passage: 'p_lemonade', stem: 'In the story, "discouraged" most nearly means —', choices: ['excited', 'losing hope', 'very thirsty', 'sleepy'], answer: 1, explanation: 'No one stopped at first, so Priya was losing hope.' },
  { id: 'e_rl_24', subject: 'reading', domain: 'RL', standard: 'RL.3.2', difficulty: 4, type: 'mc', passage: 'p_lemonade', stem: 'What lesson does Priya learn?', choices: ['Lemons are sour', 'Helping others brings happiness', 'Money is the most important thing', 'Saturdays are hot'], answer: 1, explanation: 'Helping others made her happier than the money did.' },
  { id: 'e_rl_25', subject: 'reading', domain: 'RL', standard: 'RL.3.3', difficulty: 3, type: 'mc', passage: 'p_lemonade', stem: 'What did Priya do with half of her money?', choices: ['Bought more lemons', 'Gave it to the animal shelter', 'Kept all of it', 'Lost it'], answer: 1, explanation: 'She decided to give half of the money to the animal shelter.' },

  // Literature: The New Kid
  { id: 'e_rl_26', subject: 'reading', domain: 'RL', standard: 'RL.3.1', difficulty: 1, type: 'mc', passage: 'p_newkid', stem: 'What is the new boy’s name?', choices: ['Ben', 'Leo', 'Sam', 'Max'], answer: 1, explanation: 'The new boy is named Leo.' },
  { id: 'e_rl_27', subject: 'reading', domain: 'RL', standard: 'RL.3.3', difficulty: 2, type: 'mc', passage: 'p_newkid', stem: 'Why did Grace understand how Leo felt?', choices: ['She was new last year', 'She was his cousin', 'She read about it', 'She asked the teacher'], answer: 0, explanation: 'Grace remembered how it had felt to be new last year.' },
  { id: 'e_rl_28', subject: 'reading', domain: 'RL', standard: 'RL.3.2', difficulty: 4, type: 'mc', passage: 'p_newkid', stem: 'What is the main message of the story?', choices: ['New kids are shy', 'A small kindness can make a big difference', 'Lunch is the best time', 'Jokes are funny'], answer: 1, explanation: 'The last line states the message about a small kindness.' },
  { id: 'e_rl_29', subject: 'reading', domain: 'RL', standard: 'RL.3.3', difficulty: 3, type: 'mc', passage: 'p_newkid', stem: 'How did Leo feel after Grace invited him to sit with her friends?', choices: ['Angry', 'Happy', 'Bored', 'Scared'], answer: 1, explanation: 'Leo smiled and was soon laughing and telling jokes.' },
  { id: 'e_rl_30', subject: 'reading', domain: 'RL', standard: 'RL.3.4', difficulty: 3, type: 'mc', passage: 'p_newkid', stem: 'Saying Grace was "brave enough to say hello" shows that she was —', choices: ['fearful', 'kind and courageous', 'unfriendly', 'tired'], answer: 1, explanation: 'It took courage and kindness for Grace to welcome Leo.' },

  // Informational: Busy Honeybees
  { id: 'e_ri_14', subject: 'reading', domain: 'RI', standard: 'RI.3.1', difficulty: 1, type: 'mc', passage: 'p_bees', stem: 'Where do honeybees live?', choices: ['A nest in a tree', 'A hive', 'A cave', 'Underground'], answer: 1, explanation: 'Honeybees live together in a hive.' },
  { id: 'e_ri_15', subject: 'reading', domain: 'RI', standard: 'RI.3.4', difficulty: 2, type: 'mc', passage: 'p_bees', stem: 'What is "nectar"?', choices: ['A sweet liquid from flowers', 'A kind of bee', 'A type of hive', 'A baby bee'], answer: 0, explanation: 'Nectar is the sweet liquid bees collect from flowers.' },
  { id: 'e_ri_16', subject: 'reading', domain: 'RI', standard: 'RI.3.2', difficulty: 3, type: 'mc', passage: 'p_bees', stem: 'What is the main idea of the passage?', choices: ['Bees are scary', 'Bees are important because they make honey and help plants', 'Bees live a long time', 'Flowers are pretty'], answer: 1, explanation: 'The passage explains how bees make honey and help plants grow.' },
  { id: 'e_ri_17', subject: 'reading', domain: 'RI', standard: 'RI.3.3', difficulty: 4, type: 'mc', passage: 'p_bees', stem: 'How do bees help plants make seeds and fruit?', choices: ['By eating leaves', 'By carrying pollen between flowers', 'By making honey', 'By building hives'], answer: 1, explanation: 'As bees move between flowers they carry pollen, which helps plants make seeds and fruit.' },
  { id: 'e_ri_18', subject: 'reading', domain: 'RI', standard: 'RI.3.1', difficulty: 2, type: 'mc', passage: 'p_bees', stem: 'What do bees turn nectar into?', choices: ['Pollen', 'Honey', 'Wax', 'Water'], answer: 1, explanation: 'Bees turn the nectar into honey.' },

  // Informational: How Volcanoes Work
  { id: 'e_ri_19', subject: 'reading', domain: 'RI', standard: 'RI.3.1', difficulty: 1, type: 'mc', passage: 'p_volcano', stem: 'What is the melted rock UNDERGROUND called?', choices: ['Lava', 'Magma', 'Ash', 'Mud'], answer: 1, explanation: 'Underground, the melted rock is called magma.' },
  { id: 'e_ri_20', subject: 'reading', domain: 'RI', standard: 'RI.3.4', difficulty: 3, type: 'mc', passage: 'p_volcano', stem: 'When the melted rock reaches the surface, it is called —', choices: ['magma', 'lava', 'steam', 'sand'], answer: 1, explanation: 'Once it reaches the surface, the melted rock is called lava.' },
  { id: 'e_ri_21', subject: 'reading', domain: 'RI', standard: 'RI.3.2', difficulty: 4, type: 'mc', passage: 'p_volcano', stem: 'What is this passage mostly about?', choices: ['How to climb a mountain', 'How volcanoes work and form', 'Why lava is red', 'Where scientists live'], answer: 1, explanation: 'The passage explains how volcanoes work and how they can form mountains.' },
  { id: 'e_ri_22', subject: 'reading', domain: 'RI', standard: 'RI.3.3', difficulty: 3, type: 'mc', passage: 'p_volcano', stem: 'After many eruptions, what can the cooled lava form?', choices: ['A river', 'A mountain', 'A cave', 'An ocean'], answer: 1, explanation: 'After many eruptions, the cooled lava can build up and form a mountain.' },
  { id: 'e_ri_23', subject: 'reading', domain: 'RI', standard: 'RI.3.8', difficulty: 5, type: 'mc', passage: 'p_volcano', stem: 'Why do scientists study volcanoes?', choices: ['To make lava', 'To help keep people safe', 'To build mountains', 'To melt rock'], answer: 1, explanation: 'The passage says scientists study volcanoes to help keep people safe.' },

  // Informational: Penguins
  { id: 'e_ri_24', subject: 'reading', domain: 'RI', standard: 'RI.3.1', difficulty: 1, type: 'mc', passage: 'p_penguins', stem: 'What can penguins do instead of flying?', choices: ['Run very fast', 'Swim very well', 'Climb trees', 'Dig tunnels'], answer: 1, explanation: 'Penguins cannot fly, but they are excellent swimmers.' },
  { id: 'e_ri_25', subject: 'reading', domain: 'RI', standard: 'RI.3.1', difficulty: 2, type: 'mc', passage: 'p_penguins', stem: 'What helps keep penguins warm?', choices: ['Thick feathers and a layer of fat', 'Their long tails', 'Warm water', 'The sun'], answer: 0, explanation: 'Thick feathers and a layer of fat keep penguins warm.' },
  { id: 'e_ri_26', subject: 'reading', domain: 'RI', standard: 'RI.3.4', difficulty: 3, type: 'mc', passage: 'p_penguins', stem: 'If penguins are "excellent swimmers," they swim —', choices: ['very poorly', 'very well', 'very slowly', 'only at night'], answer: 1, explanation: '"Excellent" means very good, so they swim very well.' },
  { id: 'e_ri_27', subject: 'reading', domain: 'RI', standard: 'RI.3.2', difficulty: 4, type: 'mc', passage: 'p_penguins', stem: 'What is the main idea of the passage?', choices: ['Penguins are birds that are built to swim and survive the cold', 'Penguins like to play', 'Fish are hard to catch', 'The south is far away'], answer: 0, explanation: 'The passage describes how penguins swim and stay warm in the cold.' },
  { id: 'e_ri_28', subject: 'reading', domain: 'RI', standard: 'RI.3.3', difficulty: 3, type: 'mc', passage: 'p_penguins', stem: 'How do penguin parents care for their eggs and chicks?', choices: ['They leave them alone', 'They take turns', 'They give them to other birds', 'They hide them'], answer: 1, explanation: 'Penguin parents take turns caring for their eggs and chicks.' },

  // Language & Vocabulary (standalone)
  { id: 'e_l_16', subject: 'reading', domain: 'L', standard: 'L.3.5', difficulty: 1, type: 'mc', stem: 'Which word means about the same as "big"?', choices: ['small', 'large', 'thin', 'slow'], answer: 1, explanation: '"Large" is a synonym for "big."' },
  { id: 'e_l_17', subject: 'reading', domain: 'L', standard: 'L.3.5', difficulty: 1, type: 'mc', stem: 'Which word is the OPPOSITE of "hot"?', choices: ['warm', 'cold', 'fast', 'big'], answer: 1, explanation: '"Cold" is the opposite of "hot."' },
  { id: 'e_l_18', subject: 'reading', domain: 'L', standard: 'L.3.1', difficulty: 2, type: 'mc', stem: 'What is the plural of "box"?', choices: ['boxs', 'boxes', 'boxen', 'box'], answer: 1, explanation: 'Words ending in -x add -es: boxes.' },
  { id: 'e_l_19', subject: 'reading', domain: 'L', standard: 'L.3.2', difficulty: 2, type: 'mc', stem: 'Which is the contraction for "do not"?', choices: ['dont', 'do’nt', 'don’t', 'donot'], answer: 2, explanation: 'The contraction for "do not" is "don’t."' },
  { id: 'e_l_20', subject: 'reading', domain: 'L', standard: 'L.3.1', difficulty: 2, type: 'mc', stem: 'Choose the correct word: He ___ to school every day.', choices: ['go', 'goes', 'going', 'gone'], answer: 1, explanation: 'With "he," use "goes."' },
  { id: 'e_l_21', subject: 'reading', domain: 'L', standard: 'L.3.4', difficulty: 3, type: 'mc', stem: 'The prefix "re-" in the word "redo" means —', choices: ['not', 'again', 'before', 'without'], answer: 1, explanation: '"Re-" means "again," so "redo" means do again.' },
  { id: 'e_l_22', subject: 'reading', domain: 'L', standard: 'L.3.4', difficulty: 3, type: 'mc', stem: 'The suffix "-less" in the word "fearless" means —', choices: ['full of', 'without', 'again', 'more'], answer: 1, explanation: '"-less" means "without," so "fearless" means without fear.' },
  { id: 'e_l_23', subject: 'reading', domain: 'L', standard: 'L.3.5', difficulty: 3, type: 'mc', stem: 'Which word means about the same as "quick"?', choices: ['slow', 'fast', 'late', 'soft'], answer: 1, explanation: '"Fast" is a synonym for "quick."' },
  { id: 'e_l_24', subject: 'reading', domain: 'L', standard: 'L.3.5', difficulty: 3, type: 'mc', stem: 'Which word is the OPPOSITE of "empty"?', choices: ['open', 'full', 'small', 'clean'], answer: 1, explanation: '"Full" is the opposite of "empty."' },
  { id: 'e_l_25', subject: 'reading', domain: 'L', standard: 'L.3.1', difficulty: 2, type: 'mc', stem: 'Which word is a NOUN in this sentence: "The cat slept on the bed."', choices: ['slept', 'on', 'cat', 'the'], answer: 2, explanation: '"Cat" is a noun — a person, place, animal, or thing.' },
  { id: 'e_l_26', subject: 'reading', domain: 'L', standard: 'L.3.1', difficulty: 2, type: 'mc', stem: 'Which word is a VERB in this sentence: "Birds fly high in the sky."', choices: ['Birds', 'fly', 'high', 'sky'], answer: 1, explanation: '"Fly" is the action word, or verb.' },
  { id: 'e_l_27', subject: 'reading', domain: 'L', standard: 'L.3.1', difficulty: 3, type: 'mc', stem: 'Which word is an ADJECTIVE in this sentence: "The tall tree fell down."', choices: ['tree', 'tall', 'fell', 'down'], answer: 1, explanation: '"Tall" describes the tree, so it is an adjective.' },
  { id: 'e_l_28', subject: 'reading', domain: 'L', standard: 'L.3.2', difficulty: 4, type: 'mc', stem: 'Which sentence uses a comma correctly?', choices: ['After lunch we played outside.', 'After lunch, we played outside.', 'After, lunch we played outside.', 'After lunch we, played outside.'], answer: 1, explanation: 'Use a comma after an introductory phrase: "After lunch, …"' },
  { id: 'e_l_29', subject: 'reading', domain: 'L', standard: 'L.3.2', difficulty: 2, type: 'mc', stem: 'Which word is spelled correctly?', choices: ['becuase', 'because', 'becuse', 'becouse'], answer: 1, explanation: 'The correct spelling is "because."' },
  { id: 'e_l_30', subject: 'reading', domain: 'L', standard: 'L.3.2', difficulty: 1, type: 'mc', stem: 'Which is written correctly?', choices: ['monday', 'Monday', 'MONday', 'mondaY'], answer: 1, explanation: 'Days of the week are always capitalized: "Monday."' },
  { id: 'e_l_31', subject: 'reading', domain: 'L', standard: 'L.3.1', difficulty: 3, type: 'mc', stem: 'Choose the correct word: She has two ___.', choices: ['foots', 'feet', 'foot', 'feets'], answer: 1, explanation: 'The plural of "foot" is "feet."' },
  { id: 'e_l_32', subject: 'reading', domain: 'L', standard: 'L.3.2', difficulty: 4, type: 'mc', stem: 'Which sentence is a QUESTION and is punctuated correctly?', choices: ['Where are you going?', 'Where are you going.', 'where are you going', 'Where are you going!'], answer: 0, explanation: 'A question begins with a capital letter and ends with a question mark.' },
  { id: 'e_l_33', subject: 'reading', domain: 'L', standard: 'L.3.2', difficulty: 3, type: 'mc', stem: 'Which is the contraction for "they are"?', choices: ['their', 'there', 'they’re', 'theyre'], answer: 2, explanation: '"They’re" is the contraction for "they are."' },
  { id: 'e_l_34', subject: 'reading', domain: 'L', standard: 'L.3.4', difficulty: 4, type: 'mc', stem: 'Choose the correct word: I can ___ the music playing.', choices: ['here', 'hear', 'heir', 'hare'], answer: 1, explanation: '"Hear" means to listen; "here" means a place.' },
  { id: 'e_l_35', subject: 'reading', domain: 'L', standard: 'L.3.1', difficulty: 2, type: 'mc', stem: 'What is the past tense of "run"?', choices: ['runned', 'ran', 'runs', 'running'], answer: 1, explanation: 'The past tense of "run" is "ran."' },
  { id: 'e_l_36', subject: 'reading', domain: 'L', standard: 'L.3.5', difficulty: 3, type: 'mc', stem: 'Which word means about the same as "happy"?', choices: ['joyful', 'angry', 'tired', 'hungry'], answer: 0, explanation: '"Joyful" is a synonym for "happy."' },
  { id: 'e_l_37', subject: 'reading', domain: 'L', standard: 'L.3.1', difficulty: 4, type: 'mc', stem: 'Choose the correct word: The elephant is ___ than the dog.', choices: ['big', 'bigger', 'biggest', 'more big'], answer: 1, explanation: 'Comparing two things uses "bigger."' },
  { id: 'e_l_38', subject: 'reading', domain: 'L', standard: 'L.3.2', difficulty: 5, type: 'mc', stem: 'Which sentence uses quotation marks correctly?', choices: ['Lets go said Tim.', '"Let’s go," said Tim.', 'Let’s go, "said Tim."', '"Let’s go said Tim."'], answer: 1, explanation: 'Quotation marks go around the exact words spoken: "Let’s go," said Tim.' },
  { id: 'e_l_39', subject: 'reading', domain: 'L', standard: 'L.3.4', difficulty: 3, type: 'mc', stem: 'The prefix "pre-" in the word "preview" means —', choices: ['after', 'before', 'not', 'again'], answer: 1, explanation: '"Pre-" means "before," so a preview is seen before.' },
  { id: 'e_l_40', subject: 'reading', domain: 'L', standard: 'L.3.1', difficulty: 2, type: 'mc', stem: 'Which word is plural (more than one)?', choices: ['child', 'children', 'baby', 'mouse'], answer: 1, explanation: '"Children" means more than one child.' },
  { id: 'e_l_41', subject: 'reading', domain: 'L', standard: 'L.3.2', difficulty: 4, type: 'mc', stem: 'Choose the correct word: ___ going to the park after school.', choices: ['Their', 'There', 'They’re', 'Theyre'], answer: 2, explanation: '"They’re" means "they are," which fits the sentence.' },
  { id: 'e_l_42', subject: 'reading', domain: 'L', standard: 'L.3.4', difficulty: 5, type: 'mc', stem: 'Read: "The fragile vase broke easily when it fell." The word "fragile" most likely means —', choices: ['very heavy', 'easily broken', 'very large', 'brightly colored'], answer: 1, explanation: 'Something fragile breaks easily, as the sentence shows.' }
);

// ===================== WRITING expansion (more prompt variety) =====================
const _WRITE_RUBRIC = {
  Opinion: 'Composition (ideas & organization): clear stated opinion, at least two reasons each developed with details, logical order, an introduction and conclusion. Conventions: complete sentences, correct capitalization, punctuation, and grade-3 spelling.',
  Narrative: 'Composition (ideas & organization): clear sequence of events, characters with actions/feelings/dialogue, descriptive details, and a satisfying ending. Conventions: complete sentences, correct capitalization, punctuation, and grade-3 spelling.',
  Informative: 'Composition (ideas & organization): clear topic, facts and details grouped logically, an introduction and conclusion. Conventions: complete sentences, correct capitalization, punctuation, and grade-3 spelling.',
};
[
  ['w_opinion_2', 'Opinion', 'What is the best season of the year? Write an opinion essay naming your favorite season. Give at least two reasons and explain each with details.'],
  ['w_opinion_3', 'Opinion', 'Should students be allowed to bring a class pet to school? Write your opinion. Support it with at least two clear reasons and details.'],
  ['w_opinion_4', 'Opinion', 'Some people think every kid should learn to play a musical instrument. Do you agree? State your opinion and give reasons with details.'],
  ['w_opinion_5', 'Opinion', 'What is the best way to spend a rainy day? Write an opinion essay. Give two or more reasons, each with details.'],
  ['w_opinion_6', 'Opinion', 'Should your school have a longer lunch time? Write your opinion and support it with at least two reasons and examples.'],
  ['w_opinion_7', 'Opinion', 'What is the most important rule in a classroom? Share your opinion and explain why with reasons and details.'],
  ['w_narr_2', 'Narrative', 'Write a story about a time you found something you had lost. Tell the events in order and include how the characters felt.'],
  ['w_narr_3', 'Narrative', 'Imagine you woke up and could talk to animals for one day. Write a story about what happened. Include a beginning, middle, and end.'],
  ['w_narr_4', 'Narrative', 'Write a story about a time you helped someone. Tell what happened in order and include what people said and felt.'],
  ['w_narr_5', 'Narrative', 'Write a story about an exciting adventure in a faraway place. Describe the setting, the characters, and how the adventure ends.'],
  ['w_narr_6', 'Narrative', 'Write a story about the best day you can imagine. Tell the events in order with lots of descriptive details.'],
  ['w_narr_7', 'Narrative', 'Write a story about making a new friend. Include where it happened, what the characters did and said, and how it ended.'],
  ['w_info_2', 'Informative', 'Teach a reader how to do something you are good at (like riding a bike or making a sandwich). Explain the steps in order with details.'],
  ['w_info_3', 'Informative', 'Write to tell a reader about your favorite hobby. Explain what it is, why you like it, and how someone could start it.'],
  ['w_info_4', 'Informative', 'Write about a place you know well, such as your neighborhood or a park. Describe what it is like using facts and details.'],
  ['w_info_5', 'Informative', 'Choose a community helper (like a firefighter, teacher, or doctor). Write to explain what they do and why their job is important.'],
  ['w_info_6', 'Informative', 'Pick your favorite holiday or celebration. Write to teach a reader about it — what people do, eat, and why it is special.'],
].forEach(([id, mode, stem]) => {
  QUESTIONS.push({ id, subject: 'writing', domain: 'W', standard: mode === 'Opinion' ? 'W.3.1' : mode === 'Narrative' ? 'W.3.3' : 'W.3.2', difficulty: 3, type: 'essay', mode, stem, rubric: _WRITE_RUBRIC[mode] });
});
