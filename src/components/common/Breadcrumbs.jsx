import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap = {
    admin: 'Admin',
    dashboard: 'Dashboard',
    teams: 'Team Leaders',
    'assign-team-leader': 'Assign Team Leader',
    users: 'Users',
    lead: 'Team Leader',
    'my-team': 'My Team',
    member: 'Member',
    team: 'Team'
  };

  const getHomePath = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user?.role === 'admin') return '/admin';
  if (user?.role === 'team leader') return '/lead/my-team';
  if (user?.role === 'user') return '/member/team';
  return '/admin'; // fallback
};

const getHomeLabel = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user?.role === 'admin') return 'Admin Home';
  if (user?.role === 'team leader') return 'Team Lead Home';
  if (user?.role === 'user') return 'Member Home';
  return 'Home'; // fallback
};

const getBreadcrumbName = (pathname) => {
    return breadcrumbNameMap[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);
  };

  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <button
            onClick={() => navigate(getHomePath())}
            className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-blue-600">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            {getHomeLabel()}
          </button>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <li key={to}>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                {last ? (
                  <span className="ml-1 text-sm font-medium text-slate-500 md:ml-2">
                    {getBreadcrumbName(value)}
                  </span>
                ) : (
                  <button
                    onClick={() => navigate(to)}
                    className="ml-1 text-sm font-medium text-slate-700 hover:text-blue-600 md:ml-2">
                    {getBreadcrumbName(value)}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;