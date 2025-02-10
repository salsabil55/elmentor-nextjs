import { useEffect } from "react";
import { useRouter } from "next/router";
const ErrorPage = ({ statusCode }) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [router]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>{statusCode ? `Error: ${statusCode}` : "An Error Occurred"}</h1>
      <p>
        {statusCode
          ? `A server-side error occurred (Status Code: ${statusCode}).`
          : "A client-side error occurred."}
      </p>
      <p>You will be redirected to the homepage in 3 seconds...</p>
    </div>
  );
};

// Handle error status codes for server-side or client-side rendering
ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
