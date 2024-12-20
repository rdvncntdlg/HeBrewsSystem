import { MoreVertical, Menu, X } from "lucide-react"
import React,{ useContext, createContext, useState } from "react"
import { Link } from 'react-router-dom';

const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true)
  
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-custom-black border-r shadow-xl">
        <div className="p-6 pb-10 flex justify-between items-center">
        <img
            src="src/assets/images/logo.png"
            className={`overflow-hidden transition-all ${
              expanded ? "w-44 pr-2" : "w-0 pl-2"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <X color="black" /> : <Menu color="black" />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert, to }) {
    const { expanded } = useContext(SidebarContext)
    
    return (
        <Link to={to} className="text-white"> {/* Add the Link component here */}
      <li
        className={`
          relative flex items-center py-4 mb-2 px-6 my-1
          font-bold rounded-3xl cursor-pointer
          transition-colors group
          ${
            active
              ? "bg-custom-brown text-custom-black"
              : "hover:bg-indigo-50 text-gray-400"
          }
        `}
      >
        {icon}
        
          <span
            className={`overflow-hidden transition-all  ${
              expanded ? "w-32 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
        
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-red-500 ${
              expanded ? "" : "top-2"
            }`}
          />
          
        )}
    
        {!expanded && (
          <div
            className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
          >
            {text}
          </div>
        )}
      </li>
      </Link>
    )
  }