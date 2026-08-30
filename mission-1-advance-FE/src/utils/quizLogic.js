import { PASSING_SCORE_PERCENT } from "../data/constants";

export function calculateQuizResult(questions, userAnswers, isPretest) {
  const totalQuestions = questions.length;
  const correctCount = questions.reduce(
    (count, q, idx) =>
      userAnswers[idx] === q.correctAnswer ? count + 1 : count,
    0,
  );
  const wrongCount = totalQuestions - correctCount;
  const scoreValue = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = isPretest ? true : scoreValue >= PASSING_SCORE_PERCENT;

  return { correctCount, wrongCount, scoreValue, isPassed };
}
