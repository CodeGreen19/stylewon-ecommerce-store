"use client";

import { FolderKanban, PenBox, Plus, Trash2 } from "lucide-react";
import * as React from "react";

import { useAppForm } from "@/components/form/use-app-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  categorySchema,
  CategorySchemaType,
} from "../schemas/categories.schema";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../server/categories.action";
import { getAllCategories } from "../server/categories.query";
import { useRouter } from "next/navigation";

type CategoryType = Awaited<ReturnType<typeof getAllCategories>>[number];

export function CategoriesListings({
  categories,
}: {
  categories: CategoryType[];
}) {
  return (
    <div>
      <CategoryList categories={categories} />
    </div>
  );
}

export function CategoryList({ categories }: { categories: CategoryType[] }) {
  const router = useRouter();
  return (
    <div className="space-y-4">
      <Card className="p-4 pt-0 md:p-0 shadow-none md:ring-0">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl">Categories</CardTitle>
          <CardDescription>Manage your product categories</CardDescription>
          <CardAction>
            <CategoryCreateDialogButton />
          </CardAction>
        </CardHeader>
      </Card>
      <div className="px-4 md:px-0">
        {categories.length === 0 && (
          <div className="w-full h-32 text-muted-foreground text-sm border rounded-lg border-dashed flex items-center justify-center">
            No Categories !
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
          {categories.map((category) => {
            const productCount = category.productCount;

            return (
              <div
                key={category.id}
                className={`group flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all`}
              >
                <div
                  onClick={() =>
                    router.push(`/store/categories/${category.id}/add-products`)
                  }
                  className="flex items-center gap-3 overflow-hidden cursor-pointer"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <FolderKanban className="h-5 w-5" />
                  </div>

                  <div className="overflow-hidden">
                    <p className="truncate font-medium">{category.name}</p>

                    <p className="text-xs text-muted-foreground">
                      {productCount} products
                    </p>
                  </div>
                </div>
                <div>
                  <CategoryUpdateDialogButton category={category} />
                  <CategoryDeleteDialogButton category={category} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CategoryDeleteDialogButton({ category }: { category: CategoryType }) {
  const [isPending, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => e.stopPropagation()}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete category?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. The category will be permanently
            removed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            variant={"destructive"}
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                const data = await deleteCategory(category.id);
                toast.info(data.message);
                setOpen(false);
              });
            }}
          >
            Delete <Trash2 />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function CategoryCreateDialogButton() {
  const [open, setOpen] = React.useState(false);

  const form = useAppForm({
    defaultValues: { name: "" } satisfies CategorySchemaType,
    validators: { onChange: categorySchema },
    onSubmit: async ({ value }) => {
      const data = await addCategory(value);
      toast.success(data.message);
      form.reset();
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            Add <Plus className="h-4 w-4" />
          </Button>
        }
      />
      <DialogContent>
        <form
          id="create-category"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <DialogHeader>
              <DialogTitle>Create Category</DialogTitle>
              <DialogDescription>
                Create a new category for your products to organize.
              </DialogDescription>
            </DialogHeader>

            <form.AppField
              name="name"
              children={(field) => (
                <field.TextField label="Name" placeHolder="e.g. Shirts" />
              )}
            />

            <DialogFooter>
              <Field orientation={"horizontal"} className="justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <form.AppForm>
                  <form.SubscribeButton
                    formId="create-category"
                    label="Create"
                  />
                </form.AppForm>
              </Field>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CategoryUpdateDialogButton({ category }: { category: CategoryType }) {
  const [open, setOpen] = React.useState(false);

  const form = useAppForm({
    defaultValues: { name: category.name } satisfies CategorySchemaType,
    validators: { onChange: categorySchema },
    onSubmit: async ({ value }) => {
      const data = await updateCategory({ ...value, categoryId: category.id });
      toast.success(data.message);
      form.reset();
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => e.stopPropagation()}
          >
            <PenBox className="h-4 w-4 " />
          </Button>
        }
      />
      <DialogContent>
        <form
          id="create-category"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <DialogHeader>
              <DialogTitle>Update Category</DialogTitle>
              <DialogDescription>
                Update a new category for your products to organize.
              </DialogDescription>
            </DialogHeader>

            <form.AppField
              name="name"
              children={(field) => (
                <field.TextField label="Name" placeHolder="e.g. Shirts" />
              )}
            />

            <DialogFooter>
              <Field orientation={"horizontal"} className="justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <form.AppForm>
                  <form.SubscribeButton formId="create-category" label="Save" />
                </form.AppForm>
              </Field>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
