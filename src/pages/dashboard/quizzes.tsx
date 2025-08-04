import { useGetQuizzesQuery } from "@/services/quizzes";
import { Loading } from "@/components/loading";
import { DataTable } from "@/components/dashboard/quizzes/data-table";
import { columns } from "@/components/dashboard/quizzes/columns";

const QuizzesPage = () => {
  const { data: quizzes, isLoading } = useGetQuizzesQuery();
  if (isLoading) {
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
    </>
  );
};

export default QuizzesPage;
