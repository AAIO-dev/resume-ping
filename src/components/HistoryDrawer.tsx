import { useState, useEffect } from "react";
import { get } from "idb-keyval";
import { History, X } from "lucide-react";

export type HistoryItem = {
  id: string;
  fileName: string;
  summary: string;
  date: number; 
};

export default function HistoryDrawer({
  isOpen,
  onClose,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: HistoryItem) => void;
}) {
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      get("resumeping_history").then((data) => {
        if (data) setHistoryList(data);
      });
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm transition-opacity" 
          onClick={onClose} 
        />
      )}
      
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-border bg-card p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <History className="h-5 w-5 text-primary" />
            History
          </h2>
          <button 
            onClick={onClose} 
            className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex max-h-[calc(100vh-100px)] flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
          {historyList.length === 0 ? (
            <div className="mt-10 flex flex-col items-center justify-center text-center text-muted-foreground">
              <History className="mb-3 h-8 w-8 opacity-20" />
              <p className="text-sm">No summary history yet.</p>
            </div>
          ) : (
            historyList.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className="group flex flex-col items-start rounded-xl border border-border bg-surface p-4 text-left transition hover:border-primary/50 hover:bg-primary/5"
              >
                <span className="w-full truncate text-sm font-semibold text-foreground group-hover:text-primary">
                  {item.fileName}
                </span>
                <span className="mt-1.5 text-xs text-muted-foreground">
                  {new Date(item.date).toLocaleDateString()} • {new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}