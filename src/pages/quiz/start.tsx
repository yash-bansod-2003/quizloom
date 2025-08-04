import { useGetQuizByIdQuery } from "@/services/quizzes";
import { useParams } from "react-router-dom";
import { Loading } from "@/components/loading";
const QuizStartPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { isLoading, data: quiz } = useGetQuizByIdQuery(quizId!);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {quiz && (
        <div>
          <h1>{quiz.title}</h1>
        </div>
      )}
    </div>
  );
};

export default QuizStartPage;
