import { useState } from "react";

const Block = ({ block, onUpdate, isInvalid }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState(block.data);

  const handleUpdate = () => {
    onUpdate(block.index, newData);
    setIsEditing(false);
  };

  return (
    <div
      className={`rounded-lg p-6 transition-all duration-300 transform hover:scale-105 shadow-xl
        ${
          isInvalid
            ? "bg-red-900/20 border-2 border-red-700"
            : "bg-gray-800 border border-gray-700"
        }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-blue-400">
          Block #{block.index}
        </h3>
        {isInvalid && (
          <span className="text-red-400 text-sm">Invalid Block</span>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm text-gray-400">Nonce</label>
          <div className="font-mono text-white bg-gray-700/50 rounded p-2">
            {block.nonce}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-400">Data</label>
          {isEditing ? (
            <textarea
              value={newData}
              onChange={(e) => setNewData(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white font-mono focus:outline-none focus:border-blue-500"
              rows="2"
            />
          ) : (
            <div className="font-mono text-white bg-gray-700/50 rounded p-2 break-all">
              {block.data || "None"}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-400">Previous Hash</label>
          <div className="font-mono text-xs text-gray-300 bg-gray-700/50 rounded p-2 truncate">
            {block.previousHash}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-400">Hash</label>
          <div className="font-mono text-xs text-gray-300 bg-gray-700/50 rounded p-2 truncate">
            {block.hash}
          </div>
        </div>

        <button
          onClick={isEditing ? handleUpdate : () => setIsEditing(true)}
          className={`w-full py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center space-x-2
            ${
              isEditing
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
        >
          <span>{isEditing ? "✓ Save" : "✎ Edit"}</span>
        </button>
      </div>
    </div>
  );
};

export default Block;
