"use client";
import { revalidateLogic, useStore } from "@tanstack/react-form";

import { useAppForm } from "@/components/form/use-app-form";
import { toast } from "sonner";
import {
  productDefaultValues,
  productSchema,
  ProductType,
} from "../../schemas/product.schema";
import { addNewProduct, updateProduct } from "../../server/products.action";
import { BasicInfo } from "./basic-info";
import { Header } from "./header";
import { Inventory } from "./inventory";
import { ManageVariants } from "./manage-variants";
import { Options } from "./options";
import { Pricing } from "./pricing";
import { SelectImages } from "./select-images";
import { useRouter } from "next/navigation";
import { Footer } from "./footer";

export function ProductForm({
  type,
  existedValues,
}: {
  type: "CREATE" | "UPDATE";
  existedValues?: ProductType & { productId: string };
}) {
  const defaultValues = existedValues ?? productDefaultValues;
  const router = useRouter();

  const form = useAppForm({
    defaultValues,
    validationLogic: revalidateLogic({
      mode: type === "CREATE" ? "submit" : "change",
      modeAfterSubmission: "change",
    }),
    validators: {
      onDynamic: productSchema,
    },
    onSubmit: async ({ value }) => {
      if (type === "CREATE") {
        const res = await addNewProduct(value);
        toast.success(res.message);
        form.reset();
      }
      if (type === "UPDATE" && existedValues) {
        const data = await updateProduct({
          ...value,
          productId: existedValues.productId,
        });
        router.push("/store/products");
        toast.info(data.message);
      }
    },
  });

  const manageOnOptions = useStore(
    form.store,
    (state) => state.values.manageOnOptions,
  );
  return (
    <form
      id="add-product-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4 lg:space-y-6"
    >
      <form.AppForm>
        <Header
          form={form}
          title={type === "CREATE" ? "Add new product" : "Update product"}
        />
      </form.AppForm>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 lg:gap-6">
        <div className="space-y-4 lg:space-y-6">
          <SelectImages form={form} />
          <BasicInfo form={form} />
          <Pricing form={form} />
        </div>
        <div className="space-y-4 lg:space-y-6">
          <Options form={form} />
          <ManageVariants form={form} />
          {!manageOnOptions && <Inventory form={form} />}
        </div>
      </div>
      <form.AppForm>
        <Footer form={form} />
      </form.AppForm>
    </form>
  );
}
