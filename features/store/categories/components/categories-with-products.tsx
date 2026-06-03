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

type CategoryType = Awaited<ReturnType<typeof getAllCategories>>[number];

export function CategoriesWithProducts({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [selectedCategory, setSelectedCategory] =
    React.useState<CategoryType | null>(null);
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <CategoryListings categories={categories} />
      <ProductsOnCategory selectedCategory={selectedCategory} />
    </div>
  );
}

function ProductsOnCategory({
  selectedCategory,
}: {
  selectedCategory: CategoryType | null;
}) {
  return (
    <Card className="min-h-[500px]">
      <CardHeader>
        <CardTitle>{selectedCategory?.name || "Select category"}</CardTitle>
        <CardDescription>Manage products inside this category</CardDescription>

        {/* <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogTrigger
          render={
            <Button className="w-full md:w-auto">
              <Package2 className="mr-2 h-4 w-4" />
              Manage Products
            </Button>
          }
        />

        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Select Products</DialogTitle>

            <DialogDescription>
              Add or remove products from this category.
            </DialogDescription>
          </DialogHeader>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search products..."
              className="pl-9"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
            />
          </div>

          <ScrollArea className="h-[350px] rounded-lg border">
            <div className="space-y-2 p-3">
              {filteredProducts.map((product) => {
                const checked = selectedProducts.includes(product.id);

                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-xl border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(value) => {
                          if (value) {
                            setSelectedProducts((prev) => [
                              ...prev,
                              product.id,
                            ]);
                          } else {
                            setSelectedProducts((prev) =>
                              prev.filter((id) => id !== product.id),
                            );
                          }
                        }}
                      />

                      <div>
                        <p className="font-medium">{product.name}</p>

                        <p className="text-xs text-muted-foreground">
                          SKU: {product.sku}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-medium">${product.price}</p>

                      <p className="text-xs text-muted-foreground">
                        {product.stock} in stock
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsProductDialogOpen(false)}
            >
              Cancel
            </Button>

            <Button onClick={handleSaveProducts}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
        <CardAction>
          <Button>Manage product</Button>
        </CardAction>
      </CardHeader>

      <Separator />

      <CardContent className="p-4 md:p-6">
        {/* {selectedCategoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {selectedCategoryProducts.map((product) => (
            <Card key={product.id} className="border-muted">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{product.name}</h3>

                    <p className="text-sm text-muted-foreground">
                      {product.sku}
                    </p>
                  </div>

                  <Badge variant="secondary">{product.stock} left</Badge>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-lg font-bold">${product.price}</p>

                  <Badge>Product</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <Package2 className="h-7 w-7 text-muted-foreground" />
          </div>

          <h3 className="mt-4 text-lg font-semibold">No products found</h3>

          <p className="mt-1 text-center text-sm text-muted-foreground">
            Add products to this category to display them here.
          </p>

          <Button className="mt-5" onClick={() => setIsProductDialogOpen(true)}>
            Add Products
          </Button>
        </div>
      )} */}
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
        atque enim cumque illum, quasi blanditiis optio esse! Dolores,
        recusandae provident ut incidunt minima corrupti aspernatur rerum
        dolore, quos quaerat aperiam?
      </CardContent>
    </Card>
  );
}

export function CategoryListings({
  categories,
}: {
  categories: CategoryType[];
}) {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState("");
  return (
    <Card className="w-full lg:w-[320px] self-start lg:min-w-[320px]">
      <CardHeader>
        <CardTitle className="text-lg">Categories</CardTitle>
        <CardDescription>Manage your product categories</CardDescription>
        <CardAction>
          <CategoryCreateDialogButton />
        </CardAction>
      </CardHeader>
      <Separator />
      <CardContent className="p-3">
        <div className="space-y-2">
          {categories.map((category) => {
            const productCount = 10;

            const isActive = selectedCategoryId === category.id;

            return (
              <div
                key={category.id}
                onClick={() => setSelectedCategoryId(category.id)}
                className={`group flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all ${
                  isActive ? "border-primary bg-primary/5" : "hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
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
      </CardContent>
    </Card>
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
            className="opacity-0 transition-opacity group-hover:opacity-100"
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
          <Button size="icon">
            <Plus className="h-4 w-4" />
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
            className="opacity-0 transition-opacity group-hover:opacity-100"
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
