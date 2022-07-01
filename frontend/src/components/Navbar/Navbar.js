import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="relative sm:px-0 py-6">
      <nav
        className="relative items-center w-full text-2xl"
        aria-label="Global"
      >
        <ul className="flex items-center justify-between">
          <li>
            <Link to="/">Ecommerce Shop</Link>
          </li>
          {/* <li>
            <Link to="/profile">Search</Link>
          </li> */}
          <div className="flex justify-end items-center">
            <li className="mr-8">
              <Link to="/profile">
                <svg
                  width="62"
                  height="62"
                  viewBox="0 0 62 62"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M31 38.75C36.3503 38.75 40.6875 34.4128 40.6875 29.0625C40.6875 23.7122 36.3503 19.375 31 19.375C25.6497 19.375 21.3125 23.7122 21.3125 29.0625C21.3125 34.4128 25.6497 38.75 31 38.75Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M52.3125 11.625H9.6875C8.61745 11.625 7.75 12.4924 7.75 13.5625V48.4375C7.75 49.5076 8.61745 50.375 9.6875 50.375H52.3125C53.3826 50.375 54.25 49.5076 54.25 48.4375V13.5625C54.25 12.4924 53.3826 11.625 52.3125 11.625Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.5551 50.3739C15.7585 46.9742 17.9859 44.031 20.9309 41.9494C23.8759 39.8677 27.3936 38.75 31 38.75C34.6064 38.75 38.1241 39.8677 41.0691 41.9494C44.0141 44.031 46.2415 46.9742 47.4449 50.3739"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <svg
                  width="62"
                  height="62"
                  viewBox="0 0 62 62"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M52.3125 11.625H9.6875C8.61745 11.625 7.75 12.4924 7.75 13.5625V48.4375C7.75 49.5076 8.61745 50.375 9.6875 50.375H52.3125C53.3826 50.375 54.25 49.5076 54.25 48.4375V13.5625C54.25 12.4924 53.3826 11.625 52.3125 11.625Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.75 19.375H54.25"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M40.6875 27.125C40.6875 29.6943 39.6669 32.1583 37.8501 33.9751C36.0333 35.7919 33.5693 36.8125 31 36.8125C28.4307 36.8125 25.9667 35.7919 24.1499 33.9751C22.3331 32.1583 21.3125 29.6943 21.3125 27.125"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
