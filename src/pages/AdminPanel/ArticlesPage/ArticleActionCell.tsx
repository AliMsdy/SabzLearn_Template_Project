import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

//context
import { useAuthContext } from "@/context/AuthContext";
//api
import { useMutateCall } from "@/hooks";

//components
import { Button } from "@/Components";
import { AlertDialog } from "@/Components/AdminPanel";

//type
import type { ArticleType } from "@/types/shared";
import type { Row } from "@tanstack/react-table";

function ArticleActionCell({ row }: { row: Row<ArticleType> }) {
  const queryClient = useQueryClient();
  const { token } = useAuthContext();
  const { mutate: deleteArticle } = useMutateCall(["deleteArticleFromDB"], {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["Articles"],
      });
      toast.success("مقاله مورد نظر با موفقیت حذف شد.");
    },
    onError: () => {
      toast.error("حذف مقاله با مشکلی مواجه شد.");
    },
  });
  const handleDeleteArticle = () => {
    deleteArticle({
      url: `/articles/${row.original._id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
      <div className="flex justify-evenly gap-2">
        <AlertDialog
          message="آیا از حذف مقاله مطمئن هستید؟"
          clickHandler={handleDeleteArticle}
          AlertTrigger={<Button className="bg-red-600">حذف</Button>}
        />
        <Button className="bg-sky-700" component="link" to={`/admin-panel/articles/${row.original.shortName}`}>ویرایش</Button>
      </div>
  );
}

export { ArticleActionCell };
