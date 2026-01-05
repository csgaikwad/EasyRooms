import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Compass, AlertCircle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-3xl w-full mx-auto">
        <div className="text-center mb-8">
          {/* Animated 404 */}
          <div className="relative mb-6">
            <h1 className="text-[120px] md:text-[140px] font-black bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 bg-clip-text text-transparent mb-0 leading-none tracking-tighter">
              404
            </h1>

          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-3">
            Lost in Space?
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-6">
            This page took a cosmic detour. Let's navigate back to familiar
            territory.
          </p>
        </div>

        {/* Floating cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-3 rounded-lg flex-shrink-0">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                  Navigation Tips
                </h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                    Verify the URL for accuracy
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                    Explore our site navigation
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                    Use the search feature
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-rose-500 to-pink-500 p-3 rounded-lg flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                  Report Issue
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Found a broken link? Let us know so we can fix it for
                  everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center justify-center px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Return Back
          </button>

          <Link
            to="/"
            className="group inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Home Portal
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="relative h-20">
          {/* Floating dots */}
          <div className="absolute top-0 left-1/4 w-2 h-2 bg-orange-400/50 rounded-full animate-pulse"></div>
          <div className="absolute top-4 right-1/3 w-3 h-3 bg-rose-400/50 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-10 left-1/3 w-1.5 h-1.5 bg-amber-400/50 rounded-full animate-pulse delay-700"></div>
          
          {/* Subtle pattern */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="flex space-x-8">
              <div className="w-8 h-8 border-2 border-orange-400 rounded-full"></div>
              <div className="w-8 h-8 border-2 border-rose-400 rounded-full"></div>
              <div className="w-8 h-8 border-2 border-amber-400 rounded-full"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotFound;