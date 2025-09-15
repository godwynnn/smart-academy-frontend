import React from "react";
import { Card } from "@/components/ui/card";


export default function Wireframes() {

    
  return (
    <div className="p-4 md:p-8 grid gap-12 bg-gray-50">
      {/* Landing Page High-Fidelity Mockup */}
      <section className="rounded-2xl p-6 md:p-8 shadow-xl bg-white">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-blue-800 text-center md:text-left">Landing Page</h2>
        <div className="grid gap-6">
          <header className="flex flex-col md:flex-row md:justify-between md:items-center bg-blue-100 p-4 rounded-xl shadow gap-4">
            <div className="font-bold text-lg text-blue-900 text-center md:text-left">SchoolAI Clone</div>
            <nav className="flex flex-wrap justify-center md:justify-end gap-4 text-blue-700 text-sm md:text-base">
              <span>Teachers</span>
              <span>Students</span>
              <span>School Leaders</span>
              <span>Resources</span>
              <button className="bg-blue-700 text-white px-4 py-2 rounded-xl">Free for Teachers</button>
            </nav>
          </header>
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 h-40 rounded-xl flex flex-col justify-center items-center text-white text-center shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold">Empower Every Learner</h1>
            <p className="mt-2 text-sm md:text-base">Flexible AI built for classrooms</p>
            <button className="mt-4 bg-white text-blue-700 px-6 py-2 rounded-full shadow text-sm md:text-base">Get a Demo</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 text-center bg-blue-50 shadow">Spaces Library</Card>
            <Card className="p-4 text-center bg-blue-50 shadow">AI Assistant (Dot)</Card>
            <Card className="p-4 text-center bg-blue-50 shadow">Safety & Monitoring</Card>
          </div>
          <div className="bg-gray-100 p-4 md:p-6 rounded-xl text-center italic text-blue-900 shadow text-sm md:text-base">"Used by over 1M educators worldwide"</div>
          <footer className="text-center text-blue-600 text-xs md:text-sm">© 2025 SchoolAI Clone • Privacy • Terms</footer>
        </div>
      </section>

      {/* Teacher Dashboard */}
      <section className="rounded-2xl p-6 md:p-8 shadow-xl bg-white">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-blue-800 text-center md:text-left">Teacher Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="bg-blue-100 rounded-xl p-4 text-blue-900 space-y-4 text-center md:text-left">
            <div className="font-bold">Navigation</div>
            <div>Spaces</div>
            <div>Students</div>
            <div>Analytics</div>
            <div>Settings</div>
          </aside>
          <div className="col-span-3 grid gap-4">
            <div className="bg-blue-50 p-4 rounded-xl shadow text-center md:text-left">Quick Actions (Create Space, Generate Lesson)</div>
            <div className="bg-blue-50 p-4 rounded-xl shadow text-center md:text-left">Recent Spaces List</div>
            <div className="bg-yellow-100 p-4 rounded-xl shadow text-center md:text-left">Student Alerts & Notifications</div>
          </div>
        </div>
      </section>

      {/* Student Workspace */}
      <section className="rounded-2xl p-6 md:p-8 shadow-xl bg-white">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-blue-800 text-center md:text-left">Student Workspace</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-3 bg-gray-100 rounded-xl p-6 shadow flex flex-col justify-center items-center">
            <p className="text-gray-600 text-sm md:text-base">Chat with Dot</p>
            <div className="mt-4 bg-white p-3 rounded-lg shadow w-full md:w-3/4 text-sm md:text-base">AI Response Bubble</div>
          </div>
          <aside className="bg-blue-50 rounded-xl p-6 shadow flex flex-col items-center">
            <p className="font-bold text-blue-800">Progress</p>
            <div className="mt-4 bg-white p-2 rounded shadow w-full text-xs md:text-sm">Checklist</div>
          </aside>
        </div>
      </section>

      {/* Chrome Extension */}
      <section className="rounded-2xl p-6 md:p-8 shadow-xl bg-white">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-blue-800 text-center md:text-left">Chrome Extension</h2>
        <div className="grid gap-4">
          <input className="border p-2 rounded-xl text-sm md:text-base" placeholder="Ask Dot anything..." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="bg-blue-700 text-white py-2 rounded-xl shadow text-sm md:text-base">Lesson Plan</button>
            <button className="bg-blue-700 text-white py-2 rounded-xl shadow text-sm md:text-base">Assessment</button>
            <button className="bg-blue-700 text-white py-2 rounded-xl shadow text-sm md:text-base">Rubric</button>
          </div>
          <div className="bg-gray-100 h-20 rounded-xl shadow p-4 text-xs md:text-sm">Generated Content Preview</div>
        </div>
      </section>

      {/* Content Library */}
      <section className="rounded-2xl p-6 md:p-8 shadow-xl bg-white">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-blue-800 text-center md:text-left">Content Library</h2>
        <div className="grid gap-6">
          <input className="border p-2 rounded-xl text-sm md:text-base" placeholder="Search Spaces..." />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-blue-50 shadow">Space Card</Card>
            <Card className="p-4 bg-blue-50 shadow">Space Card</Card>
            <Card className="p-4 bg-blue-50 shadow">Space Card</Card>
          </div>
          <div className="bg-gray-100 p-4 rounded-xl shadow text-xs md:text-sm">Space Detail Preview</div>
        </div>
      </section>
    </div>
  );
}