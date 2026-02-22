Team Management Frontend

A role-based Team & User Management System frontend built with React + Vite, designed to mirror real company hierarchy where Admins manage structure and Team Leaders manage their teams.

This project focuses on clean architecture, role separation, and scalable UI structure.

🚀 Features
👑 Admin Panel

Create users and team leaders

Manage teams

Assign team leaders to teams

View all users and teams

🧑‍💼 Team Leader Panel

Create users within their assigned team

Assign job roles (Developer, Designer, etc.)

View only their team members

👨‍💻 User

Access limited to assigned permissions

Belongs to a single team

Has a job role (Developer / Designer / QA)

🧠 Role Design (Important Concept)

This project separates System Roles and Job Roles:

🔐 System Roles (Authorization)

Admin

Team Leader

User

🛠️ Job Roles (Function)

Developer

Designer
