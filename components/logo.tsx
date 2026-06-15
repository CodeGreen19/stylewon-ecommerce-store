import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href={"/"}>
      <h1 className="text-3xl md:text-4xl font-black uppercase">Stylewon</h1>
    </Link>
  );
}
