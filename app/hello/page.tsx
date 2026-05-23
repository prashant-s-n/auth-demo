import Image from "next/image";
import { auth, signOut } from "@/auth";

export default async function HelloPage() {
  const session = await auth();
  const displayName = (
    session?.user?.name ??
    session?.user?.email ??
    "Signed in"
  ).slice(0, 10);

  return (
    <main className="app-layout">
      <nav className="navbar">
        <div className="navbar-title">Test app</div>
        <div className="user-chip">
          {session?.user?.image ? (
            <Image
              alt={session.user.name ?? "Google profile"}
              className="avatar"
              src={session.user.image}
              width={40}
              height={40}
            />
          ) : null}
          <span>{displayName}</span>
        </div>
      </nav>
      <section className="app-body">
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="button" type="submit">
            Sign out
          </button>
        </form>
      </section>
    </main>
  );
}
