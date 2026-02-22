import React, { useState } from "react";
import CreateTeamButton from "../../components/common/createTeamButton";


const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Developer", email: "alice@example.com", role: "member", team: "Frontend Team", status: "active" },
    { id: 2, name: "Bob Backend", email: "bob@example.com", role: "member", team: "Backend Team", status: "inactive" },
    { id: 3, name: "Charlie Junior", email: "charlie@example.com", role: "member", team: "MERN Team", status: "active" }
  ]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await api.get('/users');
  //       setUsers(response.data);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);


  const teamMembers = users.filter(user => user.role === 'member');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Team Members</h1>

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
                Team
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teamMembers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.team}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}>
                    {user.status}

                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateTeamButton />
    </div>
  );
};

export default Users;