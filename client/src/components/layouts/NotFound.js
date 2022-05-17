import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div class="relative p-8 text-center border border-gray-200 rounded-lg">
      <h2 class="text-2xl font-medium">There's nothing here...</h2>

      <p class="mt-4 text-sm text-gray-500">
        Maybe you can check some other pages out!
      </p>

      <button class="inline-flex items-center px-5 py-3 mt-8 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500">
        <Link to="/">Go to home page</Link>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="flex-shrink-0 w-4 h-4 ml-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>
  );
};

export default NotFound;
