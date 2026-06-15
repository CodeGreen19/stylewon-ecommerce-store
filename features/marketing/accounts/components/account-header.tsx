import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export function AccountHeader({
  descriptions,
  label,
}: {
  label: string;
  descriptions: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{label}</CardTitle>
        <CardDescription>{descriptions}</CardDescription>
      </CardHeader>
    </Card>
  );
}
