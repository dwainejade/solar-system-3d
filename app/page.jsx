import Link from "next/link";

const Home = () => {
  return (
    <div className='main-page'>
      <h1>Scene Selector</h1>
      <nav>
        <Link href='/main/'>Main</Link>
        <br />
        <Link href='/experiments/'>Experiments</Link>
        <br />
        <Link href='/explore/'>Explore</Link>
      </nav>
    </div>
  );
};

export default Home;
