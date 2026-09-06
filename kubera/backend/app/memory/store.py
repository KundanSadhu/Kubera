from app.core.config import settings

_client = None
_collection = None


def get_client():
    global _client
    if _client is None:
        try:
            import chromadb

            _client = chromadb.HttpClient(host=settings.chroma_host, port=settings.chroma_port)
        except Exception as e:
            raise RuntimeError(f"Chroma unavailable: {e}") from e
    return _client


def get_collection():
    global _collection
    if _collection is None:
        client = get_client()
        _collection = client.get_or_create_collection("kubera_knowledge")
    return _collection


async def upsert_knowledge(doc_id: str, text: str):
    try:
        col = get_collection()
        col.upsert(ids=[doc_id], documents=[text])
    except Exception:
        pass  # fallback silent for MVP


async def search_knowledge(query: str, top_k: int = 3) -> list[str]:
    try:
        col = get_collection()
        res = col.query(query_texts=[query], n_results=top_k)
        docs = res.get("documents", [[]])[0] if res else []
        return docs or []
    except Exception:
        return []
