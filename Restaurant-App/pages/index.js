import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Restaurant App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className='bg-red-700'>Restaurant App</h1>
      </main>
    </>
  )
}
