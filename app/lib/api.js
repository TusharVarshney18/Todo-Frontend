const BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function api(path, { method = "GET", body, headers = {} } = {}) {
   const res = await fetch(`${BASE}${path}`, {
      method,
      headers: { "Content-Type": "application/json", ...headers },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
   });
   if (!res.ok) {
      let msg = "Request failed";
      try {
         const j = await res.json();
         msg = j.error || j.message || msg;
      } catch { }
      throw new Error(msg);
   }
   if (res.status === 204) return null;
   return res.json();
}

export const Auth = {
   profile: () => api("/profile"),
   login: (email, password) => api("/login", { method: "POST", body: { email, password } }),
   register: (name, email, password) => api("/register", { method: "POST", body: { name, email, password } }),
   logout: () => api("/logout", { method: "POST" }),
};

export const Todos = {
   list: () => api("/api/todos"),
   create: (data) => api("/api/todos", { method: "POST", body: data }),
   update: (id, patch) => api(`/api/todos/${id}`, { method: "PUT", body: patch }),  // ✅ FIX: Use backticks
   remove: (id) => api(`/api/todos/${id}`, { method: "DELETE" }),  // ✅ FIX: Use backticks
};
