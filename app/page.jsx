"use client";

import Link from "next/link";

const MainPage = () => {
  return (
    <div className='main-page'>
      <h1>Scene Selector</h1>
      <nav>
        <ul>
          <li>
            <Link href='/scene-one'>
              <a>Scene One</a>
            </Link>
          </li>
          <li>
            <Link href='/scene-two'>
              <a>Scene Two</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainPage;
