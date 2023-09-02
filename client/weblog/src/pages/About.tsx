import React from 'react';
import Footer from '../components/Footer';
const About: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-5 items-center p-3">
      <div>
        <h1 className='text-xl font-bold'>About We<span className='text-indigo-600'>Blog</span></h1>
      </div>
      <div className="h-max w-[90vw] flex flex-col justify-evenly gap-5 shadow-xl rounded p-5">
        <p className="text-base space-y-1 font-normal">
          WeBlog is a full-stack web platform crafted with the powerful PERN stack (PostgreSQL, Express.js, React.js, Node.js). Complemented by a sleek React.js frontend, styled with Tailwind CSS, WeBlog offers developers a seamless and secure space to unite, share, and thrive.        </p>
        <h1 className="font-semibold text-xl">Features offered :</h1>
        <ul className="pl-5 flex flex-col gap-3">
          <li className='flex flex-row items-center h-max gap-2'>
            <p><span className='text-indigo-600 font-semibold'>Connecting Developers: </span>
            <br/>
              WeBlog serves as a hub, connecting developers and fostering a vibrant community. It's a space where developers / bloggers can come together to share their knowledge, experiences, and insights.</p>
          </li>
          <li className='flex flex-row items-center h-max gap-2'>
            <p>
              <span className='text-indigo-600 font-semibold'>Multi-Role Platform: </span>
              <br/>
              WeBlog offers distinct roles to cater to every user's needs - Developers / Bloggers, WeBlog Admins, and Content Contributors. Each role has its unique privileges and responsibilities.


            </p>          </li>
          <li className='flex flex-row items-center h-max gap-2'>
            <p>
              <span className='text-indigo-600 font-semibold'>Secure Access: </span>
              <br/>
              Security is paramount at WeBlog. We employ OTP (One-Time Password) verification, seamlessly integrated with Nodemailer, ensuring secure access to admin functionalities while preserving user data with encrypted cookies.

            </p>          </li>
            <li className='flex flex-row items-center h-max gap-2'>
            <p>
              <span className='text-indigo-600 font-semibold'>Content Privacy/Drafts: </span>
              <br/>
              Users can publish there post right away, but if you want to keep it private you can.
              </p>          </li>
              <li className='flex flex-row items-center h-max gap-2'>
            <p>
              <span className='text-indigo-600 font-semibold'>Search Functionality: </span>
              <br/>
              Users can search the content with the search bar, which will return the desired results.              </p>          </li>
              <li className='flex flex-row items-center h-max gap-2'>
            <p>
              <span className='text-indigo-600 font-semibold'>Passwords: </span>
              <br/>
              All your passwords are stored securely in the database, and before storing them, they are hashed so they are completely secure.              </p>          </li>
          <li className='flex flex-row items-center h-max gap-2'>
            <p>
              <span className='text-indigo-600 font-semibold'>Self-Contained Data: </span>
              <br/>
              Unlike many platforms, we keep all our data in-house. No reliance on third-party APIs means we have full control over data management and security.
            </p>       </li>
          <li className='flex flex-row items-center h-max gap-2'>
            <p>
              <span className='text-indigo-600 font-semibold'>Admin Empowerment: </span>
              <br/>
              WeBlog Admins have the tools to manage the platform effectively. They can control promotional offers, discounts, and provide a seamless experience for all users.  </p>           </li>
          <li className='flex flex-row items-center h-max gap-2'>
            <p>
              <span className='text-indigo-600 font-semibold'>RESTful APIs: </span>
              <br/>
              WeBlog relies on REST APIs for data retrieval and manipulation, all managed via backend routes. We value simplicity and transparency in our data handling.  </p>           </li>
          <li className='flex flex-row items-center h-max gap-2'>
            <p>
              <span className='text-indigo-600 font-semibold'>Content Management: </span>
              <br/>
              Content Contributors can effortlessly add, edit, and remove their posts, enabling them to share their valuable insights with the community.  </p>            </li>
        </ul>

        <h1 className="font-semibold text-xl">Insights :</h1>
        <ul className="pl-5 flex flex-col gap-3">
          <li className='flex flex-row items-center h-max gap-2'>
            <p>
              <span className='text-indigo-600 font-semibold'>Comprehensive Analytics: </span>
              <br/>
              WeBlog offers advanced analytics, including traffic statistics, engagement metrics, and more, empowering WeBlog Admins with valuable insights for optimizing the platform.

            </p>
          </li>
          <li className='flex flex-row items-center h-max gap-2'>
            <p>
              <span className='text-indigo-600 font-semibold'>Content Discovery: </span>
              <br/>
              Users can easily discover new and trending content on WeBlog, making it a go-to platform for staying informed and entertained.
            </p>
          </li>
        </ul>
        <p className="text-base font-normal">
          Join WeBlog today and be part of a vibrant community where developers unite, share their stories, and embark on an exciting journey of creativity and expression. WeBlog - Where Developers Shine!</p>
      </div>
      <Footer />
    </div>
  );
};

export default About;