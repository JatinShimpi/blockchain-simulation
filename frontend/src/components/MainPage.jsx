import { useState, useEffect } from "react";
import axios from "axios";
import Block from "./Block";

const API_URL = "http://localhost:5000";

const MainPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState("");
  const [originalHashes, setOriginalHashes] = useState({});

  const fetchBlocks = async () => {
    try {
      const response = await axios.get(`${API_URL}/blocks`);
      setBlocks(response.data);
    } catch (error) {
      console.error("Error fetching blocks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  const addBlock = async () => {
    if (!transactions.trim()) return;
    try {
      await axios.post(`${API_URL}/addBlock`, { transactions: [transactions] });
      setTransactions("");
      fetchBlocks();
    } catch (error) {
      console.error("Error adding block:", error);
    }
  };

  const onUpdate = async (index, newData) => {
    try {
      setOriginalHashes((prev) => ({ ...prev, [index]: blocks[index].hash }));
      await axios.put(`${API_URL}/updateBlock/${index}`, { data: newData });
      fetchBlocks();
    } catch (error) {
      console.error("Error updating block:", error);
    }
  };

  const checkInvalidBlocks = () => {
    let invalid = false;
    return blocks.map((block, index) => {
      if (index === 0) return false;
      if (originalHashes[index] && originalHashes[index] !== block.hash) {
        invalid = true;
      }
      return invalid;
    });
  };

  const invalidBlocks = checkInvalidBlocks();

  return (
    <div className="max-w-7xl mx-auto p-6 font-['Poppins']">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-purple-300 mb-6 font-['Space_Mono']">
          Add New Block
        </h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={transactions}
            onChange={(e) => setTransactions(e.target.value)}
            placeholder="Enter transaction data..."
            className="flex-1 bg-slate-900/60 border-2 border-purple-500/30 rounded-xl 
              px-4 py-3 text-purple-100 placeholder-purple-300/40
              focus:outline-none focus:border-purple-400 transition-all duration-300
              font-['Space_Mono'] text-sm"
          />
          <button
            onClick={addBlock}
            disabled={!transactions.trim()}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 
              hover:from-purple-700 hover:to-indigo-700 
              disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed 
              px-8 py-3 rounded-xl text-white flex items-center space-x-2
              font-semibold shadow-lg shadow-purple-500/20 transition-all duration-300"
          >
            <span className="text-xl">+</span>
            <span>Add Block</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-purple-300/60">Loading blockchain...</p>
        </div>
      ) : blocks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((block, index) => (
            <Block
              key={block.index}
              block={block}
              onUpdate={onUpdate}
              isInvalid={invalidBlocks[index]}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/60 border-2 border-purple-500/30 rounded-xl p-8 text-center">
          <p className="text-purple-300/60">
            No blocks available. Add your first block to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default MainPage;
