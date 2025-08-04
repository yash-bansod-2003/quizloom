import { useGetQuestionsQuery } from "@/services/questions";
import { Loading } from "@/components/loading";
import { DataTable } from "@/components/dashboard/quizzes/questions/data-table";
import { columns } from "@/components/dashboard/quizzes/questions/columns";

const QuestionsPage = () => {
  const { data: questions, isLoading } = useGetQuestionsQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Questions</h2>
      </div>
      {questions && questions.length > 0 ? (
        <DataTable data={questions} columns={columns} />
      ) : (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h3 className="text-lg font-medium text-muted-foreground">
              No questions found
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Create your first question to get started.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionsPage;
