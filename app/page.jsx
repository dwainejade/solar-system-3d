"use client";
import Link from "next/link";

const Home = () => {
  return (
    <div className='home-page'>
      <h1>Scene Selector</h1>
      <nav>
        <ul>
          <li>
            <Link href='/scene-one'>Scene 1</Link>
          </li>
          <li>
            <Link href='/scene-two'>Scene 2</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
