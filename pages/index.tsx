import Sidebar from 'components/sidebar/Sidebar';

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main>
        <Sidebar />
        {/* center */}
      </main>
      <div>{/* Player */}</div>
    </div>
  );
}
