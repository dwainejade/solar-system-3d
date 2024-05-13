import Link from "next/link";

const Home = () => {
  return (
    <div className='main-page'>
      <h1>Scene Selector</h1>
      <nav>
        <ul>
          <li>
            <Link href='/scene-three'>Main</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
