from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
import bcrypt
from app.core.config import settings

ALGORITHM = "HS256"


def hash_password(password: str) -> str:
    # bcrypt direct to avoid passlib 72-byte bug
    pw = password.encode()[:72]
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pw, salt).decode()


def verify_password(password: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode()[:72], hashed.encode())
    except Exception:
        return False


def create_token(sub: str) -> str:
    exp = datetime.now(timezone.utc) + timedelta(minutes=settings.jwt_expire_minutes)
    payload = {"sub": sub, "exp": exp}
    return jwt.encode(payload, settings.jwt_secret, algorithm=ALGORITHM)


def decode_token(token: str) -> str:
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[ALGORITHM])
        sub: str | None = payload.get("sub")
        if sub is None:
            raise ValueError("Invalid token: missing sub")
        return sub
    except JWTError as e:
        raise ValueError(f"Invalid token: {e}") from e
