import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col bg-white pt-20 pb-20">
      <Image
        src="https://res.cloudinary.com/dahptqhed/image/upload/v1733632662/error_37b93edaeb.png"
        alt="Not Found"
        width={500}
        height={300}
        priority
      />
      <Link href="/">
        <button className="border rounded bg-[#c10909] px-7 py-3 mt-8 text-white">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
