"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <div className='main-page'>
      <h1>Scene Selector</h1>
      <nav>
        <ul>
          <li>
            <Link href='/scene-one'>Scene 1</Link>
          </li>
          <li>
            <p onClick={() => router.push("/scene-two")}>Scene 2</p>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
