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
import { showToast } from "@/helpers/func-response";

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
        showToast(res);
        form.reset();
      }
      if (type === "UPDATE" && existedValues) {
        const res = await updateProduct({
          ...value,
          productId: existedValues.productId,
        });
        showToast(res);
        router.push("/store/products");
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
        <Header form={form} type={type} />
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
        <Footer type={type} form={form} />
      </form.AppForm>
    </form>
  );
}
