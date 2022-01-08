import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <h1>Oooops.. Page not found</h1>
      <Link href="/">
        <a>Go to Home</a>
      </Link>
    </div>
  );
};

export default NotFound;
