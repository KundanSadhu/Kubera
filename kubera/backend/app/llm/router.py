import litellm
from app.core.config import settings

litellm.drop_params = True


async def call_llm(prompt: str, system: str = "You are a helpful assistant.", temperature: float = 0.3, max_tokens: int = 800) -> str:
    # Try Ollama first, fallback to OpenAI if key present
    messages = [{"role": "system", "content": system}, {"role": "user", "content": prompt}]

    # Prefer Ollama local
    try:
        if settings.ollama_host:
            # Check if Ollama is reachable via litellm ollama/ prefix
            resp = await litellm.acompletion(
                model=f"ollama/{settings.ollama_model}",
                messages=messages,
                api_base=settings.ollama_host,
                temperature=temperature,
                max_tokens=max_tokens,
            )
            return resp.choices[0].message.content or ""
    except Exception as e_ollama:
        # Fallback to OpenAI if available
        if settings.openai_api_key:
            try:
                resp = await litellm.acompletion(
                    model=settings.litellm_model,
                    messages=messages,
                    temperature=temperature,
                    max_tokens=max_tokens,
                )
                return resp.choices[0].message.content or ""
            except Exception as e_openai:
                raise RuntimeError(f"Ollama failed: {e_ollama}; OpenAI failed: {e_openai}") from e_openai
        raise RuntimeError(f"Ollama failed and no OPENAI_API_KEY: {e_ollama}") from e_ollama

    # If no Ollama, try OpenAI directly
    if settings.openai_api_key:
        resp = await litellm.acompletion(model=settings.litellm_model, messages=messages, temperature=temperature, max_tokens=max_tokens)
        return resp.choices[0].message.content or ""
    raise RuntimeError("No LLM configured: set OLLAMA_HOST or OPENAI_API_KEY")
