import os
from pathlib import Path

from authlib.integrations.base_client.errors import OAuthError
from authlib.integrations.starlette_client import OAuth
from fastapi import FastAPI
from fastapi import Request
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from dotenv import load_dotenv
from starlette.middleware.sessions import SessionMiddleware


load_dotenv(Path(__file__).resolve().parents[1] / ".env")

app = FastAPI(title="McMullin Estates API")
app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET", "development-only-change-me"),
    same_site="lax",
    https_only=os.getenv("COOKIE_SECURE", "false").lower() == "true",
    max_age=60 * 60 * 24 * 7,
)

oauth = OAuth()
google_client_id = os.getenv("GOOGLE_CLIENT_ID")
google_client_secret = os.getenv("GOOGLE_CLIENT_SECRET")

google = None
if google_client_id and google_client_secret:
    google = oauth.register(
        name="google",
        client_id=google_client_id,
        client_secret=google_client_secret,
        server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
        client_kwargs={"scope": "openid email profile"},
    )


class User(BaseModel):
    id: int
    name: str
    title: str
    email: str


USERS = [
    User(
        id=1,
        name="Iveth McMullin",
        title="Chief Executive Officer",
        email="iveth@example.com",
    ),
    User(
        id=2,
        name="Ashi McMullin",
        title="Senior Architect",
        email="ashi@example.com",
    ),
    User(
        id=3,
        name="Joseph McMullin",
        title="Property Advisor",
        email="joe@example.com",
    ),
    User(
        id=4,
        name="Caleb McMullin",
        title="Slave Laborer",
        email="caleb@example.com",
    ),
    User(
        id=5,
        name="Miles McMullin",
        title="Chief Techology Officer",
        email="miles@example.com",
    ),
    User(
        id=6,
        name="Logan McMullin",
        title="Director of Unplanned Disassembly",
        email="logan@example.com",
    ),
]


@app.get("/api/users", response_model=list[User])
async def get_users() -> list[User]:
    return USERS


@app.get("/auth/google")
async def google_login(request: Request) -> RedirectResponse:
    if google is None:
        return RedirectResponse(url="/account?error=not_configured", status_code=303)

    redirect_uri = os.getenv("GOOGLE_REDIRECT_URI") or str(
        request.url_for("google_callback")
    )
    return await google.authorize_redirect(request, redirect_uri)


@app.get("/auth/google/callback", name="google_callback")
async def google_callback(request: Request) -> RedirectResponse:
    if google is None:
        return RedirectResponse(url="/account?error=not_configured", status_code=303)

    try:
        token = await google.authorize_access_token(request)
    except OAuthError:
        return RedirectResponse(url="/account?error=oauth_failed", status_code=303)

    profile = token.get("userinfo")
    if not profile or not profile.get("email_verified"):
        return RedirectResponse(url="/account?error=unverified_email", status_code=303)

    request.session["user"] = {
        "id": profile["sub"],
        "name": profile.get("name", profile["email"]),
        "email": profile["email"],
        "picture": profile.get("picture"),
    }
    return RedirectResponse(url="/account", status_code=303)


@app.get("/api/account")
async def get_account(request: Request) -> dict[str, object]:
    user = request.session.get("user")
    return {"authenticated": user is not None, "user": user}


@app.post("/auth/logout")
async def logout(request: Request) -> dict[str, bool]:
    request.session.clear()
    return {"ok": True}
