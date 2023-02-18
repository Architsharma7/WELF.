import React from 'react'

const Footer = () => {
  return (
    <div className="">
    <div className="">
      <footer className="p-4 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6">
        <span className="text-sm text-white sm:text-center">
          Made By <span><a href="https://twitter.com/0xdhruva" target="_blank" className="text-white">@0xdhruva</a></span> & <span><a href="https://twitter.com/Arcsh7" target="_blank" className="text-white">@Arcsh7</a></span>
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-white sm:mt-0">
          <li>
            <a href="https://github.com/Architsharma7/PublicHelpDAO" className="hover:underline">
              Github
            </a>
          </li>
        </ul>
      </footer>
    </div>
    </div>
  )
}

export default Footer;