/**
 * Randomizes the order of questions and their options.
 * Returns [randomizedExam, answerSheet]
 * @param {Array} questions
 * @returns {[Array, Array]}
 */
function GenerateExam(questions) {
  // Deep clone to avoid mutating original
  const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

  // Fisher-Yates shuffle
  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const clonedQuestions = deepClone(questions);

  // Shuffle questions
  const shuffledQuestions = shuffle(clonedQuestions);

  // Shuffle options for each question and update correctAnswerId
  const randomizedExam = shuffledQuestions.map((q) => {
    const shuffledOptions = shuffle(q.options);

    // Find the original correct answer text
    const originalCorrectOption = q.options.find((opt) => opt.id === q.correctAnswerId);
    const correctText = originalCorrectOption.text;

    // Reassign option ids to A, B, C, D
    const reindexedOptions = shuffledOptions.map((opt, idx) => ({
      ...opt,
      id: String.fromCharCode(65 + idx),
    }));

    // Find the new correct answer id after reindexing
    const finalCorrectOption = reindexedOptions.find((opt) => opt.text === correctText);

    return {
      ...q,
      options: reindexedOptions,
      correctAnswerId: finalCorrectOption.id,
    };
  });

  // Prepare answer sheet
  const answerSheet = randomizedExam.map((q, idx) => ({
    number: idx + 1,
    questionText: q.questionText,
    correctAnswerId: q.correctAnswerId,
    correctAnswerText: q.options.find((opt) => opt.id === q.correctAnswerId)?.text,
  }));

  return [randomizedExam, answerSheet];
}

export default GenerateExam;
