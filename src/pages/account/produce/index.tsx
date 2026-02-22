import { useEffect, useState } from "react";
import Topbar from "../../../components/topbar/topbar";
import Button from "../../../components/button/button";
import Input from "../../../components/input/input";
import Textarea from "../../../components/textarea/textarea";
import type { ProduceItem } from "../../../appwrite/produceService";
import {
  listProduces,
  createProduce,
  updateProduce,
  deleteProduce,
  syncLocalToRemote,
} from "../../../appwrite/produceService";
import {
  getOfflineProduces,
  addOfflineProduce,
  updateOfflineProduce,
  deleteOfflineProduce,
  clearOfflineProduces,
} from "../../../helpers/offlineProduceStore";

export default function ProducePage() {
  const [produces, setProduces] = useState<ProduceItem[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncing, setSyncing] = useState(false);
  const [editing, setEditing] = useState<ProduceItem | null>(null);

  // form state
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [notes, setNotes] = useState("");

  // Load produces on mount
  useEffect(() => {
    loadProduces();
    // listen for online/offline
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  async function loadProduces() {
    if (navigator.onLine) {
      try {
        const remote = await listProduces();
        setProduces(remote);
      } catch (err) {
        console.warn("Failed to load remote produces, using offline", err);
        setProduces(getOfflineProduces());
      }
    } else {
      setProduces(getOfflineProduces());
    }
  }

  function resetForm() {
    setName("");
    setQuantity("");
    setHarvestDate("");
    setNotes("");
    setEditing(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const item: ProduceItem = {
      name,
      quantity,
      harvestDate,
      notes,
    };

    if (editing) {
      // update
      if (isOnline) {
        try {
          const updated = await updateProduce(editing.$id || editing._tmpId || "", item);
          setProduces((prev) =>
            prev.map((p) => (p.$id === updated.$id || p._tmpId === updated._tmpId ? updated : p))
          );
          updateOfflineProduce(editing.$id || editing._tmpId || "", item);
        } catch (err) {
          console.warn("Update failed, saving offline", err);
          updateOfflineProduce(editing.$id || editing._tmpId || "", item);
          setProduces((prev) =>
            prev.map((p) => (p.$id === editing.$id || p._tmpId === editing._tmpId ? { ...p, ...item } : p))
          );
        }
      } else {
        updateOfflineProduce(editing.$id || editing._tmpId || "", item);
        setProduces((prev) =>
          prev.map((p) => (p.$id === editing.$id || p._tmpId === editing._tmpId ? { ...p, ...item } : p))
        );
      }
    } else {
      // create
      item._tmpId = `tmp_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      if (isOnline) {
        try {
          const created = await createProduce(item);
          setProduces((prev) => [...prev, created]);
          addOfflineProduce(created);
        } catch (err) {
          console.warn("Create failed, saving offline", err);
          addOfflineProduce(item);
          setProduces((prev) => [...prev, item]);
        }
      } else {
        addOfflineProduce(item);
        setProduces((prev) => [...prev, item]);
      }
    }
    resetForm();
  }

  function handleEdit(item: ProduceItem) {
    setEditing(item);
    setName(item.name);
    setQuantity(item.quantity);
    setHarvestDate(item.harvestDate || "");
    setNotes(item.notes || "");
  }

  async function handleDelete(item: ProduceItem) {
    const id = item.$id || item._tmpId || "";
    if (isOnline && item.$id) {
      try {
        await deleteProduce(item.$id);
        setProduces((prev) => prev.filter((p) => p.$id !== item.$id));
        deleteOfflineProduce(id);
      } catch (err) {
        console.warn("Delete failed, removing offline", err);
        deleteOfflineProduce(id);
        setProduces((prev) => prev.filter((p) => p.$id !== item.$id && p._tmpId !== item._tmpId));
      }
    } else {
      deleteOfflineProduce(id);
      setProduces((prev) => prev.filter((p) => p.$id !== id && p._tmpId !== id));
    }
  }

  async function handleSync() {
    setSyncing(true);
    try {
      const offline = getOfflineProduces();
      const needSync = offline.filter((o) => o._tmpId && !o.$id);
      if (needSync.length > 0) {
        await syncLocalToRemote(needSync);
        clearOfflineProduces();
        await loadProduces();
      }
    } catch (err) {
      console.error("Sync failed", err);
      alert("Sync failed. Check console for details.");
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="w-full min-h-screen">
      <Topbar heading="Produce Tracking" subText="Track your produce inventory and sync with the cloud" />
      <div className="p-6 max-w-4xl mx-auto">
        {/* Online indicator */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
          {!isOnline && (
            <span className="text-xs text-gray-500">(Changes will sync when online)</span>
          )}
          {isOnline && (
            <Button size="small" onClick={handleSync} disabled={syncing}>
              {syncing ? "Syncing..." : "Sync Now"}
            </Button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">{editing ? "Edit Produce" : "Add Produce"}</h2>
          <div className="space-y-4">
            <Input
              label="Name"
              name="name"
              placeholder="e.g., Tomatoes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Quantity"
              name="quantity"
              placeholder="e.g., 50kg"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
            <Input
              label="Harvest Date"
              name="harvestDate"
              type="date"
              value={harvestDate}
              onChange={(e) => setHarvestDate(e.target.value)}
            />
            <Textarea
              label="Notes"
              name="notes"
              placeholder="Any additional info..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="flex gap-2">
              <Button type="submit">{editing ? "Update" : "Add"}</Button>
              {editing && (
                <Button variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </form>

        {/* List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Your Produce</h2>
          {produces.length === 0 ? (
            <p className="text-gray-500">No produce items yet. Add one above!</p>
          ) : (
            <div className="grid gap-4">
              {produces.map((item) => (
                <div
                  key={item.$id || item._tmpId}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-start"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                    {item.harvestDate && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Harvest: {item.harvestDate}
                      </p>
                    )}
                    {item.notes && (
                      <p className="text-sm text-gray-500 mt-1">{item.notes}</p>
                    )}
                    {item._tmpId && !item.$id && (
                      <span className="text-xs text-orange-500">(Not synced)</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="small" variant="secondary" onClick={() => handleEdit(item)}>
                      Edit
                    </Button>
                    <Button size="small" variant="secondary" onClick={() => handleDelete(item)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
