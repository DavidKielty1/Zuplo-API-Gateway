"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Script from "next/script";
import { type Subscription, getSubscriptionAction } from "./actions";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, isLoading } = useUser();
  const [subscription, setSubscription] = useState<Subscription>();

  useEffect(() => {
    if (!user || !user.email) return;

    getSubscriptionAction(user.email).then(setSubscription);
  }, [user]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user ? (
        <>
          Welcome {user.email}!
          {!subscription && (
            <div>
              <Script async src="https://js.stripe.com/v3/pricing-table.js" />
              <div
                dangerouslySetInnerHTML={{
                  __html: `<stripe-pricing-table
            pricing-table-id="prctbl_1OeGfoHOfesX6IwqBnUQBuN8"
            publishable-key="pk_test_51NttAOHOfesX6Iwqwhg9PKCTuWFtOdnGjLAlmveXhLS28ZUe5pNoaUzGH6caNUW5hhnyYTLRKAJQITYdHTKXiuBt00FZah3ZbG"
          ></stripe-pricing-table>`,
                }}
              ></div>
            </div>
          )}
          <a href="/api/auth/login">Logout</a>
        </>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </main>
  );
}
