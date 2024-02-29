import React from 'react';

const Login = () => {
  return (
    <div className="h-full bg-[#004e89] w-full pb-20 px-4">
      <div className="flex flex-col items-center justify-center">
        <svg
          tabIndex="0"
          className="focus:outline-none"
          aria-label="logo"
          role="banner"
          width="188"
          height="74"
          viewBox="0 0 188 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ... SVG Path ... */}
        </svg>

        <div className="bg-white shadow rounded-lg lg:w-1/3 md:w-1/2 w-full p-10 mt-16">
          <p
            tabIndex="0"
            className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
          >
            Login to your account
          </p>
          <p
            tabIndex="0"
            className="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
          >
            Don't have an account?{' '}
            <a
              href="javascript:void(0)"
              className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer"
            >
              Sign up here
            </a>
          </p>
          <button
  aria-label="Continue with google"
  role="button"
  className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-red-500 bg-red-500 flex items-center w-full mt-10"
>
  {/* ... Google SVG ... */}
  <p className="text-base font-medium ml-4 text-white">
    Continue with Google
  </p>
</button>
  
          
          <div className="w-full flex items-center justify-between py-5">
            <hr className="w-full bg-gray-400" />
            <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
              OR
            </p>
            <hr className="w-full bg-gray-400" />
          </div>
          <div>
            <label
              id="email"
              className="text-sm font-medium leading-none text-gray-800"
            >
              Email
            </label>
            <input
              aria-labelledby="email"
              type="email"
              className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            />
          </div>
          <div className="mt-6 w-full">
            <label
              htmlFor="pass"
              className="text-sm font-medium leading-none text-gray-800"
            >
              Password
            </label>
            <div className="relative flex items-center justify-center">
              <input
                id="pass"
                type="password"
                className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              />
              <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                {/* ... Eye SVG ... */}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              role="button"
              className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


