import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Find part-time jobs and internships for students.',
};

export default function HomePage() {
  return (
    <main>
      <h1>Internery — Part-time Jobs for Students</h1>
      <p>Connecting students with great part-time opportunities.</p>
      <div>
        <Link href="/jobs">Browse Jobs</Link>
        <Link href="/register">Get Started</Link>
      </div>
    </main>
  );
}
