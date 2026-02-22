import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTeamMembersApi } from "../../services/leadApi";
import toast from "react-hot-toast";
import RefreshButton from "../../components/common/refreshButton";
import CreateTeamButton from "../../components/common/createTeambutton";
import axios from "axios";

const MyTeam = () => {
  const navigate = useNavigate();
  const [teamStats, setTeamStats] = useState({
    totalMembers: 10,
    activeTasks: 9,
    completedTasks: 20,
    pendingTasks: 1
  });

  const memberTeam = [
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "member",
      status: "active"
    },
    {
      _id: "2",
      name: "Jane Doe",
      email: "jane@example.com",
      role: "member",
      status: "active"
    },
    {
      _id: "3",
      name: "Bob Smith",
      email: "bob@example.com",
      role: "member",
      status: "active"
    }
  ];

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Team Lead" };
  const [loading, setLoading] = useState(true);
  const [recentMembers, setRecentMembers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchDashboardData();
      await getQuote();
    };
    fetchData();
  }, []);


  const [quote, setQuote] = useState([]);

  const getQuote = async () => {
    try {
      const res = await axios.get("https://motivational-spark-api.vercel.app/api/quotes");
      // Pick one random quote
      const quotes = Array.isArray(res.data) ? res.data : [res.data];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote([randomQuote]);
    } catch (error) {
      console.error("Failed to fetch quote", error);
    }
  }

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // const res = await getAllTeamMembersApi();
      // const members = res.data || [];
      // Use mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      const members = memberTeam;

      setTeamStats({
        totalMembers: members.length,
        activeTasks: Math.floor(Math.random() * 10) + 5, // Mock data
        completedTasks: Math.floor(Math.random() * 20) + 10, // Mock data
        pendingTasks: Math.floor(Math.random() * 5) + 2 // Mock data
      });

      setRecentMembers(members.slice(0, 5)); // Show 5 most recent members
      setTeamMembers(members); // Set all team members
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };



  const handleRemoveMember = (id) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      // Add your API call here to remove a team member
      toast.success("Member removed successfully");
      fetchDashboardData(); // Refresh the data
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">{user.name}'s Team Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here's your team overview</p>
        </div>
        <div>
          {quote.map((item) => (

            <div key={item._id}>
              <p className="text-slate-600">{item.quote}</p>
            </div>
          ))}
        </div>
        <div className="flex space-x-3">
          <RefreshButton onClick={fetchDashboardData} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{teamStats.totalMembers}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{teamStats.activeTasks}</p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{teamStats.completedTasks}</p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{teamStats.pendingTasks}</p>
            </div>
            <div className="bg-red-100 rounded-full p-3">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/lead/team-members')}
              className="w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition flex items-center justify-between group"
            >
              <span>Manage Team Members</span>
              <svg className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => navigate('/lead/tasks')}
              className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition flex items-center justify-between group"
            >
              <span>View Tasks</span>
              <svg className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => navigate('/lead/change-password')}
              className="w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition flex items-center justify-between group"
            >
              <span>Change Password</span>
              <svg className="w-5 h-5 text-gray-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Team Members</h2>
          <div className="space-y-3">
            {loading ? (
              [...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full skeleton"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 skeleton mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-32 skeleton"></div>
                  </div>
                </div>
              ))
            ) : recentMembers.length > 0 ? (
              recentMembers.map((member) => (
                <div key={member._id} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">
                      {member.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No team members yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">All Team Members</h2>
          <CreateTeamButton
            customTrigger={
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Add Member
              </button>
            }
          />
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-24 skeleton"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-32 skeleton"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-16 skeleton"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-20 skeleton"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-slate-200 rounded w-16 skeleton"></div>
                  </td>
                </tr>
              ))
            ) : teamMembers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                  No team members found. Click "Add Member" to get started.
                </td>
              </tr>
            ) : (
              teamMembers.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default MyTeam;

