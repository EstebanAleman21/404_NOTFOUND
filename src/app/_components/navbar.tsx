const Navbar = () => (
  <div className="flex justify-between bg-white p-4 shadow">
    <h1 className="text-xl font-bold">Dashboard</h1>
    <div className="flex items-center space-x-4">
      <button className="rounded-md bg-purple-500 px-4 py-2 text-white">
        Upgrade to PRO
      </button>
      <div className="flex items-center space-x-2">
        <span>👤 Robert Simmons</span>
        <span>🔔</span>
      </div>
    </div>
  </div>
);

export default Navbar;
