"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Todos, Auth } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TodosPage() {
  const router = useRouter();
  const client = useQueryClient();
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState(""); // ← NEW
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => Auth.profile(),
    retry: false,
  });

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: Todos.list,
    enabled: !!profile?.user,
  });

  const createMut = useMutation({
    mutationFn: Todos.create,
    onSuccess: () => {
      client.invalidateQueries(["todos"]);
      setText("");
      setDueDate(""); // ← NEW: Clear due date
      toast.success("Todo added!");
    },
    onError: (e) => toast.error(e.message),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, patch }) => Todos.update(id, patch),
    onSuccess: () => {
      client.invalidateQueries(["todos"]);
      toast.success("Updated!");
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteMut = useMutation({
    mutationFn: Todos.remove,
    onSuccess: () => {
      client.invalidateQueries(["todos"]);
      toast.success("Deleted!");
    },
    onError: (e) => toast.error(e.message),
  });

  const logoutMut = useMutation({
    mutationFn: Auth.logout,
    onSuccess: () => {
      client.clear();
      toast.success("Logged out!");
      router.push("/");
    },
    onError: (e) => toast.error(e.message),
  });

  const handleAdd = () => {
    if (text.trim()) {
      createMut.mutate({
        title: text,
        dueAt: dueDate ? new Date(dueDate).toISOString() : null, // ← NEW
      });
    }
  };

  useEffect(() => {
    if (!profileLoading && !profile?.user) {
      router.push("/auth/login");
    }
  }, [profileLoading, profile, router]);

  if (profileLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black">
        <p className="text-zinc-500">Loading...</p>
      </main>
    );
  }

  if (!profile?.user) {
    return null;
  }

  // ← NEW: Helper function to check if todo is overdue
  const isOverdue = (dueAt, isCompleted) => {
    if (!dueAt || isCompleted) return false;
    return new Date(dueAt) < new Date();
  };

  // ← NEW: Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <header className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl dark:text-zinc-50">
              My Todos
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Welcome back,{" "}
              <span className="font-semibold">{profile?.user?.name}</span>
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Link
              href="/"
              className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-center text-sm font-medium transition hover:bg-zinc-50 sm:flex-none sm:px-4 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:text-zinc-100"
            >
              Home
            </Link>
            <button
              onClick={() => logoutMut.mutate()}
              disabled={logoutMut.isPending}
              className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50 sm:flex-none sm:px-4"
            >
              {logoutMut.isPending ? "Logging out..." : "Logout"}
            </button>
          </div>
        </header>

        {/* Add Todo Input - Updated with Due Date */}
        <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              className="flex-1 rounded-lg border border-zinc-300 px-4 py-3 transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              placeholder="Add a new todo..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <input
              type="date"
              className="rounded-lg border border-zinc-300 px-4 py-3 transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <button
              onClick={handleAdd}
              disabled={!text.trim() || createMut.isPending}
              className="w-full rounded-lg bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {createMut.isPending ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        {/* Todos List */}
        <div className="mt-4 sm:mt-6">
          {isLoading ? (
            <div className="flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-12 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-zinc-500">Loading todos...</p>
            </div>
          ) : todos.length === 0 ? (
            <div className="flex items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white p-8 sm:p-12 dark:border-zinc-700 dark:bg-zinc-900">
              <p className="text-center text-sm text-zinc-500 sm:text-base">
                No todos yet. Add one above!
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((t, index) => (
                <li
                  key={t._id}
                  className={`group flex flex-col gap-3 rounded-xl border p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:gap-4 ${
                    isOverdue(t.dueAt, t.isCompleted)
                      ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20"
                      : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                  }`}
                >
                  {/* List Number */}
                  <span className="inline-block w-7 text-center font-bold text-violet-600 select-none">
                    {index + 1}
                  </span>

                  {/* Todo Text or Edit Input */}
                  {editingId === t._id ? (
                    <input
                      className="flex-1 rounded-lg border border-zinc-300 px-3 py-1.5 transition focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && editText.trim()) {
                          updateMut.mutate({
                            id: t._id,
                            patch: { title: editText },
                          });
                          setEditingId(null);
                        }
                        if (e.key === "Escape") {
                          setEditingId(null);
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <div className="flex-1">
                      <span
                        className={`break-words ${
                          t.isCompleted
                            ? "text-zinc-400 line-through"
                            : "text-zinc-900 dark:text-zinc-100"
                        }`}
                      >
                        {t.title}
                      </span>
                      {/* ← NEW: Show Due Date */}
                      {t.dueAt && (
                        <div className="mt-2 flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                              isOverdue(t.dueAt, t.isCompleted)
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}
                          >
                            📅 {formatDate(t.dueAt)}
                            {isOverdue(t.dueAt, t.isCompleted) && " (Overdue)"}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  {editingId === t._id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (editText.trim()) {
                            updateMut.mutate({
                              id: t._id,
                              patch: { title: editText },
                            });
                            setEditingId(null);
                          }
                        }}
                        disabled={!editText.trim()}
                        className="flex-1 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50 sm:flex-none"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:text-zinc-100 sm:flex-none"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                      <button
                        onClick={() => {
                          setEditingId(t._id);
                          setEditText(t.title);
                        }}
                        className="flex-1 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:hover:bg-blue-950 sm:flex-none"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMut.mutate(t._id)}
                        disabled={deleteMut.isPending}
                        className="flex-1 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950 sm:flex-none"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Stats Footer */}
        {todos.length > 0 && (
          <div className="mt-4 flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 sm:mt-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs text-zinc-600 sm:text-sm dark:text-zinc-400">
              {todos.filter((t) => !t.isCompleted).length} active,{" "}
              {todos.filter((t) => t.isCompleted).length} completed
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
