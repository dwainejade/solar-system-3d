import Link from "next/link";

const Home = () => {
  return (
    <div className='main-page'>
      <h1>Scene Selector</h1>
      <nav>
        <Link href='/main/'>Main</Link>

      </nav>
    </div>
  );
};

export default Home;
