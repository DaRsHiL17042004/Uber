import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] flex flex-col justify-between">
      
      {/* Logo */}
      <div className="p-4 sm:p-6">
        <img 
          className="w-20 sm:w-24 md:w-28" 
          src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcLzhGbTh4cU5SZGZUVjUxYVh3bnEyLnN2ZyJ9:weare:F1cOF9Bps96cMy7r9Y2d7affBYsDeiDoIHfqZrbcxAw?width=1200&height=417" 
          alt="Uber Logo" 
        />
      </div>

      {/* Content Box */}
      <div className="bg-white rounded-t-2xl px-6 py-10 sm:px-10 sm:py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
          Get Started with Uber
        </h2>
        <Link 
          to="/login" 
          className="block w-full bg-black text-white text-base sm:text-lg py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Continue
        </Link>
      </div>
    </div>
  )
}

export default Start
