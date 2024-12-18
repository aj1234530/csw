import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="  ">
        <Link href="/login" className="mx-10 bg-red-300">
          Login
        </Link>
        <Link href="/signup" className="mx-10 bg-red-300">
          Signup
        </Link>
      </div>
    </>
  );
}
