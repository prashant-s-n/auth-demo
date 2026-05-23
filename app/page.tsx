import Image from "next/image";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="page-shell">
      <section className="card stack">
        {session?.user ? (
          <>
            <div className="user-chip">
              {session.user.image ? (
                <Image
                  alt={session.user.name ?? "Google profile"}
                  className="avatar"
                  src={session.user.image}
                  width={40}
                  height={40}
                />
              ) : null}
              <span>{session.user.name ?? "Signed in"}</span>
            </div>
            <div className="actions">
              <Link className="button" href="/hello">
                Open Hello page
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button className="button-muted" type="submit">
                  Sign out
                </button>
              </form>
            </div>
          </>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/hello" });
            }}
          >
            <h2>Auth Demo</h2>
            <button className="button" type="submit">
              Continue with Google
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
