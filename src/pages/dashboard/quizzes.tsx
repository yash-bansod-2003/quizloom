import { useGetQuizzesQuery, useCreateQuizMutation } from "@/services/quizzes";
import { Loading } from "@/components/loading";
import { DataTable } from "@/components/dashboard/quizzes/data-table";
import { columns } from "@/components/dashboard/quizzes/columns";
import { DashboardHeader } from "@/components/dashboard/header";
import { PlusCircle } from "lucide-react";
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(200),
});

const QuizzesPage = () => {
  const { data: quizzes, isLoading } = useGetQuizzesQuery();
  const [createQuiz, { isLoading: isCreating }] = useCreateQuizMutation();
  const maxSizeMB = 2;
  const maxSize = maxSizeMB * 1024 * 1024; // 2MB default

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
  });
  const previewUrl = files[0]?.preview || null;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Creating quiz with:", {
      ...values,
      image: files[0]?.file || null,
    });

    await createQuiz({
      title: values.title,
      description: values.description,
    }).unwrap();

    form.reset();
    removeFile(files[0]?.id);
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6">
          <DashboardHeader heading="Quizzes" text="Manage your quizzes">
            <Sheet>
              <SheetTrigger asChild>
                <Button>
                  <PlusCircle />
                  Create
                </Button>
              </SheetTrigger>
              <SheetContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <SheetHeader>
                      <SheetTitle>Create Quiz</SheetTitle>
                      <SheetDescription>
                        Create your quiz here. Click save when you&apos;re done.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                      <div className="flex flex-col gap-2">
                        <div className="relative">
                          {/* Drop area */}
                          <div
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            data-dragging={isDragging || undefined}
                            className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]"
                          >
                            <input
                              {...getInputProps()}
                              disabled={isCreating}
                              className="sr-only"
                              aria-label="Upload image file"
                            />
                            {previewUrl ? (
                              <div className="absolute inset-0 flex items-center justify-center p-4">
                                <img
                                  src={previewUrl}
                                  alt={files[0]?.file?.name || "Uploaded image"}
                                  className="mx-auto max-h-full rounded object-contain"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                                <div
                                  className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                                  aria-hidden="true"
                                >
                                  <ImageIcon className="size-4 opacity-60" />
                                </div>
                                <p className="mb-1.5 text-sm font-medium">
                                  Drop your image here
                                </p>
                                <p className="text-muted-foreground text-xs">
                                  SVG, PNG, JPG or GIF (max. {maxSizeMB}MB)
                                </p>
                                <Button
                                  variant="outline"
                                  className="mt-4"
                                  onClick={openFileDialog}
                                >
                                  <UploadIcon
                                    className="-ms-1 size-4 opacity-60"
                                    aria-hidden="true"
                                  />
                                  Select image
                                </Button>
                              </div>
                            )}
                          </div>

                          {previewUrl && (
                            <div className="absolute top-4 right-4">
                              <button
                                type="button"
                                className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                                onClick={() => removeFile(files[0]?.id)}
                                aria-label="Remove image"
                              >
                                <XIcon className="size-4" aria-hidden="true" />
                              </button>
                            </div>
                          )}
                        </div>

                        {errors.length > 0 && (
                          <div
                            className="text-destructive flex items-center gap-1 text-xs"
                            role="alert"
                          >
                            <AlertCircleIcon className="size-3 shrink-0" />
                            <span>{errors[0]}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-8">
                        <FormField
                          control={form.control}
                          name="title"
                          disabled={isCreating}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="description"
                          disabled={isCreating}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <SheetFooter>
                      <Button disabled={isCreating} type="submit">
                        Save changes
                      </Button>
                    </SheetFooter>
                  </form>
                </Form>
              </SheetContent>
            </Sheet>
          </DashboardHeader>
          {quizzes && quizzes.length > 0 && (
            <DataTable data={quizzes} columns={columns} />
          )}
        </div>
      </div>
    </>
  );
};

export default QuizzesPage;
