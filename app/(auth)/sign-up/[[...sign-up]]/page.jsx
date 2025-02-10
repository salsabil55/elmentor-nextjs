import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="bg-black flex m-20 justify-center items-center">
      <SignUp
        appearance={{
          baseTheme: dark,
          elements: {
            formButtonPrimary: {
              fontSize: 14,
              textTransform: "none",
              backgroundColor: "#962b35",
              border: "none",
              color: "white",
              "&:hover, &:focus, &:active": {
                backgroundColor: "#49247A",
              },
            },
          },
        }}
      />
    </div>
  );
}
