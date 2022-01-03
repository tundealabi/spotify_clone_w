import Center from '@/components/center/Center';
import Sidebar from '@/components/sidebar/Sidebar';

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div>{/* Player */}</div>
    </div>
  );
}
