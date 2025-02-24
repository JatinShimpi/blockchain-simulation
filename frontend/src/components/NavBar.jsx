

const NavBar = () => {
  return (
    <nav className="bg-gray-800 border-b border-gray-700 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">🤑</span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            Blockchain Simulator
          </h1>
        </div>
        <div className="text-sm text-gray-400">Powered by React</div>
      </div>
    </nav>
  );
};
export default NavBar;
