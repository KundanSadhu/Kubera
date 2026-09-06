from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://kubera:kubera@postgres:5432/kubera"
    chroma_host: str = "chroma"
    chroma_port: int = 8000
    jwt_secret: str = "change-me-32chars-minimum-for-jwt-production"
    jwt_expire_minutes: int = 60 * 24 * 7
    admin_email: str = "admin@kubera.local"
    admin_password: str = "kubera123"
    ollama_host: str = "http://host.docker.internal:11434"
    ollama_model: str = "llama3.1:8b"
    openai_api_key: str = ""
    litellm_model: str = "openai/gpt-4o-mini"
    whatsapp_mode: str = "mock"
    cors_origins: str = "http://localhost:5173"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False
        extra = "ignore"

    @property
    def cors_origins_list(self) -> List[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
