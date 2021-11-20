import Link from 'next/link';

const Layout = (props) => {
  return (
    <>
      <h1>Header</h1>

        <nav>
            <Link href="/">Home</Link>
            <Link href="/aboutUs">About Us</Link>
        </nav>

      <main>{props.children}</main>
    </>
  );
};

export default Layout;
