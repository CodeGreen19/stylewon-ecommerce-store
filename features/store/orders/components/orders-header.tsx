"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StorePageHeader } from "../../shared/components/store-page-header";

export function OrdersHeader() {
  return (
    <StorePageHeader
      title="View Orders"
      description=" View orders here and mutate certain actions."
    />
  );
}
