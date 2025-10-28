import Link from "next/link";
import Card from "./components/Card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-50 md:text-6xl">
            Todo App
          </h1>
          <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400">
            A modern, fast, and secure todo application built with Next.js
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/auth/register"
              className="rounded-lg bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700"
            >
              Get Started
            </Link>
            <Link
              href="/auth/login"
              className="rounded-lg border border-zinc-300 px-6 py-3 font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:text-zinc-100"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card
            title="CRUD Operations"
            desc="Create, read, update, and delete todos with inline editing."
          />
          <Card
            title="Instant Feedback"
            desc="Toast notifications and loading states for every action."
          />
          <Card
            title="Secure Auth"
            desc="JWT tokens with HttpOnly cookies and bcrypt password hashing."
          />
          <Card
            title="Modern Stack"
            desc="Built with Next.js 16, React 19, MongoDB, and Tailwind CSS."
          />
        </section>

        {/* Additional Info Section */}
        <section className="mt-16 rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Key Features
          </h2>
          <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
            <li className="flex items-start gap-3">
              <span className="text-violet-600 text-xl">✓</span>
              <span>Create, edit, and delete todos with inline editing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-violet-600 text-xl">✓</span>
              <span>Mark todos as complete with a simple checkbox</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-violet-600 text-xl">✓</span>
              <span>Secure authentication with JWT tokens and bcrypt</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-violet-600 text-xl">✓</span>
              <span>Beautiful dark mode support across all pages</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-violet-600 text-xl">✓</span>
              <span>Fully responsive design for mobile, tablet, and desktop</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-violet-600 text-xl">✓</span>
              <span>Real-time toast notifications for user feedback</span>
            </li>
          </ul>
        </section>


        {/* Security Section */}
        <section className="mt-16 rounded-xl border border-green-200 bg-green-50 p-8 dark:border-green-900 dark:bg-green-950/20">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-600">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-green-900 dark:text-green-400 mb-3">
                🔒 Enterprise-Grade Security
              </h3>
              <p className="text-sm text-green-800 dark:text-green-300 mb-4">
                Your data is protected with industry-standard security practices used by Fortune 500 companies.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-green-900 dark:text-green-400">Bcrypt Password Hashing</p>
                    <p className="text-xs text-green-700 dark:text-green-500">Industry-standard 10-round salted hashing (OWASP recommended)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-green-900 dark:text-green-400">JWT Authentication</p>
                    <p className="text-xs text-green-700 dark:text-green-500">Secure token-based auth with HttpOnly cookies (XSS protection)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-green-900 dark:text-green-400">HTTPS Encryption</p>
                    <p className="text-xs text-green-700 dark:text-green-500">All data transmitted over secure TLS 1.3 connection</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-green-900 dark:text-green-400">No Third-Party Tracking</p>
                    <p className="text-xs text-green-700 dark:text-green-500">Zero analytics, ads, or data sharing with external parties</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-green-900 dark:text-green-400">Protected Routes</p>
                    <p className="text-xs text-green-700 dark:text-green-500">Server-side authentication on every protected endpoint</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-green-900 dark:text-green-400">MongoDB Security</p>
                    <p className="text-xs text-green-700 dark:text-green-500">Encrypted database connections with user-level data isolation</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-white p-4 dark:bg-zinc-900">
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-900 dark:text-zinc-100">Privacy Guarantee:</strong> This is a demonstration project. Use temporary/throwaway emails for testing. We never sell, share, or analyze your data. All passwords are irreversibly hashed using bcrypt with salt rounds following OWASP guidelines—not even the developer can see your original password.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <div className="text-center">
            <div className="mb-4 flex justify-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Bcrypt Protected
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                </svg>
                JWT Secured
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                No Tracking
              </span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Built with Next.js, React, MongoDB, and Tailwind CSS
            </p>
            <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              Created by <span className="text-violet-600">Tushar Varshney</span>
            </p>
          </div>
        </footer>

      </div>
    </main>
  );
}
