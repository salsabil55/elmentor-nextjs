import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <div className="flex justify-center items-center flex-col bg-white pt-20 pb-20">
        <Image
          src="https://res.cloudinary.com/dahptqhed/image/upload/v1733632662/error_37b93edaeb.png"
          alt="no found"
          width={500}
          height={300}
        />
        <Link href="/">
          <button className="border rounded bg-[#c10909] pr-7 pl-7 pt-3 pb-3 mt-8">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
