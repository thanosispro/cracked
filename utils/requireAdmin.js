export async function requireAdmin(ctx) {
  const { req } = ctx;
  const token = req.cookies?.admin_token || null;

  let isAuthenticated = false;

  if (token) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/adminAuth/`,
        {
          headers: {
            Cookie: `admin_token=${token}`,
          },
        }
      );

      const data = await res.json();
      isAuthenticated = data.status === "success";
    } catch (err) {
      console.error("Admin auth error:", err);
    }
  }

  return {
    props: {
      isAuthenticated,
    },
  };
}
