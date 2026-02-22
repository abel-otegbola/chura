import { databases } from "./appwrite";

export type ProduceItem = {
  $id?: string;
  name: string;
  quantity: string;
  harvestDate?: string;
  notes?: string;
  updatedAt?: string;
  createdAt?: string;
  // temporary id for offline items
  _tmpId?: string;
};

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || "";
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_PRODUCE_COLLECTION_ID || "";

function hasConfig() {
  return DATABASE_ID !== "" && COLLECTION_ID !== "";
}

export async function listProduces(): Promise<ProduceItem[]> {
  if (!hasConfig()) return [];
  try {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return (res.documents || []) as unknown as ProduceItem[];
  } catch (err) {
    // network or Appwrite error
    console.warn("listProduces remote failed:", err);
    return [];
  }
}

export async function createProduce(item: ProduceItem): Promise<ProduceItem> {
  if (!hasConfig()) throw new Error("Appwrite database/collection not configured");
  try {
    const res = await databases.createDocument(DATABASE_ID, COLLECTION_ID, item._tmpId || "unique()", item as unknown as Record<string, unknown>);
    return res as unknown as ProduceItem;
  } catch (err) {
    console.warn("createProduce failed:", err);
    throw err;
  }
}

export async function updateProduce(id: string, patch: Partial<ProduceItem>): Promise<ProduceItem> {
  if (!hasConfig()) throw new Error("Appwrite database/collection not configured");
  try {
    const res = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, patch as unknown as Record<string, unknown>);
    return res as unknown as ProduceItem;
  } catch (err) {
    console.warn("updateProduce failed:", err);
    throw err;
  }
}

export async function deleteProduce(id: string): Promise<void> {
  if (!hasConfig()) throw new Error("Appwrite database/collection not configured");
  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
  } catch (err) {
    console.warn("deleteProduce failed:", err);
    throw err;
  }
}

// Try to sync a list of local items to remote. Caller should handle errors.
export async function syncLocalToRemote(localItems: ProduceItem[]): Promise<void> {
  if (!hasConfig()) return;
  for (const item of localItems) {
    try {
      // use tmp id as request id to avoid duplicates (Appwrite will reject duplicates)
      await createProduce(item);
    } catch (err) {
      // stop on first failure to avoid running into repeated errors
      console.warn("sync failed for item", item, err);
      throw err;
    }
  }
}

export default {
  listProduces,
  createProduce,
  updateProduce,
  deleteProduce,
  syncLocalToRemote,
};
