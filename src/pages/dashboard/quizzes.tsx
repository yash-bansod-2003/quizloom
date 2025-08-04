import { useGetQuizzesQuery } from "@/services/quizzes";
import { useGetQuestionsQuery } from "@/services/questions";
import { Loading } from "@/components/loading";
import { DataTable } from "@/components/dashboard/quizzes/data-table";
import { columns } from "@/components/dashboard/quizzes/columns";
import { columns as questionsColumns } from "@/components/dashboard/quizzes/questions/columns";

const QuizzesPage = () => {
  const { data: quizzes, isLoading } = useGetQuizzesQuery();
  const { data: questions, isLoading: questionsLoading } =
    useGetQuestionsQuery();
  if (isLoading || questionsLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Quizzes</h2>
      </div>
      {quizzes && quizzes.length > 0 && (
        <DataTable data={quizzes} columns={columns} />
      )}
      {questions && <DataTable data={questions} columns={questionsColumns} />}
    </>
  );
};

export default QuizzesPage;
