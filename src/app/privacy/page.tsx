import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { links, mcp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What the hosted CogniCore service collects, how it is used, and the choices you have.",
};

/* Mirrors PRIVACY.md in the cognicore-env repository. Update both together. */
export default function PrivacyPage() {
  const mail = <a href={`mailto:${links.email}`}>{links.email}</a>;

  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy policy" lead={<>Effective date: 21 October 2026</>} />
      <div className="wrap py-12">
        <article className="prose-cc max-w-[68ch]">
          <p>
            This policy explains what data the hosted CogniCore service collects, how it is used, and the choices you
            have. It covers the hosted MCP server at <code>{new URL(mcp.url).origin}</code>, which is what you use when
            you connect CogniCore to Claude, ChatGPT or another AI app.
          </p>
          <p>
            It does <strong>not</strong> cover the open-source <code>cognicore-env</code> Python package when you run it
            yourself. In that case your data stays on your own machine and nothing is sent to us.
          </p>

          <h2>In short</h2>
          <ul>
            <li>
              You sign in with GitHub. We receive your <strong>GitHub user ID and username</strong> only, not your
              email, repositories or private data.
            </li>
            <li>
              We store <strong>what you ask CogniCore to remember</strong>, in a database that belongs to your account
              alone.
            </li>
            <li>
              We <strong>do not sell</strong> your data, show ads, use analytics trackers, or use your data to train AI
              models.
            </li>
            <li>You can delete individual memories at any time, and ask us to delete everything.</li>
          </ul>

          <h2>What we collect</h2>
          <p>
            <strong>1. Your GitHub identity.</strong> When you connect, you sign in through GitHub. We request no GitHub
            permissions beyond your public profile, and we read two things: your numeric GitHub user ID and your
            username. Your account inside CogniCore is identified as <code>github:&lt;your user ID&gt;</code>. GitHub
            gives us a temporary access token during sign-in; we use it once to read your ID and username, and do not
            store it.
          </p>
          <p>
            <strong>2. What you store through CogniCore&apos;s tools.</strong> This is the content the service exists to
            keep for you, for example:
          </p>
          <ul>
            <li>facts and notes you ask it to remember, and saved session summaries</li>
            <li>recorded experiences and outcomes of tasks</li>
            <li>design data synced from a Figma file you choose (styles, components, variables)</li>
            <li>voice preferences you give for ElevenLabs (voice ID and settings; we do not contact ElevenLabs)</li>
            <li>memories you choose to list on the CogniCore marketplace (see &ldquo;Sharing&rdquo; below)</li>
          </ul>
          <p>
            <strong>Sessions synced from your computer, if you turn sync on.</strong> If you run{" "}
            <code>cognicore login</code> on your computer, the CogniCore plugin for Claude Code and Codex also uploads
            each session&apos;s handoff to your account. That&apos;s the goal, current state, open tasks, decisions with
            their reasons, facts, exact values such as ticket IDs and versions, the paths of files mentioned, and the
            project folder&apos;s path. It is not the transcript. Secrets detected in it are redacted on your computer
            and again on our server. Until you sign in this way, the plugin sends us nothing.{" "}
            <code>cognicore logout</code> stops it.
          </p>
          <p>
            <strong>3. Long conversations, in one case.</strong> Some tools accept the current conversation so they can
            keep it within the AI app&apos;s limits. If a conversation sent this way is longer than about 150,000
            tokens, the older part is compressed into a summary and <strong>saved to your memory</strong>, so it can be
            recalled later. Shorter conversations are not stored.
          </p>
          <p>
            <strong>4. Technical data.</strong> Our hosting provider records standard server logs: IP address, time, the
            address requested and the response status, plus error messages. We use one short-lived cookie (up to 10
            minutes) during sign-in to protect it against forgery. We use no analytics, advertising or tracking cookies.
          </p>

          <h2>How we use it</h2>
          <p>Only to run the service:</p>
          <ul>
            <li>to sign you in and keep your session active</li>
            <li>to store your memories and return them to you when your AI app asks</li>
            <li>to keep the service secure and to fix problems</li>
          </ul>
          <p>We do not sell your data, use it for advertising, or use it to train AI models.</p>

          <h2>Where it is stored, and who can see it</h2>
          <p>
            Your memories are kept in a separate database for your account, named with a one-way hash of your account
            ID. Other users cannot read it. The service runs on servers operated by our hosting provider (currently
            Microsoft Azure, in South Korea), so your data may be stored and processed outside your country.
          </p>

          <h2>Sharing</h2>
          <p>We share data only in these cases:</p>
          <ul>
            <li>
              <strong>Marketplace, when you choose.</strong> If you use the tool that lists your memories for sale,
              other signed-in users can discover those listed memories and copy them into their own memory. Your account
              ID and marketplace reputation are visible to them, and the transfer is recorded. Nothing is listed unless
              you do it, and no real money is involved.
            </li>
            <li>
              <strong>The AI app you use.</strong> Results of the tools you call are returned to the app you connected
              (such as Claude or ChatGPT), and that app&apos;s own privacy policy applies to them.
            </li>
            <li>
              <strong>Services that run CogniCore:</strong> GitHub, for sign-in; our hosting provider (currently
              Microsoft Azure), which stores the data and runs the server; and Cloudflare, which provides the domain
              name service for <code>cognicoree.tech</code>.
            </li>
            <li>
              <strong>Figma, when you ask.</strong> If you sync a Figma file, the Figma access token you provide is sent
              to Figma for that request only. We do not store it.
            </li>
            <li>
              <strong>When required by law</strong>, or to protect the service and its users from abuse.
            </li>
          </ul>

          <h2>How long we keep it</h2>
          <ul>
            <li>
              <strong>Your memories:</strong> until you delete them or ask us to delete your data.
            </li>
            <li>
              <strong>Backups:</strong> we copy the stored databases to our hosting provider&apos;s storage nightly, so
              the service can be restored after a failure, and each backup is deleted automatically after 30 days. Our
              storage provider can keep a deleted backup for up to 7 more days, so a memory you delete is gone from the
              live service immediately and from all backups within about 40 days.
            </li>
            <li>
              <strong>Sign-in tokens:</strong> expire automatically; access tokens after 1 hour, refresh tokens after 30
              days.
            </li>
            <li>
              <strong>Server logs:</strong> kept by our hosting provider for a limited period, then deleted.
            </li>
          </ul>
          <p>If we shut the service down, we will delete the stored data.</p>

          <h2>Your choices</h2>
          <ul>
            <li>
              <strong>Delete a memory:</strong> ask your AI app to forget it (this uses the{" "}
              <code>cognicore_forget</code> tool).
            </li>
            <li>
              <strong>Delete or export everything:</strong> email us at {mail} from, or mentioning, the GitHub account
              you signed in with. We will act on the request within 30 days.
            </li>
            <li>
              <strong>Disconnect:</strong> remove CogniCore in your AI app&apos;s connector settings, and revoke its
              access on GitHub under <em>Settings → Applications → Authorized OAuth Apps</em>. Disconnecting stops
              access but does not delete stored memories; ask us if you want them deleted.
            </li>
          </ul>
          <p>
            Depending on where you live, you may have further rights over your data, such as access or correction.
            Contact us to use them.
          </p>

          <h2>Security</h2>
          <p>
            Connections use HTTPS. Sign-in uses OAuth 2.1 with PKCE, and access is granted through short-lived signed
            tokens. Each account&apos;s memories are kept in its own database. The server&apos;s code is open source, so
            how it handles data can be checked: <a href={links.github}>{links.github.replace("https://", "")}</a>. No
            system is perfectly secure, but we work to protect your data and will tell affected users about any breach
            that puts their data at risk.
          </p>

          <h2>Children</h2>
          <p>CogniCore is not intended for children under 13, and GitHub accounts require users to be at least 13.</p>

          <h2>Changes</h2>
          <p>
            If we change this policy, we will update the effective date above. If a change significantly affects how
            your data is used, we will announce it in the project&apos;s repository before it takes effect.
          </p>

          <h2>Contact</h2>
          <p>Email: {mail}</p>
          <p>
            For questions that are not private, you can also open an issue on <a href={links.issues}>GitHub</a>. Please
            do not post personal data in public issues.
          </p>
        </article>
      </div>
    </>
  );
}
