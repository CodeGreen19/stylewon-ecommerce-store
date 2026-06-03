import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href={"/"}>
      <Image
        height={30}
        width={130}
        src={"/logo/stylewon-logo.png"}
        alt="logo"
      />
    </Link>
  );
}
